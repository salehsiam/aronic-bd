import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { pixelEvent } from '@/lib/pixel'

export type CartItem = {
  productId: string
  slug: string
  name: string
  image: string
  price: number
  size: string
  color?: string
  quantity: number
}

export type CartChange = {
  type: 'price' | 'quantity' | 'removed'
  name: string
  size: string
  from?: number
  to?: number
  reason?: 'out_of_stock' | 'unavailable'
}

type CartStore = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (productId: string, size: string, color?: string) => void
  updateQuantity: (productId: string, size: string, quantity: number, color?: string) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
  syncWithServer: () => Promise<CartChange[]>
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        pixelEvent('AddToCart', {
          content_ids: [item.productId],
          content_name: item.name,
          content_type: 'product',
          value: item.price,
          currency: 'BDT',
        })

        const existing = get().items.find(
          (i) => i.productId === item.productId && i.size === item.size && i.color === item.color,
        )

        if (existing) {
          set({
            items: get().items.map((i) =>
              i.productId === item.productId && i.size === item.size && i.color === item.color
                ? { ...i, quantity: i.quantity + 1 }
                : i,
            ),
          })
        } else {
          set({ items: [...get().items, { ...item, quantity: 1 }] })
        }
      },

      removeItem: (productId, size, color) => {
        set({
          items: get().items.filter(
            (i) => !(i.productId === productId && i.size === size && i.color === color),
          ),
        })
      },

      updateQuantity: (productId, size, quantity, color) => {
        set({
          items: get().items.map((i) =>
            i.productId === productId && i.size === size && i.color === color
              ? { ...i, quantity: Math.max(1, quantity) }
              : i,
          ),
        })
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      // Server theke latest dam/stock ene cart update kore, ki ki bodlalo tar list dey
      syncWithServer: async () => {
        const items = get().items
        if (items.length === 0) return []

        // 8 second-er moddhe uttor na ele opekkha charbo, jate checkout atke na thake
        const controller = new AbortController()
        const timer = setTimeout(() => controller.abort(), 8000)

        try {
          const res = await fetch('/api/cart/validate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              items: items.map((i) => ({
                productId: i.productId,
                size: i.size,
                quantity: i.quantity,
              })),
            }),
            signal: controller.signal,
          })

          // Validation fail korle checkout bondho korbo na, server order-e abar check kore
          if (!res.ok) return []

          const { results } = await res.json()
          const changes: CartChange[] = []
          const nextItems: CartItem[] = []

          for (const item of items) {
            const r = results.find(
              (x: any) => x.productId === item.productId && x.size === item.size,
            )

            if (!r) {
              nextItems.push(item)
              continue
            }

            if (r.status === 'unavailable' || r.status === 'out_of_stock') {
              changes.push({
                type: 'removed',
                name: item.name,
                size: item.size,
                reason: r.status,
              })
              continue
            }

            const updated = { ...item }

            if (typeof r.price === 'number' && r.price !== item.price) {
              changes.push({
                type: 'price',
                name: item.name,
                size: item.size,
                from: item.price,
                to: r.price,
              })
              updated.price = r.price
            }

            if (updated.quantity > r.stock) {
              changes.push({
                type: 'quantity',
                name: item.name,
                size: item.size,
                from: updated.quantity,
                to: r.stock,
              })
              updated.quantity = r.stock
            }

            nextItems.push(updated)
          }

          if (changes.length > 0) set({ items: nextItems })
          return changes
        } catch {
          return []
        } finally {
          clearTimeout(timer)
        }
      },
    }),
    { name: 'aronic-cart' },
  ),
)
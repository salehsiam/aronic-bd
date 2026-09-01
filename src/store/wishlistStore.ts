import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type WishlistItem = {
    productId: string
    slug: string
    name: string
    image: string
    price: number
    salePrice?: number
}

type WishlistStore = {
    items: WishlistItem[]
    toggleItem: (item: WishlistItem) => void
    removeItem: (productId: string) => void
    isWishlisted: (productId: string) => boolean
    clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            items: [],

            toggleItem: (item) => {
                const exists = get().items.some((i) => i.productId === item.productId)
                if (exists) {
                    set({ items: get().items.filter((i) => i.productId !== item.productId) })
                } else {
                    set({ items: [...get().items, item] })
                }
            },

            removeItem: (productId) => {
                set({ items: get().items.filter((i) => i.productId !== productId) })
            },

            isWishlisted: (productId) => {
                return get().items.some((i) => i.productId === productId)
            },

            clearWishlist: () => set({ items: [] }),
        }),
        { name: 'aronic-wishlist' },
    ),
)
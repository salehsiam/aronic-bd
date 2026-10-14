'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCartStore, type CartChange } from '@/store/cartStore'
import { useState, useEffect, useRef } from 'react'

function describeChanges(changes: CartChange[]): string[] {
  return changes.map((c) => {
    const label = `${c.name} (${c.size})`
    if (c.type === 'price') return `${label}: price changed from ৳${c.from} to ৳${c.to}.`
    if (c.type === 'quantity')
      return `${label}: only ${c.to} left in stock, quantity reduced from ${c.from}.`
    return c.reason === 'out_of_stock'
      ? `${label} is out of stock and was removed.`
      : `${label} is no longer available and was removed.`
  })
}

function CartNotices({ notices, onDismiss }: { notices: string[]; onDismiss: () => void }) {
  if (notices.length === 0) return null

  return (
    <div className="mb-8 border border-rust/40 bg-rust/5 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-rust mb-2">
            Cart updated
          </p>
          <ul className="space-y-1 font-body text-sm text-ink/80 list-disc pl-5">
            {notices.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="text-ink/40 hover:text-ink transition-colors shrink-0"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default function CartPage() {
  const [mounted, setMounted] = useState(false)
  const [checking, setChecking] = useState(true)
  const [notices, setNotices] = useState<string[]>([])
  const hasSynced = useRef(false)
  const { items, removeItem, updateQuantity, totalPrice, syncWithServer } = useCartStore()

  // Zustand persist hydration mismatch ekrate hobe (server e empty, client e localStorage theke value)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Cart page khulle latest dam/stock server theke ene cart update hoy
  useEffect(() => {
    if (!mounted || hasSynced.current) return
    hasSynced.current = true

      ; (async () => {
        const changes = await syncWithServer()
        if (changes.length > 0) setNotices(describeChanges(changes))
        setChecking(false)
      })()
  }, [mounted, syncWithServer])

  const subtotal = mounted ? totalPrice() : 0
  const total = subtotal

  if (!mounted) {
    return null
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-cotton px-6">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 mx-auto mb-6 border border-ink/20 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-ink/40" />
          </div>
          <h1 className="font-display text-2xl text-ink mb-2">Your cart is empty</h1>
          {notices.length > 0 && (
            <ul className="mb-4 space-y-1 font-body text-sm text-rust list-none">
              {notices.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          )}
          <p className="font-body text-sm text-ink/50 mb-8">
            You haven't added anything yet. Browse the shop to find something you'll love.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-ink text-cotton px-6 py-3 text-sm font-body hover:bg-indigo transition-colors"
          >
            Start Your Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cotton">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-rust mb-2">
            {items.reduce((sum, i) => sum + i.quantity, 0)} Item
          </p>
          <h1 className="font-display text-4xl text-ink">Your Cart</h1>
          {checking && (
            <p className="font-body text-xs text-ink/40 mt-2">Checking the latest prices...</p>
          )}
        </div>

        <CartNotices notices={notices} onDismiss={() => setNotices([])} />

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Items list */}
          <div className="flex-1">
            <div className="border-t border-line">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="flex gap-4 md:gap-6 py-6 border-b border-line"
                >
                  <Link
                    href={`/product/${item.slug}`}
                    className="relative w-24 h-32 md:w-28 md:h-36 shrink-0 bg-line overflow-hidden"
                  >
                    {item.image && (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    )}
                  </Link>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link href={`/product/${item.slug}`}>
                          <h3 className="font-display text-base md:text-lg text-ink truncate">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="font-body text-xs text-ink/50 mt-1">
                          Size: {item.size}
                          {item.color && ` · Color: ${item.color}`}
                        </p>
                      </div>

                      <button
                        onClick={() => removeItem(item.productId, item.size, item.color)}
                        className="text-ink/40 hover:text-rust transition-colors shrink-0"
                        aria-label="Remove item"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-end justify-between mt-3">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-ink/20">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.quantity - 1, item.color)
                          }
                          className="w-8 h-8 flex items-center justify-center text-ink/60 hover:text-ink transition-colors"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center font-mono text-sm text-ink">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.quantity + 1, item.color)
                          }
                          className="w-8 h-8 flex items-center justify-center text-ink/60 hover:text-ink transition-colors"
                          aria-label="Increase"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="font-mono text-sm text-indigo">
                        ৳{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 mt-6 text-sm font-body text-ink/60 hover:text-ink transition-colors"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order summary */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="border border-line p-6 sticky top-24">
              <h2 className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-5 pb-4 border-b border-line">
                Order Summary
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm font-body text-ink/70">
                  <span>Subtotal</span>
                  <span className="font-mono">৳{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm font-body text-ink/70">
                  <span>Delivery</span>
                  <span className="font-mono text-ink/50">At checkout</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline mt-5 pt-5 border-t border-line">
                <span className="font-display text-base text-ink">Subtotal</span>
                <span className="font-mono text-xl text-indigo">৳{total}</span>
              </div>

              <Link
                href="/checkout"
                className="mt-6 w-full flex items-center justify-center gap-2 bg-ink text-cotton py-3.5 text-sm font-body hover:bg-indigo transition-colors"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="font-mono text-[11px] text-ink/40 text-center mt-4">
                bKash · Nagad · Cash on Delivery
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
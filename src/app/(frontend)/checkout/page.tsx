'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'
import { getCurrentCustomer } from '@/lib/customerAuth'
import { Minus, Plus, X } from 'lucide-react'

const DHAKA_CHARGE = 80
const OUTSIDE_DHAKA_CHARGE = 130

export default function CheckoutPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { items, totalPrice, clearCart, updateQuantity, removeItem } = useCartStore()

  const [location, setLocation] = useState<'dhaka' | 'outside'>('dhaka')
  const [paymentMethod, setPaymentMethod] = useState<'sslcommerz' | 'cod'>('cod')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [customer, setCustomer] = useState<any>(null)

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
  })

  useEffect(() => {
    setMounted(true)
    getCurrentCustomer().then((c) => {
      setCustomer(c)
      if (c) {
        setForm((prev) => ({ ...prev, name: c.name, email: c.email, phone: c.phone }))
      }
    })
  }, [])

  if (!mounted) return null

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-cotton px-6">
        <p className="font-body text-ink/50">Your cart is empty — nothing to checkout</p>
      </div>
    )
  }

  const subtotal = totalPrice()
  const deliveryCharge = location === 'dhaka' ? DHAKA_CHARGE : OUTSIDE_DHAKA_CHARGE
  const total = subtotal + deliveryCharge

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!form.name || !form.phone || !form.address) {
      setError('Please provide your name, phone number, and address.')
      return
    }

    setIsSubmitting(true)

    try {
      const orderNumber = `ARN-${Date.now()}`

      const orderData = {
        orderNumber,
        customer: customer?.id || undefined, // logged in thakle customer attach hobe
        customerName: form.name,
        customerPhone: form.phone,
        customerEmail: form.email || undefined,
        shippingAddress: `${form.address}, ${form.city} (${location === 'dhaka' ? 'Dhaka' : 'Outside Dhaka'})`,
        items: items.map((item) => ({
          product: item.productId,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          priceAtPurchase: item.price,
        })),
        total,
        paymentMethod,
        paymentStatus: 'pending',
        status: 'pending',
      }

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })

      if (!res.ok) throw new Error('Something went wrong. Please try again.')

      const created = await res.json()

      if (paymentMethod === 'sslcommerz') {
        // SSLCommerz session init korar API call — porer step e banabo
        const sessionRes = await fetch('/api/payment/sslcommerz-init', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: created.doc.id,
            orderNumber,
            total,
            customer: form,
          }),
        })
        const sessionData = await sessionRes.json()

        if (sessionData.gatewayUrl) {
          clearCart()
          window.location.href = sessionData.gatewayUrl
          return
        } else {
          throw new Error('Something went wrong. Please try again.')
        }
      } else {
        clearCart()
        router.push(`/order-confirmation?order=${orderNumber}`)
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-cotton">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-24">
        <h1 className="font-display text-4xl text-ink mb-10">Checkout</h1>

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12">
          {/* Left: Form */}
          <div className="flex-1 space-y-8">
            {/* Shipping Info */}
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-rust mb-4">
                Shipping Information
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="border border-ink/20 px-4 py-3 text-sm font-body bg-cotton outline-none focus:border-indigo transition-colors"
                    required
                  />
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="border border-ink/20 px-4 py-3 text-sm font-body bg-cotton outline-none focus:border-indigo transition-colors"
                    required
                  />
                </div>

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email (optional)"
                  className="w-full border border-ink/20 px-4 py-3 text-sm font-body bg-cotton outline-none focus:border-indigo transition-colors"
                />

                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Full Address (House, Road, Area)"
                  rows={3}
                  className="w-full border border-ink/20 px-4 py-3 text-sm font-body bg-cotton outline-none focus:border-indigo transition-colors resize-none"
                  required
                />

                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City / District"
                  className="w-full border border-ink/20 px-4 py-3 text-sm font-body bg-cotton outline-none focus:border-indigo transition-colors"
                />
              </div>

              {/* Location toggle for delivery charge */}
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setLocation('dhaka')}
                  className={`flex-1 border px-4 py-3 text-sm font-body text-left transition-colors ${location === 'dhaka'
                    ? 'border-indigo bg-indigo/5 text-ink'
                    : 'border-ink/20 text-ink/60'
                    }`}
                >
                  <span className="block font-medium">Inside Dhaka</span>
                  <span className="font-mono text-xs text-ink/50">৳{DHAKA_CHARGE}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLocation('outside')}
                  className={`flex-1 border px-4 py-3 text-sm font-body text-left transition-colors ${location === 'outside'
                    ? 'border-indigo bg-indigo/5 text-ink'
                    : 'border-ink/20 text-ink/60'
                    }`}
                >
                  <span className="block font-medium">Outside Dhaka</span>
                  <span className="font-mono text-xs text-ink/50">৳{OUTSIDE_DHAKA_CHARGE}</span>
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-rust mb-4">
                Payment Method
              </h2>
              <div className="space-y-3">
                <label
                  className={`flex items-center gap-3 border px-4 py-3.5 cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-indigo bg-indigo/5' : 'border-ink/20'
                    }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-indigo"
                  />
                  <div>
                    <span className="block text-sm font-body text-ink">Cash on Delivery</span>
                    <span className="block text-xs font-body text-ink/50">
                      Pay in cash when your order arrives
                    </span>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-3 border px-4 py-3.5 cursor-pointer transition-colors ${paymentMethod === 'sslcommerz' ? 'border-indigo bg-indigo/5' : 'border-ink/20'
                    }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'sslcommerz'}
                    onChange={() => setPaymentMethod('sslcommerz')}
                    className="accent-indigo"
                  />
                  <div>
                    <span className="block text-sm font-body text-ink">
                      Online Payment (bKash / Nagad / Card)
                    </span>
                    <span className="block text-xs font-body text-ink/50">
                      Pay securely via SSLCommerz
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {error && (
              <p className="text-sm font-body text-red-600 bg-red-50 border border-red-200 px-4 py-3">
                {error}
              </p>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="border border-line p-6 sticky top-24">
              <h2 className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-5 pb-4 border-b border-line">
                Order Summary
              </h2>

              <div className="space-y-4 max-h-80 overflow-y-auto mb-5">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}-${item.color}`}
                    className="flex gap-3"
                  >
                    <div className="relative w-14 h-16 bg-line shrink-0">
                      {item.image && (
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-body text-ink truncate">{item.name}</p>
                          <p className="text-xs font-body text-ink/50">{item.size}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId, item.size, item.color)}
                          className="text-ink/30 hover:text-rust transition-colors shrink-0"
                          aria-label="Remove item"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-1.5">
                        <div className="flex items-center border border-ink/20">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.productId, item.size, item.quantity - 1, item.color)
                            }
                            className="w-6 h-6 flex items-center justify-center text-ink/60 hover:text-ink transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center font-mono text-xs text-ink">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.productId, item.size, item.quantity + 1, item.color)
                            }
                            className="w-6 h-6 flex items-center justify-center text-ink/60 hover:text-ink transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <p className="font-mono text-sm text-ink/70">
                          ৳{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-line">
                <div className="flex justify-between text-sm font-body text-ink/70">
                  <span>Subtotal</span>
                  <span className="font-mono">৳{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm font-body text-ink/70">
                  <span>Delivery ({location === 'dhaka' ? 'Dhaka' : 'Outside Dhaka'})</span>
                  <span className="font-mono">৳{deliveryCharge}</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline mt-5 pt-5 border-t border-line">
                <span className="font-display text-base text-ink">Total</span>
                <span className="font-mono text-xl text-indigo">৳{total}</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full bg-ink text-cotton py-3.5 text-sm font-body hover:bg-indigo transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Placing Order...' : 'Confirm Order'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
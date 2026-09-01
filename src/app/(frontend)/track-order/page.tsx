'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Search, Package, CheckCircle2, Truck, Home, XCircle } from 'lucide-react'

type OrderResult = {
    orderNumber: string
    status: string
    paymentStatus: string
    paymentMethod: string
    total: number
    shippingAddress: string
    createdAt: string
    items: {
        name: string
        size: string
        color?: string
        quantity: number
        priceAtPurchase: number
    }[]
}

const STATUS_STEPS = [
    { key: 'pending', label: 'Order Placed', icon: Package },
    { key: 'confirmed', label: 'Confirmed', icon: CheckCircle2 },
    { key: 'shipped', label: 'Shipped', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: Home },
]

export default function TrackOrderPage() {
    const [orderNumber, setOrderNumber] = useState('')
    const [phone, setPhone] = useState('')
    const [order, setOrder] = useState<OrderResult | null>(null)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setOrder(null)
        setIsLoading(true)

        try {
            const res = await fetch('/api/track-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderNumber, phone }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || 'Order not found.')
                return
            }

            setOrder(data)
        } catch {
            setError('Something went wrong. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const currentStepIndex = order ? STATUS_STEPS.findIndex((s) => s.key === order.status) : -1
    const isCancelled = order?.status === 'cancelled'

    return (
        <div className= "min-h-screen bg-cotton" >
        <div className="max-w-3xl mx-auto px-6 pt-16 pb-24" >
            <p className="font-mono text-xs uppercase tracking-widest text-rust mb-2" >
                Order Status
                    </p>
                    < h1 className = "font-display text-4xl text-ink mb-10" > Track Your Order </h1>

    {/* Search form */ }
    <form onSubmit={ handleSubmit } className = "border border-line p-6 mb-10" >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" >
            <div>
            <label className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-2 block" >
                Order Number
                    </label>
                    < input
    value = { orderNumber }
    onChange = {(e) => setOrderNumber(e.target.value)
}
placeholder = "ARN-1787825278789"
className = "w-full border border-ink/20 px-4 py-3 text-sm font-body bg-cotton outline-none focus:border-indigo transition-colors"
required
    />
    </div>
    < div >
    <label className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-2 block" >
        Phone Number
            </label>
            < input
value = { phone }
onChange = {(e) => setPhone(e.target.value)}
placeholder = "Used at checkout"
className = "w-full border border-ink/20 px-4 py-3 text-sm font-body bg-cotton outline-none focus:border-indigo transition-colors"
required
    />
    </div>
    </div>

    < button
type = "submit"
disabled = { isLoading }
className = "mt-5 w-full md:w-auto inline-flex items-center justify-center gap-2 bg-ink text-cotton px-7 py-3.5 text-sm font-body hover:bg-indigo transition-colors disabled:opacity-50"
    >
    <Search className="w-4 h-4" />
        { isLoading? 'Searching...': 'Track Order' }
        </button>

{
    error && (
        <p className="mt-4 text-sm font-body text-red-600 bg-red-50 border border-red-200 px-4 py-3" >
            { error }
            </p>
          )
}
</form>

{/* Order result */ }
{
    order && (
        <div className="border border-line p-6 md:p-8" >
            <div className="flex items-start justify-between mb-8 pb-6 border-b border-line" >
                <div>
                <p className="font-mono text-xs text-ink/50 uppercase tracking-wide" >
                    Order Number
                        </p>
                        < p className = "font-mono text-base text-ink mt-1" > { order.orderNumber } </p>
                            </div>
                            < div className = "text-right" >
                                <p className="font-mono text-xs text-ink/50 uppercase tracking-wide" >
                                    Placed On
                                        </p>
                                        < p className = "font-body text-sm text-ink mt-1" >
                                        {
                                            new Date(order.createdAt).toLocaleDateString('en-GB', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            })
                                        }
                                            </p>
                                            </div>
                                            </div>

    {/* Status timeline */ }
    {
        isCancelled ? (
            <div className= "flex items-center gap-3 mb-8 text-red-600" >
            <XCircle className="w-5 h-5" />
                <span className="font-body text-sm font-medium" > This order has been cancelled.</span>
                    </div>
            ) : (
            <div className= "flex items-center justify-between mb-10 relative" >
            <div className="absolute top-4 left-0 right-0 h-px bg-line -z-0" />
            {
                STATUS_STEPS.map((step, idx) => {
                    const isDone = idx <= currentStepIndex
                    const Icon = step.icon
                    return (
                        <div key= { step.key } className = "flex flex-col items-center gap-2 relative z-10 bg-cotton px-1" >
                            <div
                        className={
                        `w-8 h-8 rounded-full flex items-center justify-center border ${isDone
                            ? 'bg-indigo border-indigo text-cotton'
                            : 'bg-cotton border-ink/20 text-ink/30'
                            }`
                    }
                      >
                        <Icon className="w-3.5 h-3.5" />
                            </div>
                            < span
                    className = {`font-mono text-[10px] uppercase tracking-wide text-center ${isDone ? 'text-ink' : 'text-ink/35'
                        }`
                }
                      >
                    { step.label }
                    </span>
                    </div>
                )
            })
    }
    </div>
            )
}

{/* Items */ }
<div className="space-y-3 mb-6" >
{
    order.items.map((item, idx) => (
        <div key= { idx } className = "flex justify-between text-sm font-body" >
        <span className="text-ink/70" >
    { item.name } · { item.size }
                    { item.color && ` · ${item.color}` } × { item.quantity }
    </span>
    < span className = "font-mono text-ink" >
                    ৳{ item.priceAtPurchase * item.quantity }
        </span>
        </div>
    ))
}
    </div>

    < div className = "flex justify-between items-baseline pt-4 border-t border-line mb-6" >
        <span className="font-display text-base text-ink" > Total </span>
            < span className = "font-mono text-lg text-indigo" >৳{ order.total } </span>
                </div>

                < div className = "grid grid-cols-2 gap-4 pt-4 border-t border-line font-body text-sm" >
                    <div>
                    <p className="text-ink/50" > Payment Method </p>
                        < p className = "text-ink mt-1 capitalize" >
                            { order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment' }
                            </p>
                            </div>
                            < div >
                            <p className="text-ink/50" > Payment Status </p>
                                < p className = "text-ink mt-1 capitalize" > { order.paymentStatus } </p>
                                    </div>
                                    < div className = "col-span-2" >
                                        <p className="text-ink/50" > Delivery Address </p>
                                            < p className = "text-ink mt-1" > { order.shippingAddress } </p>
                                                </div>
                                                </div>
                                                </div>
        )}
</div>
    </div>
  )
}
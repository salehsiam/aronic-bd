'use client'

import { useEffect } from 'react'
import { pixelEvent } from '@/lib/pixel'
import { useCartStore } from '@/store/cartStore'

export function PurchaseTracker({ orderNumber }: { orderNumber?: string }) {
    const clearCart = useCartStore((state) => state.clearCart)

    useEffect(() => {
        // Confirmation page e ashle order shesh, tai cart ekhane clear hoy
        clearCart()

        try {
            const raw = sessionStorage.getItem('aronic_last_order')
            if (!raw) return

            const order = JSON.parse(raw)
            if (orderNumber && order.orderNumber !== orderNumber) return

            pixelEvent('Purchase', { value: order.total, currency: 'BDT' })
            sessionStorage.removeItem('aronic_last_order') // refresh korle duibar count hobe na
        } catch { }
    }, [orderNumber, clearCart])

    return null
}
import Link from 'next/link'
import { Check } from 'lucide-react'

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>
}) {
  const params = await searchParams
  const orderNumber = params.order

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-cotton px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 bg-indigo rounded-full flex items-center justify-center">
          <Check className="w-7 h-7 text-cotton" />
        </div>

        <p className="font-mono text-xs uppercase tracking-widest text-rust mb-2">
          Order Confirmed
        </p>
        <h1 className="font-display text-3xl text-ink mb-4">Thank you for your order</h1>

        {orderNumber && (
          <p className="font-body text-sm text-ink/60 mb-1">
            Order Number:{' '}
            <span className="font-mono text-ink">{orderNumber}</span>
          </p>
        )}

        <p className="font-body text-sm text-ink/60 mt-4 mb-8">
          We've received your order and will contact you shortly to confirm delivery details.
        </p>

        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-ink text-cotton px-6 py-3 text-sm font-body hover:bg-indigo transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
import { Package, RotateCcw, XCircle, Clock } from 'lucide-react'

export const metadata = {
    title: 'Return & Exchange Policy',
    description: 'Learn how to return or exchange your Aronic order.',
}

export default function ReturnsPage() {
    return (
        <div className="min-h-screen bg-cotton">
            <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
                <p className="font-mono text-xs uppercase tracking-widest text-rust mb-2">Support</p>
                <h1 className="font-display text-4xl text-ink mb-10">Return & Exchange Policy</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                    {[
                        { icon: Clock, title: '7-Day Window', desc: 'Returns accepted within 7 days of delivery' },
                        { icon: Package, title: 'Unworn & Tagged', desc: 'Item must be unused with original tags' },
                        { icon: RotateCcw, title: 'Free Exchange', desc: 'Size exchanges are free of charge' },
                        { icon: XCircle, title: 'No Refund on Sale', desc: 'Discounted items are exchange-only' },
                    ].map((item) => (
                        <div key={item.title} className="border border-line p-5 flex items-start gap-3">
                            <item.icon className="w-5 h-5 text-indigo shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-display text-base text-ink">{item.title}</h3>
                                <p className="font-body text-sm text-ink/50 mt-1">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-8 font-body text-sm text-ink/70 leading-relaxed">
                    <section>
                        <h2 className="font-display text-xl text-ink mb-3">Eligibility</h2>
                        <p>
                            To be eligible for a return or exchange, your item must be unused, unwashed, and in
                            the same condition you received it, with all original tags attached. Requests must
                            be made within 7 days of the delivery date.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl text-ink mb-3">How to Request a Return</h2>
                        <p>
                            Contact us via WhatsApp at +880 1XXX-XXXXXX or email{' '}
                            <a href="mailto:hello@aronic.com.bd" className="text-indigo hover:underline">
                                hello@aronic.com.bd
                            </a>{' '}
                            with your order number and reason for return. We'll guide you through the pickup
                            or drop-off process.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl text-ink mb-3">Refunds</h2>
                        <p>
                            For Cash on Delivery orders, refunds are issued via bKash/Nagad after the returned
                            item is received and inspected. For online payments, refunds are credited back to
                            the original payment method within 5–7 business days. Sale items are eligible for
                            exchange only, not refund.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl text-ink mb-3">Non-Returnable Items</h2>
                        <p>
                            Innerwear, and any item marked "Final Sale" cannot be returned or exchanged for
                            hygiene and clearance reasons.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl text-ink mb-3">Damaged or Wrong Items</h2>
                        <p>
                            If you receive a damaged, defective, or incorrect item, contact us within 48 hours
                            of delivery with photos of the product — we'll arrange a free replacement or full
                            refund.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
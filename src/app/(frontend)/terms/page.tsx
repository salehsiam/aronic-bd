export const metadata = {
    title: 'Terms & Conditions',
    description: 'Terms and conditions for shopping at Aronic.',
}

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-cotton">
            <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
                <p className="font-mono text-xs uppercase tracking-widest text-rust mb-2">Legal</p>
                <h1 className="font-display text-4xl text-ink mb-10">Terms & Conditions</h1>

                <div className="space-y-8 font-body text-sm text-ink/70 leading-relaxed">
                    <section>
                        <h2 className="font-display text-xl text-ink mb-3">1. General</h2>
                        <p>
                            These Terms & Conditions govern your use of the Aronic website and any purchase
                            made through it. By placing an order, you agree to the terms outlined below.
                            Aronic reserves the right to update these terms at any time without prior notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl text-ink mb-3">2. Orders & Payment</h2>
                        <p>
                            Orders can be placed through our website and paid for via bKash, Nagad, card
                            payment (through SSLCommerz), or Cash on Delivery (COD). All prices are listed in
                            Bangladeshi Taka (BDT) and are inclusive of applicable taxes unless stated
                            otherwise.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl text-ink mb-3">3. Order Confirmation</h2>
                        <p>
                            An order is confirmed once payment is received (for online payments) or once we
                            contact you to confirm a Cash on Delivery order. Aronic reserves the right to
                            cancel any order due to stock unavailability, pricing errors, or suspected
                            fraudulent activity.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl text-ink mb-3">4. Delivery</h2>
                        <p>
                            We currently deliver across Bangladesh. Estimated delivery time is 1–2 business
                            days within Dhaka and 3–5 business days outside Dhaka. Delivery timelines may vary
                            due to courier delays, weather, or other circumstances beyond our control.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl text-ink mb-3">5. Product Accuracy</h2>
                        <p>
                            We make every effort to display product colors and details as accurately as
                            possible. However, slight variations may occur due to lighting, photography, or
                            screen display settings.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl text-ink mb-3">6. Intellectual Property</h2>
                        <p>
                            All content on this website — including images, logos, and text — is the property
                            of Aronic and may not be reproduced or used without written permission.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl text-ink mb-3">7. Contact</h2>
                        <p>
                            For questions about these terms, reach out to us at{' '}
                            <a href="mailto:hello@aronic.com.bd" className="text-indigo hover:underline">
                                hello@aronic.com.bd
                            </a>{' '}
                            or via WhatsApp at +880 1XXX-XXXXXX.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
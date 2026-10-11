export const metadata = {
    title: 'Privacy Policy',
    description: 'How Aronic collects, uses, and protects your information.',
}

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-cotton">
            <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
                <p className="font-mono text-xs uppercase tracking-widest text-rust mb-2">Legal</p>
                <h1 className="font-display text-4xl text-ink mb-10">Privacy Policy</h1>

                <div className="space-y-8 font-body text-sm text-ink/70 leading-relaxed">
                    <section>
                        <h2 className="font-display text-xl text-ink mb-3">1. Information We Collect</h2>
                        <p>
                            When you place an order or create an account, we collect your name, phone number,
                            email address, and shipping address. This information is used solely to process
                            and deliver your orders.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl text-ink mb-3">2. How We Use Your Information</h2>
                        <p>
                            Your information is used to process orders, communicate order updates, respond to
                            customer service requests, and — if you've subscribed — send occasional updates
                            about new arrivals and offers. We also use anonymous usage data and advertising
                            tools (see Cookies below) to measure and improve our marketing. We do not sell or
                            rent your personal information to third parties.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl text-ink mb-3">3. Payment Information</h2>
                        <p>
                            Online payments are processed securely through SSLCommerz. Aronic does not store
                            your card, bKash, or Nagad credentials on our servers.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl text-ink mb-3">4. Cookies, Analytics & Advertising</h2>
                        <p>
                            We use cookies and browser storage to keep your cart and wishlist saved between
                            visits. We also use third-party tools to understand how visitors use our site and to
                            show relevant ads:
                        </p>
                        <ul className="list-disc pl-5 mt-3 space-y-2">
                            <li>
                                <strong className="text-ink">Google Analytics</strong> collects anonymous usage data,
                                such as pages visited and time spent on the site, to help us improve the website.
                            </li>
                            <li>
                                <strong className="text-ink">Meta Pixel</strong> (Facebook and Instagram) records
                                actions like viewing a product, adding to cart, and completing a purchase. We use this
                                to measure our ads and to show our ads to people who may be interested in Aronic.
                            </li>
                        </ul>
                        <p className="mt-3">
                            These tools may set cookies on your device and share usage data with Google and Meta.
                            You can opt out of personalised ads through your Facebook ad settings, or disable
                            cookies in your browser settings, though this may affect site functionality.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl text-ink mb-3">5. Data Security</h2>
                        <p>
                            We take reasonable technical measures to protect your personal information from
                            unauthorized access, alteration, or disclosure.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl text-ink mb-3">6. Your Rights</h2>
                        <p>
                            You may request access to, correction of, or deletion of your personal data at any
                            time by contacting us.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl text-ink mb-3">7. Contact</h2>
                        <p>
                            For privacy-related questions, contact us at{' '}
                            <a href="mailto:hello@aronic.com.bd" className="text-indigo hover:underline">
                                hello@aronic.com.bd
                            </a>
                            .
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
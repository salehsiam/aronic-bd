'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, MessageCircle } from 'lucide-react'

export function StayWithUs() {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email.trim()) return

        setError('')
        setIsSubmitting(true)

        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || 'Something went wrong.')
                return
            }

            setSubmitted(true)
            setEmail('')
            setTimeout(() => setSubmitted(false), 3000)
        } catch {
            setError('Something went wrong. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="bg-indigo py-16 md:py-20">
            <div className="max-w-3xl mx-auto px-6 text-center">
                <p className="font-mono text-xs uppercase tracking-widest text-rust mb-3">
                    Join the Community
                </p>
                <h2 className="font-display text-3xl md:text-5xl text-cotton mb-4">
                    Stay With Us
                </h2>
                <p className="font-body text-sm md:text-base text-cotton/60 mb-10 max-w-md mx-auto">
                    Be the first to know about new arrivals, exclusive discounts, and behind-the-scenes
                    updates from Aronic.
                </p>

                {/* Newsletter form */}
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-10">
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        className="flex-1 bg-transparent border border-cotton/25 px-4 py-3 text-sm font-body text-cotton placeholder:text-cotton/40 outline-none focus:border-cotton transition-colors"
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2 bg-cotton text-ink px-6 py-3 text-sm font-body hover:bg-rust hover:text-cotton transition-colors shrink-0 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Subscribing...' : submitted ? 'Subscribed!' : 'Subscribe'}
                        {!submitted && !isSubmitting && <Send className="w-3.5 h-3.5" />}
                    </button>
                </form>

                {submitted && (
                    <motion.p
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-body text-xs text-cotton/50 -mt-6 mb-8"
                    >
                        Thanks for joining — check your inbox for a welcome note.
                    </motion.p>
                )}

                {/* Divider */}
                <div className="flex items-center gap-4 max-w-xs mx-auto mb-8">
                    <div className="flex-1 h-px bg-cotton/15" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-cotton/40">
                        Follow Us
                    </span>
                    <div className="flex-1 h-px bg-cotton/15" />
                </div>

                {/* Social links */}
                <div className="flex items-center justify-center gap-4">
                    <a
                        href="https://facebook.com/aronicbd"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-full border border-cotton/25 flex items-center justify-center text-cotton/70 hover:text-cotton hover:border-cotton transition-colors"
                        aria-label="Facebook"
                    >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15h-2.4v-3H10V9.5C10 7.29 11.79 5.5 14 5.5h2.5v3H15c-.55 0-1 .45-1 1V12h2.5l-.4 3H14v6.95c5.05-.5 9-4.76 9-9.95z" />
                        </svg>
                    </a>
                    <a
                        href="https://instagram.com/aronicbd"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-full border border-cotton/25 flex items-center justify-center text-cotton/70 hover:text-cotton hover:border-cotton transition-colors"
                        aria-label="Instagram"
                    >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.02-3.58.07-4.85c.15-3.23 1.67-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07c-4.35.2-6.78 2.62-6.98 6.98C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm6.41-10.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z" />
                        </svg>
                    </a>
                    <a
                        href="https://wa.me/8801XXXXXXXXX"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-full border border-cotton/25 flex items-center justify-center text-cotton/70 hover:text-cotton hover:border-cotton transition-colors"
                        aria-label="WhatsApp"
                    >
                        <MessageCircle className="w-4 h-4" />
                    </a>
                </div >
            </div >
        </section >
    )
}
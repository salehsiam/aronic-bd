'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail } from 'lucide-react'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const res = await fetch('/api/customers/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.errors?.[0]?.message || 'Something went wrong.')
            }

            setSubmitted(true)
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    if (submitted) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-cotton px-6">
                <div className="w-full max-w-sm text-center">
                    <div className="w-14 h-14 mx-auto mb-6 border border-ink/20 rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6 text-ink/50" />
                    </div>
                    <h1 className="font-display text-2xl text-ink mb-3">Check your email</h1>
                    <p className="font-body text-sm text-ink/50 mb-8">
                        If an account exists for <span className="text-ink">{email}</span>, we've sent a
                        password reset link to it.
                    </p>
                    <Link href="/account/login" className="text-sm font-body text-indigo hover:underline">
                        Back to Sign In
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-cotton px-6">
            <div className="w-full max-w-sm">
                <p className="font-mono text-xs uppercase tracking-widest text-rust mb-2 text-center">
                    Reset Password
                </p>
                <h1 className="font-display text-3xl text-ink mb-3 text-center">Forgot Password?</h1>
                <p className="font-body text-sm text-ink/50 mb-8 text-center">
                    Enter your email and we'll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full border border-ink/20 px-4 py-3 text-sm font-body bg-cotton outline-none focus:border-indigo transition-colors"
                        required
                    />

                    {error && (
                        <p className="text-sm font-body text-red-600 bg-red-50 border border-red-200 px-4 py-2.5">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-ink text-cotton py-3.5 text-sm font-body hover:bg-indigo transition-colors disabled:opacity-50"
                    >
                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>

                <p className="text-center text-sm font-body text-ink/60 mt-6">
                    Remember your password?{' '}
                    <Link href="/account/login" className="text-indigo hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    )
}
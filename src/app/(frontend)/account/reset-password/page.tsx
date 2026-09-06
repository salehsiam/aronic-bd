'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

function ResetPasswordForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    if (!token) {
        return (
            <div className="text-center">
                <p className="font-body text-sm text-ink/60 mb-6">
                    This password reset link is invalid or has expired.
                </p>
                <Link href="/account/forgot-password" className="text-sm font-body text-indigo hover:underline">
                    Request a new link
                </Link>
            </div>
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (password !== confirmPassword) {
            setError('Passwords do not match.')
            return
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters.')
            return
        }

        setIsLoading(true)

        try {
            const res = await fetch('/api/customers/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.errors?.[0]?.message || 'Reset link may have expired.')
            }

            router.push('/account')
            router.refresh()
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <p className="font-mono text-xs uppercase tracking-widest text-rust mb-2 text-center">
                Reset Password
            </p>
            <h1 className="font-display text-3xl text-ink mb-8 text-center">Set New Password</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New password"
                    className="w-full border border-ink/20 px-4 py-3 text-sm font-body bg-cotton outline-none focus:border-indigo transition-colors"
                    required
                    minLength={8}
                />
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full border border-ink/20 px-4 py-3 text-sm font-body bg-cotton outline-none focus:border-indigo transition-colors"
                    required
                    minLength={8}
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
                    {isLoading ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
        </>
    )
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-cotton px-6">
            <div className="w-full max-w-sm">
                <Suspense fallback={<div className="text-center text-sm text-ink/50">Loading...</div>}>
                    <ResetPasswordForm />
                </Suspense>
            </div>
        </div>
    )
}
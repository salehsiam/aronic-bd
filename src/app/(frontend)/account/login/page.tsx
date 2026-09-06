'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { loginCustomer } from '@/lib/customerAuth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await loginCustomer(email, password)
      router.push('/account')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Login failed. Check your email and password.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-cotton px-6">
      <div className="w-full max-w-sm">
        <p className="font-mono text-xs uppercase tracking-widest text-rust mb-2 text-center">
          Welcome Back
        </p>
        <h1 className="font-display text-3xl text-ink mb-8 text-center">Sign In</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border border-ink/20 px-4 py-3 text-sm font-body bg-cotton outline-none focus:border-indigo transition-colors"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border border-ink/20 px-4 py-3 text-sm font-body bg-cotton outline-none focus:border-indigo transition-colors"
            required
          />

          <div className="text-right">
            <Link href="/account/forgot-password" className="text-xs font-body text-ink/50 hover:text-ink transition-colors">
              Forgot password?
            </Link>
          </div>

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
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm font-body text-ink/60 mt-6">
          Don't have an account?{' '}
          <Link href="/account/register" className="text-indigo hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
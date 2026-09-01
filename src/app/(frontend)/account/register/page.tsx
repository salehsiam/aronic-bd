'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { registerCustomer } from '@/lib/customerAuth'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await registerCustomer(form.name, form.email, form.phone, form.password)
      router.push('/account')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Registration failed.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-cotton px-6 py-16">
      <div className="w-full max-w-sm">
        <p className="font-mono text-xs uppercase tracking-widest text-rust mb-2 text-center">
          Join Aronic
        </p>
        <h1 className="font-display text-3xl text-ink mb-8 text-center">Create Account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border border-ink/20 px-4 py-3 text-sm font-body bg-cotton outline-none focus:border-indigo transition-colors"
            required
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border border-ink/20 px-4 py-3 text-sm font-body bg-cotton outline-none focus:border-indigo transition-colors"
            required
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border border-ink/20 px-4 py-3 text-sm font-body bg-cotton outline-none focus:border-indigo transition-colors"
            required
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
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
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm font-body text-ink/60 mt-6">
          Already have an account?{' '}
          <Link href="/account/login" className="text-indigo hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
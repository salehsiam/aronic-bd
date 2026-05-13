'use client'

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong.')
        return
      }

      setSubmitted(true)
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="font-display text-xl text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-500 text-sm mb-1">Thank you for contacting us.</p>
        <p className="text-gray-400 text-xs mb-6">We will get back to you within 24 hours.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-green-600 font-semibold text-sm hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your full name"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
            Phone Number
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="01XXXXXXXXX"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
          Email Address
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="your@email.com"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
          Subject *
        </label>
        <select
          required
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
        >
          <option value="">Select a subject</option>
          <option>General Inquiry</option>
          <option>Academic Query</option>
          <option>Medico-Legal Matter</option>
          <option>Appointment Related</option>
          <option>Research Collaboration</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
          Message *
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Write your message here..."
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-500 disabled:bg-green-300 text-white font-bold text-sm py-3 rounded-lg transition-all flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  )
}

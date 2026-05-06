'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-4" />
        <h3 className="font-display text-xl text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-500 text-sm">We will get back to you within 24 hours.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-green-600 font-semibold text-sm hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Your full name"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"
        />
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="01XXXXXXXXX"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"
        />
      </div>

      <input
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="your@email.com"
        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"
      />

      <select
        required
        value={form.subject}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"
      >
        <option value="">Select a subject</option>
        <option>General Inquiry</option>
        <option>Academic Query</option>
        <option>Medico-Legal Matter</option>
        <option>Appointment Related</option>
        <option>Research Collaboration</option>
        <option>Other</option>
      </select>

      <textarea
        required
        rows={5}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        placeholder="Write your message here..."
        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm resize-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-500 text-white font-bold text-sm py-3 rounded-lg"
      >
        {loading ? 'Sending...' : 'Send Message →'}
      </button>
    </form>
  )
}

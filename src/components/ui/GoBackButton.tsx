'use client'

import { ArrowLeft } from 'lucide-react'

export default function GoBackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-bold text-sm px-6 py-3 rounded-lg border border-gray-200 transition-all"
    >
      <ArrowLeft className="w-4 h-4" />
      Go Back
    </button>
  )
}

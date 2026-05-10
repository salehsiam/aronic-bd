'use client'

import { Printer } from 'lucide-react'

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-all"
    >
      <Printer className="w-4 h-4" />
      Print Notice
    </button>
  )
}

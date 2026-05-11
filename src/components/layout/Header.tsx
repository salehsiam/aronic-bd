'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import logo from './../../../public/logo.png'
import { Phone } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Study Materials', href: '/study-materials' },
  { label: 'Faculty', href: '/faculty' },
  { label: 'Notices', href: '/notices' },
  { label: 'Research', href: '/research' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* ── TOP BAR ── */}
      <div className="bg-green-900 py-3">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center gap-3 md:gap-5">
          {/* Logo */}
          <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center text-lg md:text-2xl flex-shrink-0 ring-2 ring-yellow-400/40">
            <Image src={logo} alt="Logo" width={56} height={56} />
          </div>

          {/* Title */}
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-white text-sm md:text-lg leading-tight truncate">
              Department of Forensic Medicine & Toxicology
            </h1>
            <p className="font-bn text-green-300 text-xs mt-0.5 hidden sm:block truncate">
              ফরেনসিক মেডিসিন ও টক্সিকোলজি বিভাগ — ময়মনসিংহ মেডিক্যাল কলেজ
            </p>
          </div>

          {/* Appointment button — desktop */}
          <Link
            href="/contact"
            className="hidden md:block bg-yellow-500 hover:bg-yellow-400 text-green-900 text-sm font-bold px-5 py-2 rounded transition-colors flex-shrink-0"
          >
            <p className="flex items-center gap-1">
              <Phone className="w-4 h-4" /> Contact Us
            </p>
          </Link>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex-shrink-0 text-white p-2 rounded hover:bg-green-800 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── DESKTOP NAV ── */}
      <div className="hidden md:block bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 flex gap-1 h-11 items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium px-4 py-1.5 rounded transition-all ${
                  isActive
                    ? 'bg-green-50 text-green-600 font-semibold'
                    : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm font-medium px-4 py-2.5 rounded transition-all ${
                    isActive
                      ? 'bg-green-50 text-green-600 font-semibold'
                      : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            {/* Appointment button mobile */}
            {/* <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 bg-yellow-500 hover:bg-yellow-400 text-green-900 text-sm font-bold px-4 py-2.5 rounded text-center transition-colors"
            >
              Contact Us
            </Link> */}
          </div>
        </div>
      )}
    </header>
  )
}

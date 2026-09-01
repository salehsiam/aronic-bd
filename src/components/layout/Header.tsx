'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Heart, ShoppingBag, User, Search, Phone, Menu, X } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { getCurrentCustomer } from '@/lib/customerAuth'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'New Arrivals', href: '/new-arrivals' },
  { label: 'Featured', href: '/featured' },
  { label: 'About', href: '/about' },
]

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [customer, setCustomer] = useState<any>(null)

  const cartCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  )
  const wishlistCount = useWishlistStore((state) => state.items.length)

  useEffect(() => {
    getCurrentCustomer().then(setCustomer)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-cotton">
      {/* ── TOP ROW: Logo + Search + Actions ── */}
      <div className="border-b border-line">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center gap-4 md:gap-8">
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-ink shrink-0"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link href="/" className="shrink-0">
            <span className="font-display text-2xl md:text-3xl text-ink tracking-tight">
              Aronic
            </span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-xl">
            <form onSubmit={handleSearch} className="flex w-full border border-ink/20">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-4 py-2 text-sm font-body bg-cotton outline-none placeholder:text-ink/40"
              />
              <button
                type="submit"
                aria-label="Search"
                className="px-4 bg-indigo text-cotton flex items-center justify-center hover:bg-indigo/90 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-4 md:gap-6 ml-auto md:ml-0">
            <Link
              href="/wishlist"
              className="hidden sm:flex items-center gap-1.5 text-sm font-body text-ink/70 hover:text-ink transition-colors relative"
            >
              <Heart className="w-[18px] h-[18px]" />
              <span className="hidden lg:inline">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rust text-cotton text-[10px] font-mono w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="flex items-center gap-1.5 text-sm font-body text-ink/70 hover:text-ink transition-colors relative"
            >
              <ShoppingBag className="w-[18px] h-[18px]" />
              <span className="hidden lg:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 lg:static lg:ml-1 bg-rust text-cotton text-[10px] font-mono w-4 h-4 lg:w-auto lg:h-auto lg:px-1.5 lg:py-0.5 rounded-full lg:rounded flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href={customer ? '/account' : '/account/login'}
              className="hidden sm:flex items-center gap-1.5 border border-ink px-4 py-2 text-sm font-body text-ink hover:bg-ink hover:text-cotton transition-colors"
            >
              <User className="w-4 h-4" />
              {customer ? customer.name.split(' ')[0] : 'Sign In'}
            </Link>
          </div>
        </div>

        <div className="md:hidden px-4 pb-4">
          <form onSubmit={handleSearch} className="flex w-full border border-ink/20">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-4 py-2 text-sm font-body bg-cotton outline-none placeholder:text-ink/40"
            />
            <button type="submit" aria-label="Search" className="px-4 bg-indigo text-cotton flex items-center justify-center">
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* ── NAV BAR (desktop) ── */}
      <div className="hidden md:block bg-indigo">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-11">
          <div className="flex gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-body px-4 py-1.5 transition-colors ${isActive
                    ? 'text-cotton font-medium border-b-2 border-cotton'
                    : 'text-cotton/70 hover:text-cotton'
                    }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          <a
            href="https://wa.me/8801XXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-cotton/90 hover:text-cotton text-sm font-mono transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            +880 1XXX-XXXXXX
          </a>
        </div>
      </div>

      {/* MOBILE MENU DRAWER (from left) */}
      <AnimatePresence>
        {menuOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="absolute left-0 top-0 bottom-0 w-[80%] max-w-xs bg-cotton shadow-2xl overflow-y-auto"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-line">
                <span className="font-display text-2xl text-ink">Aronic</span>
                <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="text-ink/60 hover:text-ink">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col py-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`text-sm font-body px-6 py-3.5 border-b border-line ${isActive ? 'text-indigo font-medium' : 'text-ink/70'
                        }`}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>

              <div className="px-6 py-6 space-y-3">
                <Link
                  href={customer ? '/account' : '/account/login'}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 border border-ink text-ink text-sm font-body px-4 py-3 w-full"
                >
                  <User className="w-4 h-4" />
                  {customer ? customer.name.split(' ')[0] : 'Sign In'}
                </Link>

                <Link
                  href="/wishlist"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 border border-ink/20 text-ink/70 text-sm font-body px-4 py-3 w-full"
                >
                  <Heart className="w-4 h-4" />
                  Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                </Link>

                <a
                  href="https://wa.me/8801XXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-ink/60 text-sm font-mono py-3"
                >
                  <Phone className="w-3.5 h-3.5" />
                  +880 1XXX-XXXXXX
                </a>
              </div>
            </motion.div>
          </div>
        )
        }
      </AnimatePresence >
    </header >
  )
}
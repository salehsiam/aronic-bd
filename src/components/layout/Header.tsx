'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Heart, ShoppingBag, User, Search, Phone, Menu, X } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { getCurrentCustomer } from '@/lib/customerAuth'
import { SearchOverlay } from '../ui/SearchOverlay'




const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'New Arrivals', href: '/new-arrivals' },
  { label: 'Featured', href: '/featured' },
  { label: 'About', href: '/about' },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [customer, setCustomer] = useState<any>(null)
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = lastScrollY.current
    const diff = latest - previous

    if (latest < 80) {
      // Page er top er kachakachi thakle sob shomoy show thakbe
      setHidden(false)
    } else if (diff > 4) {
      // Neeche scroll korle hide
      setHidden(true)
    } else if (diff < -4) {
      // Upore scroll korle show
      setHidden(false)
    }

    lastScrollY.current = latest
  })

  const cartCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  )
  const wishlistCount = useWishlistStore((state) => state.items.length)

  useEffect(() => {
    getCurrentCustomer().then(setCustomer)
  }, [])

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-50 bg-cotton border-b border-line"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center gap-4 md:gap-10">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-ink shrink-0"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo — centered on mobile, left on desktop */}
          <Link
            href="/"
            className="shrink-0 md:mr-0 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
          >
            <span className="font-display text-xl md:text-3xl text-ink tracking-tight">
              Aronic
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 flex-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href} className="relative group py-2">
                  <span
                    className={`text-sm font-body transition-colors ${isActive ? 'text-ink' : 'text-ink/60 group-hover:text-ink'
                      }`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`absolute left-0 -bottom-0.5 h-[1.5px] bg-indigo transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                  />
                </Link>
              )
            })}
          </nav>


          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-5 ml-auto">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setSearchOpen(true)}
              className="text-ink/70 hover:text-ink transition-colors"
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px]" />
            </motion.button>

            <Link
              href={customer ? '/account' : '/account/login'}
              className="text-ink/70 hover:text-ink transition-colors"
              aria-label="Account"
            >
              <User className="w-[18px] h-[18px]" />
            </Link>

            <Link
              href="/wishlist"
              className="hidden sm:flex items-center text-ink/70 hover:text-ink transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-[18px] h-[18px]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rust text-cotton text-[10px] font-mono w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <motion.div whileTap={{ scale: 0.85 }}>
              <Link
                href="/cart"
                className="flex items-center text-ink/70 hover:text-ink transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingBag className="w-[18px] h-[18px]" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rust text-cotton text-[10px] font-mono w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Search overlay */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />


      {/* Mobile menu drawer */}
      <AnimatePresence>
        {menuOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260, delay: 0.05 }}
              className="absolute left-0 top-0 bottom-0 w-[82%] max-w-xs bg-cotton shadow-2xl overflow-y-auto"
            >
              <div className="flex items-center justify-between px-6 py-6 border-b border-line">
                <span className="font-display text-2xl text-ink">Aronic</span>
                <motion.button
                  whileTap={{ scale: 0.85, rotate: 90 }}
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="text-ink/60 hover:text-ink"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="flex flex-col py-2">
                {navItems.map((item, idx) => {
                  const isActive = pathname === item.href
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + idx * 0.05, duration: 0.35, ease: 'easeOut' }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="relative block"
                      >
                        <motion.div
                          whileTap={{ backgroundColor: 'rgba(42, 59, 99, 0.08)' }}
                          className={`text-sm font-body px-6 py-3.5 border-b border-line transition-colors ${isActive ? 'text-indigo font-medium bg-indigo/5' : 'text-ink/70'
                            }`}
                        >
                          {item.label}
                        </motion.div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + navItems.length * 0.05 + 0.05, duration: 0.35 }}
                className="px-6 py-6 space-y-3"
              >
                <motion.div whileTap={{ scale: 0.97 }}>
                  <Link
                    href={customer ? '/account' : '/account/login'}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 border border-ink text-ink text-sm font-body px-4 py-3 w-full"
                  >
                    <User className="w-4 h-4" />
                    {customer ? customer.name.split(' ')[0] : 'Sign In'}
                  </Link>
                </motion.div>

                <motion.div whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/wishlist"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 border border-ink/20 text-ink/70 text-sm font-body px-4 py-3 w-full"
                  >
                    <Heart className="w-4 h-4" />
                    Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                  </Link>
                </motion.div>

                <a
                  href="https://wa.me/8801XXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-ink/60 text-sm font-mono py-3"
                >
                  <Phone className="w-3.5 h-3.5" />
                  +880 1XXX-XXXXXX
                </a>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
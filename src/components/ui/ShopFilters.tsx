'use client'

import { useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { SlidersHorizontal, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const SIZES = ['S', 'M', 'L', 'XL', 'XXL']

export function ShopFilters({ categories }: { categories: any[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [mobileOpen, setMobileOpen] = useState(false)

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  const activeCategory = searchParams.get('category')
  const activeSize = searchParams.get('size')
  const activeSort = searchParams.get('sort')
  const activeFilterCount = [activeCategory, activeSize].filter(Boolean).length

  const filterContent = (
    <>
      <div>
        <h3 className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-3 pb-2 border-b border-line">
          Category
        </h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => updateFilter('category', null)}
              className={`text-sm font-body ${!activeCategory ? 'text-indigo font-medium' : 'text-ink/70 hover:text-ink'}`}
            >
              All
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => updateFilter('category', cat.slug)}
                className={`text-sm font-body ${activeCategory === cat.slug ? 'text-indigo font-medium' : 'text-ink/70 hover:text-ink'}`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-3 pb-2 border-b border-line">
          Size
        </h3>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => updateFilter('size', activeSize === s ? null : s)}
              className={`w-9 h-9 text-xs font-mono border ${activeSize === s
                ? 'bg-indigo text-cotton border-indigo'
                : 'border-line text-ink/70 hover:border-ink'
                }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-3 pb-2 border-b border-line">
          Sort
        </h3>
        <select
          value={activeSort || 'newest'}
          onChange={(e) => updateFilter('sort', e.target.value)}
          className="w-full text-sm font-body border border-line px-2 py-1.5 bg-cotton"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden flex items-center gap-2 border border-ink/20 px-4 py-2.5 text-sm font-body text-ink mb-6 w-full justify-center"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters
        {activeFilterCount > 0 && (
          <span className="bg-indigo text-cotton text-[10px] font-mono w-4 h-4 rounded-full flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Desktop sidebar — always visible */}
      <aside className="hidden md:block w-56 shrink-0 space-y-8">{filterContent}</aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-cotton shadow-2xl overflow-y-auto"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-line">
                <h2 className="font-display text-lg text-ink">Filters</h2>
                <button onClick={() => setMobileOpen(false)} aria-label="Close filters" className="text-ink/60 hover:text-ink">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-6 py-6 space-y-8">{filterContent}</div>

              <div className="px-6 pb-6">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-full bg-ink text-cotton py-3 text-sm font-body"
                >
                  Show Results
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
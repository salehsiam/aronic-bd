'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bookmark, Plus, Check } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'

export function ProductCard({ product }: { product: any }) {
  const [showSizes, setShowSizes] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const addItem = useCartStore((state) => state.addItem)
  const { toggleItem, isWishlisted } = useWishlistStore()
  const wishlisted = isWishlisted(product.id)

  const image = product.images?.[0]?.url
  const allSizes = product.sizes || []
  const inStock = allSizes.some((s: any) => s.stock > 0)

  const discountPercent = product.salePrice
    ? Math.round((1 - product.salePrice / product.price) * 100)
    : 0

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: image || '',
      price: product.price,
      salePrice: product.salePrice,
    })
  }

  const handleOpenSizes = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!inStock) return
    setShowSizes(true)
  }

  const handleSizeSelect = (e: React.MouseEvent, size: string, stock: number) => {
    e.preventDefault()
    e.stopPropagation()
    if (stock === 0) return

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: image || '',
      price: product.salePrice || product.price,
      size,
    })

    setShowSizes(false)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  return (
    <div className="group">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-line">
          {image && (
            <Image
              src={image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          )}

          {discountPercent > 0 && (
            <span className="absolute top-3 left-3 bg-rust text-cotton text-[11px] font-mono px-2 py-1">
              {discountPercent}% OFF
            </span>
          )}
          {!inStock && (
            <span className="absolute top-3 left-3 bg-ink text-cotton text-[11px] font-mono px-2 py-1 uppercase tracking-wide">
              Out of Stock
            </span>
          )}
        </div>
      </Link>

      {/* Add to Cart bar — always visible below image */}
      <div className="border-b border-ink/15 relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {justAdded ? (
            <motion.div
              key="added"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full py-3 flex items-center justify-center gap-2 text-sm font-body text-indigo"
            >
              <Check className="w-4 h-4" /> Added
            </motion.div>
          ) : showSizes ? (
            <motion.div
              key="sizes"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-full py-2 flex flex-wrap items-center justify-center gap-1.5"
              onMouseLeave={() => setShowSizes(false)}
            >
              {allSizes.map((s: any) => {
                const outOfStock = s.stock === 0
                return (
                  <button
                    key={s.size}
                    onClick={(e) => handleSizeSelect(e, s.size, s.stock)}
                    disabled={outOfStock}
                    className={`w-7 h-7 text-[11px] font-mono border transition-colors ${outOfStock
                      ? 'border-ink/10 text-ink/25 cursor-not-allowed'
                      : 'border-ink/25 text-ink hover:bg-ink hover:text-cotton'
                      }`}
                  >
                    {s.size}
                  </button>
                )
              })}
            </motion.div>
          ) : (
            <motion.button
              key="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={handleOpenSizes}
              disabled={!inStock}
              className={`w-full py-3 flex items-center justify-center gap-1.5 text-sm font-body transition-colors ${inStock ? 'text-ink hover:text-indigo' : 'text-ink/30 cursor-not-allowed'
                }`}
            >
              {inStock ? 'Add to Cart' : 'Out of Stock'}
              {inStock && <Plus className="w-3.5 h-3.5" />}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Name + wishlist */}
      <Link href={`/product/${product.slug}`} className="block">
        <div className="flex items-start justify-between gap-2 pt-3">
          <h3 className="font-display text-sm text-ink leading-snug line-clamp-1 flex-1">
            {product.name}
          </h3>
          <button
            onClick={handleWishlistToggle}
            className="shrink-0 text-ink/50 hover:text-ink transition-colors"
            aria-label="Wishlist"
          >
            <Bookmark
              className={`w-4 h-4 transition-colors ${wishlisted ? 'fill-ink text-ink' : ''}`}
            />
          </button>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          <span className="font-mono text-sm font-semibold text-rust">
            ৳{product.salePrice || product.price}
          </span>
          {product.salePrice && (
            <span className="font-mono text-xs text-ink/35 line-through">৳{product.price}</span>
          )}
        </div>
      </Link>
    </div>
  )
}
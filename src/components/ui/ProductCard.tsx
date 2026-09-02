'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingBag, Check } from 'lucide-react'
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
      color: product.colors?.[0]?.colorName,
    })

    setShowSizes(false)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-line">
        {image && (
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        )}

        {product.salePrice && (
          <span className="absolute top-3 left-3 bg-rust text-cotton text-[11px] font-mono px-2 py-1 uppercase tracking-wide">
            Sale
          </span>
        )}
        {!inStock && (
          <span className="absolute top-3 left-3 bg-ink text-cotton text-[11px] font-mono px-2 py-1 uppercase tracking-wide">
            Out of Stock
          </span>
        )}

        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 w-8 h-8 bg-cotton/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${wishlisted ? 'fill-rust text-rust' : 'text-ink'}`}
          />
        </button>

        {/* Bottom panel — swaps between Quick Add button and Size selector */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <AnimatePresence mode="wait" initial={false}>
            {justAdded ? (
              <motion.div
                key="added"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full py-3 bg-indigo text-cotton flex items-center justify-center gap-2 text-sm font-body"
              >
                <Check className="w-4 h-4" /> Added to Cart
              </motion.div>
            ) : showSizes ? (
              <motion.div
                key="sizes"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="w-full bg-ink px-2 py-2.5 flex flex-wrap items-center justify-center gap-1.5"
                onMouseLeave={() => setShowSizes(false)}
              >
                {allSizes.map((s: any) => {
                  const outOfStock = s.stock === 0
                  return (
                    <button
                      key={s.size}
                      onClick={(e) => handleSizeSelect(e, s.size, s.stock)}
                      disabled={outOfStock}
                      className={`w-8 h-8 text-xs font-mono border transition-colors ${outOfStock
                          ? 'border-cotton/15 text-cotton/25 cursor-not-allowed'
                          : 'border-cotton/40 text-cotton hover:bg-cotton hover:text-ink'
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
                transition={{ duration: 0.2 }}
                onClick={handleOpenSizes}
                disabled={!inStock}
                className={`w-full py-3 flex items-center justify-center gap-2 text-sm font-body transition-colors ${inStock
                    ? 'bg-ink text-cotton hover:bg-indigo'
                    : 'bg-ink/40 text-cotton/60 cursor-not-allowed'
                  }`}
              >
                <ShoppingBag className="w-4 h-4" />
                {inStock ? 'Select Size' : 'Out of Stock'}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="pt-4 pb-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-base text-ink leading-snug">{product.name}</h3>
            <p className="font-body text-xs text-ink/45 uppercase tracking-wide mt-1">
              {product.category?.name}
            </p>
          </div>

          <div className="text-right shrink-0">
            <p className="font-mono text-sm text-indigo">
              ৳{product.salePrice || product.price}
            </p>
            {product.salePrice && (
              <p className="font-mono text-xs text-ink/35 line-through">৳{product.price}</p>
            )}
          </div>
        </div>

        {product.colors?.length > 0 && (
          <div className="flex gap-1.5 mt-2.5">
            {product.colors.slice(0, 5).map((c: any, idx: number) => (
              <span
                key={idx}
                className="w-4 h-4 rounded-full border border-ink/15"
                style={{ backgroundColor: c.colorCode || '#ccc' }}
                title={c.colorName}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
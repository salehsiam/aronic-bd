'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Heart, ShoppingBag, Check } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { motion } from 'framer-motion'
export function ProductCard({ product }: { product: any }) {

  const [justAdded, setJustAdded] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const image = product.images?.[0]?.url
  const inStockSizes = product.sizes?.filter((s: any) => s.stock > 0) || []
  const inStock = inStockSizes.length > 0
  const { toggleItem, isWishlisted } = useWishlistStore()
  const wishlisted = isWishlisted(product.id)

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images?.[0]?.url || '',
      price: product.price,
      salePrice: product.salePrice,
    })
  }

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!inStock) return

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: image || '',
      price: product.salePrice || product.price,
      size: inStockSizes[0].size,
      color: product.colors?.[0]?.colorName,
    })

    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
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

          {/* Sale / Stock badge */}
          {product.salePrice && (
            <span className="absolute top-3 left-3 bg-rust text-cotton text-[11px] font-mono px-2 py-1 uppercase tracking-wide">
              Sale
            </span>
          )}
          {!inStock && (
            <span className="absolute top-3 left-3 bg-ink text-cotton text-[11px] font-mono px-2 py-1 uppercase tracking-wide">
              Stock Nei
            </span>
          )}

          {/* Wishlist */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 w-8 h-8 bg-cotton/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Wishlist"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${wishlisted ? 'fill-rust text-rust' : 'text-ink'}`}
            />
          </button>

          {/* Quick Add — hover panel */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <button
              onClick={handleQuickAdd}
              disabled={!inStock}
              className={`w-full py-3 flex items-center justify-center gap-2 text-sm font-body transition-colors ${justAdded
                ? 'bg-indigo text-cotton'
                : inStock
                  ? 'bg-ink text-cotton hover:bg-indigo'
                  : 'bg-ink/40 text-cotton/60 cursor-not-allowed'
                }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />Added in Cart
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  {inStock ? 'Add to Cart' : 'Out of Stock'}
                </>
              )}
            </button>
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

          {/* Color swatches */}
          {/* {product.colors?.length > 0 && (
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
        )} */}
        </div>
      </Link>
    </motion.div>
  )
}
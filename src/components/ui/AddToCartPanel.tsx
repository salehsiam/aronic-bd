'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Heart, Minus, Plus, Check } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'

export function AddToCartPanel({ product }: { product: any }) {
  const router = useRouter()
  const addItem = useCartStore((state) => state.addItem)

  const availableSizes = product.sizes || []
  const inStockSizes = availableSizes.filter((s: any) => s.stock > 0)

  const [selectedSize, setSelectedSize] = useState<string | null>(
    inStockSizes[0]?.size || null,
  )
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors?.[0]?.colorName || null,
  )
  const [quantity, setQuantity] = useState(1)

  const [justAdded, setJustAdded] = useState(false)
  const [error, setError] = useState('')
  const { toggleItem, isWishlisted } = useWishlistStore()
  const wishlisted = isWishlisted(product.id)

  const selectedSizeStock =
    availableSizes.find((s: any) => s.size === selectedSize)?.stock || 0

  const image = product.images?.[0]?.url

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size.')
      return
    }
    if (selectedSizeStock < quantity) {
      setError('Not enough stock for this size.')
      return
    }

    setError('')

    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: image || '',
        price: product.salePrice || product.price,
        size: selectedSize,
        color: selectedColor || undefined,
      })
    }

    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1800)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    if (selectedSize && selectedSizeStock >= quantity) {
      router.push('/cart')
    }
  }



  const handleWishlistToggle = () => {
    toggleItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: image || '',
      price: product.price,
      salePrice: product.salePrice,
    })
  }

  return (
    <div>
      {/* Price */}
      <div className="flex items-baseline gap-3 mb-6">
        <span className="font-mono text-2xl text-indigo">
          ৳{product.salePrice || product.price}
        </span>
        {product.salePrice && (
          <span className="font-mono text-base text-ink/35 line-through">
            ৳{product.price}
          </span>
        )}
      </div>

      {/* Color selector */}
      {product.colors?.length > 0 && (
        <div className="mb-6">
          <p className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-3">
            Color: <span className="text-ink normal-case">{selectedColor}</span>
          </p>
          <div className="flex gap-2">
            {product.colors.map((c: any, idx: number) => (
              <button
                key={idx}
                onClick={() => setSelectedColor(c.colorName)}
                className={`w-9 h-9 rounded-full border-2 transition-all ${selectedColor === c.colorName
                    ? 'border-indigo scale-110'
                    : 'border-ink/15'
                  }`}
                style={{ backgroundColor: c.colorCode || '#ccc' }}
                title={c.colorName}
                aria-label={`Select color ${c.colorName}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size selector */}
      {availableSizes.length > 0 && (
        <div className="mb-6">
          <p className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-3">
            Size: <span className="text-ink normal-case">{selectedSize || 'Select a size'}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((s: any) => {
              const outOfStock = s.stock === 0
              return (
                <button
                  key={s.size}
                  onClick={() => !outOfStock && setSelectedSize(s.size)}
                  disabled={outOfStock}
                  className={`w-11 h-11 text-sm font-mono border transition-colors relative ${outOfStock
                      ? 'border-line text-ink/25 cursor-not-allowed'
                      : selectedSize === s.size
                        ? 'bg-ink text-cotton border-ink'
                        : 'border-ink/20 text-ink hover:border-ink'
                    }`}
                >
                  {s.size}
                  {outOfStock && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-full h-px bg-ink/25 rotate-45" />
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="mb-6">
        <p className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-3">Quantity</p>
        <div className="flex items-center border border-ink/20 w-fit">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center text-ink/60 hover:text-ink transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center font-mono text-sm text-ink">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(selectedSizeStock || 1, quantity + 1))}
            className="w-10 h-10 flex items-center justify-center text-ink/60 hover:text-ink transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        {selectedSize && selectedSizeStock > 0 && selectedSizeStock <= 5 && (
          <p className="font-mono text-xs text-rust mt-2">
            Only {selectedSizeStock} left in stock
          </p>
        )}
      </div>

      {error && (
        <p className="text-sm font-body text-red-600 bg-red-50 border border-red-200 px-4 py-2.5 mb-4">
          {error}
        </p>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          disabled={!selectedSize || selectedSizeStock === 0}
          className={`flex-1 py-3.5 text-sm font-body transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${justAdded ? 'bg-indigo text-cotton' : 'border border-ink text-ink hover:bg-ink hover:text-cotton'
            }`}
        >
          {justAdded ? (
            <span className="flex items-center justify-center gap-2">
              <Check className="w-4 h-4" /> Added to Cart
            </span>
          ) : (
            'Add to Cart'
          )}
        </button>

        <button
          onClick={handleBuyNow}
          disabled={!selectedSize || selectedSizeStock === 0}
          className="flex-1 py-3.5 text-sm font-body bg-ink text-cotton hover:bg-indigo transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Buy Now
        </button>

        <button
          onClick={handleWishlistToggle}
          className="w-12 h-12 border border-ink/20 flex items-center justify-center hover:border-ink transition-colors shrink-0"
          aria-label="Add to wishlist"
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rust text-rust' : 'text-ink'}`} />
        </button>
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, X, ArrowRight } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlistStore'

export default function WishlistPage() {
    const [mounted, setMounted] = useState(false)
    const { items, removeItem } = useWishlistStore()


    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-cotton px-6">
                <div className="text-center max-w-sm">
                    <div className="w-16 h-16 mx-auto mb-6 border border-ink/20 rounded-full flex items-center justify-center">
                        <Heart className="w-6 h-6 text-ink/40" />
                    </div>
                    <h1 className="font-display text-2xl text-ink mb-2">Your wishlist is empty</h1>
                    <p className="font-body text-sm text-ink/50 mb-8">
                        Save pieces you love here to come back to them later.
                    </p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 bg-ink text-cotton px-6 py-3 text-sm font-body hover:bg-indigo transition-colors"
                    >
                        Browse the Shop <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-cotton">
            <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
                <div className="mb-12">
                    <p className="font-mono text-xs uppercase tracking-widest text-rust mb-2">
                        {items.length} {items.length === 1 ? 'Item' : 'Items'}
                    </p>
                    <h1 className="font-display text-4xl text-ink">Your Wishlist</h1>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
                    {items.map((item) => (
                        <div key={item.productId} className="group relative">
                            <Link href={`/product/${item.slug}`} className="block">
                                <div className="relative aspect-[3/4] overflow-hidden bg-line">
                                    {item.image && (
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                        />
                                    )}
                                </div>
                                <div className="pt-4">
                                    <h3 className="font-display text-base text-ink">{item.name}</h3>
                                    <p className="font-mono text-sm text-indigo mt-1">
                                        ৳{item.salePrice || item.price}
                                        {item.salePrice && (
                                            <span className="text-ink/35 line-through ml-1.5">৳{item.price}</span>
                                        )}
                                    </p>
                                </div>
                            </Link>

                            {/* Remove button */}
                            <button
                                onClick={() => removeItem(item.productId)}
                                className="absolute top-2 right-2 w-8 h-8 bg-cotton/90 backdrop-blur-sm flex items-center justify-center"
                                aria-label="Remove from wishlist"
                            >
                                <X className="w-4 h-4 text-ink" />
                            </button>

                            {/* View product */}
                            <Link
                                href={`/product/${item.slug}`}
                                className="mt-3 w-full flex items-center justify-center gap-2 border border-ink/20 py-2.5 text-xs font-body text-ink hover:border-ink hover:bg-ink hover:text-cotton transition-colors"
                            >
                                View Product
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
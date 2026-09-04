'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ProductCard } from './ProductCard'

export function FeaturedMarquee({ products }: { products: any[] }) {
    const [itemsPerPage, setItemsPerPage] = useState(4)
    const [pageIndex, setPageIndex] = useState(0)

    // Screen size onujayi koyta card dekhabe seta thik koro
    useEffect(() => {
        const updateItemsPerPage = () => {
            setItemsPerPage(window.innerWidth < 768 ? 2 : 4)
        }
        updateItemsPerPage()
        window.addEventListener('resize', updateItemsPerPage)
        return () => window.removeEventListener('resize', updateItemsPerPage)
    }, [])

    const totalPages = Math.ceil(products.length / itemsPerPage)

    // itemsPerPage bodle gele pageIndex reset koro jate out-of-range na hoy
    useEffect(() => {
        setPageIndex(0)
    }, [itemsPerPage])

    // Auto-advance
    useEffect(() => {
        if (totalPages <= 1) return
        const timer = setInterval(() => {
            setPageIndex((prev) => (prev + 1) % totalPages)
        }, 4000)
        return () => clearInterval(timer)
    }, [totalPages])

    if (products.length === 0) return null

    const currentItems = products.slice(
        pageIndex * itemsPerPage,
        pageIndex * itemsPerPage + itemsPerPage,
    )

    return (
        <div>
            <div className="overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={pageIndex}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -24 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12"
                    >
                        {currentItems.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Page indicator dots */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                    {Array.from({ length: totalPages }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setPageIndex(idx)}
                            aria-label={`Go to page ${idx + 1}`}
                            className={`h-1.5 rounded-full transition-all ${idx === pageIndex ? 'w-6 bg-ink' : 'w-1.5 bg-ink/20'
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
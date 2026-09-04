'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion, PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductCard } from './ProductCard'

export function FeaturedMarquee({ products }: { products: any[] }) {
    const [itemsPerPage, setItemsPerPage] = useState(4)
    const [pageIndex, setPageIndex] = useState(0)
    const [direction, setDirection] = useState(1)

    useEffect(() => {
        const updateItemsPerPage = () => {
            setItemsPerPage(window.innerWidth < 768 ? 2 : 4)
        }
        updateItemsPerPage()
        window.addEventListener('resize', updateItemsPerPage)
        return () => window.removeEventListener('resize', updateItemsPerPage)
    }, [])

    const totalPages = Math.ceil(products.length / itemsPerPage)

    useEffect(() => {
        setPageIndex(0)
    }, [itemsPerPage])

    useEffect(() => {
        if (totalPages <= 1) return
        const timer = setInterval(() => {
            setDirection(1)
            setPageIndex((prev) => (prev + 1) % totalPages)
        }, 4000)
        return () => clearInterval(timer)
    }, [totalPages, pageIndex])

    if (products.length === 0) return null

    const currentItems = products.slice(
        pageIndex * itemsPerPage,
        pageIndex * itemsPerPage + itemsPerPage,
    )

    const goToPage = (idx: number, dir: number) => {
        setDirection(dir)
        setPageIndex(idx)
    }

    const handleDragEnd = (
        e: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo,
    ) => {
        const swipeThreshold = 50
        if (info.offset.x < -swipeThreshold && pageIndex < totalPages - 1) {
            // Left e swipe → next page
            goToPage(pageIndex + 1, 1)
        } else if (info.offset.x > swipeThreshold && pageIndex > 0) {
            // Right e swipe → previous page
            goToPage(pageIndex - 1, -1)
        }
    }

    return (
        <div>
            <div className="relative">
                {/* Desktop arrow controls */}
                {totalPages > 1 && (
                    <>
                        <button
                            onClick={() => goToPage(Math.max(0, pageIndex - 1), -1)}
                            disabled={pageIndex === 0}
                            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-cotton border border-ink/15 items-center justify-center hover:border-ink transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label="Previous"
                        >
                            <ChevronLeft className="w-4 h-4 text-ink" />
                        </button>
                        <button
                            onClick={() => goToPage(Math.min(totalPages - 1, pageIndex + 1), 1)}
                            disabled={pageIndex === totalPages - 1}
                            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-cotton border border-ink/15 items-center justify-center hover:border-ink transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label="Next"
                        >
                            <ChevronRight className="w-4 h-4 text-ink" />
                        </button>
                    </>
                )}

                <div className="overflow-hidden">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={pageIndex}
                            custom={direction}
                            initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
                            transition={{ duration: 0.1, ease: 'easeOut' }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.15}
                            onDragEnd={handleDragEnd}
                            className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 cursor-grab active:cursor-grabbing touch-pan-y"
                        >
                            {currentItems.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                    {Array.from({ length: totalPages }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goToPage(idx, idx > pageIndex ? 1 : -1)}
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
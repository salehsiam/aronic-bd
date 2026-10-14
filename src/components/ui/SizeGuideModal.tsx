'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import Link from 'next/link'
import { SIZE_CHARTS, getChartKey } from '@/lib/sizeCharts'
import { SizeChartTable } from './SizeChartTable'

export function SizeGuideModal({
    open,
    onClose,
    categorySlug,
    selectedSize,
}: {
    open: boolean
    onClose: () => void
    categorySlug?: string
    selectedSize?: string | null
}) {
    const chart = SIZE_CHARTS[getChartKey(categorySlug)]

    useEffect(() => {
        if (!open) return
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
        window.addEventListener('keydown', onKey)
        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            window.removeEventListener('keydown', onKey)
            document.body.style.overflow = prev
        }
    }, [open, onClose])

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[80] flex items-end md:items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-black/50"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full md:max-w-lg max-h-[85vh] overflow-y-auto bg-cotton p-6 shadow-2xl"
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute top-4 right-4 text-ink/50 hover:text-ink transition-colors"
                            aria-label="Close size guide"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <p className="font-mono text-xs uppercase tracking-widest text-rust mb-4">
                            Size Guide
                        </p>

                        <SizeChartTable chart={chart} highlight={selectedSize} />

                        <p className="font-body text-xs text-ink/50 mt-4">
                            Garment measurements, oversized fit. Between sizes? Pick the smaller one for a
                            relaxed fit.{' '}
                            <Link href="/size-guide" onClick={onClose} className="text-indigo underline">
                                Full guide
                            </Link>
                        </p>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
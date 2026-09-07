'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

type Slide = {
    id: string
    headline: string
    eyebrow?: string
    ctaText: string
    ctaLink: string
    desktopImage: string
    mobileImage?: string
}

export function HeroCarousel({ slides }: { slides: Slide[] }) {
    const [active, setActive] = useState(0)

    useEffect(() => {
        if (slides.length <= 1) return
        const timer = setInterval(() => {
            setActive((prev) => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [slides.length])

    if (slides.length === 0) return null

    const slide = slides[active]
    const lines = (slide.headline || '').split('\n')
    const imgSrc = slide.mobileImage || slide.desktopImage

    return (
        <div className="relative h-[85vh] min-h-[420px] md:min-h-[500px] max-h-[800px] overflow-hidden bg-ink">
            {/* Main image — slides in from right, blur clears as it settles */}
            <div className="absolute inset-0 overflow-hidden">
                <AnimatePresence mode="sync">
                    <motion.picture
                        key={slide.id}
                        initial={{ x: '18%', opacity: 0, filter: 'blur(24px)' }}
                        animate={{ x: '0%', opacity: 1, filter: 'blur(0px)' }}
                        exit={{ x: '-8%', opacity: 0, filter: 'blur(12px)' }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0"
                    >
                        <source media="(min-width: 768px)" srcSet={slide.desktopImage} />
                        <img
                            src={imgSrc}
                            alt={slide.headline.replace('\n', ' ')}
                            className="w-full h-full object-cover"
                        />
                    </motion.picture>
                </AnimatePresence>

                {/* Scrim for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
            </div>

            {/* Text content — slides in from right */}
            <div className="relative h-full flex flex-col justify-end pl-10 md:pl-24 pr-6 md:pr-16 pb-10 md:pb-24 max-w-2xl">
                <AnimatePresence mode="wait">
                    <motion.div key={slide.id}>
                        {slide.eyebrow && (
                            <motion.p
                                initial={{ opacity: 0, x: 32 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -16 }}
                                transition={{ duration: 0.4, delay: 0.05, ease: 'easeOut' }}
                                className="font-mono text-xs uppercase tracking-widest text-cotton/80 mb-3"
                            >
                                {slide.eyebrow}
                            </motion.p>
                        )}

                        <h1 className="font-display text-3xl md:text-7xl text-cotton leading-[1.05]">
                            {lines.map((line, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, x: 48 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -16 }}
                                    transition={{ duration: 0.45, delay: 0.1 + i * 0.06, ease: 'easeOut' }}
                                    className="block"
                                >
                                    {line}
                                </motion.span>
                            ))}
                        </h1>

                        <motion.div
                            initial={{ opacity: 0, x: 32 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -16 }}
                            transition={{ duration: 0.4, delay: 0.25 }}
                        >
                            <Link
                                href={slide.ctaLink}
                                className="inline-flex items-center gap-2 border border-cotton text-cotton px-5 md:px-7 py-2.5 md:py-3.5 text-xs md:text-sm font-body mt-4 md:mt-8 rounded-full hover:bg-cotton hover:text-ink transition-colors"
                            >
                                {slide.ctaText} <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Progress bar indicators */}
            {slides.length > 1 && (
                <div className="absolute bottom-4 md:bottom-6 left-6 md:left-16 flex gap-2 z-10">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActive(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                            className="relative h-[3px] w-8 md:w-10 bg-cotton/30 overflow-hidden"
                        >
                            {idx === active && (
                                <motion.div
                                    key={`progress-${slide.id}`}
                                    initial={{ width: '0%' }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 5, ease: 'linear' }}
                                    className="absolute inset-y-0 left-0 bg-cotton"
                                />
                            )}
                            {idx < active && <div className="absolute inset-0 bg-cotton" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
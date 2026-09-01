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
        <div className="relative h-[85vh] min-h-[500px] max-h-[800px] overflow-hidden bg-ink">
            {/* Left peek strip — permanent blurred sliver, gives "left space" feel */}
            <div className="absolute inset-y-0 left-0 w-[14%] md:w-[10%] overflow-hidden">
                <img
                    src={imgSrc}
                    alt=""
                    aria-hidden
                    className="w-full h-full object-cover scale-125 blur-md opacity-60"
                />
                <div className="absolute inset-0 bg-ink/40" />
            </div>

            {/* Main image — slides in from right, blur clears as it settles */}
            <div className="absolute inset-y-0 left-[14%] md:left-[10%] right-0 overflow-hidden">
                <AnimatePresence mode="sync">
                    <motion.picture
                        key={slide.id}
                        initial={{ x: '18%', opacity: 0, filter: 'blur(24px)' }}
                        animate={{ x: '0%', opacity: 1, filter: 'blur(0px)' }}
                        exit={{ x: '-8%', opacity: 0, filter: 'blur(12px)' }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
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
            <div className="relative h-full flex flex-col justify-end pl-[18%] md:pl-[14%] pr-6 md:pr-16 pb-20 md:pb-24 max-w-2xl">
                <AnimatePresence mode="wait">
                    <motion.div key={slide.id}>
                        {slide.eyebrow && (
                            <motion.p
                                initial={{ opacity: 0, x: 32 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -16 }}
                                transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
                                className="font-mono text-xs uppercase tracking-widest text-cotton/80 mb-3"
                            >
                                {slide.eyebrow}
                            </motion.p>
                        )}

                        <h1 className="font-display text-4xl md:text-7xl text-cotton leading-[1.05]">
                            {lines.map((line, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, x: 48 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -16 }}
                                    transition={{ duration: 0.55, delay: 0.4 + i * 0.1, ease: 'easeOut' }}
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
                            transition={{ duration: 0.5, delay: 0.65 }}
                        >
                            <Link
                                href={slide.ctaLink}
                                className="inline-flex items-center gap-2 border border-cotton text-cotton px-6 md:px-7 py-3 md:py-3.5 text-sm font-body mt-6 md:mt-8 rounded-full hover:bg-cotton hover:text-ink transition-colors"
                            >
                                {slide.ctaText} <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Progress bar indicators */}
            {slides.length > 1 && (
                <div className="absolute bottom-6 left-[18%] md:left-[14%] flex gap-2 z-10">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActive(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                            className="relative h-[3px] w-10 bg-cotton/30 overflow-hidden"
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
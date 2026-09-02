'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
    const router = useRouter()
    const [query, setQuery] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 300)
        } else {
            setQuery('')
        }
    }, [open])

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [onClose])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`)
            onClose()
        }
    }

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-ink/40 z-[60]"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: -24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -24 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed top-0 left-0 right-0 bg-cotton z-[70] border-b border-line"
                    >
                        <div className="max-w-3xl mx-auto px-6 py-6 md:py-10">
                            <div className="flex items-center justify-between mb-2">
                                <p className="font-mono text-xs uppercase tracking-widest text-rust">
                                    Search Aronic
                                </p>
                                <button
                                    onClick={onClose}
                                    aria-label="Close search"
                                    className="text-ink/50 hover:text-ink transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="flex items-center border-b-2 border-ink py-3">
                                <Search className="w-5 h-5 text-ink/40 mr-3 shrink-0" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search for products..."
                                    className="flex-1 bg-transparent outline-none font-display text-xl md:text-2xl text-ink placeholder:text-ink/30"
                                />
                            </form>

                            <p className="font-body text-xs text-ink/40 mt-4">
                                Press Enter to search, or Esc to close
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
'use client'

import { motion } from 'framer-motion'

export function FacebookMessengerButton() {
    return (
        <motion.a
            href="https://m.me/aronicbd"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.4, ease: 'easeOut' }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-indigo shadow-lg flex items-center justify-center"
            aria-label="Message us on Facebook"
        >
            {/* Messenger icon (inline SVG, brand icon lucide-react e nei) */}
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-cotton">
                <path d="M12 2C6.48 2 2 6.19 2 11.5c0 2.85 1.28 5.4 3.32 7.15V22l3.06-1.68c.82.23 1.7.35 2.62.35 5.52 0 10-4.19 10-9.5S17.52 2 12 2zm1.01 12.8l-2.55-2.72-4.98 2.72 5.48-5.82 2.55 2.72 4.98-2.72-5.48 5.82z" />
            </svg>

            {/* Subtle pulse ring, attention draw korar jonno */}
            <span className="absolute inset-0 rounded-full bg-indigo animate-ping opacity-20" />
        </motion.a>
    )
}
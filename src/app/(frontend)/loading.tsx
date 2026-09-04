'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="min-h-screen bg-cotton flex flex-col items-center justify-center gap-8">
      {/* Swinging hang-tag loader */}
      <div className="relative" style={{ perspective: 400 }}>
        <motion.div
          animate={{ rotate: [-8, 8, -8] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top center' }}
          className="relative"
        >
          {/* String */}
          <div className="w-px h-6 bg-ink/30 mx-auto" />

          {/* Tag */}
          <div className="relative w-16 h-20 bg-cotton border-2 border-dashed border-ink flex flex-col items-center justify-center">
            {/* Hole */}
            <div className="absolute top-2 w-2.5 h-2.5 rounded-full border-2 border-ink bg-cotton" />
            <span className="font-display text-2xl text-indigo mt-2">A</span>
          </div>
        </motion.div>
      </div>

      {/* Wordmark */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="font-display text-2xl text-ink tracking-tight">Aronic</p>

        {/* Loading dots */}
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.25, 1, 0.25] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
              className={`w-1.5 h-1.5 rounded-full ${
                i === 0 ? 'bg-ink' : i === 1 ? 'bg-indigo' : 'bg-rust'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
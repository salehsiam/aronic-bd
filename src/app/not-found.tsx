'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Search } from 'lucide-react'
import { Fraunces, Work_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-display', weight: ['400', '600'] })
const workSans = Work_Sans({ subsets: ['latin'], variable: '--font-body', weight: ['400', '500'] })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '500'] })

export default function NotFound() {
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable} ${mono.variable}`}>
      <body className="font-body bg-cotton text-ink">
        <div className="min-h-screen flex items-center justify-center bg-cotton px-6 overflow-hidden">
          <div className="text-center max-w-md relative">
            <motion.div
              initial={{ opacity: 0, y: -20, rotate: -6 }}
              animate={{
                opacity: 1,
                y: [0, -10, 0],
                rotate: [-6, 4, -6],
              }}
              transition={{
                opacity: { duration: 0.6 },
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="inline-block mb-8"
            >
              <div className="relative w-24 h-28 bg-cotton border-2 border-dashed border-ink flex flex-col items-center justify-center shadow-sm">
                <div className="absolute top-2.5 w-3 h-3 rounded-full border-2 border-ink bg-cotton" />
                <span className="font-mono text-4xl text-rust">?</span>
                <span className="font-mono text-[10px] text-ink/40 uppercase tracking-widest mt-1">
                  Not Found
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <p className="font-display text-7xl md:text-8xl text-ink/10 leading-none mb-2">
                404
              </p>
              <p className="font-mono text-xs uppercase tracking-widest text-rust mb-3">
                Lost in the Rack
              </p>
              <h1 className="font-display text-2xl md:text-3xl text-ink mb-4">
                This tag's come untied
              </h1>
              <p className="font-body text-sm text-ink/50 mb-10">
                The page you're looking for has been moved, sold out, or never existed. Let's
                get you back to browsing.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/"
                  className="group inline-flex items-center gap-2 bg-ink text-cotton px-6 py-3 text-sm font-body hover:bg-indigo transition-colors w-full sm:w-auto justify-center"
                >
                  Back to Home
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 border border-ink/20 text-ink px-6 py-3 text-sm font-body hover:border-ink transition-colors w-full sm:w-auto justify-center"
                >
                  <Search className="w-4 h-4" />
                  Browse Shop
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </body>
    </html>
  )
}
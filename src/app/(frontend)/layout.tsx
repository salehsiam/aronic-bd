import type { Metadata } from 'next'
import '../globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Marquee from '@/components/layout/Marquee'

export const metadata: Metadata = {
  title: 'Forensic Medicine & Toxicology — Mymensingh Medical College',
  description:
    'Official website of the Department of Forensic Medicine & Toxicology, Mymensingh Medical College, Bangladesh.',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Marquee />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

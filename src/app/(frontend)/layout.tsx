import type { Metadata } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import '../globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Marquee from '@/components/layout/Marquee'
import GoogleAnalytics from '@/components/ui/GoogleAnalytics'

// Font optimization — Next.js built-in
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-dm-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  title: {
    default: 'Forensic Medicine & Toxicology — Mymensingh Medical College',
    template: '%s | Forensic Medicine MMC',
  },
  description:
    'Official website of the Department of Forensic Medicine & Toxicology, Mymensingh Medical College, Bangladesh.',
  keywords: [
    'Forensic Medicine',
    'Toxicology',
    'Mymensingh Medical College',
    'MMC',
    'Bangladesh',
    'Medico-Legal',
    'Forensic Pathology',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_BD',
    url: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    siteName: 'Forensic Medicine & Toxicology — MMC',
  },
  robots: { index: true, follow: true },
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${dmSans.variable} ${dmSerifDisplay.variable}`}
    >
      <body className={dmSans.className}>
        <GoogleAnalytics />
        <Marquee />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

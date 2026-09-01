import type { Metadata } from 'next'
import { Fraunces, Work_Sans, JetBrains_Mono } from 'next/font/google'
import '../globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import GoogleAnalytics from '@/components/ui/GoogleAnalytics'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600'],
  display: 'swap',
})
const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500'],
  display: 'swap',
})
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  title: {
    default: 'Aronic — Bangladeshi Clothing Brand',
    template: '%s | Aronic',
  },
  description: 'Aronic — quality clothing, crafted for Bangladesh. Shop the latest collection.',
  keywords: ['Aronic', 'clothing', 'fashion', 'Bangladesh', 'online shop'],
  openGraph: {
    type: 'website',
    locale: 'en_BD',
    url: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    siteName: 'Aronic',
  },
  robots: { index: true, follow: true },
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${workSans.variable} ${mono.variable}`}
    >
      <body className="font-body bg-cotton text-ink">
        <GoogleAnalytics />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
import type { Metadata } from 'next'
import '../globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Marquee from '@/components/layout/Marquee'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  title: {
    default: 'Forensic Medicine & Toxicology — Mymensingh Medical College',
    template: '%s | Forensic Medicine MMC',
  },
  description:
    'Official website of the Department of Forensic Medicine & Toxicology, Mymensingh Medical College, Bangladesh. Faculty, notices, research, and medico-legal services.',
  keywords: [
    'Forensic Medicine',
    'Toxicology',
    'Mymensingh Medical College',
    'MMC',
    'Bangladesh',
    'Medico-Legal',
    'Forensic Pathology',
    'Medical Jurisprudence',
  ],
  authors: [{ name: 'Dept. of Forensic Medicine & Toxicology, MMC' }],
  creator: 'Mymensingh Medical College',
  openGraph: {
    type: 'website',
    locale: 'en_BD',
    url: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    siteName: 'Forensic Medicine & Toxicology — MMC',
    title: 'Department of Forensic Medicine & Toxicology — Mymensingh Medical College',
    description:
      'Official website of the Department of Forensic Medicine & Toxicology, Mymensingh Medical College.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Forensic Medicine Department MMC',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forensic Medicine & Toxicology — MMC',
    description:
      'Official website of the Department of Forensic Medicine & Toxicology, Mymensingh Medical College.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body>
        <Marquee />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

import Link from 'next/link'
import { ArrowRight, Truck, Wallet, RotateCcw } from 'lucide-react'
import { getFeaturedProducts, getCategories, getHeroSlides, getCollectionBanners, getProducts } from '@/lib/getProducts'
import { HeroCarousel } from '@/components/ui/HeroCarousel'
import { CategoryRow } from '@/components/ui/CategoryRow'
import { FeaturedMarquee } from '@/components/ui/FeaturedMarquee'


export default async function HomePage() {
  const [featuredProducts, categories, heroSlidesRaw] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
    getHeroSlides(),
  ])

  const slides = heroSlidesRaw.map((s: any) => ({
    id: s.id,
    eyebrow: s.eyebrow,
    headline: s.headline,
    ctaText: s.ctaText,
    ctaLink: s.ctaLink,
    desktopImage: s.desktopImage?.url,
    mobileImage: s.mobileImage?.url,
  }))


  return (
    <div className="bg-cotton">
      {/* ── HERO ── */}
      <section>
        {slides.length > 0 && <HeroCarousel slides={slides} />}

        {/* Marquee strip */}
        <div className="bg-indigo py-3 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {Array(6)
              .fill(null)
              .map((_, i) => (
                <span
                  key={i}
                  className="font-mono text-xs uppercase tracking-widest text-cotton/90 mx-6"
                >
                  Free Delivery Inside Dhaka · Cash on Delivery Available · Easy 7-Day Returns ·
                </span>
              ))}
          </div>
        </div>
      </section>


      {/* ── USP STRIP ── */}
      {/* <section className="max-w-7xl mx-auto px-6 py-14 border-b border-line">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Truck,
              title: 'Fast Delivery',
              desc: 'Dhaka in 1–2 days, nationwide in 3–5 days',
            },
            {
              icon: Wallet,
              title: 'Flexible Payment',
              desc: 'bKash, Nagad, card, or cash on delivery',
            },
            {
              icon: RotateCcw,
              title: 'Easy Returns',
              desc: '7-day return window on unworn items',
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <div className="w-10 h-10 border border-ink/20 flex items-center justify-center shrink-0">
                <item.icon className="w-4 h-4 text-indigo" />
              </div>
              <div>
                <h3 className="font-display text-base text-ink">{item.title}</h3>
                <p className="font-body text-sm text-ink/50 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* ── CATEGORY ROW (compact) ── */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-12 border-b border-line">
          {/* <p className="font-mono text-xs uppercase tracking-widest text-rust mb-5">
           Shop by Category
          </p> */}
          <CategoryRow categories={categories} />
        </section>
      )}



      {/* ── FEATURED PRODUCTS ── */}
      {featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-rust mb-2">
                Handpicked
              </p>
              <h2 className="font-display text-3xl text-ink">Top Featured</h2>
            </div>
            <Link
              href="/shop"
              className="flex items-center gap-1.5 font-body text-sm text-ink/60 hover:text-ink transition-colors"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <FeaturedMarquee products={featuredProducts} />

        </section>
      )}
    </div>
  )
}
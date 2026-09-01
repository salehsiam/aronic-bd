import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'About',
  description: 'The story behind Aronic.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cotton">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-rust mb-4">
          Our Story
        </p>
        <h1 className="font-display text-4xl md:text-6xl text-ink leading-tight">
          Clothing built for
          <br />
          how Bangladesh lives
        </h1>
      </section>

      {/* Story body */}
      <section className="max-w-2xl mx-auto px-6 pb-20">
        <div className="space-y-6 font-body text-base text-ink/70 leading-relaxed">
          <p>
            Aronic started with a simple frustration: most clothing sold here wasn't made with
            our weather, our commutes, or our budgets in mind. Fabrics too heavy for the heat.
            Cuts that didn't hold up to daily wear. Prices that didn't match the quality.
          </p>
          <p>
            We set out to fix that — sourcing fabric that breathes, keeping our cuts practical,
            and pricing every piece so it's worth what you pay for it. No imported hype, no
            unnecessary markup. Just clothing that works for the life you actually live.
          </p>
          <p>
            Every order is packed and shipped from right here, and every piece is checked by
            hand before it leaves our hands for yours.
          </p>
        </div>
      </section>

      {/* Values strip */}
      <section className="border-t border-b border-line">
        <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: 'Made for the Climate',
              desc: 'Breathable fabrics chosen for heat and humidity, not just appearance.',
            },
            {
              title: 'Fair Pricing',
              desc: 'No inflated markups — the price reflects the fabric and the work, nothing more.',
            },
            {
              title: 'Built to Last',
              desc: 'Stitching and cuts checked by hand so pieces hold up to daily wear.',
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="font-display text-xl text-ink mb-2">{item.title}</h3>
              <p className="font-body text-sm text-ink/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="font-display text-3xl text-ink mb-6">See the collection</h2>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-ink text-cotton px-7 py-3.5 text-sm font-body hover:bg-indigo transition-colors"
        >
          Shop Now <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  )
}
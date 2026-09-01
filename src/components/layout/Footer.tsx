import Link from 'next/link'
import {
  MapPin,
  Mail,
  Phone,
  ShoppingBag,
  RotateCcw,
  Ruler,
  Truck,
} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-indigo text-cotton/70">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-14 md:pt-16 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <span className="font-display text-3xl text-cotton tracking-tight">
              Aronic
            </span>
            <p className="text-sm font-body leading-relaxed max-w-sm mt-4">
              Bangladesh-er jonno banano quality clothing. Comfort, style ar durability — ek jaygay.
            </p>

            {/* Newsletter */}
            <div className="mt-6 max-w-sm">
              <p className="font-mono text-xs uppercase tracking-widest text-rust mb-2">
                Notun collection er khobor pete chan?
              </p>
              <div className="flex border border-cotton/25">
                <input
                  type="email"
                  placeholder="apnar email"
                  className="flex-1 px-3 py-2 text-sm font-body bg-transparent text-cotton placeholder:text-cotton/40 outline-none"
                />
                <button className="px-4 bg-rust text-cotton text-sm font-body hover:bg-rust/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Contact */}
            <div className="mt-6 space-y-2.5">
              <div className="flex items-center gap-2.5 text-sm text-cotton/60">
                <MapPin className="w-4 h-4 text-rust flex-shrink-0" />
                <span>Mymensingh, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-cotton/60">
                <Mail className="w-4 h-4 text-rust flex-shrink-0" />
                <span>hello@aronic.com.bd</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-cotton/60">
                <Phone className="w-4 h-4 text-rust flex-shrink-0" />
                <span>+880 1XXX-XXXXXX</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-rust text-xs font-mono font-medium tracking-widest uppercase mb-4">
              Shop
            </h4>
            <div className="space-y-2.5">
              {[
                { label: 'Shob Products', href: '/shop' },
                { label: 'New Arrivals', href: '/shop?sort=newest' },
                { label: 'Men', href: '/shop?category=men' },
                { label: 'Women', href: '/shop?category=women' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-sm font-body text-cotton/60 hover:text-cotton transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-rust text-xs font-mono font-medium tracking-widest uppercase mb-4">
              Customer Care
            </h4>
            <div className="space-y-2.5">
              {[
                { label: 'Track Order', href: '/track-order', icon: Truck },
                { label: 'Return & Exchange', href: '/returns', icon: RotateCcw },
                { label: 'Size Guide', href: '/size-guide', icon: Ruler },
                { label: 'My Orders', href: '/account/orders', icon: ShoppingBag },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 text-sm text-cotton/60 hover:text-cotton transition-colors group"
                >
                  <item.icon className="w-3.5 h-3.5 text-rust" />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Socials */}
            <h4 className="text-rust text-xs font-mono font-medium tracking-widest uppercase mb-3 mt-6">
              Follow Us
            </h4>
            <div className="flex gap-3">
              <a
                href="https://facebook.com/aronic"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-cotton/25 flex items-center justify-center hover:bg-cotton/10 transition-colors"
                aria-label="Facebook"
              >
                 <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15h-2.4v-3H10V9.5C10 7.29 11.79 5.5 14 5.5h2.5v3H15c-.55 0-1 .45-1 1V12h2.5l-.4 3H14v6.95c5.05-.5 9-4.76 9-9.95z" />
    </svg>
              </a>
              <a
                href="https://instagram.com/aronic"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-cotton/25 flex items-center justify-center hover:bg-cotton/10 transition-colors"
                aria-label="Instagram"
              >
             <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.02-3.58.07-4.85c.15-3.23 1.67-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07c-4.35.2-6.78 2.62-6.98 6.98C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm6.41-10.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z" />
</svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-10 py-5 border-t border-cotton/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs font-mono text-cotton/40">
          <span>© 2026 Aronic. Shokol odhikar songrokkhito.</span>
          <div className="flex items-center gap-3">
            <span>bKash</span>
            <span>·</span>
            <span>Nagad</span>
            <span>·</span>
            <span>Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
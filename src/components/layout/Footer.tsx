import Link from 'next/link'
import {
  MapPin,
  Mail,
  Clock,
  Home,
  Info,
  Users,
  Bell,
  Phone,
  FlaskConical,
  Globe,
  ImageIcon,
} from 'lucide-react'
import Image from 'next/image'
import logo from './../../../public/logo.png'

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white/70">
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-12 md:pt-14 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center flex-shrink-0">
                <Image src={logo} alt="Logo" width={56} height={56} />
              </div>
              <h3 className="font-display text-white text-lg leading-tight">
                Dept. of Forensic Medicine & Toxicology
              </h3>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Mymensingh Medical College, Bangladesh. Dedicated to forensic science education,
              medico-legal services, and academic excellence.
            </p>
            <p className="font-bn text-green-300 text-sm mt-3">ময়মনসিংহ মেডিক্যাল কলেজ</p>

            {/* Contact Info */}
            <div className="mt-5 space-y-2.5">
              <div className="flex items-center gap-2.5 text-sm text-white/60">
                <MapPin className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Mymensingh – 2200, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/60">
                <Mail className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>mmc.forensicmedicine@gmail.com</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/60">
                <Phone className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>+880 91-XXXXXXX</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/60">
                <Clock className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Sat – Thu: 8:00 AM – 2:30 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-green-300 text-xs font-bold tracking-widest uppercase mb-4">
              Quick Links
            </h4>
            <div className="space-y-2.5">
              {[
                { label: 'Home', href: '/', icon: Home },
                { label: 'About', href: '/about', icon: Info },
                { label: 'Faculty', href: '/faculty', icon: Users },
                { label: 'Notices', href: '/notices', icon: Bell },
                { label: 'Contact', href: '/contact', icon: Phone },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group"
                >
                  <item.icon className="w-3.5 h-3.5 text-green-400 group-hover:text-green-300 transition-colors" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-green-300 text-xs font-bold tracking-widest uppercase mb-4">
              Resources
            </h4>
            <div className="space-y-2.5">
              {[
                { label: 'Research', href: '/research', icon: FlaskConical },
                { label: 'Gallery', href: '/gallery', icon: ImageIcon },
                { label: 'MMC Website', href: 'https://mmc.gov.bd', icon: Globe },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group"
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <item.icon className="w-3.5 h-3.5 text-green-400 group-hover:text-green-300 transition-colors" />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Office Hours */}
            <h4 className="text-green-300 text-xs font-bold tracking-widest uppercase mb-3 mt-6">
              Office Hours
            </h4>
            <div className="space-y-1.5 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-green-400" />
                <span>Saturday – Thursday</span>
              </div>
              <p className="pl-5">8:00 AM – 2:30 PM</p>
              <p className="pl-5 text-red-400/70">Friday: Closed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 mt-10 py-5 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 text-xs text-white/40">
          <span>
            © 2025 Forensic Medicine Dept., Mymensingh Medical College. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}

import Link from 'next/link'
import { Home, ArrowLeft, Bell, Users, FlaskConical, Phone } from 'lucide-react'
import GoBackButton from '@/components/ui/GoBackButton'
import logo from './../../public/logo.png'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Simple */}
      <div className="bg-green-900 py-4">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center text-base">
            <Image src={logo} alt="Logo" width={56} height={56} />
          </div>
          <div>
            <div className="font-display text-white text-sm leading-tight">
              Department of Forensic Medicine & Toxicology
            </div>
            <div className="font-bn text-green-300 text-xs">ময়মনসিংহ মেডিক্যাল কলেজ</div>
          </div>
        </div>
      </div>

      {/* 404 Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-lg">
          {/* 404 Number */}
          <div className="relative mb-8">
            <div className="font-display text-[10rem] md:text-[14rem] text-green-100 leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-green-900 flex items-center justify-center shadow-2xl">
                <span className="text-3xl md:text-5xl">🔍</span>
              </div>
            </div>
          </div>

          {/* Message */}
          <h1 className="font-display text-2xl md:text-3xl text-gray-900 mb-3">Page Not Found</h1>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-2">
            The page you are looking for does not exist or has been moved.
          </p>
          <p className="font-bn text-gray-400 text-sm mb-8">
            আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold text-sm px-6 py-3 rounded-lg transition-all"
            >
              <Home className="w-4 h-4" />
              Go to Homepage
            </Link>
            <GoBackButton />
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-4">
              Or visit these pages
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                {
                  label: 'Notices',
                  href: '/notices',
                  icon: Bell,
                  color: 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100',
                },
                {
                  label: 'Faculty',
                  href: '/faculty',
                  icon: Users,
                  color: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
                },
                {
                  label: 'Research',
                  href: '/research',
                  icon: FlaskConical,
                  color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
                },
                {
                  label: 'Contact',
                  href: '/contact',
                  icon: Phone,
                  color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${item.color}`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-xs font-semibold">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Simple */}
      <div className="bg-green-900 py-4">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <p className="text-white/40 text-xs">
            © 2025 Forensic Medicine Dept., Mymensingh Medical College
          </p>
        </div>
      </div>
    </div>
  )
}

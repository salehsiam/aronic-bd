import Link from 'next/link'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Bus,
  Calendar,
  Megaphone,
  Users,
  MapPinned,
  Navigation,
} from 'lucide-react'
import ContactForm from '@/components/ui/ContactForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact the Department of Forensic Medicine & Toxicology, Mymensingh Medical College. Address, phone, email, and location map.',
  openGraph: {
    title: 'Contact — Forensic Medicine & Toxicology MMC',
    description: 'Get in touch with our department.',
  },
}

export default function ContactPage() {
  return (
    <div>
      <div className="bg-green-900 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2 text-green-300 text-xs font-bold tracking-widest uppercase mb-3">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span>Contact</span>
          </div>
          <h1 className="font-display text-white text-3xl md:text-4xl">Contact Us</h1>
          <p className="text-white/60 mt-2 text-sm md:text-base">
            যোগাযোগ করুন — Get in touch with our department
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="space-y-5">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-display text-lg text-gray-900 mb-4">Department Information</h3>

              <div className="space-y-4">
                {[
                  {
                    icon: <MapPin className="w-4 h-4" />,
                    label: 'Address',
                    value:
                      'Department of Forensic Medicine & Toxicology\nMymensingh Medical College\nMymensingh – 2200, Bangladesh',
                  },
                  {
                    icon: <Phone className="w-4 h-4" />,
                    label: 'Phone',
                    value: '+880 91-XXXXXXX\n+880 91-XXXXXXX (HOD)',
                  },
                  {
                    icon: <Mail className="w-4 h-4" />,
                    label: 'Email',
                    value: 'mmc.forensicmedicine@gmail.com',
                  },
                  {
                    icon: <Clock className="w-4 h-4" />,
                    label: 'Office Hours',
                    value: 'Saturday – Thursday\n8:00 AM – 4:30 PM\nFriday: Closed',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                        {item.label}
                      </div>
                      <div className="text-sm text-gray-700 whitespace-pre-line">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-xl p-5">
              <h3 className="font-display text-lg text-gray-900 mb-3 flex items-center gap-2">
                <Bus className="w-4 h-4" /> How to Reach Us
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  From <strong>Mymensingh Bus Stand</strong> — 10 min by rickshaw
                </p>
                <p>
                  From <strong>MMC Main Gate</strong> — College Building, 4th Floor
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-display text-lg text-gray-900 mb-3">Quick Actions</h3>

              <div className="space-y-2">
                {[
                  //   {
                  //     label: 'Book Appointment',
                  //     href: '/appointment',
                  //     icon: <Calendar className="w-4 h-4" />,
                  //     color: 'bg-yellow-400 hover:bg-yellow-300 text-green-900',
                  //   },
                  {
                    label: 'View Notices',
                    href: '/notices',
                    icon: <Megaphone className="w-4 h-4" />,
                    color: 'bg-green-600 hover:bg-green-500 text-white',
                  },
                  {
                    label: 'Meet Faculty',
                    href: '/faculty',
                    icon: <Users className="w-4 h-4" />,
                    color: 'bg-green-50 hover:bg-green-100 text-green-700 border border-green-200',
                  },
                ].map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className={`flex items-center justify-center gap-2 text-sm font-bold px-4 py-2.5 rounded-lg transition-all ${item.color}`}
                  >
                    {item.icon} {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-display text-lg text-gray-900 flex items-center gap-2">
                  <MapPinned className="w-4 h-4" /> Find Us on Map
                </h3>
              </div>

              <div className="h-64 md:h-80 bg-green-50 flex flex-col items-center justify-center gap-3 border-b border-gray-200">
                <Navigation className="w-10 h-10 text-gray-400" />
                <p className="text-gray-500 text-sm font-medium">Mymensingh Medical College</p>
                <p className="text-gray-400 text-xs">Mymensingh – 2200, Bangladesh</p>

                <a
                  href="https://www.google.com/maps/place/%E0%A6%B2%E0%A6%BE%E0%A6%B6%E0%A6%95%E0%A6%BE%E0%A6%9F%E0%A6%BE+%E0%A6%98%E0%A6%B0,%E0%A6%AE%E0%A7%9F%E0%A6%AE%E0%A6%A8%E0%A6%B8%E0%A6%BF%E0%A6%82%E0%A6%B9+%E0%A6%AE%E0%A7%87%E0%A6%A1%E0%A6%BF%E0%A6%95%E0%A7%87%E0%A6%B2+%E0%A6%95%E0%A6%B2%E0%A7%87%E0%A6%9C/@24.7412786,90.4080267,167m/data=!3m1!1e3!4m14!1m7!3m6!1s0x37564f0bb84cc539:0xa3d1b21cb813ffd4!2sMymensingh+Medical+College!8m2!3d24.7459181!4d90.4179318!16zL20vMGJ2YzVo!3m5!1s0x37564f00084350e9:0xe633636adb6a383e!8m2!3d24.7414744!4d90.4081739!16s%2Fg%2F11n4dmhg2l?entry=ttu&g_ep=EgoyMDI2MDUxMC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-1"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-display text-xl text-gray-900 mb-1">Send us a Message</h3>
              <p className="text-gray-500 text-sm mb-6">
                Have a question? Fill out the form and we will get back to you within 24 hours.
              </p>

              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

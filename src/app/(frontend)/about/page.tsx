import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import type { Metadata } from 'next'
import {
  Target,
  Eye,
  Scale,
  GraduationCap,
  Microscope,
  ClipboardList,
  FlaskConical,
  Gavel,
  Users,
  Bell,
  Calendar,
  Phone,
  UserRound,
  MapPin,
  BookOpen,
  FileText,
  Building2,
} from 'lucide-react'
export const metadata: Metadata = {
  title: 'About the Department',
  description:
    'Learn about the history, mission, vision, and services of the Department of Forensic Medicine & Toxicology at Mymensingh Medical College.',
  openGraph: {
    title: 'About — Forensic Medicine & Toxicology MMC',
    description: 'History, mission, vision, and services of our department.',
  },
}

async function getHOD() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'faculty',
    where: { designation: { equals: 'professor' } },
    limit: 1,
  })
  return docs[0] || null
}

export default async function AboutPage() {
  const hod = await getHOD()

  return (
    <div>
      {/* ── PAGE HEADER ── */}
      <div className="bg-green-900 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2 text-green-300 text-xs font-bold tracking-widest uppercase mb-3">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span>About</span>
          </div>
          <h1 className="font-display text-white text-3xl md:text-4xl">About the Department</h1>
          <p className="text-white/60 mt-2 text-sm md:text-base">
            বিভাগ সম্পর্কে — History, mission, and vision
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ── MAIN CONTENT ── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8">
              <div className="flex items-center gap-2 text-green-500 text-xs font-bold tracking-widest uppercase mb-3">
                <span className="w-6 h-0.5 bg-green-400 inline-block" />
                Overview
              </div>
              <h2 className="font-display text-2xl text-gray-900 mb-4">
                Department of Forensic Medicine & Toxicology
              </h2>
              <div className="text-gray-600 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  The Department of Forensic Medicine & Toxicology at Mymensingh Medical College is
                  one of the oldest and most reputed forensic medicine departments in Bangladesh.
                  Established with a vision to bridge the gap between medicine and law, the
                  department has been serving the academic and medico-legal needs of the region for
                  over six decades.
                </p>
                <p>
                  The department offers comprehensive undergraduate and postgraduate education in
                  forensic medicine, toxicology, and medical jurisprudence. Our faculty members are
                  highly qualified and actively engaged in research, clinical practice, and
                  medico-legal consultations.
                </p>
                <p className="font-bn text-gray-500">
                  ময়মনসিংহ মেডিক্যাল কলেজের ফরেনসিক মেডিসিন ও টক্সিকোলজি বিভাগ বাংলাদেশের অন্যতম
                  প্রাচীন ও সম্মানিত বিভাগ। চিকিৎসা ও আইনের মধ্যে সেতুবন্ধন তৈরির লক্ষ্যে প্রতিষ্ঠিত
                  এই বিভাগ ছয় দশকেরও বেশি সময় ধরে শিক্ষা ও মেডিকো-লিগ্যাল সেবা প্রদান করে আসছে।
                </p>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-100 rounded-xl p-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-display text-xl text-gray-900 mb-3">Our Mission</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  To provide excellence in forensic medicine education...
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-display text-xl text-gray-900 mb-3">Our Vision</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  To become a center of excellence in forensic medicine...
                </p>
              </div>
            </div>

            {/* History */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8">
              <div className="flex items-center gap-2 text-green-500 text-xs font-bold tracking-widest uppercase mb-3">
                <span className="w-6 h-0.5 bg-green-400 inline-block" />
                History
              </div>
              <h2 className="font-display text-2xl text-gray-900 mb-6">Our Journey</h2>
              <div className="space-y-6">
                {[
                  {
                    year: '1924',
                    title: 'MMC Established',
                    desc: 'Mymensingh Medical College was established, laying the foundation for medical education in the region.',
                  },
                  {
                    year: '1962s',
                    title: 'Department Founded',
                    desc: 'The Department of Forensic Medicine was formally established to meet the growing need for medico-legal expertise.',
                  },
                  {
                    year: '1980s',
                    title: 'Toxicology Added',
                    desc: 'Toxicology was incorporated into the department curriculum, expanding the scope of forensic education.',
                  },
                  {
                    year: '2002s',
                    title: 'Research Growth',
                    desc: 'Significant growth in research output and postgraduate programs, with faculty publishing in national and international journals.',
                  },
                  {
                    year: '2024',
                    title: 'Digital Transformation',
                    desc: 'Launch of the official department website to improve accessibility and transparency for students and the public.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 border-2 border-green-300 flex items-center justify-center flex-shrink-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
                      </div>
                      {i < 4 && <div className="w-0.5 h-full bg-green-100 mt-1" />}
                    </div>
                    <div className="pb-6">
                      <div className="text-green-600 text-xs font-bold tracking-widest uppercase mb-1">
                        {item.year}
                      </div>
                      <div className="font-semibold text-gray-900 mb-1">{item.title}</div>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8">
              <div className="flex items-center gap-2 text-green-500 text-xs font-bold tracking-widest uppercase mb-3">
                <span className="w-6 h-0.5 bg-green-400 inline-block" />
                Services
              </div>

              <h2 className="font-display text-2xl text-gray-900 mb-6">What We Do</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    icon: Scale,
                    title: 'Medico-Legal Services',
                    desc: 'Expert medico-legal opinions...',
                  },
                  {
                    icon: GraduationCap,
                    title: 'Medical Education',
                    desc: 'Undergraduate and postgraduate teaching...',
                  },
                  {
                    icon: Microscope,
                    title: 'Research',
                    desc: 'Active research in forensic pathology...',
                  },
                  {
                    icon: ClipboardList,
                    title: 'Autopsy Services',
                    desc: 'Forensic autopsy services...',
                  },
                  {
                    icon: FlaskConical,
                    title: 'Toxicology Analysis',
                    desc: 'Analysis of poisoning cases...',
                  },
                  {
                    icon: Gavel,
                    title: 'Expert Witness',
                    desc: 'Providing expert testimony in courts...',
                  },
                ].map((service, i) => {
                  const Icon = service.icon
                  return (
                    <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-gray-700" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{service.title}</div>
                        <p className="text-gray-500 text-xs mt-1">{service.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <div className="space-y-6">
            {/* HOD Message */}
            {/* {hod && (
              <div className="bg-green-900 rounded-xl p-5 text-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden bg-green-700 flex items-center justify-center ring-2 ring-yellow-400/30">
                  {(hod.photo as any)?.url ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${(hod.photo as any).url}`}
                      alt={hod.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserRound className="w-10 h-10 text-white" />
                  )}
                </div>

                <div className="text-yellow-400 text-xs font-bold uppercase mb-2">
                  Head of Department
                </div>
                <div className="text-white text-lg font-display">{hod.name}</div>

                <Link
                  href={`/faculty/${hod.slug || hod.id}`}
                  className="inline-block mt-4 bg-white/15 hover:bg-white/25 text-white text-xs font-semibold px-4 py-2 rounded-lg"
                >
                  View Profile →
                </Link>
              </div>
            )} */}

            {/* Quick Links */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-display text-lg text-gray-900 mb-4">Quick Links</h3>

              <div className="space-y-2">
                {[
                  { icon: Users, label: 'Faculty Members', href: '/faculty' },
                  { icon: Bell, label: 'Notice Board', href: '/notices' },
                  { icon: Microscope, label: 'Research', href: '/research' },
                  { icon: Phone, label: 'Contact Us', href: '/contact' },
                ].map((link, i) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={i}
                      href={link.href}
                      className="flex items-center justify-between text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 px-3 py-2 rounded-lg"
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {link.label}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-green-50 border border-green-100 rounded-xl p-5 text-center">
              <Phone className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <h3 className="font-display text-gray-900 text-lg mb-1">Get in Touch</h3>
              <p className="text-gray-500 text-xs mb-4">Have questions about our department?</p>
              <Link
                href="/contact"
                className="block bg-green-600 hover:bg-green-500 text-white font-bold text-sm px-4 py-2.5 rounded-lg"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import {
  FileText,
  AlertTriangle,
  Megaphone,
  ClipboardList,
  CalendarDays,
  ArrowRight,
  Bell,
  Users,
  ExternalLink,
  Download,
} from 'lucide-react'
import Image from 'next/image'
import avatar from './../../../public/avatar.jpg'
export const revalidate = 0

const noticeConfig = {
  exam: {
    icon: <FileText className="w-5 h-5 text-yellow-600" />,
    bg: 'bg-yellow-100',
    badge: 'bg-yellow-100 text-yellow-800',
  },
  emergency: {
    icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
    bg: 'bg-red-100',
    badge: 'bg-red-100 text-red-800',
  },
  academic: {
    icon: <Megaphone className="w-5 h-5 text-green-600" />,
    bg: 'bg-green-100',
    badge: 'bg-green-100 text-green-700',
  },
  default: {
    icon: <ClipboardList className="w-5 h-5 text-blue-600" />,
    bg: 'bg-blue-100',
    badge: 'bg-blue-100 text-blue-800',
  },
}

async function getData() {
  const payload = await getPayload({ config })
  const [facultyRes, noticesRes, researchRes, studyRes] = await Promise.all([
    payload.find({
      collection: 'faculty',
      where: { isCurrent: { equals: true } },
      sort: 'order',
      limit: 4,
    }),
    payload.find({
      collection: 'notices',
      where: { isPublished: { equals: true } },
      sort: '-publishDate',
      limit: 4,
    }),
    payload.find({
      collection: 'research',
      where: { isFeatured: { equals: true } },
      sort: '-publishYear',
      limit: 3,
    }),
    payload.find({
      collection: 'study-materials',
      where: { isPublic: { equals: true } },
      sort: '-createdAt',
      limit: 4,
    }),
  ])
  return {
    faculty: facultyRes.docs,
    notices: noticesRes.docs,
    research: researchRes.docs,
    studyMaterials: studyRes.docs,
  }
}

export default async function HomePage() {
  const { faculty, notices, research, studyMaterials } = await getData()

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative bg-green-900 min-h-120 flex items-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#4dc983 1px,transparent 1px),linear-gradient(90deg,#4dc983 1px,transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 80% at 80% 50%,rgba(31,128,80,0.25),transparent 70%)',
          }}
        />

        <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-green-400/15 border border-green-400/30 text-green-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-300 inline-block" />
              Mymensingh Medical College · Est. 1962
            </div>
            <h2 className="font-display text-white text-3xl md:text-4xl lg:text-5xl leading-tight">
              Department of
              <br />
              <span className="text-green-300">Forensic Medicine</span>
              <br />& Toxicology
            </h2>
            <p className="font-bn text-white/50 mt-2 text-sm md:text-base">
              ফরেনসিক মেডিসিন ও টক্সিকোলজি বিভাগ
            </p>
            <p className="text-white/65 text-sm md:text-base leading-relaxed mt-4 max-w-lg">
              Dedicated to excellence in forensic medicine education, medico-legal services, and
              research.
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <Link
                href="/faculty"
                className="flex items-center gap-2 border border-white/25 hover:border-white/50 text-white font-medium text-sm px-6 py-3 rounded-lg transition-all"
              >
                <Users className="w-4 h-4" /> Meet Our Faculty
              </Link>
              <Link
                href="/notices"
                className="flex items-center gap-2 border border-white/25 hover:border-white/50 text-white font-medium text-sm px-6 py-3 rounded-lg transition-all"
              >
                <Bell className="w-4 h-4" /> View Notices
              </Link>
            </div>
          </div>

          {/* Quote Card — desktop only */}
          <div className="hidden lg:block bg-white/6 border border-white/12 rounded-2xl p-7 backdrop-blur-sm">
            <div className="text-yellow-400 text-4xl mb-4 font-display">"</div>
            <p className="text-white/80 text-lg font-display italic leading-relaxed">
              The practice of medicine is an art, not a trade; a calling, not a business; a calling
              in which your heart will be exercised equally with your head.
            </p>
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="text-green-300 text-sm font-semibold">— Sir William Osler</div>
              <div className="text-white/40 text-xs mt-1">Father of Modern Medicine</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NOTICES ── */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-7">
            <div>
              <div className="flex items-center gap-2 text-green-500 text-xs font-bold tracking-widest uppercase mb-2">
                <span className="w-6 h-0.5 bg-green-400 inline-block" />
                Latest Updates
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-gray-900">Notice Board</h2>
            </div>
            <Link
              href="/notices"
              className="text-green-600 font-semibold text-sm flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notices.length > 0 ? (
              notices.map((notice: any) => {
                const config =
                  noticeConfig[notice.category as keyof typeof noticeConfig] ?? noticeConfig.default

                return (
                  <Link
                    key={notice.id}
                    href={`/notices/${notice.id}`}
                    className={`bg-white border rounded-xl p-4 md:p-5 flex gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all ${
                      notice.isImportant
                        ? 'border-l-4 border-l-green-400 border-gray-200'
                        : 'border-gray-200'
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center ${config.bg}`}
                    >
                      {config.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Badge */}
                      <span
                        className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${config.badge}`}
                      >
                        {notice.category}
                      </span>

                      {/* Title */}
                      <div className="font-semibold text-gray-900 text-sm leading-snug mt-1.5 line-clamp-2">
                        {notice.title}
                      </div>

                      {/* Date */}
                      <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {new Date(notice.publishDate).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                  </Link>
                )
              })
            ) : (
              <div className="col-span-2 text-center py-10 text-gray-400">No notices yet.</div>
            )}
          </div>
        </div>
      </section>

      {/* ── FACULTY ── */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-7">
            <div>
              <div className="flex items-center gap-2 text-green-500 text-xs font-bold tracking-widest uppercase mb-2">
                <span className="w-6 h-0.5 bg-green-400 inline-block" />
                Our Team
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-gray-900">Faculty Members</h2>
            </div>
            <Link
              href="/faculty"
              className="text-green-600 font-semibold text-sm flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {faculty.length > 0 ? (
              faculty.map((member: any) => (
                <Link
                  key={member.id}
                  href={`/faculty/${member.slug || member.id}`}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div
                    className={`h-36 md:h-60 relative overflow-hidden
  ${
    member.designation === 'professor-head'
      ? 'bg-gradient-to-br from-green-900 to-green-700'
      : 'bg-gradient-to-br from-green-800 to-green-600'
  }`}
                  >
                    {member.photo && member.photo.url ? (
                      <img
                        src={member.photo.cloudinaryUrl || member.photo.url || ''}
                        alt={member.photo.alt || member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl">
                        <Image src={avatar} width={300} height={300} alt={member.name} />
                      </div>
                    )}
                    {member.designation === 'professor-head' && (
                      <span className="absolute top-2 right-2 z-10 bg-yellow-400 text-green-900 text-xs font-bold px-2 py-0.5 rounded-full">
                        HOD
                      </span>
                    )}
                  </div>
                  <div className="p-3 md:p-4">
                    <div className="font-display text-gray-900 text-sm md:text-base leading-tight">
                      {member.name}
                    </div>
                    <div className="text-green-600 text-xs font-semibold mt-1 capitalize">
                      {member.designation?.replace(/-/g, ' ')}
                    </div>
                    {member.qualifications?.length > 0 && (
                      <div className="text-gray-400 text-xs mt-1">
                        {member.qualifications.map((q: any) => q.degree).join(', ')}
                      </div>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-4 text-center py-10 text-gray-400">No faculty data yet.</div>
            )}
          </div>
        </div>
      </section>

      {/* ── RESEARCH ── */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-7">
            <div>
              <div className="flex items-center gap-2 text-green-500 text-xs font-bold tracking-widest uppercase mb-2">
                <span className="w-6 h-0.5 bg-green-400 inline-block" />
                Academic Work
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-gray-900">
                Research & Publications
              </h2>
            </div>
            <Link
              href="/research"
              className="text-green-600 font-semibold text-sm flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {research.length > 0 ? (
              research.map((item: any) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 hover:shadow-md transition-all group"
                >
                  <div className="flex gap-4 md:gap-6">
                    {/* Year */}
                    <div className="font-display text-3xl md:text-4xl text-green-200 flex-shrink-0 w-12 md:w-16 leading-none mt-1">
                      {item.publishYear}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Category Badge */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-100 px-2.5 py-1 rounded-full">
                          📖 {item.category?.replace(/-/g, ' ')}
                        </span>
                        {item.isFeatured && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-yellow-700 bg-yellow-100 px-2.5 py-1 rounded-full">
                            ⭐ Featured
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <div className="font-semibold text-gray-900 text-sm md:text-base leading-snug mb-1.5">
                        {item.title}
                      </div>

                      {/* Authors */}
                      {item.facultyAuthors?.length > 0 && (
                        <div className="text-green-600 text-xs font-medium mb-1">
                          {item.facultyAuthors.map((a: any) => a.name || a).join(', ')}
                        </div>
                      )}
                      {item.authors?.length > 0 && (
                        <div className="text-gray-500 text-xs mb-1">
                          {item.authors.map((a: any) => a.authorName).join(', ')}
                        </div>
                      )}

                      {/* Journal */}
                      {item.journal && (
                        <div className="text-gray-400 text-xs italic mb-3">
                          {item.journal}
                          {item.volume ? ` · ${item.volume}` : ''}
                          {item.pages ? ` · pp. ${item.pages}` : ''}
                        </div>
                      )}

                      {/* Links */}
                      <div className="flex flex-wrap items-center gap-3">
                        {item.doi && (
                          <a
                            href={item.doi}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-all"
                          >
                            <ExternalLink className="w-3 h-3" />
                            DOI
                          </a>
                        )}
                        {item.externalLink && (
                          <a
                            href={item.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 px-2.5 py-1 rounded-lg transition-all"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View Online
                          </a>
                        )}
                        {item.file?.url && (
                          <a
                            href={`https://docs.google.com/viewer?url=${encodeURIComponent(item.file.cloudinaryUrl || item.file.url)}&embedded=false`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg transition-all"
                          >
                            <FileText className="w-3 h-3" />
                            PDF
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-400">
                <div className="text-4xl mb-3">🔬</div>
                <p>No research data yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── STUDY MATERIALS ── */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-7">
            <div>
              <div className="flex items-center gap-2 text-green-500 text-xs font-bold tracking-widest uppercase mb-2">
                <span className="w-6 h-0.5 bg-green-400 inline-block" />
                Resources
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-gray-900">Study Materials</h2>
            </div>
            <Link
              href="/study-materials"
              className="text-green-600 font-semibold text-sm flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {studyMaterials.length > 0 ? (
              studyMaterials.map((item: any) => {
                const typeColors: Record<string, string> = {
                  'lecture-note': 'bg-blue-100 text-blue-700',
                  'question-bank': 'bg-yellow-100 text-yellow-700',
                  'case-study': 'bg-purple-100 text-purple-700',
                  guideline: 'bg-green-100 text-green-700',
                  reference: 'bg-red-100 text-red-700',
                  presentation: 'bg-orange-100 text-orange-700',
                }
                const typeColor = typeColors[item.type] || 'bg-gray-100 text-gray-700'

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all flex flex-col"
                  >
                    {/* Type Badge */}
                    <span
                      className={`inline-flex items-center text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 self-start ${typeColor}`}
                    >
                      {item.type?.replace(/-/g, ' ')}
                    </span>

                    {/* Title */}
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2 flex-1 line-clamp-2">
                      {item.title}
                    </h3>

                    {/* Year */}
                    {item.year && (
                      <div className="text-xs text-gray-400 mb-3">
                        {item.year.replace(/-/g, ' ')}
                      </div>
                    )}

                    {/* View Button */}
                    {item.file?.url && (
                      <a
                        href={`https://docs.google.com/viewer?url=${encodeURIComponent(item.file.cloudinaryUrl || item.file.url)}&embedded=false`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 w-full bg-green-600 hover:bg-green-500 text-white text-xs font-bold py-2 rounded-lg transition-all mt-auto"
                      >
                        <Download className="w-3.5 h-3.5" />
                        View / Download
                      </a>
                    )}
                  </div>
                )
              })
            ) : (
              <div className="col-span-4 text-center py-10 text-gray-400">
                <div className="text-4xl mb-3">📚</div>
                <p>No study materials yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      {/* <section className="bg-green-900 py-14 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <h2 className="font-display text-white text-3xl md:text-4xl mb-4">
            Need an Appointment?
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto mb-7">
            Book a medico-legal consultation or academic visit. Our staff will confirm within 24
            hours.
          </p>
          <Link
            href="/appointment"
            className="bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold text-sm md:text-base px-8 md:px-10 py-3 md:py-4 rounded-lg transition-all inline-block"
          >
            📅 Book Appointment Now
          </Link>
        </div>
      </section> */}
    </div>
  )
}

import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import {
  FileText,
  Megaphone,
  ClipboardList,
  AlertTriangle,
  Pin,
  CalendarDays,
  Paperclip,
  ArrowRight,
  Clock,
} from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notice Board',
  description:
    'Official notices and announcements from the Department of Forensic Medicine & Toxicology, Mymensingh Medical College.',
  openGraph: {
    title: 'Notices — Forensic Medicine & Toxicology MMC',
    description: 'Latest notices and announcements from our department.',
  },
}

async function getNotices() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'notices',
    where: { isPublished: { equals: true } },
    sort: '-publishDate',
    limit: 50,
  })
  return docs
}

const categoryConfig: Record<string, { bg: string; text: string; icon: any }> = {
  exam: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    icon: <FileText className="w-5 h-5 text-yellow-600" />,
  },
  academic: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    icon: <Megaphone className="w-5 h-5 text-green-600" />,
  },
  administrative: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    icon: <ClipboardList className="w-5 h-5 text-blue-600" />,
  },
  emergency: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
  },
  general: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    icon: <Pin className="w-5 h-5 text-gray-600" />,
  },
}
export default async function NoticesPage() {
  const notices = await getNotices()

  const categories = ['all', 'exam', 'academic', 'administrative', 'emergency', 'general']

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
            <span>Notices</span>
          </div>
          <h1 className="font-display text-white text-3xl md:text-4xl">Notice Board</h1>
          <p className="text-white/60 mt-2 text-sm md:text-base">
            সকল নোটিশ ও বিজ্ঞপ্তি — All official notices and announcements
          </p>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Notices', count: notices.length },
            { label: 'Important', count: notices.filter((n) => n.isImportant).length },
            { label: 'Exam Related', count: notices.filter((n) => n.category === 'exam').length },
            { label: 'Academic', count: notices.filter((n) => n.category === 'academic').length },
          ].map((stat, i) => (
            <div key={i} className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
              <div className="font-display text-3xl text-green-600">{stat.count}</div>
              <div className="text-xs text-gray-500 font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Important Notices */}
        {notices.filter((n) => n.isImportant).length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-red-500 font-bold text-sm flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Important Notices
              </span>
              <div className="flex-1 h-px bg-red-100" />
            </div>
            <div className="flex flex-col gap-3">
              {notices
                .filter((n) => n.isImportant)
                .map((notice: any) => {
                  const cat = categoryConfig[notice.category] || categoryConfig.general
                  return (
                    <div
                      key={notice.id}
                      className="bg-white border-l-4 border-l-red-400 border border-gray-200 rounded-xl p-4 md:p-5 flex gap-4 hover:shadow-md transition-all"
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center text-lg ${cat.bg}`}
                      >
                        {cat.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span
                            className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${cat.bg} ${cat.text}`}
                          >
                            {notice.category}
                          </span>
                          <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Important
                          </span>
                        </div>
                        <div className="font-semibold text-gray-900 text-sm md:text-base leading-snug">
                          {notice.title}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 mt-2">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <CalendarDays className="w-3.5 h-3.5" />
                            {new Date(notice.publishDate).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </span>
                          {notice.attachments?.length > 0 && (
                            <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                              <Paperclip className="w-3.5 h-3.5" />
                              {notice.attachments.length} Attachment
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        )}

        {/* All Notices */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-gray-700 font-bold text-sm flex items-center gap-1">
              {' '}
              <ClipboardList className="w-3.5 h-3.5" />
              All Notices
            </span>
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">{notices.length} total</span>
          </div>

          {notices.length > 0 ? (
            <div className="flex flex-col gap-4">
              {notices.map((notice: any) => {
                const cat = categoryConfig[notice.category] || categoryConfig.general
                return (
                  <div
                    key={notice.id}
                    className={`bg-white border rounded-xl p-4 md:p-5 flex gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all
                      ${notice.isImportant ? 'border-l-4 border-l-green-400 border-gray-200' : 'border-gray-200'}`}
                  >
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center text-lg ${cat.bg}`}
                    >
                      {cat.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${cat.bg} ${cat.text}`}
                        >
                          {notice.category}
                        </span>
                        {notice.isImportant && (
                          <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Important
                          </span>
                        )}
                      </div>
                      <div className="font-semibold text-gray-900 text-sm md:text-base leading-snug">
                        {notice.title}
                      </div>
                      {notice.titleBn && (
                        <div className="font-bn text-gray-500 text-sm mt-0.5">{notice.titleBn}</div>
                      )}
                      <div className="flex flex-wrap items-center gap-4 mt-2">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <CalendarDays className="w-3.5 h-3.5" />
                          {new Date(notice.publishDate).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                        {notice.expiryDate && (
                          <span className="text-xs text-orange-500 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            Expires:{' '}
                            {new Date(notice.expiryDate).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        )}
                        {notice.attachments?.length > 0 && (
                          <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                            <Paperclip className="w-3.5 h-3.5" />
                            {notice.attachments.length} Attachment
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="text-gray-300 flex-shrink-0 self-center text-lg">
                      <ArrowRight className="w-5 h-5 text-gray-300" />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <div className="text-4xl mb-3">📋</div>
              <div className="font-medium">No notices published yet.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

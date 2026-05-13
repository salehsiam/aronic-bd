import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Calendar,
  Paperclip,
  AlertCircle,
  ArrowLeft,
  Tag,
  ChevronRight,
  Download,
} from 'lucide-react'
import type { Metadata } from 'next'
import RichText from '@/components/ui/RichText'
import PrintButton from '@/components/ui/PrintButton'

export const revalidate = 300
async function getNotice(id: string) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'notices',
    where: { id: { equals: id } },
    limit: 1,
  })
  return docs[0] || null
}

async function getRecentNotices(currentId: string) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'notices',
    where: {
      and: [{ isPublished: { equals: true } }, { id: { not_equals: currentId } }],
    },
    sort: '-publishDate',
    limit: 4,
  })
  return docs
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const notice = await getNotice(id)
  if (!notice) return { title: 'Notice Not Found' }
  return {
    title: notice.title,
    description: `Official notice from Department of Forensic Medicine & Toxicology, MMC.`,
  }
}

const categoryConfig: Record<
  string,
  { bg: string; text: string; icon: string; borderLeft: string }
> = {
  exam: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    icon: '📝',
    borderLeft: 'border-l-yellow-400',
  },
  academic: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    icon: '📢',
    borderLeft: 'border-l-green-400',
  },
  administrative: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    icon: '📋',
    borderLeft: 'border-l-blue-400',
  },
  emergency: { bg: 'bg-red-100', text: 'text-red-800', icon: '🚨', borderLeft: 'border-l-red-400' },
  general: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    icon: '📌',
    borderLeft: 'border-l-gray-400',
  },
}

export default async function NoticeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const notice = await getNotice(id)

  if (!notice) notFound()

  const recentNotices = await getRecentNotices(id)
  const cat = categoryConfig[notice.category as string] || categoryConfig.general

  return (
    <div>
      {/* ── PAGE HEADER — web only ── */}
      <div
        className={`print:hidden py-12 md:py-16 ${notice.isImportant ? 'bg-red-900' : 'bg-green-900'}`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-green-300 text-xs font-bold tracking-widest uppercase mb-4 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/notices" className="hover:text-white transition-colors">
              Notices
            </Link>
            <span>/</span>
            <span className="text-white/60 truncate max-w-xs">{notice.title}</span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${cat.bg} ${cat.text}`}
            >
              {cat.icon} {notice.category as string}
            </span>
            {notice.isImportant && (
              <span className="text-xs bg-red-500 text-white font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Important
              </span>
            )}
          </div>

          <h1 className="font-display text-white text-2xl md:text-3xl lg:text-4xl leading-tight max-w-3xl">
            {notice.title}
          </h1>
          {notice.titleBn && <p className="font-bn text-white/60 text-lg mt-2">{notice.titleBn}</p>}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5 text-white/60 text-sm">
              <Calendar className="w-4 h-4 text-green-300" />
              {new Date(notice.publishDate as string).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>
            {notice.expiryDate && (
              <div className="flex items-center gap-1.5 text-orange-300 text-sm">
                <Calendar className="w-4 h-4" />
                Expires:{' '}
                {new Date(notice.expiryDate as string).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
            )}
            {notice.attachments && (notice.attachments as any[]).length > 0 && (
              <div className="flex items-center gap-1.5 text-green-300 text-sm">
                <Paperclip className="w-4 h-4" />
                {(notice.attachments as any[]).length} Attachment
                {(notice.attachments as any[]).length > 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14 print:py-6 print:px-0 print:max-w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 print:block">
          {/* ── MAIN CONTENT ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Print Notice Title */}
            <div className="hidden print:block mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 border border-gray-400 rounded">
                  {notice.category as string}
                </span>
                {notice.isImportant && (
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 border border-gray-900 rounded">
                    ⚠ IMPORTANT
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{notice.title}</h2>
              {notice.titleBn && <p className="text-lg text-gray-600">{notice.titleBn}</p>}
              <div className="flex gap-6 mt-3 text-sm text-gray-600">
                <span>
                  Published:{' '}
                  {new Date(notice.publishDate as string).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                {notice.expiryDate && (
                  <span>
                    Expires:{' '}
                    {new Date(notice.expiryDate as string).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                )}
              </div>
              <hr className="mt-4 border-gray-400" />
            </div>

            {/* Notice Content */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 print:border-0 print:p-0 print:rounded-none">
              <h2 className="font-display text-xl text-gray-900 mb-4 print:hidden">
                Notice Details
              </h2>
              {notice.content ? (
                <RichText content={notice.content} />
              ) : (
                <div className="text-center py-8 text-gray-400 print:hidden">
                  <div className="text-4xl mb-3">{cat.icon}</div>
                  <p className="text-sm">No additional content for this notice.</p>
                  <p className="text-xs mt-1">Please check the attachments below if available.</p>
                </div>
              )}
            </div>

            {/* Attachments */}
            {notice.attachments && (notice.attachments as any[]).length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 print:border-0 print:p-0 print:mt-6">
                <h2 className="font-display text-xl text-gray-900 mb-4 flex items-center gap-2">
                  <Paperclip className="w-5 h-5 text-green-500 print:hidden" />
                  Attachments
                </h2>
                <div className="space-y-3">
                  {(notice.attachments as any[]).map((attachment: any, i: number) => {
                    const fileUrl = attachment.file?.cloudinaryUrl || attachment.file?.url || ''
                    const mimeType = attachment.file?.mimeType || ''
                    const isImage = mimeType.startsWith('image/')
                    const isPDF = mimeType === 'application/pdf'

                    return (
                      <div key={i}>
                        {/* Image Preview */}
                        {isImage && (
                          <div className="print:hidden rounded-xl overflow-hidden border border-gray-200">
                            <img
                              src={fileUrl}
                              alt={attachment.label || `Attachment ${i + 1}`}
                              className="w-full max-h-96 object-contain bg-gray-50"
                              loading="lazy"
                              decoding="async"
                            />
                            {attachment.label && (
                              <div className="p-3 bg-gray-50 border-t border-gray-200">
                                <p className="text-xs text-gray-500 font-medium">
                                  {attachment.label || `Attachment ${i + 1}`}
                                </p>
                              </div>
                            )}
                            <div className="p-3 bg-gray-50 border-t border-gray-100">
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs text-green-600 font-bold hover:underline"
                              >
                                <Download className="w-3.5 h-3.5" />
                                Download Image
                              </a>
                            </div>
                          </div>
                        )}

                        {/* PDF View */}
                        {isPDF && (
                          <a
                            href={`https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=false`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="print:hidden flex items-center gap-3 p-3 md:p-4 bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-200 rounded-xl transition-all group"
                          >
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <span className="text-2xl">📄</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold text-gray-900 truncate">
                                {attachment.label || `Attachment ${i + 1}`}
                              </div>
                              <div className="text-xs text-gray-400 mt-0.5">Click to view PDF</div>
                            </div>
                            <div className="flex-shrink-0 flex items-center gap-1 text-green-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                              View <ChevronRight className="w-4 h-4" />
                            </div>
                          </a>
                        )}

                        {/* Other file types */}
                        {!isImage && !isPDF && (
                          <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="print:hidden flex items-center gap-3 p-3 md:p-4 bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-200 rounded-xl transition-all group"
                          >
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <span className="text-2xl">📎</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold text-gray-900 truncate">
                                {attachment.label || `Attachment ${i + 1}`}
                              </div>
                              <div className="text-xs text-gray-400 mt-0.5">Click to download</div>
                            </div>
                            <div className="flex-shrink-0 flex items-center gap-1 text-green-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                              Download <ChevronRight className="w-4 h-4" />
                            </div>
                          </a>
                        )}

                        {/* Print view */}
                        <div className="hidden print:flex items-center gap-2 py-2 border-b border-gray-200">
                          <span>{isImage ? '🖼️' : '📄'}</span>
                          <span className="text-sm">
                            {attachment.label || `Attachment ${i + 1}`}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Print Signature */}
            <div className="hidden print:block mt-16">
              <div className="flex justify-end items-end">
                <div className="text-center">
                  <div className="border-t border-gray-900 w-48 mb-2" />
                  <p className="text-sm font-semibold">Authorized Signature</p>
                  <p className="text-xs text-gray-600">Head of Department</p>
                  <p className="text-xs text-gray-600">Dept. of Forensic Medicine & Toxicology</p>
                  <p className="text-xs text-gray-600">Mymensingh Medical College</p>
                </div>
                {/* <div className="text-center">
                  <div className="border-t border-gray-900 w-48 mb-2" />
                  <p className="text-sm font-semibold">Official Seal</p>
                </div> */}
              </div>
            </div>

            {/* Action Buttons — web only */}
            <div className="print:hidden flex flex-wrap items-center gap-3 mt-2">
              <PrintButton />
              <Link
                href="/notices"
                className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm hover:gap-3 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to All Notices
              </Link>
            </div>
          </div>

          {/* ── SIDEBAR — web only ── */}
          <div className="space-y-5 print:hidden">
            {/* Notice Info */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-display text-lg text-gray-900 mb-4">Notice Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" /> Category
                  </span>
                  <span
                    className={`font-bold capitalize px-2 py-0.5 rounded-full text-xs ${cat.bg} ${cat.text}`}
                  >
                    {notice.category as string}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-gray-100 pt-3">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Published
                  </span>
                  <span className="font-medium text-gray-900 text-xs">
                    {new Date(notice.publishDate as string).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                {notice.expiryDate && (
                  <div className="flex justify-between items-center text-sm border-t border-gray-100 pt-3">
                    <span className="text-gray-500 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> Expires
                    </span>
                    <span className="font-medium text-orange-600 text-xs">
                      {new Date(notice.expiryDate as string).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center text-sm border-t border-gray-100 pt-3">
                  <span className="text-gray-500">Status</span>
                  <span className="font-medium text-green-600 text-xs">
                    {notice.isPublished ? '✅ Published' : '⏳ Draft'}
                  </span>
                </div>
                {notice.attachments && (notice.attachments as any[]).length > 0 && (
                  <div className="flex justify-between items-center text-sm border-t border-gray-100 pt-3">
                    <span className="text-gray-500 flex items-center gap-1.5">
                      <Paperclip className="w-3.5 h-3.5" /> Files
                    </span>
                    <span className="font-medium text-gray-900 text-xs">
                      {(notice.attachments as any[]).length} file
                      {(notice.attachments as any[]).length > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Notices */}
            {recentNotices.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="font-display text-lg text-gray-900 mb-4">Recent Notices</h3>
                <div className="space-y-3">
                  {recentNotices.map((item: any) => {
                    const itemCat = categoryConfig[item.category] || categoryConfig.general
                    return (
                      <Link
                        key={item.id}
                        href={`/notices/${item.id}`}
                        className="flex gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors group"
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-sm ${itemCat.bg}`}
                        >
                          {itemCat.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-green-600 transition-colors">
                            {item.title}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {new Date(item.publishDate).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
                <Link
                  href="/notices"
                  className="flex items-center justify-center gap-1 mt-4 text-green-600 text-xs font-bold hover:underline"
                >
                  View All Notices <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            )}

            {/* Quick Links */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-display text-lg text-gray-900 mb-3">Quick Links</h3>
              <div className="space-y-2">
                {[
                  { label: '📢 All Notices', href: '/notices' },
                  { label: '👨‍⚕️ Faculty', href: '/faculty' },
                  { label: '🔬 Research', href: '/research' },
                  { label: '📞 Contact Us', href: '/contact' },
                ].map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="flex items-center justify-between text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 px-3 py-2 rounded-lg transition-all"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

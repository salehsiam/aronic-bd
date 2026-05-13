import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import {
  BookOpen,
  Mic,
  BookMarked,
  GraduationCap,
  BarChart3,
  Star,
  FileText,
  ExternalLink,
  Link as LinkIcon,
} from 'lucide-react'
import type { Metadata } from 'next'
export const revalidate = 300

export const metadata: Metadata = {
  title: 'Research & Publications',
  description:
    'Research publications and academic contributions by the faculty of Forensic Medicine & Toxicology Department, Mymensingh Medical College.',
  openGraph: {
    title: 'Research — Forensic Medicine & Toxicology MMC',
    description: 'Academic research and publications by our faculty.',
  },
}

async function getResearch() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'research',
    sort: '-publishYear',
    limit: 100,
  })
  return docs
}

const categoryConfig: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  'journal-article': {
    bg: 'bg-green-100',
    text: 'text-green-700',
    icon: <BookOpen className="w-3 h-3" />,
  },
  'conference-paper': {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    icon: <Mic className="w-3 h-3" />,
  },
  'book-chapter': {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    icon: <BookMarked className="w-3 h-3" />,
  },
  thesis: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
    icon: <GraduationCap className="w-3 h-3" />,
  },
}

export default async function ResearchPage() {
  const research = await getResearch()

  const grouped = research.reduce((acc: Record<number, any[]>, item: any) => {
    const year = item.publishYear
    if (!acc[year]) acc[year] = []
    acc[year].push(item)
    return acc
  }, {})

  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a))

  const totalByCategory = {
    'journal-article': research.filter((r: any) => r.category === 'journal-article').length,
    'conference-paper': research.filter((r: any) => r.category === 'conference-paper').length,
    'book-chapter': research.filter((r: any) => r.category === 'book-chapter').length,
    thesis: research.filter((r: any) => r.category === 'thesis').length,
  }

  return (
    <div>
      <div className="bg-green-900 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2 text-green-300 text-xs font-bold tracking-widest uppercase mb-3">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span>Research</span>
          </div>
          <h1 className="font-display text-white text-3xl md:text-4xl">Research & Publications</h1>
          <p className="text-white/60 mt-2 text-sm md:text-base">
            গবেষণা ও প্রকাশনা — Academic contributions by our faculty
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            {
              label: 'Total Publications',
              count: research.length,
              icon: <BarChart3 className="w-6 h-6 mx-auto" />,
              bg: 'bg-green-50',
              border: 'border-green-100',
            },
            {
              label: 'Journal Articles',
              count: totalByCategory['journal-article'],
              icon: <BookOpen className="w-6 h-6 mx-auto" />,
              bg: 'bg-blue-50',
              border: 'border-blue-100',
            },
            {
              label: 'Conference Papers',
              count: totalByCategory['conference-paper'],
              icon: <Mic className="w-6 h-6 mx-auto" />,
              bg: 'bg-purple-50',
              border: 'border-purple-100',
            },
            {
              label: 'Book Chapters',
              count: totalByCategory['book-chapter'],
              icon: <BookMarked className="w-6 h-6 mx-auto" />,
              bg: 'bg-yellow-50',
              border: 'border-yellow-100',
            },
          ].map((stat, i) => (
            <div key={i} className={`${stat.bg} border ${stat.border} rounded-xl p-4 text-center`}>
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="font-display text-3xl text-gray-900">{stat.count}</div>
              <div className="text-xs text-gray-500 font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {research.filter((r: any) => r.isFeatured).length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-5">
              <Star className="w-4 h-4 text-green-600" />
              <span className="text-green-600 font-bold text-sm">Featured Research</span>
              <div className="flex-1 h-px bg-green-100" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {research
                .filter((r: any) => r.isFeatured)
                .map((item: any) => {
                  const cat = categoryConfig[item.category] || categoryConfig['journal-article']
                  return (
                    <div
                      key={item.id}
                      className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl p-5 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`text-xs font-bold flex items-center gap-1 uppercase tracking-wider px-2 py-0.5 rounded-full ${cat.bg} ${cat.text}`}
                        >
                          {cat.icon} {item.category?.replace(/-/g, ' ')}
                        </span>
                        <span className="text-xs text-gray-400">{item.publishYear}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base leading-snug mb-2">
                        {item.title}
                      </h3>
                      {item.facultyAuthors?.length > 0 && (
                        <p className="text-green-600 text-xs font-medium">
                          {item.facultyAuthors.map((a: any) => a.name || a).join(', ')}
                        </p>
                      )}
                      {item.authors?.length > 0 && (
                        <p className="text-gray-500 text-xs mt-0.5">
                          {item.authors.map((a: any) => a.authorName).join(', ')}
                        </p>
                      )}
                      {item.journal && (
                        <p className="text-gray-400 text-xs mt-1 italic">{item.journal}</p>
                      )}
                      {item.abstract && (
                        <p className="text-gray-500 text-xs mt-3 leading-relaxed line-clamp-3">
                          {item.abstract}
                        </p>
                      )}
                      <div className="flex gap-3 mt-4">
                        {item.doi && (
                          <a
                            href={item.doi}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-green-600 font-semibold hover:underline flex items-center gap-1"
                          >
                            <LinkIcon className="w-3 h-3" /> DOI
                          </a>
                        )}
                        {item.externalLink && (
                          <a
                            href={item.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" /> View Online
                          </a>
                        )}
                        {item.file?.url && (
                          <a
                            href={`https://docs.google.com/viewer?url=${encodeURIComponent(item.file.url)}&embedded=false`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-red-600 font-semibold hover:underline flex items-center gap-1"
                          >
                            <FileText className="w-3 h-3" /> PDF
                          </a>
                        )}
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        )}

        {years.length > 0 ? (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-gray-700 font-bold text-sm">📋 All Publications</span>
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">{research.length} total</span>
            </div>

            <div className="space-y-10">
              {years.map((year) => (
                <div key={year}>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="font-display text-4xl text-green-200 leading-none w-16 flex-shrink-0">
                      {year}
                    </div>
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400">
                      {grouped[Number(year)].length} publication
                      {grouped[Number(year)].length > 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="flex flex-col gap-4 ml-0 md:ml-20">
                    {grouped[Number(year)].map((item: any) => {
                      const cat = categoryConfig[item.category] || categoryConfig['journal-article']
                      return (
                        <div
                          key={item.id}
                          className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
                        >
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span
                              className={`text-xs font-bold flex items-center gap-1 uppercase tracking-wider px-2 py-0.5 rounded-full ${cat.bg} ${cat.text}`}
                            >
                              {cat.icon} {item.category?.replace(/-/g, ' ')}
                            </span>
                            {item.isFeatured && (
                              <span className="text-xs bg-yellow-100 text-yellow-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Star className="w-3 h-3" /> Featured
                              </span>
                            )}
                          </div>

                          <h3 className="font-semibold text-gray-900 text-sm md:text-base leading-snug mb-2">
                            {item.title}
                          </h3>

                          <div className="flex flex-wrap gap-1 mb-1">
                            {item.facultyAuthors?.length > 0 && (
                              <span className="text-green-600 text-xs font-medium">
                                {item.facultyAuthors.map((a: any) => a.name || a).join(', ')}
                              </span>
                            )}
                            {item.authors?.length > 0 && (
                              <span className="text-gray-500 text-xs">
                                {item.facultyAuthors?.length > 0 ? ', ' : ''}
                                {item.authors.map((a: any) => a.authorName).join(', ')}
                              </span>
                            )}
                          </div>

                          {item.journal && (
                            <p className="text-gray-400 text-xs italic">
                              {item.journal}
                              {item.volume ? ` · ${item.volume}` : ''}
                              {item.pages ? ` · pp. ${item.pages}` : ''}
                            </p>
                          )}

                          {item.abstract && (
                            <p className="text-gray-500 text-xs mt-2 leading-relaxed line-clamp-2">
                              {item.abstract}
                            </p>
                          )}

                          <div className="flex gap-4 mt-3">
                            {item.doi && (
                              <a
                                href={item.doi}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-green-600 font-semibold hover:underline flex items-center gap-1"
                              >
                                <LinkIcon className="w-3 h-3" /> DOI
                              </a>
                            )}
                            {item.externalLink && (
                              <a
                                href={item.externalLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
                              >
                                <ExternalLink className="w-3 h-3" /> PubMed / View
                              </a>
                            )}
                            {item.file?.url && (
                              <a
                                href={`https://docs.google.com/viewer?url=${encodeURIComponent(item.file.url)}&embedded=false`}
                                target="_blank"
                                className="text-xs text-red-600 font-semibold hover:underline flex items-center gap-1"
                              >
                                <FileText className="w-3 h-3" /> PDF
                              </a>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <div className="font-medium text-lg">No research publications yet.</div>
            <p className="text-sm mt-2">Add research from the admin panel.</p>
          </div>
        )}
      </div>
    </div>
  )
}

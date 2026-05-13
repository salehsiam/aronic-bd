import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import {
  FileText,
  BookOpen,
  HelpCircle,
  BookMarked,
  FileCheck,
  Download,
  ChevronRight,
} from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Study Materials',
  description:
    'Study materials for students of Forensic Medicine & Toxicology, Mymensingh Medical College.',
}

async function getStudyMaterials() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'study-materials',
    where: { isPublic: { equals: true } },
    sort: '-createdAt',
    limit: 100,
  })
  return docs
}

const typeConfig: Record<string, { icon: any; color: string; label: string }> = {
  'lecture-note': { icon: BookOpen, color: 'bg-blue-100 text-blue-700', label: 'Lecture Note' },
  'question-bank': {
    icon: HelpCircle,
    color: 'bg-yellow-100 text-yellow-700',
    label: 'Question Bank',
  },
  'case-study': { icon: FileText, color: 'bg-purple-100 text-purple-700', label: 'Case Study' },
  guideline: { icon: FileCheck, color: 'bg-green-100 text-green-700', label: 'Guideline' },
  reference: { icon: BookMarked, color: 'bg-red-100 text-red-700', label: 'Reference' },
  presentation: {
    icon: FileText,
    color: 'bg-orange-100 text-orange-700',
    label: 'Presentation',
  },
}

const subjectConfig: Record<string, string> = {
  'forensic-medicine': 'Forensic Medicine',
  toxicology: 'Toxicology',
  'medical-jurisprudence': 'Medical Jurisprudence',
  'forensic-pathology': 'Forensic Pathology',
}

const yearConfig: Record<string, string> = {
  '1st-year': '1st Year',
  '2nd-year': '2nd Year',
  '3rd-year': '3rd Year',
  '4th-year': '4th Year',
  'final-year': 'Final Year',
  'all-years': 'All Years',
}

export default async function StudyMaterialsPage() {
  const materials = await getStudyMaterials()

  // Group by subject
  const grouped = materials.reduce((acc: Record<string, any[]>, item: any) => {
    const subject = item.subject || 'other'
    if (!acc[subject]) acc[subject] = []
    acc[subject].push(item)
    return acc
  }, {})

  const subjects = Object.keys(grouped)

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
            <span>Study Materials</span>
          </div>
          <h1 className="font-display text-white text-3xl md:text-4xl">Study Materials</h1>
          <p className="text-white/60 mt-2 text-sm md:text-base">
            স্টাডি ম্যাটেরিয়াল — Lecture notes, question banks & more
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Materials', count: materials.length, icon: '📚' },
            {
              label: 'Lecture Notes',
              count: materials.filter((m: any) => m.type === 'lecture-note').length,
              icon: '📖',
            },
            {
              label: 'Question Banks',
              count: materials.filter((m: any) => m.type === 'question-bank').length,
              icon: '❓',
            },
            {
              label: 'Case Studies',
              count: materials.filter((m: any) => m.type === 'case-study').length,
              icon: '🔬',
            },
          ].map((stat, i) => (
            <div key={i} className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="font-display text-3xl text-green-600">{stat.count}</div>
              <div className="text-xs text-gray-500 font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Materials */}
        {subjects.length > 0 ? (
          <div className="space-y-10">
            {subjects.map((subject) => (
              <div key={subject}>
                {/* Subject Header */}
                <div className="flex items-center gap-3 mb-5">
                  <h2 className="font-display text-xl md:text-2xl text-gray-900">
                    {subjectConfig[subject] || subject}
                  </h2>
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400">
                    {grouped[subject].length} material{grouped[subject].length > 1 ? 's' : ''}
                  </span>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {grouped[subject].map((item: any) => {
                    const typeInfo = typeConfig[item.type] || typeConfig['lecture-note']
                    const Icon = typeInfo.icon
                    return (
                      <div
                        key={item.id}
                        className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 hover:shadow-md transition-all flex flex-col"
                      >
                        {/* Type & Year */}
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${typeInfo.color}`}
                          >
                            <Icon className="w-3 h-3" />
                            {typeInfo.label}
                          </span>
                          {item.year && (
                            <span className="text-xs text-gray-400 font-medium bg-gray-100 px-2 py-0.5 rounded-full">
                              {yearConfig[item.year] || item.year}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2 flex-1">
                          {item.title}
                        </h3>

                        {/* Description */}
                        {item.description && (
                          <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">
                            {item.description}
                          </p>
                        )}

                        {/* Uploaded By */}
                        {item.uploadedBy && (
                          <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
                            {item.uploadedBy.name}
                          </p>
                        )}

                        {/* Download Button */}
                        {item.file?.url && (
                          <a
                            href={`https://docs.google.com/viewer?url=${encodeURIComponent(item.file.cloudinaryUrl || item.file.url)}&embedded=false`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white text-xs font-bold py-2.5 rounded-lg transition-all mt-auto"
                          >
                            <Download className="w-3.5 h-3.5" />
                            View / Download
                          </a>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">📚</div>
            <div className="font-medium text-lg">No study materials available yet.</div>
            <p className="text-sm mt-2">Check back later or contact the department.</p>
          </div>
        )}
      </div>
    </div>
  )
}

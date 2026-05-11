import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import RichText from '@/components/ui/RichText'
import Image from 'next/image'
import avatar from './../../../../../public/avatar.jpg'
export const revalidate = 0

async function getFacultyMember(slug: string) {
  const payload = await getPayload({ config })

  // প্রথমে slug দিয়ে খোঁজো
  const { docs } = await payload.find({
    collection: 'faculty',
    where: {
      or: [{ slug: { equals: slug } }, { id: { equals: slug } }],
    },
    limit: 1,
  })

  return docs[0] || null
}

async function getRelatedResearch(facultyId: string) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'research',
    where: {
      facultyAuthors: { contains: facultyId },
    },
    sort: '-publishYear',
    limit: 5,
  })
  return docs
}

const designationLabel: Record<string, string> = {
  'professor-head': 'Professor & Head',
  professor: 'Professor',
  'associate-professor': 'Associate Professor',
  'assistant-professor': 'Assistant Professor',
  lecturer: 'Lecturer',
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const member = await getFacultyMember(slug)

  if (!member) {
    return { title: 'Faculty Not Found' }
  }

  return {
    title: member.name,
    description: `Profile of ${member.name}, ${member.designation?.replace(/-/g, ' ')} at the Department of Forensic Medicine & Toxicology, Mymensingh Medical College.`,
    openGraph: {
      title: `${member.name} — Forensic Medicine MMC`,
      description: `${member.name} — ${member.designation?.replace(/-/g, ' ')} at MMC Forensic Medicine Department.`,
      images: (member.photo as any)?.url ? [{ url: (member.photo as any).url }] : [],
    },
  }
}
export default async function FacultyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const member = await getFacultyMember(slug)

  if (!member) notFound()

  const research = await getRelatedResearch(member.id)

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
            <Link href="/faculty" className="hover:text-white transition-colors">
              Faculty
            </Link>
            <span>/</span>
            <span className="text-white/60">{member.name}</span>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
            {/* Photo */}
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-full flex-shrink-0 overflow-hidden ring-4 ring-yellow-400/30 bg-green-700 flex items-center justify-center text-6xl">
              {(member.photo as any)?.url ? (
                <img
                  src={(member.photo as any).url}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image src={avatar} width={300} height={300} alt={member.name} />
              )}
            </div>

            {/* Info */}
            <div className="text-center md:text-left">
              {member.designation === 'professor-head' && (
                <div className="inline-block bg-yellow-400 text-green-900 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3">
                  Head of Department
                </div>
              )}
              <h1 className="font-display text-white text-2xl md:text-4xl leading-tight">
                {member.name}
              </h1>
              {member.nameBn && (
                <p className="font-bn text-green-300 text-lg mt-1">{member.nameBn}</p>
              )}
              <p className="text-green-300 font-semibold mt-2">
                {designationLabel[member.designation as string] || member.designation}
              </p>
              {member.qualifications && (member.qualifications as any[]).length > 0 && (
                <p className="text-white/60 text-sm mt-2">
                  {(member.qualifications as any[]).map((q) => q.degree).join(', ')}
                </p>
              )}
              {member.specialization && (
                <p className="text-white/50 text-sm mt-1">
                  Specialization: {member.specialization as string}
                </p>
              )}

              {/* Contact */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 text-green-300 hover:text-white text-sm transition-colors"
                  >
                    ✉️ {member.email as string}
                  </a>
                )}
                {member.phone && (
                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center gap-2 text-green-300 hover:text-white text-sm transition-colors"
                  >
                    📞 {member.phone as string}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── LEFT — Main Content ── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Biography */}
            {member.bio && (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="font-display text-xl text-gray-900 mb-4">Biography</h2>
                <RichText content={member.bio} />
              </div>
            )}

            {/* Research Interests */}
            {member.researchInterests && (member.researchInterests as any[]).length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="font-display text-xl text-gray-900 mb-4">Research Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {(member.researchInterests as any[]).map((item, i) => (
                    <span
                      key={i}
                      className="bg-green-50 text-green-700 border border-green-200 text-sm font-medium px-3 py-1.5 rounded-full"
                    >
                      {item.interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Publications / Research */}
            {research.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="font-display text-xl text-gray-900 mb-5">Publications</h2>
                <div className="flex flex-col gap-4">
                  {research.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                    >
                      <div className="font-display text-2xl text-green-200 flex-shrink-0 w-12 leading-none mt-0.5">
                        {item.publishYear}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm leading-snug">
                          {item.title}
                        </div>
                        {item.journal && (
                          <div className="text-gray-400 text-xs mt-1 italic">{item.journal}</div>
                        )}
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full mt-2">
                          📖 {item.category?.replace(/-/g, ' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT — Sidebar ── */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-display text-lg text-gray-900 mb-4">Quick Info</h3>
              <div className="space-y-3">
                {member.designation && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Position</span>
                    <span className="font-medium text-gray-900 text-right">
                      {designationLabel[member.designation as string]}
                    </span>
                  </div>
                )}
                {member.publications !== null && member.publications !== undefined && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Publications</span>
                    <span className="font-medium text-gray-900">
                      {member.publications as number}
                    </span>
                  </div>
                )}
                {member.joinDate && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Joined</span>
                    <span className="font-medium text-gray-900">
                      {new Date(member.joinDate as string).toLocaleDateString('en-GB', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                )}
                {member.specialization && (
                  <div className="flex justify-between text-sm gap-4">
                    <span className="text-gray-500 flex-shrink-0">Specialization</span>
                    <span className="font-medium text-gray-900 text-right">
                      {member.specialization as string}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Qualifications */}
            {member.qualifications && (member.qualifications as any[]).length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="font-display text-lg text-gray-900 mb-4">Qualifications</h3>
                <div className="space-y-2">
                  {(member.qualifications as any[]).map((q, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                      <span className="text-sm text-gray-700 font-medium">{q.degree}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Card */}
            {(member.email || member.phone) && (
              <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                <h3 className="font-display text-lg text-gray-900 mb-4">Contact</h3>
                <div className="space-y-3">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-3 text-sm text-green-700 hover:text-green-900 transition-colors"
                    >
                      <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        ✉️
                      </span>
                      <span className="break-all">{member.email as string}</span>
                    </a>
                  )}
                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center gap-3 text-sm text-green-700 hover:text-green-900 transition-colors"
                    >
                      <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        📞
                      </span>
                      <span>{member.phone as string}</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Book Appointment */}
            {/* <div className="bg-green-900 rounded-xl p-5 text-center">
              <div className="text-2xl mb-2">📅</div>
              <h3 className="font-display text-white text-lg mb-2">Book Appointment</h3>
              <p className="text-white/60 text-xs mb-4">
                Schedule a consultation with this faculty member
              </p>
              <Link
                href="/appointment"
                className="block bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold text-sm px-4 py-2.5 rounded-lg transition-all"
              >
                Book Now
              </Link>
            </div> */}

            {/* Back */}
            <Link
              href="/faculty"
              className="flex items-center gap-2 text-green-600 font-semibold text-sm hover:gap-3 transition-all"
            >
              ← Back to All Faculty
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

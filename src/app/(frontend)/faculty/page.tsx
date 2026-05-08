import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { User, Mail, Phone, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
export const revalidate = 0
export const metadata: Metadata = {
  title: 'Faculty Members',
  description:
    'Meet the dedicated faculty members of the Department of Forensic Medicine & Toxicology at Mymensingh Medical College.',
  openGraph: {
    title: 'Faculty — Forensic Medicine & Toxicology MMC',
    description: 'Meet our expert forensic medicine faculty members.',
  },
}

async function getFaculty() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'faculty',
    where: { isCurrent: { equals: true } },
    sort: 'order',
    limit: 100,
  })
  return docs
}

const designationOrder = [
  'professor-head',
  'professor',
  'associate-professor',
  'assistant-professor',
  'lecturer',
]

const designationLabel: Record<string, string> = {
  'professor-head': 'Professor & Head',
  professor: 'Professor',
  'associate-professor': 'Associate Professor',
  'assistant-professor': 'Assistant Professor',
  lecturer: 'Lecturer',
}

export default async function FacultyPage() {
  const faculty = await getFaculty()

  const grouped = designationOrder.reduce(
    (acc, desig) => {
      const group = faculty.filter((f: any) => f.designation === desig)
      if (group.length > 0) acc[desig] = group
      return acc
    },
    {} as Record<string, any[]>,
  )

  const hod = faculty.find((f: any) => f.designation === 'professor-head')

  return (
    <div>
      {/* HEADER */}
      <div className="bg-green-900 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2 text-green-300 text-xs font-bold tracking-widest uppercase mb-3">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span>Faculty</span>
          </div>
          <h1 className="font-display text-white text-3xl md:text-4xl">Faculty Members</h1>
          <p className="text-white/60 mt-2 text-sm md:text-base">
            Meet our dedicated team of forensic medicine experts
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
        {/* HOD */}
        {hod && (
          <div className="bg-gradient-to-br from-green-900 to-green-700 rounded-2xl p-6 md:p-8 mb-12 flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-green-600 flex-shrink-0 flex items-center justify-center ring-4 ring-yellow-400/40 overflow-hidden">
              {(hod?.photo as any)?.url ? (
                <img
                  src={(hod.photo as any).cloudinaryUrl || (hod.photo as any).url || ''}
                  alt={hod.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 md:w-12 md:h-12 text-white" />
              )}
            </div>

            <div className="text-center md:text-left flex-1">
              <div className="inline-block bg-yellow-400 text-green-900 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3">
                Head of Department
              </div>
              <h2 className="font-display text-white text-2xl md:text-3xl">{hod.name}</h2>
              {hod.nameBn && <p className="font-bn text-green-300 text-base mt-1">{hod.nameBn}</p>}
              {(hod.qualifications as any)?.length > 0 && (
                <p className="text-green-200 text-sm mt-2">
                  {(hod.qualifications as any).map((q: any) => q.degree).join(', ')}
                </p>
              )}
              {hod.specialization && (
                <p className="text-white/60 text-sm mt-1">Specialization: {hod.specialization}</p>
              )}

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                {hod.email && (
                  <a
                    href={`mailto:${hod.email}`}
                    className="text-green-300 hover:text-white text-sm flex items-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-4 h-4" /> {hod.email}
                  </a>
                )}
                {hod.phone && (
                  <a
                    href={`tel:${hod.phone}`}
                    className="text-green-300 hover:text-white text-sm flex items-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-4 h-4" /> {hod.phone}
                  </a>
                )}
              </div>

              <Link
                href={`/faculty/${hod.slug || hod.id}`}
                className="inline-block mt-4 bg-white/15 hover:bg-white/25 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all"
              >
                View Full Profile <ArrowRight className="w-4 h-4 inline" />
              </Link>
            </div>
          </div>
        )}

        {/* GROUPED */}
        {Object.entries(grouped).map(
          ([desig, members]) =>
            desig !== 'professor-head' && (
              <div key={desig} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="font-display text-xl md:text-2xl text-gray-900">
                    {designationLabel[desig]}
                  </h2>
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400 font-medium">
                    {members.length} member{members.length > 1 ? 's' : ''}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {members.map((member: any) => (
                    <Link
                      key={member.id}
                      href={`/faculty/${member.slug || member.id}`}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all group"
                    >
                      <div className="h-40 md:h-48 relative bg-gradient-to-br from-green-800 to-green-600 overflow-hidden">
                        {member.photo?.url ? (
                          <img
                            src={
                              (member?.photo as any).cloudinaryUrl ||
                              (member?.photo as any).url ||
                              ''
                            }
                            alt={member.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User className="w-10 h-10 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="p-3 md:p-4">
                        <div className="font-display text-gray-900 text-sm md:text-base leading-tight">
                          {member.name}
                        </div>
                        {member.nameBn && (
                          <div className="font-bn text-gray-500 text-xs mt-0.5">
                            {member.nameBn}
                          </div>
                        )}
                        {member.qualifications?.length > 0 && (
                          <div className="text-gray-400 text-xs mt-1">
                            {member.qualifications.map((q: any) => q.degree).join(', ')}
                          </div>
                        )}
                        {member.specialization && (
                          <div className="text-gray-400 text-xs mt-1 truncate">
                            {member.specialization}
                          </div>
                        )}
                        <div className="mt-3 text-green-600 text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                          View Profile <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ),
        )}

        {/* EMPTY */}
        {faculty.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4 flex justify-center">
              <User className="w-12 h-12 text-gray-300" />
            </div>
            <div className="font-medium text-lg">No faculty members found.</div>
          </div>
        )}

        {/* FOOTER LINK */}
        {/* <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            Looking for former faculty members?
            <Link
              href="/faculty/former"
              className="text-green-600 font-semibold ml-1 hover:underline"
            >
              View Former Faculty
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  )
}

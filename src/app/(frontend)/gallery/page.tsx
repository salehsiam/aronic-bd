import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import GalleryGrid from '@/components/ui/GalleryGrid'
import {
  Folder,
  Camera,
  PartyPopper,
  GraduationCap,
  Hospital,
  FlaskConical,
  Calendar,
} from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description:
    'Photo gallery of the Department of Forensic Medicine & Toxicology, Mymensingh Medical College.',
  openGraph: {
    title: 'Gallery — Forensic Medicine & Toxicology MMC',
    description: 'Photos from our department events and activities.',
  },
}

async function getGallery() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'gallery',
    where: { isPublished: { equals: true } },
    sort: '-date',
    limit: 50,
  })
  return docs
}

const categoryConfig: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  department: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    icon: <Hospital className="w-3 h-3" />,
  },
  event: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    icon: <PartyPopper className="w-3 h-3" />,
  },
  academic: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    icon: <GraduationCap className="w-3 h-3" />,
  },
  lab: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
    icon: <FlaskConical className="w-3 h-3" />,
  },
}

export default async function GalleryPage() {
  const albums = await getGallery()
  const totalImages = albums.reduce(
    (acc: number, album: any) => acc + (album.images?.length || 0),
    0,
  )

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
            <span>Gallery</span>
          </div>
          <h1 className="font-display text-white text-3xl md:text-4xl">Photo Gallery</h1>
          <p className="text-white/60 mt-2 text-sm md:text-base">
            ফটো গ্যালারি — Moments from our department
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            {
              label: 'Total Albums',
              count: albums.length,
              icon: <Folder className="w-6 h-6 mx-auto" />,
            },
            {
              label: 'Total Photos',
              count: totalImages,
              icon: <Camera className="w-6 h-6 mx-auto" />,
            },
            {
              label: 'Events',
              count: albums.filter((a: any) => a.category === 'event').length,
              icon: <PartyPopper className="w-6 h-6 mx-auto" />,
            },
            {
              label: 'Academic',
              count: albums.filter((a: any) => a.category === 'academic').length,
              icon: <GraduationCap className="w-6 h-6 mx-auto" />,
            },
          ].map((stat, i) => (
            <div key={i} className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
              <div className="mb-1">{stat.icon}</div>
              <div className="font-display text-3xl text-gray-900">{stat.count}</div>
              <div className="text-xs text-gray-500 font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ALBUMS */}
        {albums.length > 0 ? (
          <div className="space-y-10">
            {albums.map((album: any) => {
              const cat = categoryConfig[album.category] || categoryConfig.department
              return (
                <div key={album.id}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-bold uppercase flex items-center gap-1 tracking-wider px-2.5 py-1 rounded-full ${cat.bg} ${cat.text}`}
                      >
                        {cat.icon} {album.category}
                      </span>
                      <h2 className="font-display text-xl text-gray-900">{album.title}</h2>
                    </div>

                    <div className="flex items-center gap-3">
                      {album.date && (
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(album.date).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                      )}
                      <span className="text-xs text-gray-400">
                        {album.images?.length || 0} photos
                      </span>
                    </div>
                  </div>

                  <GalleryGrid images={album.images || []} albumTitle={album.title} />
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <Camera className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <div className="font-medium text-lg">No gallery albums yet.</div>
            <p className="text-sm mt-2">Add albums from the admin panel.</p>
          </div>
        )}
      </div>
    </div>
  )
}

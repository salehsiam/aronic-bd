'use client'

import { useState } from 'react'

interface GalleryImage {
  image: {
    url: string
    alt?: string
    width?: number
    height?: number
  }
  caption?: string
  id?: string
}

export default function GalleryGrid({
  images,
  albumTitle,
}: {
  images: GalleryImage[]
  albumTitle: string
}) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  if (images.length === 0) return null

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((item, i) => (
          <div
            key={i}
            onClick={() => setLightbox(i)}
            className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group bg-green-100"
          >
            {item.image?.url ? (
              <img
                src={item.image.url || ''}
                alt={item.image.alt || item.caption || albumTitle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl bg-green-100">
                📸
              </div>
            )}
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center"></div>
            {/* Caption */}
            {item.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 translate-y-full group-hover:translate-y-0 transition-transform">
                <p className="text-white text-xs">{item.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors z-10"
          >
            ✕
          </button>

          {/* Prev */}
          {lightbox > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightbox(lightbox - 1)
              }}
              className="absolute left-4 text-white text-4xl hover:text-gray-300 transition-colors z-10 bg-black/30 w-10 h-10 rounded-full flex items-center justify-center"
            >
              ‹
            </button>
          )}

          {/* Image */}
          <div onClick={(e) => e.stopPropagation()} className="max-w-4xl max-h-[85vh] relative">
            {images[lightbox]?.image?.url ? (
              <img
                src={images[lightbox].image.url}
                alt={images[lightbox].image.alt || albumTitle}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            ) : null}
            {images[lightbox]?.caption && (
              <p className="text-white text-center text-sm mt-3 opacity-75">
                {images[lightbox].caption}
              </p>
            )}
            <p className="text-gray-400 text-center text-xs mt-2">
              {lightbox + 1} / {images.length}
            </p>
          </div>

          {/* Next */}
          {lightbox < images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightbox(lightbox + 1)
              }}
              className="absolute right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10 bg-black/30 w-10 h-10 rounded-full flex items-center justify-center"
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  )
}

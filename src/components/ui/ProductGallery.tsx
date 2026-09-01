'use client'

import Image from 'next/image'
import { useState } from 'react'

export function ProductGallery({ images, name }: { images: any[]; name: string }) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!images || images.length === 0) {
    return <div className="aspect-[3/4] bg-line" />
  }

  return (
    <div className="flex gap-3">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex flex-col gap-2.5 w-16 shrink-0">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-[3/4] overflow-hidden border transition-colors ${
                activeIndex === idx ? 'border-ink' : 'border-line'
              }`}
            >
              <Image src={img.url} alt={`${name} ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="relative flex-1 aspect-[3/4] bg-line overflow-hidden">
        <Image
          src={images[activeIndex].url}
          alt={name}
          fill
          priority
          className="object-cover"
        />
      </div>
    </div>
  )
}
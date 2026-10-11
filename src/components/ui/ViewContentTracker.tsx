'use client'

import { useEffect } from 'react'
import { pixelEvent } from '@/lib/pixel'

export function ViewContentTracker({ id, name, price }: { id: string; name: string; price: number }) {
  useEffect(() => {
    pixelEvent('ViewContent', {
      content_ids: [id],
      content_name: name,
      content_type: 'product',
      value: price,
      currency: 'BDT',
    })
  }, [id, name, price])

  return null
}
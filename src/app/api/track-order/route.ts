import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

type InItem = { productId: string; size: string; quantity: number }

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const items: InItem[] = Array.isArray(body?.items) ? body.items.slice(0, 50) : []

    const payload = await getPayload({ config })

    const results = await Promise.all(
      items.map(async (item) => {
        const productId = String(item.productId)
        const size = String(item.size)

        const product: any = await payload
          .findByID({ collection: 'products', id: productId, depth: 1 })
          .catch(() => null)

        if (!product || product.isActive === false) {
          return { productId, size, status: 'unavailable' as const }
        }

        const sizeEntry = product.sizes?.find((s: any) => s.size === size)
        const stock = Number(sizeEntry?.stock ?? 0)
        const price =
          product.salePrice && product.salePrice > 0 ? product.salePrice : product.price

        return {
          productId,
          size,
          status: stock > 0 ? ('ok' as const) : ('out_of_stock' as const),
          price,
          stock,
          name: product.name,
        }
      }),
    )

    return NextResponse.json({ results })
  } catch (error) {
    console.error('Cart validate error:', error)
    return NextResponse.json({ error: 'Could not validate cart.' }, { status: 500 })
  }
}
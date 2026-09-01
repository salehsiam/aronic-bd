import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const orderId = formData.get('value_a') as string
  const status = formData.get('status') as string

  if (status === 'VALID') {
    try {
      const payload = await getPayload({ config })
      await payload.update({
        collection: 'orders',
        id: orderId,
        data: { paymentStatus: 'paid', status: 'confirmed' },
      })
    } catch (error) {
      console.error('IPN update error:', error)
    }
  }

  return NextResponse.json({ received: true })
}
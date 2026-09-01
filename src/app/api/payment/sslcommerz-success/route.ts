import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const orderId = formData.get('value_a') as string
  const tranId = formData.get('tran_id') as string

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  try {
    const payload = await getPayload({ config })

    await payload.update({
      collection: 'orders',
      id: orderId,
      data: {
        paymentStatus: 'paid',
        status: 'confirmed',
      },
    })

    return NextResponse.redirect(`${baseUrl}/order-confirmation?order=${tranId}`, 303)
  } catch (error) {
    console.error('Order update error:', error)
    return NextResponse.redirect(`${baseUrl}/order-confirmation?order=${tranId}&warning=update-failed`, 303)
  }
}
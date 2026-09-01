import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: NextRequest) {
  try {
    const { orderNumber, phone } = await req.json()

    if (!orderNumber || !phone) {
      return NextResponse.json(
        { error: 'Order number and phone number are required.' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'orders',
      where: {
        and: [
          { orderNumber: { equals: orderNumber.trim() } },
          { customerPhone: { equals: phone.trim() } },
        ],
      },
      depth: 1,
      limit: 1,
    })

    const order = result.docs[0]

    if (!order) {
      return NextResponse.json(
        { error: 'No order found. Check your order number and phone.' },
        { status: 404 },
      )
    }

    // Shudhu proyojoniyo field pathacchi, shomponno customer object na
    return NextResponse.json({
      orderNumber: order.orderNumber,
      status: order.status,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      total: order.total,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      items: order.items.map((item: any) => ({
        name: typeof item.product === 'object' ? item.product.name : 'Product',
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        priceAtPurchase: item.priceAtPurchase,
      })),
    })
  } catch (error: any) {
    console.error('Track order error:', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
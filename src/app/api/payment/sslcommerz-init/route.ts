import { NextRequest, NextResponse } from 'next/server'

const store_id = process.env.SSLCOMMERZ_STORE_ID!
const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD!
const is_live = process.env.SSLCOMMERZ_IS_LIVE === 'true'

const SSL_API_URL = is_live
  ? 'https://securepay.sslcommerz.com/gwprocess/v4/api.php'
  : 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php'

export async function POST(req: NextRequest) {
  try {
    const { orderId, orderNumber, total, customer } = await req.json()
    const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

    const params = new URLSearchParams({
  store_id,
  store_passwd,
  total_amount: String(total),
  currency: 'BDT',
  tran_id: orderNumber,
  success_url: `${baseUrl}/api/payment/sslcommerz-success`,
  fail_url: `${baseUrl}/api/payment/sslcommerz-fail`,
  cancel_url: `${baseUrl}/api/payment/sslcommerz-cancel`,
  ipn_url: `${baseUrl}/api/payment/sslcommerz-ipn`,
  shipping_method: 'Courier',
  product_name: 'Aronic Order',
  product_category: 'Clothing',
  product_profile: 'general',
  cus_name: customer.name,
  cus_email: customer.email || 'no-email@aronic.com',
  cus_add1: customer.address,
  cus_city: customer.city || 'Dhaka',
  cus_country: 'Bangladesh',
  cus_phone: customer.phone,
  // Shipping info — SSLCommerz e required, customer info diyei fill korchi (guest checkout, alada shipping form nei)
  ship_name: customer.name,
  ship_add1: customer.address,
  ship_city: customer.city || 'Dhaka',
  ship_postcode: '1000',
  ship_country: 'Bangladesh',
  value_a: orderId,
})
console.log('Store ID:', store_id)
console.log('Store Password length:', store_passwd?.length)
    const response = await fetch(SSL_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    })

    const apiResponse = await response.json()

    if (apiResponse?.GatewayPageURL) {
      return NextResponse.json({ gatewayUrl: apiResponse.GatewayPageURL })
    } else {
      console.error('SSLCommerz response:', apiResponse)
      return NextResponse.json(
        { error: apiResponse?.failedreason || 'Gateway URL paoa jayni' },
        { status: 400 },
      )
    }
  } catch (error: any) {
    console.error('SSLCommerz init error:', error)
    return NextResponse.json(
      { error: error.message || 'Payment init fail hoyeche' },
      { status: 500 },
    )
  }
}
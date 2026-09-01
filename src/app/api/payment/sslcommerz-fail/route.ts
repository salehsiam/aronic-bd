import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  return NextResponse.redirect(`${baseUrl}/checkout?payment=failed`, 303)
}
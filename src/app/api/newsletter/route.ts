import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json()

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Valid email dao.' }, { status: 400 })
        }

        const payload = await getPayload({ config })

        // Age theke subscribe kora ache kina check koro
        const existing = await payload.find({
            collection: 'newsletter-subscribers',
            where: { email: { equals: email.toLowerCase().trim() } },
            limit: 1,
        })

        if (existing.docs.length > 0) {
            return NextResponse.json({ message: 'Already subscribed' })
        }

        await payload.create({
            collection: 'newsletter-subscribers',
            data: { email: email.toLowerCase().trim() },
        })

        return NextResponse.json({ message: 'Subscribed successfully' })
    } catch (error: any) {
        console.error('Newsletter subscribe error:', error)
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
    }
}
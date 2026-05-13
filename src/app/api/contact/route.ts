import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, subject, message } = body

    // Validation
    if (!name || !message || !subject) {
      return NextResponse.json({ error: 'Name, subject and message are required' }, { status: 400 })
    }

    // Save to database
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'contact-messages',
      data: {
        name,
        email,
        phone,
        subject,
        message,
        status: 'unread',
      },
    })

    // Send email notification
    if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL) {
      await resend.emails.send({
        from: 'Forensic MMC <onboarding@resend.dev>',
        to: process.env.CONTACT_EMAIL,
        subject: `New Contact Message: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #0a2e1a; padding: 20px; border-radius: 8px 8px 0 0;">
              <h2 style="color: white; margin: 0; font-size: 18px;">
                New Contact Message
              </h2>
              <p style="color: #4dc983; margin: 5px 0 0; font-size: 13px;">
                Department of Forensic Medicine & Toxicology, MMC
              </p>
            </div>
            <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 13px; width: 100px;">Name:</td>
                  <td style="padding: 8px 0; color: #111827; font-size: 13px; font-weight: 600;">${name}</td>
                </tr>
                ${
                  email
                    ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Email:</td>
                  <td style="padding: 8px 0; color: #111827; font-size: 13px;">${email}</td>
                </tr>`
                    : ''
                }
                ${
                  phone
                    ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Phone:</td>
                  <td style="padding: 8px 0; color: #111827; font-size: 13px;">${phone}</td>
                </tr>`
                    : ''
                }
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Subject:</td>
                  <td style="padding: 8px 0; color: #111827; font-size: 13px; font-weight: 600;">${subject}</td>
                </tr>
              </table>
              <div style="margin-top: 16px; padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 6px;">
                <p style="color: #6b7280; font-size: 12px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
                <p style="color: #111827; font-size: 14px; line-height: 1.6; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
              </div>
              <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
                <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                  Received: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        `,
      })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

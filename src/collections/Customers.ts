import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
    slug: 'customers',
    auth: {
        tokenExpiration: 60 * 60 * 24 * 30,
        cookies: {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
        },
        forgotPassword: {
            generateEmailHTML: (args) => {
                const resetLink = `${process.env.NEXT_PUBLIC_SERVER_URL}/account/reset-password?token=${args?.token}`
                return `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #1C1B19;">Reset Your Password</h2>
          <p>Click the link below to reset your Aronic account password. This link expires in 1 hour.</p>
          <a href="${resetLink}" style="display: inline-block; background: #1C1B19; color: #F7F4EC; padding: 12px 24px; text-decoration: none; margin-top: 12px;">
            Reset Password
          </a>
          <p style="color: #888; font-size: 12px; margin-top: 24px;">
            If you didn't request this, you can safely ignore this email.
          </p>
        </div>
      `
            },
        },
    },
    admin: {
        useAsTitle: 'email',
        defaultColumns: ['name', 'email', 'phone', 'createdAt'],
    },
    access: {
        read: ({ req: { user } }) => {
            // Customer nijer data porte parbe, admin shobar
            if (user) return true
            return false
        },
        create: () => true, // sign up shobai korte parbe
        update: ({ req: { user }, id }) => {
            if (!user) return false
            return user.id === id
        },
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'phone',
            type: 'text',
            required: true,
        },
    ],
}
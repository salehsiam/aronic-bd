import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
    slug: 'customers',
    auth: {
        tokenExpiration: 60 * 60 * 24 * 30, // 30 din
        cookies: {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
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
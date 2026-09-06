import type { CollectionConfig } from 'payload'

export const NewsletterSubscribers: CollectionConfig = {
    slug: 'newsletter-subscribers',
    admin: {
        useAsTitle: 'email',
        defaultColumns: ['email', 'createdAt'],
    },
    access: {
        read: ({ req: { user } }) => Boolean(user), // shudhu admin dekhte parbe
        create: () => true, // sobai subscribe korte parbe
    },
    fields: [
        {
            name: 'email',
            type: 'email',
            required: true,
            unique: true,
        },
    ],
}
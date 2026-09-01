import type { CollectionConfig } from 'payload'

export const HeroSlides: CollectionConfig = {
    slug: 'hero-slides',
    admin: {
        useAsTitle: 'headline',
        defaultColumns: ['headline', 'order', 'isActive'],
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'headline',
            type: 'textarea',
            required: true,
            admin: {
                description: 'Ekhane Enter chepe notun line daw',
            },
        },
        {
            name: 'eyebrow',
            type: 'text',
            admin: {
                description: 'Choto label, headline er upore (jemon: "Easy Special")',
            },
        },
        {
            name: 'ctaText',
            type: 'text',
            defaultValue: 'Shop Collection',
        },
        {
            name: 'ctaLink',
            type: 'text',
            defaultValue: '/shop',
        },
        {
            name: 'desktopImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
            admin: {
                description: 'Wide/landscape image — desktop e dekhabe (recommended: 1600x1200px+)',
            },
        },
        {
            name: 'mobileImage',
            type: 'upload',
            relationTo: 'media',
            admin: {
                description: 'Portrait image — mobile e dekhabe (recommended: 800x1000px). Fakha rakhle desktop image use hobe.',
            },
        },
        {
            name: 'order',
            type: 'number',
            defaultValue: 0,
            admin: {
                description: 'Choto number age dekhabe',
            },
        },
        {
            name: 'isActive',
            type: 'checkbox',
            defaultValue: true,
        },
    ],
}
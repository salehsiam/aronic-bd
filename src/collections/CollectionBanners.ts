import type { CollectionConfig } from 'payload'

export const CollectionBanners: CollectionConfig = {
    slug: 'collection-banners',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'order', 'isActive'],
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'textarea',
            required: true,
            admin: {
                description: 'Enter chepe line break disho (jemon: Everyday Essentials\\nMen\'s Collection)',
            },
        },
        {
            name: 'eyebrow',
            type: 'text',
            admin: {
                description: 'Choto label (jemon: New Season)',
            },
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'ctaText',
            type: 'text',
            defaultValue: 'View All Collection',
        },
        {
            name: 'ctaLink',
            type: 'text',
            required: true,
            admin: {
                description: 'Jemon: /shop?category=men',
            },
        },
        {
  name: 'category',
  type: 'relationship',
  relationTo: 'categories',
  required: true,
  admin: {
    description: 'Ei category theke product niche dekhabe',
  },
},
{
  name: 'productCount',
  type: 'number',
  defaultValue: 8,
  min: 2,
  max: 12,
  admin: {
    description: 'Koyta product dekhabe (default 8)',
  },
},
        {
            name: 'order',
            type: 'number',
            defaultValue: 0,
        },
        {
            name: 'isActive',
            type: 'checkbox',
            defaultValue: true,
        },
    ],
}
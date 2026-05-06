import type { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date', 'isPublished'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Album Title',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Category',
      options: [
        { label: 'Department', value: 'department' },
        { label: 'Event', value: 'event' },
        { label: 'Academic', value: 'academic' },
        { label: 'Lab', value: 'lab' },
      ],
    },
    {
      name: 'images',
      type: 'array',
      label: 'Images',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Caption (Optional)',
        },
      ],
    },
    {
      name: 'date',
      type: 'date',
      label: 'Date',
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      label: 'Published?',
      defaultValue: true,
    },
  ],
}

import type { CollectionConfig } from 'payload'

export const Notices: CollectionConfig = {
  slug: 'notices',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'isImportant', 'publishDate'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title (English)',
    },
    {
      name: 'titleBn',
      type: 'text',
      label: 'Title (Bengali)',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Category',
      options: [
        { label: 'Academic', value: 'academic' },
        { label: 'Exam', value: 'exam' },
        { label: 'Administrative', value: 'administrative' },
        { label: 'Emergency', value: 'emergency' },
        { label: 'General', value: 'general' },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Notice Content',
    },
    {
      name: 'attachments',
      type: 'array',
      label: 'Attachments (PDF)',
      fields: [
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'File Label',
        },
      ],
    },
    {
      name: 'publishDate',
      type: 'date',
      required: true,
      label: 'Publish Date',
    },
    {
      name: 'expiryDate',
      type: 'date',
      label: 'Expiry Date (এই date-এর পর auto-hide হবে)',
    },
    {
      name: 'isImportant',
      type: 'checkbox',
      label: 'Mark as Important?',
      defaultValue: false,
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      label: 'Published?',
      defaultValue: true,
    },
  ],
}

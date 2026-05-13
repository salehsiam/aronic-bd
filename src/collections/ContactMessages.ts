import type { CollectionConfig } from 'payload'

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'subject', 'status', 'createdAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
    },
    {
      name: 'subject',
      type: 'text',
      label: 'Subject',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Message',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'unread',
      label: 'Status',
      options: [
        { label: '🔴 Unread', value: 'unread' },
        { label: '🟡 Read', value: 'read' },
        { label: '🟢 Replied', value: 'replied' },
      ],
    },
    {
      name: 'adminNote',
      type: 'textarea',
      label: 'Admin Note (Internal)',
    },
  ],
  timestamps: true,
}

import type { CollectionConfig } from 'payload'

export const Faculty: CollectionConfig = {
  slug: 'faculty',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'designation', 'isCurrent'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name (English)',
    },
    {
      name: 'nameBn',
      type: 'text',
      label: 'Full Name (Bengali)',
    },
    {
      name: 'designation',
      type: 'select',
      required: true,
      label: 'Designation',
      options: [
        { label: 'Professor & Head', value: 'professor-head' },
        { label: 'Professor', value: 'professor' },
        { label: 'Associate Professor', value: 'associate-professor' },
        { label: 'Assistant Professor', value: 'assistant-professor' },
        { label: 'Lecturer', value: 'lecturer' },
        { label: 'Medical Officer', value: 'medical-officer' },
      ],
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Photo',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
    },
    {
      name: 'qualifications',
      type: 'array',
      label: 'Qualifications',
      fields: [
        {
          name: 'degree',
          type: 'text',
          label: 'Degree (e.g. MBBS, MD)',
          required: true,
        },
      ],
    },
    {
      name: 'specialization',
      type: 'text',
      label: 'Specialization',
    },
    {
      name: 'bio',
      type: 'richText',
      label: 'Biography (English)',
    },
    {
      name: 'bioBn',
      type: 'richText',
      label: 'Biography (Bengali)',
    },
    {
      name: 'researchInterests',
      type: 'array',
      label: 'Research Interests',
      fields: [
        {
          name: 'interest',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'publications',
      type: 'number',
      label: 'Total Publications',
      defaultValue: 0,
    },
    {
      name: 'joinDate',
      type: 'date',
      label: 'Joining Date',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
      admin: {
        description: 'Lower number = দেখাবে আগে',
      },
    },
    {
      name: 'isCurrent',
      type: 'checkbox',
      label: 'Currently Active?',
      defaultValue: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL)',
      admin: {
        description: 'Auto-fill করো: example → dr-rahman',
      },
    },
  ],
}

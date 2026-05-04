import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'staff',
      label: 'Role',
      options: [
        { label: 'Super Admin', value: 'super-admin' },
        { label: 'Staff', value: 'staff' },
        { label: 'Editor', value: 'editor' },
      ],
    },
  ],
}

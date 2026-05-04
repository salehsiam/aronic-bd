import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}

// import { CollectionConfig } from 'payload'

// export const Media: CollectionConfig = {
//   slug: 'media',
//   upload: true,
//   fields: [
//     {
//       name: 'alt',
//       type: 'text',
//       label: 'Alt Text',
//     },
//   ],
// }

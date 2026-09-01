import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'stock', 'isActive'],
  },
  access: {
    read: () => true, // sobai dekhte parbe (public shop page)
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly name, jemon: mens-cotton-shirt',
      },
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'salePrice',
      type: 'number',
      min: 0,
      admin: {
        description: 'Discount price thakle bosao, na thakle khali rakho',
      },
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      required: true,
    },
    {
      name: 'sizes',
      type: 'array',
      fields: [
        {
          name: 'size',
          type: 'select',
          options: ['S', 'M', 'L', 'XL', 'XXL'],
          required: true,
        },
        {
          name: 'stock',
          type: 'number',
          required: true,
          min: 0,
          defaultValue: 0,
        },
      ],
    },
    {
      name: 'colors',
      type: 'array',
      fields: [
        {
          name: 'colorName',
          type: 'text',
          required: true,
        },
        {
          name: 'colorCode',
          type: 'text',
          admin: {
            description: 'Hex code, jemon #FF0000',
          },
        },
      ],
    },
    {
      name: 'sku',
      type: 'text',
      unique: true,
      admin: {
        description: 'Product code, jemon ARN-001',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Off korle product shop e dekhabe na',
      },
    },
  ],
}
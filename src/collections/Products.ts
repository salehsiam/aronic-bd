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
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.discountPercent && data.discountPercent > 0 && data?.price) {
          const calculated = data.price - (data.price * data.discountPercent) / 100
          data.salePrice = Math.round(calculated)
        } else if (!data?.discountPercent) {
          // Discount percent khali/0 hole salePrice o clear hoye jabe
          data.salePrice = null
        }
        return data
      },
    ],
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
      name: 'discountPercent',
      type: 'number',
      min: 0,
      max: 90,
      admin: {
        description: 'Discount ',
      },
    },
    {
      name: 'salePrice',
      type: 'number',
      min: 0,
      admin: {
        description: 'Automatic calculate ',
        readOnly: false,
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
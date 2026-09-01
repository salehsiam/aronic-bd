import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'customerName', 'total', 'status', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
  },
  hooks: {
    beforeValidate: [
      async ({ data, req }) => {
        // Order create howar age check koro proti item er stock ache kina
        if (!data?.items) return data

        for (const item of data.items) {
          const productId = typeof item.product === 'object' ? item.product.id : item.product

          const product = await req.payload.findByID({
            collection: 'products',
            id: productId,
          })

          if (!product) {
            throw new Error(`Product ${productId} khuje paoa jayni`)
          }

          const sizeEntry = product.sizes?.find((s: any) => s.size === item.size)

          if (!sizeEntry || sizeEntry.stock < item.quantity) {
            throw new Error(
              `${product.name} (Size: ${item.size}) e sufficient stock nei. Available: ${sizeEntry?.stock || 0}, Requested: ${item.quantity}`,
            )
          }
        }

        return data
      },
    ],
    afterChange: [
      async ({ doc, operation, req }) => {
        // Shudhu notun order create howar shomoy stock kombe, update er shomoy na
        if (operation !== 'create') return doc

        for (const item of doc.items) {
          const productId = typeof item.product === 'object' ? item.product.id : item.product

          const product = await req.payload.findByID({
            collection: 'products',
            id: productId,
          })

          if (!product) continue

          const updatedSizes = product.sizes?.map((s: any) => {
            if (s.size === item.size) {
              return {
                ...s,
                stock: Math.max(0, s.stock - item.quantity),
              }
            }
            return s
          })

          await req.payload.update({
            collection: 'products',
            id: productId,
            data: { sizes: updatedSizes },
          })
        }

        return doc
      },
    ],
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'customers',
      required: false, // guest checkout allow thakbe, tai required na
    },
    {
      name: 'customerName',
      type: 'text',
      required: true,
    },
    {
      name: 'customerPhone',
      type: 'text',
      required: true,
    },
    {
      name: 'customerEmail',
      type: 'email',
    },
    {
      name: 'shippingAddress',
      type: 'textarea',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'size',
          type: 'text',
        },
        {
          name: 'color',
          type: 'text',
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
        },
        {
          name: 'priceAtPurchase',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'total',
      type: 'number',
      required: true,
    },
    {
      name: 'paymentMethod',
      type: 'select',
      options: ['sslcommerz', 'cod'],
      required: true,
    },
    {
      name: 'paymentStatus',
      type: 'select',
      options: ['pending', 'paid', 'failed'],
      defaultValue: 'pending',
    },
    {
      name: 'status',
      type: 'select',
      options: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      defaultValue: 'pending',
    },
  ],
}
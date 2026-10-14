import type { CollectionConfig } from 'payload'
import { APIError } from 'payload'
import { DELIVERY_CHARGES, type DeliveryArea } from '@/lib/shipping'

const PAYMENT_LABELS: Record<string, string> = {
  cod: 'Cash on Delivery',
  bkash_manual: 'bKash (manual)',
  nagad_manual: 'Nagad (manual)',
  sslcommerz: 'Online (SSLCommerz)',
}

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: [
      'orderNumber',
      'customerName',
      'total',
      'paymentMethod',
      'paymentStatus',
      'status',
      'createdAt',
    ],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.collection === 'users') return true // admin/staff shob dekhbe
      if (user?.collection === 'customers') return { customer: { equals: user.id } } // customer shudhu nijer
      return false
    },
    create: () => true, // guest checkout
    update: ({ req: { user } }) => user?.collection === 'users',
    delete: ({ req: { user } }) => user?.collection === 'users',
  },
  hooks: {
    beforeValidate: [
      async ({ data, req, operation }) => {
        // Shudhu notun order create howar shomoy chalbe, admin edit korle na
        if (operation !== 'create' || !data) return data

        const isStaff = req.user?.collection === 'users'

        // Public checkout theke asha order shobshomoy pending hishebe shuru hobe
        if (!isStaff) {
          data.paymentStatus = 'pending'
          data.status = 'pending'
        }

        if (!Array.isArray(data.items) || data.items.length === 0) {
          throw new APIError('Your cart is empty.', 400, null, true)
        }

        const clientTotal = Number(data.total)
        let subtotal = 0

        // 1. Proti item: stock check + asol dam database theke boshano
        for (const item of data.items) {
          const productId = typeof item.product === 'object' ? item.product.id : item.product

          const quantity = Number(item.quantity)
          if (!Number.isInteger(quantity) || quantity < 1) {
            throw new APIError('Invalid quantity in your cart.', 400, null, true)
          }

          const product = await req.payload
            .findByID({ collection: 'products', id: productId })
            .catch(() => null)

          if (!product || product.isActive === false) {
            throw new APIError('A product in your cart is no longer available.', 400, null, true)
          }

          const sizeEntry = product.sizes?.find((s: any) => s.size === item.size)

          if (!sizeEntry || sizeEntry.stock < quantity) {
            throw new APIError(
              `${product.name} (Size: ${item.size}) does not have enough stock. Available: ${sizeEntry?.stock || 0}.`,
              400,
              null,
              true,
            )
          }

          // Browser-er pathano dam ignore kore database-er dam boshao
          const unitPrice =
            product.salePrice && product.salePrice > 0 ? product.salePrice : product.price

          item.quantity = quantity
          item.priceAtPurchase = unitPrice
          subtotal += unitPrice * quantity
        }

        // 2. Delivery charge server-e thik hoy
        const area: DeliveryArea =
          data.deliveryArea === 'dhaka' || data.deliveryArea === 'outside'
            ? data.deliveryArea
            : String(data.shippingAddress || '').includes('(Outside Dhaka)')
              ? 'outside'
              : 'dhaka'

        const deliveryCharge = DELIVERY_CHARGES[area]
        const total = subtotal + deliveryCharge

        // 3. Customer je total dekhechhe ar server-er total na mille order nibo na
        if (!isStaff && clientTotal !== total) {
          throw new APIError(
            'Some prices have changed since you added items to your cart. Please remove the items, add them again, and try once more.',
            400,
            null,
            true,
          )
        }

        data.deliveryArea = area
        data.subtotal = subtotal
        data.deliveryCharge = deliveryCharge
        data.total = total

        // 4. Manual bKash/Nagad: TrxID dorkar, ar ekbar-i bebohar kora jabe
        if (data.paymentMethod === 'bkash_manual' || data.paymentMethod === 'nagad_manual') {
          const trx = String(data.transactionId || '').trim().toUpperCase()

          if (trx.length < 6) {
            throw new APIError('Please enter a valid transaction ID.', 400, null, true)
          }

          const dup = await req.payload.find({
            collection: 'orders',
            where: { transactionId: { equals: trx } },
            limit: 1,
          })

          if (dup.docs.length > 0) {
            throw new APIError('This transaction ID has already been used.', 400, null, true)
          }

          data.transactionId = trx
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

          const product = await req.payload
            .findByID({ collection: 'products', id: productId })
            .catch(() => null)

          if (!product) continue

          const updatedSizes = product.sizes?.map((s: any) => {
            if (s.size === item.size) {
              return { ...s, stock: Math.max(0, s.stock - item.quantity) }
            }
            return s
          })

          await req.payload.update({
            collection: 'products',
            id: productId,
            data: { sizes: updatedSizes },
          })
        }

        const paymentLabel = PAYMENT_LABELS[doc.paymentMethod] || doc.paymentMethod
        const deliveryLabel = `${doc.deliveryArea === 'outside' ? 'Outside Dhaka' : 'Dhaka'} (৳${doc.deliveryCharge})`
        const adminLink = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/admin/collections/orders/${doc.id}`
        const itemsList = doc.items
          .map(
            (item: any) =>
              `- ${item.size ? `Size: ${item.size}` : ''} x${item.quantity} — ৳${item.priceAtPurchase}`,
          )
          .join('\n')

        // Email notification
        try {
          await req.payload.sendEmail({
            to: process.env.ADMIN_NOTIFICATION_EMAIL,
            subject: `New Order: ${doc.orderNumber}`,
            text: `A new order has been placed on Aronic.

Order Number: ${doc.orderNumber}
Customer: ${doc.customerName}
Phone: ${doc.customerPhone}
Address: ${doc.shippingAddress}
Delivery: ${deliveryLabel}
Payment Method: ${paymentLabel}
Transaction ID: ${doc.transactionId || '-'}
Sender Number: ${doc.senderNumber || '-'}
Total: ৳${doc.total}

Items:
${itemsList}

View in admin panel: ${adminLink}`,
          })
        } catch (emailError) {
          console.error('Order notification email failed:', emailError)
        }

        // Telegram notification (plain text)
        try {
          const message = `🛍️ New Order: ${doc.orderNumber}

👤 Customer: ${doc.customerName}
📞 Phone: ${doc.customerPhone}
📍 Address: ${doc.shippingAddress}
🚚 Delivery: ${deliveryLabel}
💳 Payment: ${paymentLabel}
🧾 TrxID: ${doc.transactionId || '-'}
📲 Sender: ${doc.senderNumber || '-'}
💰 Total: ৳${doc.total}

Items:
${itemsList}

🔗 ${adminLink}`

          const res = await fetch(
            `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: process.env.TELEGRAM_CHAT_ID,
                text: message,
              }),
            },
          )

          if (!res.ok) {
            console.error('Telegram notification failed:', res.status, await res.text())
          }
        } catch (telegramError) {
          console.error('Telegram notification failed:', telegramError)
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
      required: false, // guest checkout allow thakbe
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
      name: 'deliveryArea',
      type: 'select',
      options: [
        { label: 'Inside Dhaka', value: 'dhaka' },
        { label: 'Outside Dhaka', value: 'outside' },
      ],
      defaultValue: 'dhaka',
    },
    {
      name: 'subtotal',
      type: 'number',
      admin: { readOnly: true, description: 'Server automatic hisab kore' },
    },
    {
      name: 'deliveryCharge',
      type: 'number',
      admin: { readOnly: true },
    },
    {
      name: 'total',
      type: 'number',
      required: true,
    },
    {
      name: 'paymentMethod',
      type: 'select',
      options: [
        { label: 'Cash on Delivery', value: 'cod' },
        { label: 'bKash (manual)', value: 'bkash_manual' },
        { label: 'Nagad (manual)', value: 'nagad_manual' },
        { label: 'SSLCommerz', value: 'sslcommerz' },
      ],
      required: true,
    },
    {
      name: 'transactionId',
      type: 'text',
      index: true,
      admin: {
        description:
          'Customer-er dewa TrxID. bKash/Nagad app-e mil-iye tarpor Payment Status "paid" koro.',
      },
    },
    {
      name: 'senderNumber',
      type: 'text',
      admin: { description: 'Je number theke taka pathano hoyeche' },
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
import type { CollectionConfig } from 'payload'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'application/pdf'],
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        if (doc?.cloudinaryUrl) {
          doc.url = doc.cloudinaryUrl
        }
        return doc
      },
    ],
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === 'create' && req.file) {
          try {
            const fileBuffer = req.file.data
            const result = await new Promise<any>((resolve, reject) => {
              cloudinary.uploader
                .upload_stream(
                  {
                    folder: 'forensic-mmc',
                    resource_type: 'auto',
                    public_id: `${Date.now()}-${req.file!.name.replace(/\.[^/.]+$/, '')}`,
                  },
                  (error, result) => {
                    if (error) reject(error)
                    else resolve(result)
                  },
                )
                .end(fileBuffer)
            })
            data.cloudinaryUrl = result.secure_url
            data.cloudinaryPublicId = result.public_id
          } catch (error) {
            console.error('Cloudinary upload error:', error)
          }
        }
        return data
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        if (doc?.cloudinaryPublicId) {
          try {
            await cloudinary.uploader.destroy(doc.cloudinaryPublicId)
          } catch (error) {
            console.error('Cloudinary delete error:', error)
          }
        }
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt Text',
    },
    {
      name: 'cloudinaryUrl',
      type: 'text',
      label: 'Cloudinary URL',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'cloudinaryPublicId',
      type: 'text',
      label: 'Cloudinary Public ID',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
  ],
}

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { v2 as cloudinary } from 'cloudinary'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Faculty } from './collections/Faculty'
import { Notices } from './collections/Notices'
import { Research } from './collections/Research'
import { Gallery } from './collections/Gallery'
import { StudyMaterials } from './collections/StudyMaterials'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
})

const cloudinaryAdapter = {
  name: 'cloudinary',
  handleUpload: async ({ data, file }: any) => {
    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'forensic-mmc',
            resource_type: 'auto',
            public_id: `${Date.now()}-${file.filename.replace(/\.[^/.]+$/, '')}`,
          },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          },
        )
        .end(file.buffer)
    })
    return {
      ...data,
      url: result.secure_url,
      filename: result.public_id,
    }
  },
  handleDelete: async ({ doc }: any) => {
    if (doc?.filename) {
      await cloudinary.uploader.destroy(doc.filename)
    }
  },
  generateURL: ({ filename }: any) => {
    return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${filename}`
  },
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Forensic Medicine MMC',
    },
  },
  collections: [Users, Media, Faculty, Research, Notices, Gallery, StudyMaterials],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  plugins: [
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: () => cloudinaryAdapter as any,
          disableLocalStorage: true,
        },
      },
    }),
  ],
  sharp,
})

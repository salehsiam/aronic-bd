import { getPayload } from 'payload'
import config from '@payload-config'

type GetProductsParams = {
  categorySlug?: string
  size?: string
  sort?: 'price-asc' | 'price-desc' | 'newest'
  featuredOnly?: boolean
}

export async function getProducts({ categorySlug, size, sort, featuredOnly }: GetProductsParams = {}) {
  const payload = await getPayload({ config })

  const where: Record<string, any> = {
    isActive: { equals: true },
  }

  if (featuredOnly) {
    where.isFeatured = { equals: true }
  }

  if (categorySlug) {
    const category = await payload.find({
      collection: 'categories',
      where: { slug: { equals: categorySlug } },
      limit: 1,
    })
    if (category.docs[0]) {
      where.category = { equals: category.docs[0].id }
    }
  }

  if (size) {
    where['sizes.size'] = { equals: size }
  }

  const sortMap = {
    'price-asc': 'price',
    'price-desc': '-price',
    newest: '-createdAt',
  }

  const result = await payload.find({
    collection: 'products',
    where,
    sort: sort ? sortMap[sort] : '-createdAt',
    limit: 24,
    depth: 2,
  })

  return result.docs
}

export async function getCategories() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'categories',
    limit: 50,
  })
  return result.docs
}

export async function getProductBySlug(slug: string) {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })

  return result.docs[0] || null
}

export async function getRelatedProducts(categoryId: string, excludeId: string) {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'products',
    where: {
      and: [
        { category: { equals: categoryId } },
        { id: { not_equals: excludeId } },
        { isActive: { equals: true } },
      ],
    },
    limit: 4,
    depth: 2,
  })

  return result.docs
}

export async function getFeaturedProducts() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'products',
    where: {
      and: [{ isActive: { equals: true } }, { isFeatured: { equals: true } }],
    },
    limit: 8,
    depth: 2,
    sort: '-createdAt',
  })

  return result.docs
}

export async function searchProducts(query: string) {
  const payload = await getPayload({ config })

  if (!query || query.trim().length < 2) {
    return []
  }

  const result = await payload.find({
    collection: 'products',
    where: {
      and: [
        { isActive: { equals: true } },
        {
          or: [
            { name: { like: query } },
            { sku: { like: query } },
          ],
        },
      ],
    },
    depth: 2,
    limit: 24,
  })

  return result.docs
}

export async function getHeroSlides() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'hero-slides',
    where: { isActive: { equals: true } },
    sort: 'order',
    depth: 1,
    limit: 5,
  })

  return result.docs
}
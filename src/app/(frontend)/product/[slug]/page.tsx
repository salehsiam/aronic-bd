import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getProductBySlug, getRelatedProducts } from '@/lib/getProducts'
import { ProductGallery } from '@/components/ui/ProductGallery'
import { AddToCartPanel } from '@/components/ui/AddToCartPanel'
import { ProductCard } from '@/components/ui/ProductCard'
import { RichText } from '@payloadcms/richtext-lexical/react'


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) return { title: 'Product Not Found' }

  return {
    title: product.name,
    description: `Shop ${product.name} at Aronic`,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) notFound()

  const relatedProducts = product.category
    ? await getRelatedProducts(product.category.id, product.id)
    : []

  return (
    <div className="min-h-screen bg-cotton">
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-mono text-xs text-ink/40 mb-8">
          <Link href="/shop" className="hover:text-ink transition-colors">
            Shop
          </Link>
          <span>/</span>
          {product.category && (
            <>
              <Link
                href={`/shop?category=${product.category.slug}`}
                className="hover:text-ink transition-colors"
              >
                {product.category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-ink/60">{product.name}</span>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <ProductGallery images={product.images} name={product.name} />

          <div className="md:pt-2">
            <p className="font-mono text-xs uppercase tracking-widest text-rust mb-2">
              {(product.category as any)?.name}
            </p>
            <h1 className="font-display text-3xl md:text-4xl text-ink mb-4">{product.name}</h1>

            <AddToCartPanel product={product} />

            {product.description && (
              <div className="mt-10 pt-8 border-t border-line">
                <p className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-3">
                  Description
                </p>
                <div className="font-body text-sm text-ink/70 leading-relaxed">
                  <RichText data={product.description} />
                </div>
              </div>
            )}

            {product.sku && (
              <p className="font-mono text-xs text-ink/40 mt-6">SKU: {product.sku}</p>
            )}
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="font-display text-2xl text-ink mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
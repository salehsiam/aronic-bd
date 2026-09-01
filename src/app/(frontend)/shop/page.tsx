import { getProducts, getCategories } from '@/lib/getProducts'
import { ProductCard } from "@/components/ui/ProductCard";
import { ShopFilters } from "@/components/ui/ShopFilters";


export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; size?: string; sort?: string }>
}) {
  const params = await searchParams
  const [products, categories] = await Promise.all([
    getProducts({
      categorySlug: params.category,
      size: params.size,
      sort: params.sort as any,
    }),
    getCategories(),
  ])

  return (
    <div className="min-h-screen bg-cotton">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <div className="mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-rust mb-2">
            Shop / All Products
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-ink">
            All Collection
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          <ShopFilters categories={categories} />

          <div className="flex-1">
            {products.length === 0 ? (
              <p className="font-body text-ink/50 py-16 text-center">
                No Product Found
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
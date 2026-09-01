import { searchProducts } from '@/lib/getProducts'
import { ProductCard } from '@/components/ui/ProductCard'

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>
}) {
    const params = await searchParams
    const query = params.q || ''
    const products = query ? await searchProducts(query) : []

    return (
        <div className="min-h-screen bg-cotton">
            <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
                <div className="mb-12">
                    <p className="font-mono text-xs uppercase tracking-widest text-rust mb-2">
                        Search Results
                    </p>
                    <h1 className="font-display text-3xl md:text-4xl text-ink">
                        {query ? `"${query}"` : 'Search'}
                    </h1>
                    {query && (
                        <p className="font-body text-sm text-ink/50 mt-2">
                            {products.length} {products.length === 1 ? 'product' : 'products'} found
                        </p>
                    )}
                </div>

                {!query ? (
                    <p className="font-body text-ink/50 py-16 text-center">
                        Type something in the search bar to find products.
                    </p>
                ) : products.length === 0 ? (
                    <div className="py-16 text-center">
                        <p className="font-body text-ink/50 mb-2">
                            No products found for "{query}".
                        </p>
                        <p className="font-body text-sm text-ink/40">
                            Try a different keyword or browse the full collection.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
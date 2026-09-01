import { getProducts } from '@/lib/getProducts'
import { ProductCard } from '@/components/ui/ProductCard'

export const metadata = {
    title: 'New Arrivals',
    description: 'The latest pieces at Aronic.',
}

export default async function NewArrivalsPage() {
    const products = await getProducts({ sort: 'newest' })

    return (
        <div className="min-h-screen bg-cotton">
            <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
                <div className="mb-12">
                    <p className="font-mono text-xs uppercase tracking-widest text-rust mb-2">
                        Just In
                    </p>
                    <h1 className="font-display text-4xl md:text-5xl text-ink">New Arrivals</h1>
                    <p className="font-body text-sm text-ink/50 mt-3 max-w-md">
                        The newest additions to the Aronic collection, added regularly.
                    </p>
                </div>

                {products.length === 0 ? (
                    <p className="font-body text-ink/50 py-16 text-center">
                        No new arrivals right now. Check back soon.
                    </p>
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
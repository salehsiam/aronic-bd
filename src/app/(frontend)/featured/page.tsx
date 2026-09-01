import { getProducts } from '@/lib/getProducts'
import { ProductCard } from '@/components/ui/ProductCard'

export const metadata = {
    title: 'Featured',
    description: 'Handpicked pieces from Aronic.',
}

export default async function FeaturedPage() {
    const products = await getProducts({ featuredOnly: true, sort: 'newest' })

    return (
        <div className="min-h-screen bg-cotton">
            <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
                <div className="mb-12">
                    <p className="font-mono text-xs uppercase tracking-widest text-rust mb-2">
                        Handpicked
                    </p>
                    <h1 className="font-display text-4xl md:text-5xl text-ink">Featured</h1>
                    <p className="font-body text-sm text-ink/50 mt-3 max-w-md">
                        Our current standout pieces, chosen by the Aronic team.
                    </p>
                </div>

                {products.length === 0 ? (
                    <p className="font-body text-ink/50 py-16 text-center">
                        No featured products right now.
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
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export function CategoryRow({ categories }: { categories: any[] }) {
    if (categories.length === 0) return null

    return (
        <div className="">
            {/* ── CATEGORY SHOWCASE ── */}
            {categories.length > 0 && (
                <section className="">
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-widest text-rust mb-2">
                                Browse
                            </p>
                            <h2 className="font-display text-3xl text-ink">Shop by Category</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.slice(0, 3).map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/shop?category=${cat.slug}`}
                                className="group relative aspect-[4/5] bg-line overflow-hidden block"
                            >
                                {cat.image?.url ? (
                                    <Image
                                        src={cat.image.url}
                                        alt={cat.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-indigo/5">
                                        <span className="font-display text-xl text-ink/30">{cat.name}</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                                <div className="absolute bottom-5 left-5">
                                    <span className="font-display text-xl text-cotton">{cat.name}</span>
                                    <span className="flex items-center gap-1.5 font-mono text-xs text-cotton/80 uppercase tracking-wide mt-1">
                                        Shop Now <ArrowRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
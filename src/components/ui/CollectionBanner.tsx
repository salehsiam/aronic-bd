import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type Props = {
    image: string
    eyebrow?: string
    title: string
    ctaText?: string
    ctaLink: string
}

export function CollectionBanner({ image, eyebrow, title, ctaText = 'View All Collection', ctaLink }: Props) {
    const lines = title.split('\n')

    return (
        <Link href={ctaLink} className="group relative block h-[70vh] min-h-[420px] max-h-[640px] overflow-hidden">
            <img
                src={image}
                alt={title.replace('\n', ' ')}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/50" />

            <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
                {eyebrow && (
                    <p className="font-mono text-xs uppercase tracking-widest text-cotton/80 mb-3">
                        {eyebrow}
                    </p>
                )}
                <h2 className="font-display text-3xl md:text-5xl text-cotton leading-[1.15] mb-8">
                    {lines.map((line, i) => (
                        <span key={i} className="block">
                            {line}
                        </span>
                    ))}
                </h2>

                <span className="inline-flex items-center gap-2 text-cotton text-xs md:text-sm font-mono uppercase tracking-widest border-b border-cotton pb-1.5 group-hover:gap-3 transition-all">
                    {ctaText} <ArrowRight className="w-3.5 h-3.5" />
                </span>
            </div>
        </Link>
    )
}
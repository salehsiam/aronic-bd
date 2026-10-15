import { SIZE_CHARTS } from '@/lib/sizeCharts'
import { SizeChartTable } from '@/components/ui/SizeChartTable'

export const metadata = {
    title: 'Size Guide',
    description: 'Find your perfect fit with the Aronic size guide.',
}

export default function SizeGuidePage() {
    return (
        <div className="min-h-screen bg-cotton">
            <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
                <p className="font-mono text-xs uppercase tracking-widest text-rust mb-2">Support</p>
                <h1 className="font-display text-4xl text-ink mb-4">Size Guide</h1>
                <p className="font-body text-sm text-ink/50 mb-10 max-w-md">
                    These are garment measurements, and chest is the full measurement around the
                    garment. Our pieces are cut oversized. If you're between sizes, pick the smaller
                    one for a relaxed fit or the larger one for a very loose fit.
                </p>

                <div className="space-y-12">
                    <SizeChartTable chart={SIZE_CHARTS.sportswear} />
                    <SizeChartTable chart={SIZE_CHARTS.hoodie} />
                </div>

                <div className="border-t border-line pt-8 mt-12">
                    <h2 className="font-display text-xl text-ink mb-3">How to Measure</h2>
                    <ul className="space-y-2 font-body text-sm text-ink/70 list-disc pl-5">
                        <li>
                            <strong className="text-ink">Chest:</strong> Lay a piece you already own flat,
                            measure straight across just under the armpits, and double it.
                        </li>
                        <li>
                            <strong className="text-ink">Length:</strong> From the highest point of the
                            shoulder straight down to the bottom hem.
                        </li>
                        <li>
                            <strong className="text-ink">Shoulder:</strong> From one shoulder seam across to
                            the other.
                        </li>
                    </ul>
                    <p className="font-body text-xs text-ink/40 mt-4">
                        Measurements may vary by about 1 inch. Not sure? Message us and we'll help you pick.
                    </p>
                </div>
            </div>
        </div>
    )
}
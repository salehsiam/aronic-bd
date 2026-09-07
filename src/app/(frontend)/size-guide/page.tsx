export const metadata = {
    title: 'Size Guide',
    description: 'Find your perfect fit with the Aronic size guide.',
}

const tshirtSizes = [
    { size: 'S', chest: '38"', length: '26"', shoulder: '18"' },
    { size: 'M', chest: '40"', length: '27"', shoulder: '19"' },
    { size: 'L', chest: '42"', length: '28"', shoulder: '20"' },
    { size: 'XL', chest: '44"', length: '29"', shoulder: '21"' },
    { size: 'XXL', chest: '46"', length: '30"', shoulder: '22"' },
]

const hoodieSizes = [
    { size: 'S', chest: '40"', length: '27"', shoulder: '19"' },
    { size: 'M', chest: '42"', length: '28"', shoulder: '20"' },
    { size: 'L', chest: '44"', length: '29"', shoulder: '21"' },
    { size: 'XL', chest: '46"', length: '30"', shoulder: '22"' },
    { size: 'XXL', chest: '48"', length: '31"', shoulder: '23"' },
]

function SizeTable({ title, rows }: { title: string; rows: typeof tshirtSizes }) {
    return (
        <div className="mb-12">
            <h2 className="font-display text-xl text-ink mb-4">{title}</h2>
            <div className="overflow-x-auto border border-line">
                <table className="w-full text-sm font-body">
                    <thead>
                        <tr className="bg-line/40 border-b border-line">
                            <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wide text-ink/60">Size</th>
                            <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wide text-ink/60">Chest</th>
                            <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wide text-ink/60">Length</th>
                            <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wide text-ink/60">Shoulder</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, idx) => (
                            <tr key={row.size} className={idx !== rows.length - 1 ? 'border-b border-line' : ''}>
                                <td className="px-4 py-3 font-mono text-ink">{row.size}</td>
                                <td className="px-4 py-3 text-ink/70">{row.chest}</td>
                                <td className="px-4 py-3 text-ink/70">{row.length}</td>
                                <td className="px-4 py-3 text-ink/70">{row.shoulder}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default function SizeGuidePage() {
    return (
        <div className="min-h-screen bg-cotton">
            <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
                <p className="font-mono text-xs uppercase tracking-widest text-rust mb-2">Support</p>
                <h1 className="font-display text-4xl text-ink mb-4">Size Guide</h1>
                <p className="font-body text-sm text-ink/50 mb-10 max-w-md">
                    All measurements are in inches. If you're between sizes, we recommend sizing up for a
                    more relaxed, oversized fit — which is how our pieces are designed to be worn.
                </p>

                <SizeTable title="Drop Shoulder T-Shirt" rows={tshirtSizes} />
                <SizeTable title="Hoodie" rows={hoodieSizes} />

                <div className="border-t border-line pt-8">
                    <h2 className="font-display text-xl text-ink mb-3">How to Measure</h2>
                    <ul className="space-y-2 font-body text-sm text-ink/70 list-disc pl-5">
                        <li>
                            <strong className="text-ink">Chest:</strong> Measure around the fullest part of
                            your chest, keeping the tape level under your arms.
                        </li>
                        <li>
                            <strong className="text-ink">Length:</strong> Measure from the highest point of the
                            shoulder straight down to the bottom hem.
                        </li>
                        <li>
                            <strong className="text-ink">Shoulder:</strong> Measure from one shoulder seam
                            across to the other.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
'use client'

import { useState } from 'react'
import type { SizeChart } from '@/lib/sizeCharts'

export function SizeChartTable({
    chart,
    highlight,
}: {
    chart: SizeChart
    highlight?: string | null
}) {
    const [unit, setUnit] = useState<'in' | 'cm'>('in')

    const fmt = (n: number) => (unit === 'in' ? `${n}"` : `${Math.round(n * 2.54)} cm`)

    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <h2 className="font-display text-xl text-ink">{chart.title}</h2>
                <div className="flex border border-ink/20 text-xs font-mono">
                    {(['in', 'cm'] as const).map((u) => (
                        <button
                            key={u}
                            type="button"
                            onClick={() => setUnit(u)}
                            className={`px-3 py-1.5 transition-colors ${unit === u ? 'bg-ink text-cotton' : 'text-ink/60 hover:text-ink'
                                }`}
                        >
                            {u === 'in' ? 'Inch' : 'CM'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="overflow-x-auto border border-line">
                <table className="w-full text-sm font-body">
                    <thead>
                        <tr className="bg-line/40 border-b border-line">
                            {['Size', 'Chest', 'Length', 'Shoulder'].map((h) => (
                                <th
                                    key={h}
                                    className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wide text-ink/60"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {chart.rows.map((row, idx) => {
                            const active = highlight === row.size
                            return (
                                <tr
                                    key={row.size}
                                    className={`${idx !== chart.rows.length - 1 ? 'border-b border-line' : ''} ${active ? 'bg-indigo/5' : ''
                                        }`}
                                >
                                    <td className={`px-4 py-3 font-mono ${active ? 'text-indigo font-semibold' : 'text-ink'}`}>
                                        {row.size}
                                    </td>
                                    <td className="px-4 py-3 text-ink/70">{fmt(row.chest)}</td>
                                    <td className="px-4 py-3 text-ink/70">{fmt(row.length)}</td>
                                    <td className="px-4 py-3 text-ink/70">{fmt(row.shoulder)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
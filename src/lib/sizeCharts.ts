export type SizeRow = { size: string; chest: number; length: number; shoulder: number }

export type SizeChartKey = 'sportsware' | 'hoodie'

export type SizeChart = {
    key: SizeChartKey
    title: string
    rows: SizeRow[] // sob map inch-e
}

export const SIZE_CHARTS: Record<SizeChartKey, SizeChart> = {
    sportsware: {
        key: 'sportsware',
        title: 'Sportsware',
        rows: [
            { size: 'S', chest: 38, length: 26, shoulder: 18 },
            { size: 'M', chest: 40, length: 27, shoulder: 19 },
            { size: 'L', chest: 42, length: 28, shoulder: 20 },
            { size: 'XL', chest: 44, length: 29, shoulder: 21 },
            { size: 'XXL', chest: 46, length: 30, shoulder: 22 },
        ],
    },
    hoodie: {
        key: 'hoodie',
        title: 'Hoodie',
        rows: [
            { size: 'S', chest: 40, length: 27, shoulder: 19 },
            { size: 'M', chest: 42, length: 28, shoulder: 20 },
            { size: 'L', chest: 44, length: 29, shoulder: 21 },
            { size: 'XL', chest: 46, length: 30, shoulder: 22 },
            { size: 'XXL', chest: 48, length: 31, shoulder: 23 },
        ],
    },
}

// Category slug dekhe kon chart dekhabe. Tomar slug onno hole ekhane mil-iye nao.
export function getChartKey(categorySlug?: string): SizeChartKey {
    return categorySlug?.toLowerCase().includes('hood') ? 'hoodie' : 'sportsware'
}
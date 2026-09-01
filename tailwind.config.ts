import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  extend: {
    colors: {
      cotton: '#F7F4EC',
      ink: '#1C1B19',
      indigo: '#2A3B63',
      rust: '#9C5233',
      line: '#D9D3C4',
    },
    fontFamily: {
      display: ['var(--font-display)', 'serif'],
      body: ['var(--font-body)', 'sans-serif'],
      mono: ['var(--font-mono)', 'monospace'],
    },
  },
},
  plugins: [],
}

export default config

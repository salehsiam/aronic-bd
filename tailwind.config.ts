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
        green: {
          50: '#f3faf6',
          100: '#e8f7ef',
          200: '#a3ddb8',
          300: '#4dc983',
          400: '#28a865',
          500: '#1f8050',
          600: '#1a6b42',
          700: '#155736',
          800: '#0f4029',
          900: '#0a2e1a',
        },
        gold: {
          DEFAULT: '#c9a84c',
          light: '#f0d98a',
        },
      },
      fontFamily: {
        display: ['var(--font-dm-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        bn: ['var(--font-hind)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config

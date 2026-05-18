/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: '#000000',
        'brand-neon': '#CCFF00',
        'brand-orange': '#f97316',
        'dark-bg': '#f8f8f8',
        'dark-surface': 'rgba(0, 0, 0, 0.03)',
        'dark-border': 'rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};

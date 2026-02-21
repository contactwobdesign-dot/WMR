/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Clash Display"', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        secondary: {
          500: '#14b8a6',
          600: '#0d9488',
        },
        verdict: {
          good: '#10b981',
          acceptable: '#f59e0b',
          'too-low': '#f97316',
          'way-too-low': '#ef4444',
        },
        premium: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        gold: {
          light: '#fde68a',
          DEFAULT: '#f59e0b',
          dark: '#b45309',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

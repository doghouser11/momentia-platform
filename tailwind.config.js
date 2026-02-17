/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'momentia': {
          50: '#fef7ee',
          100: '#fcecd7',
          200: '#f8d5ae',
          300: '#f3b67b',
          400: '#ed8f46',
          500: '#e8711f',
          600: '#d95815',
          700: '#b44314',
          800: '#913617',
          900: '#762f15',
        },
        'accent': {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        }
      },
      fontFamily: {
        'elegant': ['Playfair Display', 'serif'],
        'modern': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
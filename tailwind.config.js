/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js}",
    "./src/**/*.{html,js}",
    "./components/**/*.{html,js}"
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
    extend: {
      scale: {
        '102': '1.02'
      },
      fontFamily: {
        'funnel': ['"Funnel Display"', 'sans-serif'],
      },
      colors: {
        'brand': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        'purple': {
          50: "#F5F7FF",
          100: "#EBF0FF",
          200: "#BFD1FF",
          300: "#A0AEFF",
          400: "#7A7AFF",
          500: "#5D43FF",
          600: "#450BEC",
          700: "#2D00A5",
          800: "#15005D",
          900: "#030022",
        },
      },
    },
  },
  plugins: [],
} 
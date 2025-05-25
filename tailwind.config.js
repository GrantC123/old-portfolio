/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./come-soon.html", 
    "./bankrate-data-center.html",
    "./bankrate-review-template.html",
    "./tailwind-v4-demo.html",
    "./**/*.js",
    "!./node_modules/**/*"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'funnel': ['Funnel Display', 'sans-serif'],
        'inter': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'purple': {
          '50': '#f5f7ff',
          '100': '#ebf0ff',
          '200': '#bfd1ff',
          '300': '#a0aeff',
          '400': '#7a7aff',
          '500': '#5d43ff',
          '600': '#450bec',
          '700': '#2d00a5',
          '800': '#15005d',
          '900': '#030022',
        },
      },
    },
  },
  plugins: [],
} 
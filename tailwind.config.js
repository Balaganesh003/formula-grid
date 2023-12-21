/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      'custom-red': '#FF3333',
      'custom-blue': '#3139FB',
      'custom-dark': '#333333',
      'custom-light':  '#FFFCEC',
      },
      screens: {
        'mobile-md': '440px'
      }
    },
  },
  plugins: [],
}
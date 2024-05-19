/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#f79489', 
        'secondary':'#961608',
        'tertiary':'#741106'
      }
    },
  },
  plugins: [],
}


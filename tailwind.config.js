/** @type {import('tailwindcss').Config} */


module.exports = {
//  darkMode: 'selector',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        
        'Elm-sans': ['Elm-sans', 'serif'],
        'Candal': ['Candal', 'serif'],
        'Playfair': ['Playfair','sans-serif']
      },
      colors:{
        'tertiary':  '#004643',//'#f79489', 
        'secondary': '#078080', //'#078080',//'#961608',
        'primary': '#078080', //'#741106',
        'extra': '#FF9E20',
        'extra2': "#D62828"
      }
    },
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography')
  ],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
//  darkMode: 'selector',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        'tertiary': '#004643',//'#f79489', 
        'secondary': '#078080', //'#078080',//'#961608',
        'primary': '#078080', //'#741106'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}


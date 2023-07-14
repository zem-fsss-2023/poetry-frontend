/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sacramento': ['"Sacramento"', 'cursive'],
        'esteban': ['"Esteban"', 'cursive'],
        'mont': ['"Montserrat"', 'cursive'],
      },
    },
  },
  plugins: [],
}


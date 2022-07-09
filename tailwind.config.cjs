/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./_site/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
};
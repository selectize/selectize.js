const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Lexand', ...defaultTheme.fontFamily.sans],
      display: ['Visby CF', ...defaultTheme.fontFamily.sans],
      mono: ['CaskaydiaCove Nerd Font Mono', ...defaultTheme.fontFamily.mono],
    },
  },
  corePlugins: { preflight: false },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
  darkMode: ['class', '[data-theme="dark"]']
}

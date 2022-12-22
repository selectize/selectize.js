const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 4px rgb(0 0 0 / 0.1)',
      },
      maxWidth: {
        lg: '33rem',
        '2xl': '40rem',
        '3xl': '50rem',
        '5xl': '66rem',
      },
      opacity: {
        1: '0.01',
        2.5: '0.025',
        7.5: '0.075',
        15: '0.15',
      },
    },
    fontFamily: {
      sans: ['Lexand', ...defaultTheme.fontFamily.sans],
      display: ['Visby CF', ...defaultTheme.fontFamily.sans],
      mono: ['CaskaydiaCove Nerd Font Mono', ...defaultTheme.fontFamily.mono],
    },
  },
  typography: require('./config/typography'),
  corePlugins: { preflight: false },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
  darkMode: ['class', '[data-theme="dark"]']
}

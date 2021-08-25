const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './index.html',
    './src/**/*.{js,jsx}',
    './playgrounds/**/*.{js,jsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      grayGreen: {
        light: '#8ba292',
        DEFAULT: '#5c7f67',
        dark: '#48614f',
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

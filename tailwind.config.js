/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#FFF2CE',
          200: '#FFE59D',
          300: '#FFD86C',
          400: '#FFCB3B',
          500: '#ffbe0a',
          600: '#CC9808',
          700: '#997206',
          800: '#664C04',
          900: '#332602',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};

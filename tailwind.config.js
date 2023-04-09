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
          100: '#FFF8CE',
          200: '#FFF29D',
          300: '#FFEB6C',
          400: '#FFE53B',
          500: '#FFDE0A',
          600: '#CCB208',
          700: '#998506',
          800: '#665904',
          900: '#332C02',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};

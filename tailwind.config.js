/**** Tailwind Config ****/
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#F8C8DC',
          mint: '#C8F8EB',
          yellow: '#FFF3B0',
          lavender: '#E3D5FF',
          blue: '#CDE9FF',
          cream: '#FFF6F1',
        }
      },
      boxShadow: {
        soft: '0 10px 25px rgba(0,0,0,0.08)'
      }
    },
  },
  plugins: [],
};

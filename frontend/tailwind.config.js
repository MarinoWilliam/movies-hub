/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,svg}',
  ],
  theme: {
    extend: {
      colors: {
        greenBuzz: {
          100: '#35F28D',
          200: '#28E3AD',
        },
        blueBuzz: {
          100: '#38BCDB',
          200: '#468AEE',
        },
        orangeBuzz: {
          100: '#FFB918',
          200: '#FF7117',
          300: '#FE461A',
        },
        grayBuzz: {
          100: '#D7D9DA',
          200: '#26354B',
        },
      }
    },
  },
  plugins: [],
}


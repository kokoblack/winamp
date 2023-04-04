/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      colors: {
        white: '#FEFEFE',
        bright_orange: '#EC625F',
        grey: '#979797',
        dark_grey: '#626262',
        black: 'linear-gradient(182.2deg, rgba(32, 28, 28, 0.91) 0%, rgba(23, 22, 22, 0.94) 89.97%)',
        light_black: '#1B1818',
        dark_black: '#111111',
        gradient: 'linear-gradient(242.35deg, rgba(236, 98, 95, 0.95) 14.44%, rgba(236, 98, 95, 0.35) 89.71%)'
      },
      fontFamily: {
        'nunito': ['Nunito Sans', 'sans-serif'],
        'raleway': ['Raleway', 'sans-serif']
      },
      fontSize: {
        xxsm: ['.5rem', '.6rem'],
        xsm: ['.625rem', '.8rem'],
        vxsm: ['.5rem', '0'],
        vsm: ['.625rem', '0'],
        sm: ['.75rem', '.9rem'],
        base: ['.875rem', '1.375rem'],
        medium: ['1rem', '1.5rem'],
        lg: ['1.125rem', '1.625'],
        xl: ['1.375rem', '2rem'],
        nl: ['1.5rem', '1.6rem'],
        xxl: ['2.625rem', '3.5rem']
      },
      screens: {
        'phone': '380px',
        'tablet': '550px',
        'pad': '850px',
        'lap': '1000px',
        'laptop': '1024px',
        'desktop': '1280px',
      },
  
  },
  darkMode: 'class',
  plugins: [],
}

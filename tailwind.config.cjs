/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hover: 'red'
      },
      animation: {
        'move-right': 'myfirst 6s linear',
      },
      keyframes: {
        myfirst: {
          '0%': { left: 0 },
          '75%, 100%': {
            left: '100%',
            opacity: 0
          }
        },
        ping2: {
          '75%, 100%': {
            transform: 'scale(1)',
            opacity: 0
          }
        }
      }
    },
  },
  plugins: [],
}

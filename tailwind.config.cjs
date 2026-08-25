/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './src/**/*.{js,css}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      fontFamily: {
        'bonyad': ['BonyadeKoodak', 'sans-serif'],
        'bonyad-num': ['BonyadeKoodakNum', 'sans-serif'],
      },
      colors: {
        'abali-lajvard': '#1234C0',
        'abali-darya': '#4383C4',
        'abali-aseman': '#0EBBEE',
        'abali-naneh': '#E5D840',
        'abali-zafaran': '#FDC939',
        'abali-mast': '#FBFAF9',
      },
    },
  },
  plugins: [],
}

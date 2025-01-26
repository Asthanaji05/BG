/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#FF7F50',
        secondary: '#4A5568',
      },
      fontFamily: {
        sanskrit: ['Sanskrit Text', 'serif'],
      },
    },
  },
  plugins: [],
}
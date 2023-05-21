/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        home: "-8px -8px 25px rgba(255, 255, 255, 1), 8px 8px 25px rgba(0, 0, 0, 0.25), inset 3px 3px 10px rgba(0, 0, 0, 0.1), inset -1px -1px 15px rgba(255, 255, 255, 1)",
      }
    },
  },
  plugins: [],
}


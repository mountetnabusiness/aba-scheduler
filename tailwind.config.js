/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        base: '1.125rem', // 18px
        sm: '1rem',       // 16px
        lg: '1.25rem',    // 20px
        xl: '1.5rem',     // 24px
      },
    },
  },
  plugins: [],
}

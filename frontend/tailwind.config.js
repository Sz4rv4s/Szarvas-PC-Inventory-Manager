/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#003366',
        'secondary': '#FFFFFF',
        'cred': '#B60303'
      },
    },
  },
  plugins: [],
}

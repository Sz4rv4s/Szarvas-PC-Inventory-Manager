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
        'cred': '#B60303',
        'credhover': '#8C0202',
        'cblue': '#007BFF',
        'cbluehover': '#0056B3',
        'cgreen': '#28a745',
        'cgreenhover': '#218838',
      },
    },
  },
  plugins: [],
}


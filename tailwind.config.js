/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'yellow-primary': '#FFF100',
        'blue-primary': '#006BFF',
        'cyan-light': '#08C2FF',
        'cyan-ultra-light': '#BCF2F6',
        'gray-light': '#F5F5F5',
        'gray-medium': '#CCCCCC',
        'gray-dark': '#333333',
        'green-success': '#58CC02',
        'red-energy': '#FF4B4B',
        'orange-curious': '#FFA500',
        'gray-not': '#9CA3AF',
      },
      fontFamily: {
        sans: ['Nunito', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'h1-mobile': '24px',
        'h2-mobile': '20px',
        'body-mobile': '16px',
        'small-mobile': '14px',
        'h1-desktop': '32px',
        'h2-desktop': '24px',
        'body-desktop': '18px',
        'small-desktop': '16px',
      },
      borderRadius: {
        'btn': '16px',
        'card': '12px',
      },
      boxShadow: {
        'btn-primary': '0 4px 0 rgba(0, 107, 255, 0.3)',
        'btn-primary-hover': '0 6px 0 rgba(0, 107, 255, 0.3)',
        'btn-primary-active': '0 2px 0 rgba(0, 107, 255, 0.3)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 12px rgba(0, 107, 255, 0.2)',
      },
    },
  },
  plugins: [],
}

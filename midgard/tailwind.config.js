/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      colors: {
        kdci: {
          red: '#E61739',
          black: '#1D1D1F',
          dark: '#020202',
          gray: '#F5F5F7',
        },
      },
      keyframes: {
        'blob-float': {
          '0%': { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
          '33%': { transform: 'translate(100px, -50px) scale(1.1) rotate(5deg)' },
          '66%': { transform: 'translate(-50px, 100px) scale(0.9) rotate(-5deg)' },
          '100%': { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
        },
        'blob-float-reverse': {
          '0%': { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
          '33%': { transform: 'translate(-100px, 50px) scale(1.1) rotate(-5deg)' },
          '66%': { transform: 'translate(50px, -100px) scale(0.9) rotate(5deg)' },
          '100%': { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
        },
      },
      animation: {
        'blob-float': 'blob-float 25s infinite alternate ease-in-out',
        'blob-float-reverse': 'blob-float-reverse 30s infinite alternate-reverse ease-in-out',
      },
    },
  },
};

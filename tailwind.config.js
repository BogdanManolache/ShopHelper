/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Roboto Mono', 'monospace'],
    },

    extend: {
      height: {
        screen: ['100dvh'],
      },
      boxShadow: {
        '3xl': '0 0 10px 1000px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
};

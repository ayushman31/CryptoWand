/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}" 
  ],
  theme: {
    
    extend: {
      colors: {
        'bg-color' : '#1F2229', 
      },
      fontFamily: {
        'cinzel' : ['Cinzel' , 'serif'],
        'uncial': ['Uncial Antiqua', 'cursive'],
        'amarante' : ['Amarante']
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      }
    },
  },
  plugins: [],
}

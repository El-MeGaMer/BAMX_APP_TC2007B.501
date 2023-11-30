/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media", // or 'media' or 'class
  theme: {
    extend: {
      colors: {
        'orange' : "#FF8000", 
        "gray-1": "#A0A0A0",
        'red-hightlight': "#FF0025",
        
      },
      fontFamily: {
        interThin: ['Inter_100Thin'],
        Inter_900Black: ['Inter_900Black'],
        
      }
    },
    
  },
  plugins: [],
}


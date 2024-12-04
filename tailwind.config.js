/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "grid-pattern": `repeating-linear-gradient(0deg, #EDEDF2 0, #EDEDF2 1px, transparent 1px, transparent 40px), 
                         repeating-linear-gradient(90deg, #EDEDF2 0, #EDEDF2 1px, transparent 1px, transparent 40px)`,
        "gradient-45": "linear-gradient(45deg, #06b6d4, #3b82f6, #a855f7)",
      },
    },
  },
  plugins: [],
};

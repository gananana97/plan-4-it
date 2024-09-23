/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: { primary: "#1a73e8", secondary: "#ff5f5f", accent: "#fcd34d" },
    fontFamily: {
      sans: ["Poppins", "sans-serif"], // Custom font
      serif: ["Merriweather", "serif"],
    },
    spacing: {
      128: "32rem", // Custom spacing unit
      144: "36rem",
    },
    screens: {
      xs: "480px", // Custom breakpoint for small screens
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

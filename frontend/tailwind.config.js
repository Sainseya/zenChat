/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#E8ECEB",
        alabaster: "#EAE3D9",
        alabasterHover: "#D8D2C9",
        dun: "#D7C2AD",
        dunHover: "#C5B19E",
        beaver: "#927265",
        jet: "#444148",
        cinereous: "#7E6C6A",
      },
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [],
};

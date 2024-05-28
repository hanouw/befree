/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "my-color-darkblue": "#141E46",
        "my-color-superlightgreen": "#DDF9E9",
        "my-color-lightgreen": "#8DECB4",
        "my-color-deepgreen": "#41B06E",
        "my-color-beige": "#FFF5E0",
      },
      width: {
        mywidth1200: "1200px",
      },
    },
  },
  plugins: [],
};

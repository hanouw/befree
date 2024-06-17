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
        mywidth90: "90vw",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    function ({ addUtilities }) {
      const newUtilities = {
        /* 스크롤바 트랙 */
        ".scrollbar-track": {
          "scrollbar-width": "thin",
          "-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
        },
        /* 스크롤바 핸들 */
        ".scrollbar-thumb": {
          "-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "0.25rem",
          },
          "&:hover": {
            "-webkit-scrollbar-thumb": {
              background: "#555",
            },
          },
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};

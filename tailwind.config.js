/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "index.html"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        textColors: {
          primary: "#232e35",
          secondary: "#656d72",
        },
        borderColors: "#f1f1f1",
        lineColors: "#d9d9d9",
        backgroundColors: {
          primary: "#fff",
          secondary: "#fbfbfb",
          third: "#f5f3fe",
        },
        iconColors: {
          primary: "#7e74f1",
          hover: "#5d51e8",
        },
      },
      container: {
        center: true,
        screens: {
          md: "1280px",
        },
      },
      spacing: {
        sectionPaddingY: "6rem",
        sectionPaddingX: "0",
      },
      borderRadius: {
        item: "0.7rem",
      },
    },
  },
  plugins: [],
};

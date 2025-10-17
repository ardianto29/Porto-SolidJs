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
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'gradient': 'gradient 3s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
};

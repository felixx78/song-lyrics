/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Mulish", "sans-serif"],
    },
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      screens: {
        xl2: "1440px",
      },
      colors: {
        gray: {
          500: "#88879A",
        },
      },
    },
  },
  plugins: [],
};

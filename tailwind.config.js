/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    screens: {
      "3xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }
      "2xl": { max: "1400px" },
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }
      lx: { max: "889px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
      xs: { max: "439px" },
      // => @media (max-width: 439px) { ... }
    },
  },
  plugins: [],
};

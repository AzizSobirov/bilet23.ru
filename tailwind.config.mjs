/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./public/**/*.{html,js}",
  ],
  theme: {
    extend: {},
    screens: {
      xs: "340px",
      sm: "500px",
      md: "660px",
      lg: "1000px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};

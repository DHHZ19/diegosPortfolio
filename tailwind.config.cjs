/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            a: {
              "&:hover": {
                "text-shadow": "0 0 5px #ffffff",
              },
            },
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/typography")],
};

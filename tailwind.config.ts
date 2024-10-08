import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
      },
      colors: {
        text: {
          gray: "#021526B2",
          black: "#021526",
          slate: "#808A93",
          darkGray: "#021526CC",
        },
        background: {
          darkGray: "#02152680",
          gray: "#02152657",
          lightGray: "#DBDBDB",
        },
        button: { gray: "#676E76", tomato: "#F93B1D", green: "#45A849" },
      },
    },
  },
  plugins: [],
};
export default config;

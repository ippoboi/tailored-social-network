import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F0F0F",
        componentBackground: "#1C1C1C",
        componentOutline: "#2E2E2E",
        btn: {
          background: "#2E2E2E",
          outline: "#3E3E3E",
          "background-hover": "#3E3E3E",
          "outline-hover": "#232323",
        },
        inputField: {
          background: "#232323",
          outline: "#3E3E3E",
        },
        white: "#EDEDED",
        subTitle: "#A0A0A0",
        subtileText: "#3E3E3E",
        iconInactive: "#717171",
        hobbies: "#72FFD5",
        error: "#FF7272",
        success: "#72FFD5",
      },
    },
  },
  plugins: [],
};
export default config;

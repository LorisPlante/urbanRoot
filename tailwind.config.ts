import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        lightGreen: "#9EE8BD",
        darkGreen: "#00A481",
        primary: "#121213",
        secondary: "#eeeeee",
      },
      fontFamily: {
        tanker: "Tanker, sans-serif",
      },
    },
  },
  plugins: [],
};
export default config;

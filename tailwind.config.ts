import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "primary-color": "#687bfb",
        "primary-color-hover": "#5367df",
        "page-bg": "#eaeef7",

        "font-color": "#232c43",

        "red-color": "#f65f5a",
        "bg-red-color": "#fac4b5",

        "orange-color": "#f67352",
        "bg-orange-color": "#ffe3b9",

        "green-color": "#35be65",
        "bg-green-color": "#d4f4d3",

        "table-header-bg": "#f5f6f8",
      },
    },
  },
  plugins: [],
} satisfies Config;

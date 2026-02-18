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
        accent: {
          DEFAULT: "#7c3aed",
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        background: "#050508",
        surface: {
          DEFAULT: "#0f0f18",
          light: "#181826",
          lighter: "#242438",
        },
        card: {
          DEFAULT: "#121220",
          hover: "#18182b",
        },
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "12px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(0, 0, 0, 0.4)",
        "card-hover": "0 12px 40px rgba(124, 58, 237, 0.2)",
        glow: "0 0 30px rgba(124, 58, 237, 0.3)",
      },
      backgroundImage: {
        "gradient-accent": "linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)",
        "gradient-surface": "linear-gradient(180deg, #181826 0%, #0f0f18 100%)",
      },
    },
  },
  plugins: [],
};
export default config;

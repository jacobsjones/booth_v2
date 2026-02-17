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
        // Stitch design tokens
        accent: {
          DEFAULT: "#6a25f4",
          50: "#f3eefe",
          100: "#e0d4fc",
          200: "#c5a8f9",
          300: "#a97cf6",
          400: "#8a4ff3",
          500: "#6a25f4",
          600: "#551dc3",
          700: "#401592",
          800: "#2b0e62",
          900: "#150731",
        },
        surface: {
          DEFAULT: "#1a1a2e",
          50: "#2a2a42",
          100: "#222238",
          200: "#1a1a2e",
          300: "#141425",
          400: "#0f0f1c",
          500: "#0a0a14",
        },
        card: {
          DEFAULT: "#222238",
          hover: "#2a2a42",
        },
        muted: {
          DEFAULT: "#8888a4",
          foreground: "#b0b0c8",
        },
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "8px",
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(0, 0, 0, 0.3)",
        "card-hover": "0 8px 32px rgba(106, 37, 244, 0.15)",
        glow: "0 0 40px rgba(106, 37, 244, 0.25)",
        marker: "0 2px 8px rgba(0, 0, 0, 0.3)",
      },
      backgroundImage: {
        "gradient-accent":
          "linear-gradient(135deg, #6a25f4 0%, #8a4ff3 50%, #a97cf6 100%)",
        "gradient-dark":
          "linear-gradient(180deg, #1a1a2e 0%, #0f0f1c 100%)",
        "gradient-hero":
          "linear-gradient(180deg, rgba(106, 37, 244, 0.15) 0%, rgba(26, 26, 46, 0) 60%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(106, 37, 244, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(106, 37, 244, 0.4)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

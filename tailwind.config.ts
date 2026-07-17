import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FBF9F4",
          100: "#F6F1E7",
          200: "#EDE4D3",
        },
        sage: {
          50: "#F2F4EF",
          100: "#E1E6DB",
          200: "#C4CDB8",
          300: "#A3B093",
          400: "#849371",
          500: "#697A58",
          600: "#526145",
          700: "#414D38",
          800: "#333C2D",
          900: "#272E23",
        },
        gold: {
          300: "#DFC894",
          400: "#CFB172",
          500: "#B99755",
          600: "#9C7C40",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        script: ["var(--font-great-vibes)", "cursive"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;

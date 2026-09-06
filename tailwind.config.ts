import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Palet hangat yang serasi dengan foto: gading, sage, dan emas sampanye
        ivory: {
          50: "#FDFBF7",
          100: "#F8F4EC",
          200: "#EFE8DA",
          300: "#E2D7C3",
        },
        sage: {
          100: "#DFE5DA",
          200: "#C3CDBB",
          300: "#A2B097",
          400: "#818F76",
          500: "#67735D",
          600: "#4F5A47",
          700: "#3C4536",
          800: "#2C3327",
          900: "#1E231B",
        },
        gold: {
          200: "#EBD9B4",
          300: "#DCC08A",
          400: "#C9A76A",
          500: "#B08D57",
          600: "#8F7044",
        },
        ink: "#23261F",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        script: ["var(--font-parisienne)", "cursive"],
      },
      letterSpacing: {
        widest: "0.28em",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slow-zoom": {
          from: { transform: "scale(1.08)" },
          to: { transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        "slow-zoom": "slow-zoom 12s ease-out both",
        float: "float 3.5s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

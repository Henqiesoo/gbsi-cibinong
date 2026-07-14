import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Warna dasar hangat (putih/krem)
        cream: {
          50: "#FBF9F5",
          100: "#F6F1E9",
          200: "#EDE4D7",
          300: "#DFD2BE",
        },
        // Aksen biru — diambil dari logo Berea Indonesia (#5E8DDF)
        brand: {
          50: "#F1F5FC",
          100: "#E0EAF9",
          200: "#C3D6F2",
          300: "#9BBAE9",
          400: "#78A2E4",
          500: "#5E8DDF",
          600: "#4470C4",
          700: "#365CA4",
          800: "#2E4C86",
          900: "#253C69",
        },
        ink: "#22313A",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        serif: ["var(--font-lora)", "Georgia", "serif"],
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;

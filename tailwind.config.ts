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
        // Aksen biru/teal — senada dengan kursi & stola koor GBSI
        brand: {
          50: "#EFF9F9",
          100: "#D7EFF0",
          200: "#B0DFE2",
          300: "#7FC8CD",
          400: "#4BAAB2",
          500: "#2E8F98",
          600: "#23747E",
          700: "#1F5F68",
          800: "#1D4E56",
          900: "#1B4148",
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

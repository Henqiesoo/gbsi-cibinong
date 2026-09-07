import type { Config } from "tailwindcss";

// Setiap warna menunjuk ke CSS variable supaya seluruh tampilan bisa berganti
// tema hanya dengan menukar nilai variabel (lihat app/globals.css & lib/themes.ts).
// Format "rgb(var(--x) / <alpha-value>)" dipakai agar modifier transparansi
// Tailwind (mis. bg-surface/70) tetap berfungsi.
const warna = (nama: string) => `rgb(var(${nama}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Latar halaman & permukaan terang
        ivory: {
          50: warna("--ivory-50"),
          100: warna("--ivory-100"),
          200: warna("--ivory-200"),
          300: warna("--ivory-300"),
        },
        // Warna utama: teks, tombol, dan permukaan gelap
        sage: {
          100: warna("--sage-100"),
          200: warna("--sage-200"),
          300: warna("--sage-300"),
          400: warna("--sage-400"),
          500: warna("--sage-500"),
          600: warna("--sage-600"),
          700: warna("--sage-700"),
          800: warna("--sage-800"),
          900: warna("--sage-900"),
        },
        // Aksen
        gold: {
          200: warna("--gold-200"),
          300: warna("--gold-300"),
          400: warna("--gold-400"),
          500: warna("--gold-500"),
          600: warna("--gold-600"),
        },
        // Selalu terang di tema mana pun — dipakai untuk teks di atas foto
        // gelap (cover, lightbox, footer) yang memang gelap di semua tema.
        cream: {
          50: "#FDFBF7",
          100: "#F1EADD",
          200: "#D8CFC0",
        },
        ink: warna("--ink"),
        // Permukaan kartu / panel melayang, dan garis tepinya
        surface: warna("--surface"),
        edge: warna("--edge"),
        // Warna teks di atas tombol utama
        onprimary: warna("--onprimary"),
      },
      // Font mengikuti tema aktif (lihat lib/themes.ts)
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      // Bahasa bentuk juga ikut tema: ada yang membulat, ada yang tegas,
      // dan tema Royal Red memakai lengkung gerbang untuk foto.
      borderRadius: {
        "2xl": "var(--r-md)",
        "3xl": "var(--r-lg)",
        foto: "var(--r-foto)",
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
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        "slow-zoom": "slow-zoom 12s ease-out both",
        float: "float 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

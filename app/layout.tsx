import type { Metadata, Viewport } from "next";
import {
  Cinzel,
  Cormorant_Garamond,
  Great_Vibes,
  Jost,
  Marcellus,
  Parisienne,
  Pinyon_Script,
  Playfair_Display,
  Plus_Jakarta_Sans,
} from "next/font/google";
import { weddingConfig } from "@/lib/wedding-config";
import "./globals.css";

// Setiap tema memilih pasangan fontnya sendiri (lihat lib/themes.ts).
// Font non-bawaan dimuat dengan preload:false — berkasnya baru diunduh browser
// ketika benar-benar dipakai, jadi tema lain tidak membebani halaman.
const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});
const parisienne = Parisienne({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-parisienne",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: false,
});
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  preload: false,
});
const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marcellus",
  display: "swap",
  preload: false,
});
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
  preload: false,
});
const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-greatvibes",
  display: "swap",
  preload: false,
});
const pinyon = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pinyon",
  display: "swap",
  preload: false,
});

const fontVars = [
  cormorant,
  jakarta,
  parisienne,
  playfair,
  cinzel,
  marcellus,
  jost,
  greatVibes,
  pinyon,
]
  .map((f) => f.variable)
  .join(" ");

const { groom, bride } = weddingConfig.couple;
const title = `${groom.nickname} & ${bride.nickname} — Undangan Pernikahan`;
const description = `Dengan sukacita kami mengundang Anda ke pernikahan ${groom.fullName} & ${bride.fullName}, ${weddingConfig.eventDateLabel}.`;

// Domain publik untuk membangun URL absolut di tag Open Graph (preview WhatsApp)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: weddingConfig.heroPhoto, width: 1000, height: 1776 }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={fontVars}>
      <body className="bg-ivory-50 font-sans text-ink antialiased selection:bg-gold-300/40">
        {children}
      </body>
    </html>
  );
}

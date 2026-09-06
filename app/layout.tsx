import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Parisienne, Plus_Jakarta_Sans } from "next/font/google";
import { weddingConfig } from "@/lib/wedding-config";
import "./globals.css";

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
  themeColor: "#3C4536",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${cormorant.variable} ${jakarta.variable} ${parisienne.variable}`}
    >
      <body className="bg-ivory-50 font-sans text-ink antialiased selection:bg-gold-300/40">
        {children}
      </body>
    </html>
  );
}

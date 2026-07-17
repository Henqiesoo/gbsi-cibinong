import type { Metadata, Viewport } from "next";
import { Great_Vibes, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { weddingConfig } from "@/lib/wedding-config";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
});

const { groom, bride } = weddingConfig.couple;

export const metadata: Metadata = {
  title: `Undangan Pernikahan ${groom.nickname} & ${bride.nickname}`,
  description: `Dengan penuh sukacita, kami mengundang Anda ke pernikahan ${groom.nickname} & ${bride.nickname} — ${weddingConfig.eventDateLabel}.`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#414D38",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${playfair.variable} ${jakarta.variable} ${greatVibes.variable}`}>
      <body className="bg-cream-50 font-sans text-sage-800 antialiased">{children}</body>
    </html>
  );
}

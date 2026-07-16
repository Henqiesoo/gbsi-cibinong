import type { Metadata } from "next";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: {
    default: `${site.namaSingkat} — ${site.tagline}`,
    template: `%s — ${site.namaSingkat}`,
  },
  description: site.deskripsi,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${jakarta.variable} ${lora.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        {/* Tanpa JavaScript, elemen fade-in tetap langsung terlihat */}
        <noscript>
          <style>{`.fade-mula{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}

"use client";

import { useOrnamen } from "@/components/TemaProvider";
import type { GayaOrnamen } from "@/lib/themes";

// Hiasan pemisah antar bagian. Bentuknya berbeda tiap tema supaya karakter
// masing-masing tema terasa, bukan sekadar berganti warna.
const bentuk: Record<GayaOrnamen, React.ReactNode> = {
  // Sehelai daun di antara dua garis — natural, tenang
  daun: (
    <>
      <path d="M6 14h68M126 14h68" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />
      <path
        d="M100 3c-4.5 4-11 5.2-16 5.6 4.6 1.6 11 2.8 16 10.4 5-7.6 11.4-8.8 16-10.4-5-.4-11.5-1.6-16-5.6z"
        fill="currentColor"
      />
      <path d="M100 19v6" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <circle cx="80" cy="14" r="1.6" fill="currentColor" />
      <circle cx="120" cy="14" r="1.6" fill="currentColor" />
    </>
  ),

  // Belah ketupat bertingkat ala art deco — tegas, mewah
  deco: (
    <>
      <path d="M2 14h72M126 14h72" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.65" />
      <path d="M100 2l9 12-9 12-9-12z" fill="currentColor" />
      <path d="M100 6.5l5.5 7.5-5.5 7.5-5.5-7.5z" fill="none" stroke="rgb(0 0 0 / 0.35)" strokeWidth="0.7" />
      <path d="M84 14l5-6v12zM116 14l-5-6v12z" fill="currentColor" opacity="0.8" />
      <circle cx="76" cy="14" r="1.4" fill="currentColor" />
      <circle cx="124" cy="14" r="1.4" fill="currentColor" />
    </>
  ),

  // Tiga kelopak bunga dengan sulur — feminin, cat air
  bunga: (
    <>
      <path
        d="M8 16c22-8 44 8 62 0M130 16c18 8 40-8 62 0"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      <circle cx="100" cy="10" r="4.5" fill="currentColor" opacity="0.9" />
      <circle cx="93" cy="18" r="4" fill="currentColor" opacity="0.72" />
      <circle cx="107" cy="18" r="4" fill="currentColor" opacity="0.72" />
      <circle cx="100" cy="15" r="1.8" fill="rgb(255 255 255 / 0.85)" />
      <path d="M78 12c4 3 8 4 12 4M122 12c-4 3-8 4-12 4" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" fill="none" />
    </>
  ),

  // Sekadar garis tipis dengan satu titik — minimalis
  garis: (
    <>
      <path d="M20 14h72M108 14h72" stroke="currentColor" strokeWidth="1" strokeLinecap="square" />
      <rect x="98" y="12" width="4" height="4" fill="currentColor" />
    </>
  ),

  // Motif kawung/tumpal berulang — nuansa batik
  batik: (
    <>
      <path d="M4 14h56M140 14h56" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.6" />
      {[70, 100, 130].map((x) => (
        <g key={x}>
          <path d={`M${x} 4l7 10-7 10-7-10z`} fill="none" stroke="currentColor" strokeWidth="1.1" />
          <circle cx={x} cy="14" r="2.4" fill="currentColor" />
        </g>
      ))}
      <path d="M64 14h4M132 14h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </>
  ),

  // Lengkung gerbang dengan rumbai — meniru pelaminan bergaya royal
  mandala: (
    <>
      <path d="M4 18h58M138 18h58" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.6" />
      <path d="M78 20a22 22 0 0144 0" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M100 2v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="100" cy="2" r="2.2" fill="currentColor" />
      {[84, 92, 100, 108, 116].map((x, i) => (
        <circle key={x} cx={x} cy={20 + (i === 2 ? 4 : i === 1 || i === 3 ? 2.5 : 0)} r="1.5" fill="currentColor" opacity="0.85" />
      ))}
      <circle cx="70" cy="18" r="1.6" fill="currentColor" />
      <circle cx="130" cy="18" r="1.6" fill="currentColor" />
    </>
  ),
};

export default function Ornament({ className = "" }: { className?: string }) {
  const gaya = useOrnamen();
  return (
    <svg viewBox="0 0 200 28" fill="none" className={className} aria-hidden="true">
      {bentuk[gaya]}
    </svg>
  );
}

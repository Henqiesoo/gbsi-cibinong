"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { weddingConfig } from "@/lib/wedding-config";
import Reveal from "@/components/Reveal";

export default function Gallery() {
  const photos = weddingConfig.gallery;
  const [aktif, setAktif] = useState<number | null>(null);
  const sentuhX = useRef<number | null>(null);

  const tutup = useCallback(() => setAktif(null), []);
  const sebelum = useCallback(
    () => setAktif((i) => (i === null ? null : (i + photos.length - 1) % photos.length)),
    [photos.length]
  );
  const sesudah = useCallback(
    () => setAktif((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length]
  );

  // Kunci scroll + navigasi keyboard saat lightbox terbuka
  useEffect(() => {
    if (aktif === null) return;
    const scrollSebelumnya = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") tutup();
      if (e.key === "ArrowLeft") sebelum();
      if (e.key === "ArrowRight") sesudah();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = scrollSebelumnya;
      window.removeEventListener("keydown", onKey);
    };
  }, [aktif, tutup, sebelum, sesudah]);

  return (
    <section id="galeri" className="scroll-mt-4 px-6 py-20 text-center">
      <Reveal>
        <p className="eyebrow">Galeri</p>
        <h2 className="section-title mt-3">Momen Kami</h2>
        <p className="section-sub">Sepenggal cerita dalam perjalanan kami berdua.</p>
        <div className="hairline mt-8" />
      </Reveal>

      {/* Grid mozaik: foto pertama & terakhir dibuat lebih besar */}
      <div className="mt-12 grid grid-cols-2 gap-3">
        {photos.map((photo, i) => (
          <Reveal key={photo.src} delay={i * 60} className={i === 0 ? "col-span-2" : ""}>
            <button
              onClick={() => setAktif(i)}
              aria-label={`Perbesar foto: ${photo.alt}`}
              className={`group relative w-full overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
                i === 0 ? "aspect-[4/3]" : "aspect-square"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
              />
              <span className="absolute inset-0 bg-sage-900/0 transition group-hover:bg-sage-900/15" />
            </button>
          </Reveal>
        ))}
      </div>

      {aktif !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-sage-900/95 p-4 backdrop-blur-sm"
          onClick={tutup}
          onTouchStart={(e) => (sentuhX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (sentuhX.current === null) return;
            const geser = e.changedTouches[0].clientX - sentuhX.current;
            if (geser > 60) sebelum();
            else if (geser < -60) sesudah();
            sentuhX.current = null;
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Pratinjau foto"
        >
          <button
            onClick={tutup}
            aria-label="Tutup"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2.5 text-ivory-50 transition hover:bg-white/20"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              sebelum();
            }}
            aria-label="Foto sebelumnya"
            className="absolute left-2 rounded-full bg-white/10 p-2.5 text-ivory-50 transition hover:bg-white/20 md:left-8"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos[aktif].src}
            alt={photos[aktif].alt}
            className="max-h-[82vh] max-w-full rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              sesudah();
            }}
            aria-label="Foto berikutnya"
            className="absolute right-2 rounded-full bg-white/10 p-2.5 text-ivory-50 transition hover:bg-white/20 md:right-8"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs tracking-wider text-ivory-100">
            {aktif + 1} / {photos.length}
          </div>
        </div>
      )}
    </section>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { weddingConfig } from "@/lib/wedding-config";

export default function Gallery() {
  const photos = weddingConfig.gallery;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + photos.length - 1) % photos.length)),
    [photos.length]
  );
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length]
  );

  // Navigasi keyboard untuk lightbox
  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, close, prev, next]);

  return (
    <section className="bg-white/60 px-6 py-16 text-center">
      <h2 className="section-title">Galeri</h2>
      <p className="section-subtitle">Sepenggal kisah perjalanan kami.</p>

      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setActiveIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400"
            aria-label={`Perbesar ${photo.alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-sage-900/90 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Pratinjau foto"
        >
          <button
            onClick={close}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-cream-50 hover:bg-white/20"
            aria-label="Tutup"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-2 rounded-full bg-white/10 p-2 text-cream-50 hover:bg-white/20 md:left-6"
            aria-label="Foto sebelumnya"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos[activeIndex].src}
            alt={photos[activeIndex].alt}
            className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-2 rounded-full bg-white/10 p-2 text-cream-50 hover:bg-white/20 md:right-6"
            aria-label="Foto berikutnya"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs text-cream-100">
            {activeIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </section>
  );
}

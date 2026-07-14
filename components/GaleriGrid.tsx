"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  labelKategori,
  type FotoGaleri,
  type KategoriGaleri,
} from "@/lib/data/galeri";

const semuaTab: Array<{ id: "semua" | KategoriGaleri; label: string }> = [
  { id: "semua", label: "Semua" },
  { id: "ibadah", label: labelKategori.ibadah },
  { id: "acara", label: labelKategori.acara },
  { id: "fasilitas", label: labelKategori.fasilitas },
];

// Grid galeri dengan tab filter per kategori + lightbox custom
// (tanpa library tambahan).
export default function GaleriGrid({ foto }: { foto: FotoGaleri[] }) {
  const [tabAktif, setTabAktif] = useState<"semua" | KategoriGaleri>("semua");
  const [indexTerbuka, setIndexTerbuka] = useState<number | null>(null);

  const fotoTampil =
    tabAktif === "semua" ? foto : foto.filter((f) => f.kategori === tabAktif);

  const tutup = useCallback(() => setIndexTerbuka(null), []);
  const sebelumnya = useCallback(() => {
    setIndexTerbuka((i) =>
      i === null ? null : (i - 1 + fotoTampil.length) % fotoTampil.length
    );
  }, [fotoTampil.length]);
  const berikutnya = useCallback(() => {
    setIndexTerbuka((i) => (i === null ? null : (i + 1) % fotoTampil.length));
  }, [fotoTampil.length]);

  // Navigasi keyboard untuk lightbox
  useEffect(() => {
    if (indexTerbuka === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") tutup();
      if (e.key === "ArrowLeft") sebelumnya();
      if (e.key === "ArrowRight") berikutnya();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [indexTerbuka, tutup, sebelumnya, berikutnya]);

  const fotoAktif = indexTerbuka === null ? null : fotoTampil[indexTerbuka];

  return (
    <div>
      {/* Tab filter kategori */}
      <div className="flex flex-wrap gap-2">
        {semuaTab.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setTabAktif(tab.id);
              setIndexTerbuka(null);
            }}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              tabAktif === tab.id
                ? "bg-brand-600 text-white shadow-sm"
                : "border border-cream-300 bg-white text-ink hover:border-brand-400 hover:text-brand-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid foto */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {fotoTampil.map((f, i) => (
          <button
            key={f.src}
            type="button"
            onClick={() => setIndexTerbuka(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-cream-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label={`Perbesar foto: ${f.alt}`}
          >
            <Image
              src={f.src}
              alt={f.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-3 pb-2 pt-8 text-left text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
              {f.alt}
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {fotoAktif && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={fotoAktif.alt}
          onClick={tutup}
        >
          <div
            className="relative flex max-h-full w-full max-w-4xl flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl sm:aspect-[16/10]">
              <Image
                src={fotoAktif.src}
                alt={fotoAktif.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-4 text-cream-100">
              <p className="text-sm">{fotoAktif.alt}</p>
              <p className="shrink-0 text-xs text-cream-100/70">
                {indexTerbuka! + 1} / {fotoTampil.length}
              </p>
            </div>
          </div>

          {/* Tombol tutup */}
          <button
            type="button"
            onClick={tutup}
            aria-label="Tutup"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>

          {/* Navigasi kiri/kanan */}
          {fotoTampil.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  sebelumnya();
                }}
                aria-label="Foto sebelumnya"
                className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-4"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 5l-7 7 7 7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  berikutnya();
                }}
                aria-label="Foto berikutnya"
                className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-4"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

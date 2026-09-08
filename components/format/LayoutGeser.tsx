"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { weddingConfig } from "@/lib/wedding-config";
import PutarOtomatis from "@/components/format/PutarOtomatis";
import type { Bagian } from "@/components/format/tipe";

/* Format "geser" — dipakai tema Dark Luxury.
   Undangan tidak digulir ke bawah, melainkan digeser ke samping: satu
   bagian mengisi satu layar penuh, seperti buku acara gala yang dibalik
   ke samping. Bagian yang isinya panjang bisa digulir di dalam panelnya
   sendiri. */
export default function LayoutGeser({ bagian }: { bagian: Bagian[] }) {
  const [indeks, setIndeks] = useState(0);
  const relRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<(HTMLElement | null)[]>([]);

  // Halaman tidak ikut bergulir — semua gerakan terjadi di dalam panel
  useEffect(() => {
    const asal = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = asal;
    };
  }, []);

  const ke = useCallback(
    (i: number) => {
      const rel = relRef.current;
      if (!rel) return;
      const n = Math.max(0, Math.min(bagian.length - 1, i));
      rel.scrollTo({ left: n * rel.clientWidth, behavior: "smooth" });
      setIndeks(n);
    },
    [bagian.length]
  );

  // Saat tamu menggeser sendiri dengan jari, penanda ikut menyesuaikan
  function saatGeser() {
    const rel = relRef.current;
    if (!rel) return;
    const n = Math.round(rel.scrollLeft / rel.clientWidth);
    if (n !== indeks) setIndeks(n);
  }

  const wadahAktif = useCallback(() => panelRef.current[indeks] ?? null, [indeks]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-ivory-50">
      {/* Kepala: nama pasangan tetap terlihat di seluruh panel.
          Sisi kanan atas sudah dipakai tombol musik & putar otomatis,
          sudah dipakai tombol musik & putar otomatis, jadi keterangan
          panel ditumpuk di kiri. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 pl-5 pr-16 pt-4">
        <p className="font-serif text-[11px] uppercase tracking-[0.32em] text-gold-300">
          {weddingConfig.couple.groom.nickname} &amp; {weddingConfig.couple.bride.nickname}
        </p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-sage-500">
          {String(indeks + 1).padStart(2, "0")} / {String(bagian.length).padStart(2, "0")} ·{" "}
          {bagian[indeks].label}
        </p>
      </div>

      <div
        ref={relRef}
        onScroll={saatGeser}
        className="tanpa-bar flex h-full w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden"
      >
        {bagian.map((b, i) => (
          <section
            key={b.id}
            ref={(el) => {
              panelRef.current[i] = el;
            }}
            aria-label={b.label}
            className="tanpa-bar h-full w-full shrink-0 snap-center overflow-y-auto overscroll-contain pb-16 pt-16"
          >
            {b.isi}
          </section>
        ))}
      </div>

      {/* Panah kiri/kanan */}
      {indeks > 0 && (
        <button
          onClick={() => ke(indeks - 1)}
          aria-label="Bagian sebelumnya"
          className="absolute left-2 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-edge/60 bg-surface/70 text-gold-300 backdrop-blur-md"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {indeks < bagian.length - 1 && (
        <button
          onClick={() => ke(indeks + 1)}
          aria-label="Bagian berikutnya"
          className="absolute right-2 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-edge/60 bg-surface/70 text-gold-300 backdrop-blur-md"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Penanda panel di bawah layar */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex justify-center pb-[max(0.9rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-1.5 rounded-full border border-edge/60 bg-surface/80 px-3.5 py-2 backdrop-blur-xl [box-shadow:var(--bayangan-dok)]">
          {bagian.map((b, i) => (
            <button
              key={b.id}
              onClick={() => ke(i)}
              aria-label={b.label}
              aria-current={i === indeks ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === indeks ? "w-6 bg-gold-400" : "w-1.5 bg-sage-300"
              }`}
            />
          ))}
        </div>
      </div>

      <PutarOtomatis jumlah={bagian.length} indeks={indeks} ke={ke} wadah={wadahAktif} />
    </div>
  );
}

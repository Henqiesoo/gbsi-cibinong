"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { weddingConfig } from "@/lib/wedding-config";
import PutarOtomatis from "@/components/format/PutarOtomatis";
import type { Bagian } from "@/components/format/tipe";

/* Format "buku" — dipakai tema Floral Watercolor.
   Undangan tampil sebagai buku acara: satu halaman satu bagian, dibalik
   dengan tombol di bawah. Tepi kiri halaman diberi bayangan agar terasa
   seperti kertas yang menempel pada punggung buku. */
export default function LayoutBuku({ bagian }: { bagian: Bagian[] }) {
  const [indeks, setIndeks] = useState(0);
  const halamanRef = useRef<HTMLDivElement | null>(null);
  const { groom, bride } = weddingConfig.couple;

  useEffect(() => {
    const asal = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = asal;
    };
  }, []);

  const ke = useCallback(
    (i: number) => {
      setIndeks(Math.max(0, Math.min(bagian.length - 1, i)));
      halamanRef.current?.scrollTo({ top: 0 });
    },
    [bagian.length]
  );

  const wadahAktif = useCallback(() => halamanRef.current, []);
  const sekarang = bagian[indeks];

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-ivory-100">
      {/* Punggung buku */}
      <div className="flex items-center justify-between gap-3 px-6 pb-2 pl-6 pr-16 pt-4">
        <p className="font-script text-xl leading-none text-sage-700">
          {groom.nickname} &amp; {bride.nickname}
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-sage-400">{sekarang.label}</p>
      </div>

      <div className="relative min-h-0 flex-1 px-3 pb-2 [perspective:1600px]">
        <div
          key={sekarang.id}
          className="art-balik relative h-full overflow-hidden rounded-3xl bg-surface shadow-[var(--bayangan-kartu)]"
        >
          {/* Garis lipat di tepi kiri halaman */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-5 bg-gradient-to-r from-sage-200/50 to-transparent" />
          <div ref={halamanRef} className="tanpa-bar h-full overflow-y-auto overscroll-contain">
            {sekarang.isi}
          </div>
        </div>
      </div>

      {/* Pembalik halaman */}
      <div className="flex items-center justify-between gap-3 px-6 pb-[max(0.9rem,env(safe-area-inset-bottom))] pt-2">
        <button
          onClick={() => ke(indeks - 1)}
          disabled={indeks === 0}
          className="btn-ghost !px-4 !py-2 disabled:opacity-30"
        >
          ← Balik
        </button>

        <div className="flex items-center gap-1.5">
          {bagian.map((b, i) => (
            <button
              key={b.id}
              onClick={() => ke(i)}
              aria-label={b.label}
              className={`h-1.5 w-1.5 rounded-full transition ${
                i === indeks ? "scale-150 bg-sage-700" : "bg-sage-200"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => ke(indeks + 1)}
          disabled={indeks === bagian.length - 1}
          className="btn-ghost !px-4 !py-2 disabled:opacity-30"
        >
          Lanjut →
        </button>
      </div>

      <PutarOtomatis jumlah={bagian.length} indeks={indeks} ke={ke} wadah={wadahAktif} />
    </div>
  );
}

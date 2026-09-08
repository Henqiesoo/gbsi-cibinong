"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { weddingConfig } from "@/lib/wedding-config";
import PutarOtomatis from "@/components/format/PutarOtomatis";
import type { Bagian } from "@/components/format/tipe";

/* Format "tab" — dipakai tema Minimalis Modern.
   Undangan bekerja seperti aplikasi: menu tetap di bawah layar, isi
   berganti seketika tanpa animasi dan tanpa halaman panjang. Tamu yang
   hanya ingin melihat alamat acara tidak perlu menggulir apa pun. */
export default function LayoutTab({ bagian }: { bagian: Bagian[] }) {
  const [indeks, setIndeks] = useState(0);
  const isiRef = useRef<HTMLElement | null>(null);
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
      isiRef.current?.scrollTo({ top: 0 });
    },
    [bagian.length]
  );

  const wadahAktif = useCallback(() => isiRef.current, []);

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-ivory-50">
      <header className="flex items-center justify-between gap-3 border-b border-ivory-200 bg-surface py-3 pl-5 pr-16">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink">
          {groom.nickname} &amp; {bride.nickname}
        </p>
        <p className="text-[10px] uppercase tracking-[0.18em] text-sage-400">
          {weddingConfig.eventDateShort}
        </p>
      </header>

      <main
        ref={isiRef}
        aria-label={bagian[indeks].label}
        className="tanpa-bar min-h-0 flex-1 overflow-y-auto overscroll-contain"
      >
        {bagian[indeks].isi}
      </main>

      <nav
        aria-label="Menu undangan"
        className="grid border-t border-ivory-200 bg-surface pb-[env(safe-area-inset-bottom)]"
        style={{ gridTemplateColumns: `repeat(${bagian.length}, minmax(0, 1fr))` }}
      >
        {bagian.map((b, i) => {
          const aktif = i === indeks;
          return (
            <button
              key={b.id}
              onClick={() => ke(i)}
              aria-current={aktif ? "page" : undefined}
              className={`flex flex-col items-center gap-1.5 py-3 transition ${
                aktif ? "text-ink" : "text-sage-400"
              }`}
            >
              <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={b.ikon} />
              </svg>
              <span className="text-[9px] font-medium uppercase tracking-wider">{b.label}</span>
              <span className={`h-px w-6 transition ${aktif ? "bg-ink" : "bg-transparent"}`} />
            </button>
          );
        })}
      </nav>

      <PutarOtomatis jumlah={bagian.length} indeks={indeks} ke={ke} wadah={wadahAktif} />
    </div>
  );
}

"use client";

import { useCallback, useRef, useState } from "react";
import PutarOtomatis from "@/components/format/PutarOtomatis";
import type { Bagian } from "@/components/format/tipe";

/* Format "lipat" — dipakai tema Nusantara.
   Meniru undangan kertas yang dilipat: seluruh isi undangan tersimpan
   dalam lipatan bernomor, dan hanya terbuka saat disentuh. Halamannya
   jadi pendek — tamu langsung melihat seluruh daftar isi tanpa menggulir
   jauh, lalu membuka bagian yang ia perlukan saja. */
export default function LayoutLipat({
  kepala,
  bagian,
  penutup,
}: {
  kepala: React.ReactNode;
  bagian: Bagian[];
  penutup: React.ReactNode;
}) {
  const [terbuka, setTerbuka] = useState(0);
  const kepalaLipatRef = useRef<(HTMLButtonElement | null)[]>([]);
  const isiRef = useRef<(HTMLDivElement | null)[]>([]);

  const ke = useCallback((i: number) => {
    setTerbuka(i);

    // Bawa lipatan yang dibuka ke bagian atas layar. Dilakukan dua kali:
    // tinggi lipatan masih beranimasi selama 700 ms, dan lipatan yang tadi
    // terbuka ikut menutup — keduanya menggeser posisi akhir. Tanpa koreksi
    // kedua, lipatan pertama tampak pas tetapi lipatan berikutnya berhenti
    // di posisi yang salah karena diukur sebelum tata letak selesai.
    const bawaKeAtas = () =>
      kepalaLipatRef.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
    requestAnimationFrame(bawaKeAtas);
    window.setTimeout(bawaKeAtas, 780);
  }, []);

  // Menyentuh kepala lipatan: yang tertutup dibuka lalu dibawa ke atas layar,
  // yang sedang terbuka ditutup tanpa menggeser layar.
  const sentuh = useCallback(
    (i: number, sedangBuka: boolean) => {
      if (sedangBuka) setTerbuka(-1);
      else ke(i);
    },
    [ke]
  );

  const wadahAktif = useCallback(() => isiRef.current[terbuka] ?? null, [terbuka]);

  return (
    <div className="mx-auto max-w-lg bg-ivory-50 md:max-w-xl">
      {kepala}

      <div className="border-t-2 border-double border-gold-400/50">
        {bagian.map((b, i) => {
          const buka = i === terbuka;
          return (
            <div key={b.id} className="border-b border-ivory-300">
              <button
                ref={(el) => {
                  kepalaLipatRef.current[i] = el;
                }}
                onClick={() => sentuh(i, buka)}
                aria-expanded={buka}
                /* Ruang di kanan disisakan untuk tombol musik & putar
                   otomatis yang mengambang di pojok kanan atas layar. */
                className={`flex w-full items-center gap-4 py-5 pl-6 pr-16 text-left transition ${
                  buka ? "bg-sage-700 text-onprimary" : "bg-ivory-100 text-sage-800"
                }`}
              >
                <span
                  className={`font-serif text-lg leading-none ${
                    buka ? "text-gold-300" : "text-gold-500"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-serif text-lg tracking-wide">{b.label}</span>
                <svg
                  className={`h-4 w-4 shrink-0 transition-transform duration-500 ${
                    buka ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="relative">
                <div
                  ref={(el) => {
                    isiRef.current[i] = el;
                  }}
                  className={`tanpa-bar transition-[max-height,opacity] duration-700 ease-in-out ${
                    buka
                      ? "max-h-[68vh] overflow-y-auto overscroll-contain opacity-100"
                      : "max-h-0 overflow-hidden opacity-0"
                  }`}
                >
                  {b.isi}
                </div>
                {/* Bayangan tipis di tepi bawah — tanda isinya masih ada lagi */}
                {buka && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-ivory-50 to-transparent" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {penutup}

      <PutarOtomatis jumlah={bagian.length} indeks={terbuka} ke={ke} wadah={wadahAktif} />
    </div>
  );
}

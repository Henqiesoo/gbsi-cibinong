"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Kecepatan dalam piksel per detik. Halaman undangan tingginya ±9.000 px,
// jadi angka ini kira-kira menghasilkan video 100 / 60 / 38 detik —
// menyesuaikan durasi umum Reels, TikTok, dan Status WhatsApp.
const KECEPATAN = [
  { label: "Pelan", nilai: 90, perkiraan: "±100 detik" },
  { label: "Sedang", nilai: 150, perkiraan: "±60 detik" },
  { label: "Cepat", nilai: 240, perkiraan: "±38 detik" },
] as const;

// Tombol gulir otomatis — dipakai saat merekam layar undangan supaya
// halaman berjalan sendiri tanpa perlu menggeser layar dengan tangan.
export default function AutoScroll({ onModeRekam }: { onModeRekam: (aktif: boolean) => void }) {
  const [jalan, setJalan] = useState(false);
  const [indeksKecepatan, setIndeksKecepatan] = useState(1);
  const [bukaPilihan, setBukaPilihan] = useState(false);

  const rafRef = useRef<number | null>(null);
  const waktuRef = useRef<number | null>(null);
  const sisaRef = useRef(0); // sisa pecahan piksel antar frame

  const berhenti = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    waktuRef.current = null;
    sisaRef.current = 0;
    setJalan(false);
  }, []);

  useEffect(() => {
    onModeRekam(jalan);
  }, [jalan, onModeRekam]);

  useEffect(() => {
    if (!jalan) return;

    const kecepatan = KECEPATAN[indeksKecepatan].nilai;

    // globals.css memasang `scroll-behavior: smooth`. Bila dibiarkan, setiap
    // panggilan scrollBy dianimasikan browser dan saling menimpa tiap frame,
    // sehingga gulir jadi tersendat & jauh lebih lambat dari yang diminta.
    const root = document.documentElement;
    const perilakuAsli = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    const langkah = (waktu: number) => {
      if (waktuRef.current === null) waktuRef.current = waktu;
      const delta = (waktu - waktuRef.current) / 1000;
      waktuRef.current = waktu;

      // Kumpulkan pecahan piksel agar gerakan tetap halus di layar apa pun
      sisaRef.current += kecepatan * delta;
      const geser = Math.floor(sisaRef.current);
      if (geser > 0) {
        sisaRef.current -= geser;
        window.scrollBy({ top: geser, behavior: "auto" });
      }

      const batasBawah = document.documentElement.scrollHeight - window.innerHeight - 2;
      if (window.scrollY >= batasBawah) {
        berhenti();
        return;
      }
      rafRef.current = requestAnimationFrame(langkah);
    };

    rafRef.current = requestAnimationFrame(langkah);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      waktuRef.current = null;
      root.style.scrollBehavior = perilakuAsli;
    };
  }, [jalan, indeksKecepatan, berhenti]);

  // Sentuhan/gulir manual menghentikan gulir otomatis
  useEffect(() => {
    if (!jalan) return;
    const batal = () => berhenti();
    window.addEventListener("touchstart", batal, { passive: true });
    window.addEventListener("wheel", batal, { passive: true });
    window.addEventListener("keydown", batal);
    return () => {
      window.removeEventListener("touchstart", batal);
      window.removeEventListener("wheel", batal);
      window.removeEventListener("keydown", batal);
    };
  }, [jalan, berhenti]);

  function mulai() {
    setBukaPilihan(false);
    // Selalu mulai dari atas supaya hasil rekaman utuh dari awal
    window.scrollTo({ top: 0, behavior: "auto" });
    // Tunggu satu frame agar posisi benar-benar di atas sebelum mulai berjalan
    requestAnimationFrame(() => setJalan(true));
  }

  return (
    <div className="fixed right-4 top-[4.25rem] z-40 flex flex-col items-end gap-2">
      <button
        onClick={() => (jalan ? berhenti() : setBukaPilihan((v) => !v))}
        aria-label={jalan ? "Hentikan gulir otomatis" : "Gulir otomatis untuk rekam video"}
        title="Gulir otomatis — untuk merekam video undangan"
        className={`flex h-11 w-11 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition active:scale-90 ${
          jalan
            ? "border-gold-400 bg-gold-500 text-white"
            : "border-white/60 bg-white/80 text-sage-700 hover:bg-white"
        }`}
      >
        {jalan ? (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l-6-6m6 6l6-6" />
          </svg>
        )}
      </button>

      {bukaPilihan && !jalan && (
        <div className="rounded-2xl border border-white/60 bg-white/90 p-2 shadow-lg backdrop-blur-md">
          <p className="px-2 pb-1.5 pt-0.5 text-[10px] font-semibold uppercase tracking-wider text-sage-400">
            Kecepatan
          </p>
          {KECEPATAN.map((k, i) => (
            <button
              key={k.label}
              onClick={() => setIndeksKecepatan(i)}
              className={`block w-full rounded-xl px-3 py-1.5 text-left text-xs transition ${
                indeksKecepatan === i
                  ? "bg-sage-700 font-semibold text-ivory-50"
                  : "text-sage-600 hover:bg-ivory-100"
              }`}
            >
              {k.label}
              <span
                className={`ml-1.5 text-[10px] ${
                  indeksKecepatan === i ? "text-ivory-200" : "text-sage-400"
                }`}
              >
                {k.perkiraan}
              </span>
            </button>
          ))}
          <button
            onClick={mulai}
            className="mt-1.5 w-full rounded-xl bg-gold-500 px-3 py-2 text-xs font-semibold text-white transition active:scale-95"
          >
            Mulai rekam
          </button>
        </div>
      )}
    </div>
  );
}

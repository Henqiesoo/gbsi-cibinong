"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type Adegan = {
  id: string;
  /* Lama adegan tampil dalam milidetik. Adegan interaktif (formulir RSVP,
     ucapan) memakai `manual: true` supaya tidak berpindah sendiri saat tamu
     sedang mengisi. */
  durasi?: number;
  manual?: boolean;
  isi: React.ReactNode;
};

// Panggung adegan: satu halaman penuh yang isinya berganti sendiri, mirip
// alur video undangan. Berbeda dari tema lain yang berupa halaman gulir
// panjang — di sini tamu tinggal menonton.
export default function SceneStage({
  adegan,
  onSelesai,
}: {
  adegan: Adegan[];
  onSelesai?: () => void;
}) {
  const [indeks, setIndeks] = useState(0);
  const [jalan, setJalan] = useState(true);
  const [progres, setProgres] = useState(0);

  const mulaiRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const sekarang = adegan[indeks];
  const otomatis = jalan && !sekarang.manual;

  const keAdegan = useCallback(
    (i: number) => {
      const batas = Math.max(0, Math.min(adegan.length - 1, i));
      setIndeks(batas);
      setProgres(0);
      mulaiRef.current = 0;
    },
    [adegan.length]
  );

  const berikutnya = useCallback(() => {
    if (indeks >= adegan.length - 1) {
      setJalan(false);
      onSelesai?.();
      return;
    }
    keAdegan(indeks + 1);
  }, [indeks, adegan.length, keAdegan, onSelesai]);

  // Penghitung waktu adegan otomatis
  useEffect(() => {
    if (!otomatis) return;
    const durasi = sekarang.durasi ?? 5200;

    const langkah = (t: number) => {
      if (!mulaiRef.current) mulaiRef.current = t;
      const lewat = t - mulaiRef.current;
      setProgres(Math.min(1, lewat / durasi));
      if (lewat >= durasi) {
        berikutnya();
        return;
      }
      rafRef.current = requestAnimationFrame(langkah);
    };

    rafRef.current = requestAnimationFrame(langkah);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      mulaiRef.current = 0;
    };
  }, [otomatis, indeks, sekarang.durasi, berikutnya]);

  // Panah kiri/kanan di keyboard, spasi untuk jeda
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") berikutnya();
      if (e.key === "ArrowLeft") keAdegan(indeks - 1);
      if (e.key === " ") {
        e.preventDefault();
        setJalan((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [berikutnya, keAdegan, indeks]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-ivory-50">
      {/* Bilah kemajuan per adegan, seperti pada cerita di media sosial */}
      <div className="absolute inset-x-0 top-0 z-30 flex gap-1 px-3 pt-3">
        {adegan.map((a, i) => (
          <div key={a.id} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/25">
            <div
              className="h-full rounded-full bg-gold-300"
              style={{
                width: i < indeks ? "100%" : i === indeks ? `${progres * 100}%` : "0%",
                transition: i === indeks ? "none" : "width 200ms linear",
              }}
            />
          </div>
        ))}
      </div>

      {/* Area ketuk: kiri mundur, kanan maju */}
      <button
        aria-label="Adegan sebelumnya"
        onClick={() => keAdegan(indeks - 1)}
        className="absolute bottom-0 left-0 top-20 z-20 w-1/4"
      />
      <button
        aria-label="Adegan berikutnya"
        onClick={berikutnya}
        className="absolute bottom-0 right-0 top-20 z-20 w-1/4"
      />

      {/* Tombol jeda — penting saat tamu ingin membaca detail lebih lama */}
      <button
        onClick={() => setJalan((v) => !v)}
        aria-label={jalan ? "Jeda" : "Lanjutkan"}
        /* Ditaruh di kiri: pojok kanan atas sudah dipakai tombol musik */
        className="absolute left-3 top-7 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-gold-300/50 bg-black/35 text-gold-200 backdrop-blur-sm"
      >
        {jalan ? (
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5l12 7-12 7z" />
          </svg>
        )}
      </button>

      {/* Adegan */}
      {adegan.map((a, i) => (
        <div
          key={a.id}
          aria-hidden={i !== indeks}
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            i === indeks
              ? "pointer-events-auto scale-100 opacity-100"
              : "pointer-events-none scale-[1.04] opacity-0"
          }`}
        >
          {i === indeks && a.isi}
        </div>
      ))}

      {/* Penanda adegan interaktif: tamu perlu menekan lanjut sendiri */}
      {sekarang.manual && (
        <button
          onClick={berikutnya}
          className="absolute bottom-5 left-1/2 z-30 -translate-x-1/2 rounded-full bg-sage-700 px-6 py-2.5 text-xs font-semibold tracking-wide text-onprimary shadow-lg"
        >
          Lanjut →
        </button>
      )}
    </div>
  );
}

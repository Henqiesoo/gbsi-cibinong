"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* Tombol "putar otomatis" untuk format yang berpindah panel (geser, buku,
   tab, lipat). Fungsinya sama seperti gulir otomatis di format gulir:
   undangan berjalan sendiri supaya bisa direkam layar tanpa menyentuh HP.

   Pada tiap panel: bila isinya lebih tinggi dari layar, isinya digulir
   pelan sampai bawah dulu, baru pindah ke panel berikutnya. */

const KECEPATAN = 120; // piksel per detik saat menggulir isi panel
const JEDA_PENDEK = 3800; // panel yang muat satu layar
const JEDA_SETELAH_GULIR = 1000; // jeda sejenak setelah sampai bawah

export default function PutarOtomatis({
  jumlah,
  indeks,
  ke,
  wadah,
  onModeRekam,
}: {
  jumlah: number;
  indeks: number;
  ke: (i: number) => void;
  /* Elemen yang menampung isi panel aktif — dipakai untuk menggulir isinya. */
  wadah: () => HTMLElement | null;
  onModeRekam?: (aktif: boolean) => void;
}) {
  const [jalan, setJalan] = useState(false);
  const rafRef = useRef<number | null>(null);
  const jamRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const bersihkan = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    if (jamRef.current !== null) clearTimeout(jamRef.current);
    rafRef.current = null;
    jamRef.current = null;
  }, []);

  const berhenti = useCallback(() => {
    bersihkan();
    setJalan(false);
  }, [bersihkan]);

  useEffect(() => {
    onModeRekam?.(jalan);
  }, [jalan, onModeRekam]);

  useEffect(() => {
    if (!jalan) return;

    const lanjut = () => {
      if (indeks >= jumlah - 1) {
        berhenti();
        return;
      }
      ke(indeks + 1);
    };

    // Tunggu satu frame supaya panel baru sudah terpasang sebelum diukur
    const mulai = requestAnimationFrame(() => {
      const el = wadah();
      const sisa = el ? el.scrollHeight - el.clientHeight : 0;

      if (!el || sisa < 24) {
        jamRef.current = setTimeout(lanjut, JEDA_PENDEK);
        return;
      }

      el.scrollTop = 0;
      let waktuLalu: number | null = null;
      let posisi = 0;

      const langkah = (waktu: number) => {
        if (waktuLalu === null) waktuLalu = waktu;
        posisi += (KECEPATAN * (waktu - waktuLalu)) / 1000;
        waktuLalu = waktu;

        if (posisi >= sisa) {
          el.scrollTop = sisa;
          jamRef.current = setTimeout(lanjut, JEDA_SETELAH_GULIR);
          return;
        }
        el.scrollTop = posisi;
        rafRef.current = requestAnimationFrame(langkah);
      };

      rafRef.current = requestAnimationFrame(langkah);
    });

    return () => {
      cancelAnimationFrame(mulai);
      bersihkan();
    };
  }, [jalan, indeks, jumlah, ke, wadah, berhenti, bersihkan]);

  // Sentuhan manual menghentikan pemutaran
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

  return (
    <button
      onClick={() => {
        if (jalan) {
          berhenti();
          return;
        }
        ke(0);
        setJalan(true);
      }}
      aria-label={jalan ? "Hentikan pemutaran otomatis" : "Putar otomatis untuk rekam video"}
      title="Putar otomatis — untuk merekam video undangan"
      className={`fixed right-4 top-[4.25rem] z-40 flex h-11 w-11 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition active:scale-90 ${
        jalan
          ? "border-gold-400 bg-gold-500 text-white"
          : "border-edge/60 bg-surface/80 text-sage-700"
      }`}
    >
      {jalan ? (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
      ) : (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5l12 7-12 7z" />
        </svg>
      )}
    </button>
  );
}

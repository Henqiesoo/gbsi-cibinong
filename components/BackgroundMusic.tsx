"use client";

import { useEffect, useRef, useState } from "react";

// ============================================================
// MUSIK LATAR BERANDA — /audio/latar.mp3 (loop, volume rendah)
// ============================================================
// CATATAN KEBIJAKAN BROWSER (penting untuk pemeliharaan):
// Chrome, Safari, dan Firefox MEMBLOKIR autoplay audio bersuara
// sampai pengguna berinteraksi dengan situs. Deteksinya lewat
// promise `audio.play()`:
//   - resolve  → autoplay berhasil → tampilkan tombol kecil
//                mute/unmute di pojok kanan bawah
//   - reject   → autoplay diblokir → tampilkan tombol "Putar musik"
//                yang jelas; musik mulai setelah pengguna menekannya
// Kebijakan ini bisa berubah antar versi browser — bila perilaku
// aneh muncul, periksa bagian percobaanAutoplay() di bawah.
//
// Perilaku lain:
// - Komponen ini hanya dipasang di halaman Beranda; berpindah halaman
//   meng-unmount komponen → musik berhenti otomatis (cleanup pause).
// - Preferensi pengguna disimpan di sessionStorage ("musik_pref"):
//   "mute" → jangan coba autoplay lagi selama sesi tab ini.
// - Bila file /audio/latar.mp3 belum ada (error saat memuat), tombol
//   tidak ditampilkan sama sekali.

const SUMBER_MUSIK = "/audio/latar.mp3";
const VOLUME = 0.35; // 35% — tenang, tidak mengganggu
const KUNCI_PREF = "musik_pref"; // "on" | "mute"

type Status =
  | "memuat" // belum tahu; audio sedang disiapkan
  | "main" // musik berbunyi → tombol speaker (untuk mute)
  | "senyap" // dimute/diblokir → tombol putar
  | "tiada"; // file tidak ada → sembunyikan kontrol

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<Status>("memuat");
  // Autoplay yang diblokir browser diberi ajakan yang lebih jelas.
  const [diblokir, setDiblokir] = useState(false);

  useEffect(() => {
    const audio = new Audio(SUMBER_MUSIK);
    audio.loop = true;
    audio.volume = VOLUME;
    audio.preload = "auto";
    audioRef.current = audio;

    audio.addEventListener("error", () => setStatus("tiada"));

    const pref = sessionStorage.getItem(KUNCI_PREF);
    if (pref === "mute") {
      // Pengguna pernah mematikan musik di sesi ini — hormati, jangan
      // paksa autoplay ulang.
      setStatus("senyap");
    } else {
      // Percobaan autoplay (lihat catatan kebijakan browser di atas).
      audio
        .play()
        .then(() => setStatus("main"))
        .catch(() => {
          // Autoplay diblokir browser — tunggu ketukan pengguna.
          setDiblokir(true);
          setStatus((s) => (s === "tiada" ? s : "senyap"));
        });
    }

    // Berhenti total saat meninggalkan Beranda (unmount).
    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const alih = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (status === "main") {
      audio.pause();
      sessionStorage.setItem(KUNCI_PREF, "mute");
      setStatus("senyap");
    } else {
      audio
        .play()
        .then(() => {
          sessionStorage.setItem(KUNCI_PREF, "on");
          setDiblokir(false);
          setStatus("main");
        })
        .catch(() => setStatus("tiada"));
    }
  };

  if (status === "tiada" || status === "memuat") return null;

  // Autoplay diblokir & belum pernah diputar → ajakan yang jelas.
  const tampilkanAjakan = status === "senyap" && diblokir;

  return (
    <button
      type="button"
      onClick={alih}
      aria-label={status === "main" ? "Matikan musik latar" : "Putar musik latar"}
      className={`fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full shadow-lg transition-colors ${
        tampilkanAjakan
          ? "bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-500"
          : "h-12 w-12 justify-center border border-cream-200 bg-white/95 text-brand-700 backdrop-blur hover:bg-brand-50"
      }`}
    >
      {status === "main" ? (
        // Ikon speaker berbunyi
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.5L6.5 9H3.8a.8.8 0 00-.8.8v4.4c0 .44.36.8.8.8h2.7L11 18.5v-13z" />
          <path strokeLinecap="round" d="M14.5 9.5a3.5 3.5 0 010 5M16.8 7.2a6.5 6.5 0 010 9.6" />
        </svg>
      ) : (
        // Ikon nada musik
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 18.5V6.8a1 1 0 01.76-.97l8-2A1 1 0 0119 4.8v11.2" />
          <circle cx="6.5" cy="18.5" r="2.5" />
          <circle cx="16.5" cy="16.5" r="2.5" />
        </svg>
      )}
      {tampilkanAjakan && <span>Putar musik</span>}
    </button>
  );
}

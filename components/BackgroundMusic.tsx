"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

// ============================================================
// MUSIK LATAR BERANDA — lagu aktif dari panel admin (loop, pelan)
// ============================================================
// CATATAN KEBIJAKAN BROWSER (penting untuk pemeliharaan):
// Chrome, Safari, dan Firefox MEMBLOKIR autoplay audio bersuara
// sampai pengguna berinteraksi dengan situs — dan scroll/usapan
// TIDAK dihitung sebagai interaksi; hanya ketukan/klik/tombol
// keyboard yang dihitung. Tidak ada kode yang bisa menembus ini.
//
// Strategi bertingkat komponen ini:
//   1. Coba autoplay langsung saat Beranda terbuka. Browser yang
//      sudah "percaya" pada situs (sering dikunjungi & musiknya
//      diputar — Media Engagement Chrome) meloloskannya → musik
//      langsung bunyi, tanpa layar sambutan.
//   2. Bila diblokir → tampilkan LAYAR SAMBUTAN (logo + "Ketuk untuk
//      masuk"). Satu ketukan di mana pun pada layar itu dijamin
//      dihitung browser sebagai persetujuan → musik pasti mengalun.
//      Pola ini lazim dipakai undangan digital / situs musik.
//   3. Pendengar cadangan tetap terpasang di document (ketukan,
//      klik, keyboard, scroll, usapan) — pada browser yang lebih
//      longgar, gerakan apa pun langsung membunyikan musik bahkan
//      sebelum layar sambutan diketuk.
//
// Perilaku lain:
// - Hanya dipasang di Beranda; pindah halaman → musik berhenti
//   (unmount → cleanup pause).
// - Preferensi disimpan di sessionStorage ("musik_pref"):
//   "mute" → jangan autoplay lagi & jangan tampilkan layar sambutan
//   selama tab ini hidup (menghormati pengunjung yang terganggu).
// - Bila file audio gagal dimuat, semua kontrol disembunyikan.

// Lagu unggahan umumnya direkam lebih keras daripada musik bawaan,
// jadi persentasenya dibuat rendah agar tetap tenang di latar.
const VOLUME = 0.25; // 25% — tenang, tidak mengganggu
const KUNCI_PREF = "musik_pref"; // "on" | "mute"

type Status =
  | "memuat" // belum tahu; audio sedang disiapkan
  | "main" // musik berbunyi → tombol speaker (untuk mute)
  | "senyap" // dimute/diblokir → tombol putar
  | "tiada"; // file tidak ada → sembunyikan kontrol

export default function BackgroundMusic({
  src = "/audio/latar.mp3", // lagu aktif dari panel admin (/admin/musik)
}: {
  src?: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<Status>("memuat");
  // Autoplay diblokir browser → layar sambutan + ajakan putar.
  const [diblokir, setDiblokir] = useState(false);
  // Layar sambutan sudah ditutup (dipakai agar tidak muncul lagi).
  const [sambutanTutup, setSambutanTutup] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = VOLUME;
    audio.preload = "auto";
    audioRef.current = audio;

    audio.addEventListener("error", () => setStatus("tiada"));

    // Pendengar cadangan: coba putar pada SETIAP interaksi — ketukan,
    // klik, keyboard, maupun gerakan layar. Browser hanya meloloskan
    // play() pada interaksi yang ia anggap persetujuan (umumnya
    // ketukan/klik); percobaan yang ditolak tidak berefek, jadi
    // pendengar dibiarkan terpasang dan terus mencoba sampai berhasil.
    // PENTING: pakai kejadian AKHIR gerakan (pointerup/touchend), bukan
    // pointerdown — di layar sentuh, izin baru turun saat jari diangkat.
    const KEJADIAN = [
      "pointerup",
      "touchend",
      "keydown",
      "click",
      "scroll",
      "touchmove",
      "wheel",
    ] as const;
    let sedangMencoba = false; // satu percobaan play() pada satu waktu
    const mulaiSaatInteraksi = (e: Event) => {
      // Ketukan pada tombol musik dikecualikan (onClick tombol yang
      // menangani); pilihan "tanpa musik" dihormati.
      if ((e.target as Element | null)?.closest?.("[data-musik]")) {
        lepasPendengar();
        return;
      }
      if (sessionStorage.getItem(KUNCI_PREF) === "mute") {
        lepasPendengar();
        return;
      }
      if (sedangMencoba) return;
      sedangMencoba = true;
      audio
        .play()
        .then(() => {
          setDiblokir(false);
          setStatus("main");
          lepasPendengar();
        })
        .catch(() => {
          sedangMencoba = false;
        });
    };
    const lepasPendengar = () => {
      for (const k of KEJADIAN) {
        document.removeEventListener(k, mulaiSaatInteraksi);
      }
    };

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
          // Diblokir → layar sambutan tampil + pendengar cadangan.
          setDiblokir(true);
          setStatus((s) => (s === "tiada" ? s : "senyap"));
          for (const k of KEJADIAN) {
            document.addEventListener(k, mulaiSaatInteraksi, {
              passive: true,
            });
          }
        });
    }

    // Berhenti total saat meninggalkan Beranda (unmount).
    return () => {
      lepasPendengar();
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [src]);

  // Ketukan pada layar sambutan — dijamin dihitung browser sebagai
  // persetujuan, jadi musik pasti mengalun.
  const masukDenganMusik = () => {
    setSambutanTutup(true);
    const audio = audioRef.current;
    if (!audio) return;
    audio
      .play()
      .then(() => {
        sessionStorage.setItem(KUNCI_PREF, "on");
        setDiblokir(false);
        setStatus("main");
      })
      .catch(() => {});
  };

  const masukTanpaMusik = (e: React.MouseEvent) => {
    e.stopPropagation();
    sessionStorage.setItem(KUNCI_PREF, "mute");
    setSambutanTutup(true);
  };

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

  const tampilkanSambutan =
    diblokir && status === "senyap" && !sambutanTutup;
  // Autoplay diblokir & belum pernah diputar → ajakan yang jelas.
  const tampilkanAjakan = status === "senyap" && diblokir;

  return (
    <>
      {/* Layar sambutan — muncul hanya bila autoplay diblokir browser */}
      {tampilkanSambutan && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Ketuk untuk masuk dengan musik latar"
          onClick={masukDenganMusik}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") masukDenganMusik();
          }}
          className="fixed inset-0 z-[70] flex cursor-pointer select-none flex-col items-center justify-center gap-5 bg-brand-900/95 px-6 text-center backdrop-blur-sm"
        >
          <Image
            src="/images/logo-berea-indonesia.png"
            alt="Logo Berea Indonesia"
            width={132}
            height={90}
            className="h-16 w-auto"
            priority
          />
          <p className="font-serif text-3xl font-semibold text-white">
            {site.namaSingkat}
          </p>
          <p className="max-w-xs text-sm leading-relaxed text-cream-100/85">
            Selamat datang! Ketuk di mana saja untuk masuk — musik latar
            akan mengalun.
          </p>
          <span className="rounded-full bg-white px-8 py-3 text-sm font-bold text-brand-700 shadow-lg">
            ♪ Masuk
          </span>
          <button
            type="button"
            data-musik
            onClick={masukTanpaMusik}
            className="text-xs text-cream-100/60 underline underline-offset-2 hover:text-cream-100"
          >
            Masuk tanpa musik
          </button>
        </div>
      )}

      <button
        type="button"
        data-musik
        onClick={alih}
        aria-label={
          status === "main" ? "Matikan musik latar" : "Putar musik latar"
        }
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
    </>
  );
}

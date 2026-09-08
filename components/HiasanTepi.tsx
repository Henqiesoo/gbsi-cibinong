"use client";

import Ornament from "@/components/Ornament";

/* Hiasan sisi kiri-kanan untuk layar lebar (tablet mendatar & komputer).
   Isi undangan sengaja dibatasi selebar layar HP supaya enak dibaca; di
   layar lebar sisanya jadi bidang kosong. Lapisan ini yang mengisinya.

   Semuanya CSS + SVG sebaris — tidak ada berkas gambar, tidak ada pustaka
   tambahan, jadi tidak menambah waktu muat sama sekali. Muncul hanya pada
   lebar >= 1024px (lg); di HP lapisan ini tidak dirender sama sekali,
   sehingga tampilan mobile persis seperti sebelumnya. */

// Motif ranting daun berulang — senada dengan ornamen pemisah tema Sage & Gold
const MOTIF =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Cg fill='none' stroke='%23b08d57' stroke-width='1.1' stroke-linecap='round'%3E%3Cpath d='M75 30v58'/%3E%3Cpath d='M75 48c-11-2-17-9-19-18 10 1 17 7 19 18z'/%3E%3Cpath d='M75 48c11-2 17-9 19-18-10 1-17 7-19 18z'/%3E%3Cpath d='M75 70c-11-2-17-9-19-18 10 1 17 7 19 18z'/%3E%3Cpath d='M75 70c11-2 17-9 19-18-10 1-17 7-19 18z'/%3E%3Ccircle cx='75' cy='96' r='3.5'/%3E%3Cpath d='M-4 126c18 12 36 12 54 0M100 126c18 12 36 12 54 0'/%3E%3C/g%3E%3C/svg%3E\")";

export default function HiasanTepi() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 hidden lg:block">
      {/* Sapuan warna lembut dari palet tema: sage di atas, emas di bawah */}
      <div className="absolute inset-0 bg-gradient-to-b from-sage-100/60 via-ivory-100 to-gold-200/45" />

      {/* Motif daun tipis — opacity rendah supaya tidak menarik perhatian */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: MOTIF, backgroundSize: "150px 150px" }}
      />

      {/* Cahaya lembut di belakang kolom isi supaya kolomnya terasa mengambang */}
      <div className="absolute left-1/2 top-1/2 h-[130vh] w-[64rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-200/25 blur-3xl" />

      {/* Garis emas & ornamen yang mengapit kolom isi (lebar kolom = max-w-xl) */}
      <div className="absolute inset-y-0 left-1/2 w-[36rem] -translate-x-1/2">
        <div className="absolute inset-y-16 -left-10 w-px bg-gradient-to-b from-transparent via-gold-400/45 to-transparent" />
        <div className="absolute inset-y-16 -right-10 w-px bg-gradient-to-b from-transparent via-gold-400/45 to-transparent" />

        <Ornament className="absolute -left-[8.75rem] top-1/2 w-40 -translate-y-1/2 -rotate-90 text-gold-400/45" />
        <Ornament className="absolute -right-[8.75rem] top-1/2 w-40 -translate-y-1/2 rotate-90 text-gold-400/45" />
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Pencatat kunjungan anonim untuk halaman publik: tiap pindah halaman,
// kirim path + id sesi acak (per tab) ke /api/kunjungan. Wilayah
// pengunjung dideteksi di server dari header Vercel — komponen ini
// tidak mengumpulkan data pribadi apa pun.

const KUNCI_SESI = "sesi_kunjungan";

export default function PencatatKunjungan() {
  const path = usePathname();

  useEffect(() => {
    if (!path || path.startsWith("/admin")) return;
    let sesi = sessionStorage.getItem(KUNCI_SESI);
    if (!sesi) {
      sesi = crypto.randomUUID();
      sessionStorage.setItem(KUNCI_SESI, sesi);
    }
    fetch("/api/kunjungan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sesi, path }),
      keepalive: true,
    }).catch(() => {
      /* statistik tidak boleh mengganggu halaman */
    });
  }, [path]);

  return null;
}

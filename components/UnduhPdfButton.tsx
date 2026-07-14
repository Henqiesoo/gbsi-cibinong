"use client";

import { useState } from "react";
import type { Renungan } from "@/lib/data/renungan";

// Tombol unduh PDF renungan. Generator PDF (@react-pdf/renderer) baru
// dimuat saat tombol diklik supaya halaman tetap ringan.
export default function UnduhPdfButton({ renungan }: { renungan: Renungan }) {
  const [status, setStatus] = useState<"siap" | "proses" | "gagal">("siap");

  const unduh = async () => {
    setStatus("proses");
    try {
      const { unduhPdfRenungan } = await import("@/lib/pdf-renungan");
      await unduhPdfRenungan(renungan);
      setStatus("siap");
    } catch (e) {
      console.error("Gagal membuat PDF:", e);
      setStatus("gagal");
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={unduh}
        disabled={status === "proses"}
        className="inline-flex items-center gap-2 rounded-full border border-brand-300 bg-brand-50 px-5 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-100 disabled:cursor-wait disabled:opacity-60"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14"
          />
        </svg>
        {status === "proses" ? "Menyiapkan PDF…" : "Unduh PDF"}
      </button>
      {status === "gagal" && (
        <p className="mt-2 text-sm text-red-600">
          Maaf, PDF gagal dibuat. Silakan coba lagi.
        </p>
      )}
    </div>
  );
}

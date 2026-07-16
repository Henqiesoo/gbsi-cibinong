"use client";

import { useState } from "react";

// Unggah musik MP3 dari panel admin.
// File dikirim LANGSUNG dari browser ke Supabase Storage memakai URL
// bertanda tangan (2 langkah: minta URL ke server → PUT file ke URL itu)
// karena fungsi server Vercel membatasi body ±4,5 MB, sedangkan file
// musik umumnya lebih besar.
const UKURAN_MAKS_MB = 20;

export default function FormUnggahMusik() {
  const [status, setStatus] = useState<string | null>(null);
  const [sibuk, setSibuk] = useState(false);

  const kirim = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sibuk) return;

    const form = e.currentTarget;
    const fileInput = form.elements.namedItem("file") as HTMLInputElement;
    const judulInput = form.elements.namedItem("judul") as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (!file) {
      setStatus("Pilih dulu file MP3-nya.");
      return;
    }
    if (!/\.mp3$/i.test(file.name) && file.type !== "audio/mpeg") {
      setStatus("Format tidak didukung — unggah file MP3.");
      return;
    }
    if (file.size > UKURAN_MAKS_MB * 1024 * 1024) {
      setStatus(`File terlalu besar (maks ${UKURAN_MAKS_MB} MB).`);
      return;
    }

    setSibuk(true);
    try {
      // 1) Minta URL unggah bertanda tangan
      setStatus("Menyiapkan unggahan…");
      const res1 = await fetch("/api/admin/musik/persiapan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama: file.name }),
      });
      const d1 = await res1.json();
      if (!res1.ok) throw new Error(d1.error ?? "Gagal menyiapkan unggahan.");

      // 2) Kirim file langsung ke Supabase Storage
      setStatus("Mengunggah lagu… (file besar bisa memakan waktu)");
      const res2 = await fetch(d1.signedUrl, {
        method: "PUT",
        headers: { "Content-Type": "audio/mpeg" },
        body: file,
      });
      if (!res2.ok) throw new Error("Unggahan ke penyimpanan gagal.");

      // 3) Daftarkan ke tabel musik
      setStatus("Menyimpan…");
      const res3 = await fetch("/api/admin/musik/daftar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: d1.path,
          judul: judulInput.value.trim() || file.name.replace(/\.mp3$/i, ""),
        }),
      });
      const d3 = await res3.json();
      if (!res3.ok) throw new Error(d3.error ?? "Gagal menyimpan.");

      window.location.href = "/admin/musik?ok=1";
    } catch (err) {
      console.error(err);
      setStatus(
        err instanceof Error ? err.message : "Terjadi kesalahan. Coba lagi."
      );
      setSibuk(false);
    }
  };

  return (
    <form
      onSubmit={kirim}
      className="max-w-xl space-y-4 rounded-2xl border border-cream-200 bg-white p-6"
    >
      <h2 className="font-serif text-xl font-semibold text-ink">
        Unggah Lagu Baru
      </h2>
      <div>
        <label htmlFor="judul" className="block text-sm font-semibold text-ink">
          Judul lagu
        </label>
        <input
          id="judul"
          name="judul"
          type="text"
          placeholder="contoh: Instrumental Saat Teduh"
          className="mt-2 w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-base text-ink placeholder:text-ink/40 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
        />
      </div>
      <div>
        <label htmlFor="file" className="block text-sm font-semibold text-ink">
          File MP3 <span className="text-red-500">*</span>
        </label>
        <input
          id="file"
          name="file"
          type="file"
          accept="audio/mpeg,.mp3"
          required
          className="mt-2 w-full text-sm text-ink/70 file:mr-3 file:rounded-full file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-700"
        />
        <p className="mt-1 text-xs text-ink/50">
          Maksimal {UKURAN_MAKS_MB} MB. Pilih instrumental yang tenang.
        </p>
      </div>
      <button
        type="submit"
        disabled={sibuk}
        className="rounded-full bg-brand-600 px-7 py-3 text-base font-semibold text-white hover:bg-brand-500 disabled:cursor-wait disabled:opacity-60"
      >
        {sibuk ? "Mengunggah…" : "Unggah"}
      </button>
      {status && <p className="text-sm text-ink/60">{status}</p>}
    </form>
  );
}

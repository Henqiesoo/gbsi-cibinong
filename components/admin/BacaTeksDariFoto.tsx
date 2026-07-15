"use client";

import { useRef, useState } from "react";

// Pembaca teks (OCR) untuk surat gembala: pilih foto surat, klik tombol,
// teks hasil pembacaan diisikan ke textarea target untuk dirapikan
// manual. Berjalan sepenuhnya di browser (tesseract.js, bahasa
// Indonesia) — file baru terunggah saat form disimpan.
export default function BacaTeksDariFoto({
  inputFileId,
  textareaId,
}: {
  inputFileId: string;
  textareaId: string;
}) {
  const [status, setStatus] = useState<string | null>(null);
  const sedang = useRef(false);

  const baca = async () => {
    if (sedang.current) return;
    const input = document.getElementById(inputFileId) as HTMLInputElement | null;
    const target = document.getElementById(textareaId) as HTMLTextAreaElement | null;
    const file = input?.files?.[0];
    if (!file || !target) {
      setStatus("Pilih dulu foto surat pada kolom di atas.");
      return;
    }

    sedang.current = true;
    setStatus("Menyiapkan pembaca teks (unduhan pertama agak lama)…");
    try {
      const { createWorker } = await import("tesseract.js");
      const worker = await createWorker("ind", 1, {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setStatus(`Membaca teks… ${Math.round(m.progress * 100)}%`);
          }
        },
      });
      const { data } = await worker.recognize(file);
      await worker.terminate();

      const teks = data.text
        .replace(/-\n/g, "") // sambung kata terpenggal
        .replace(/[ \t]+\n/g, "\n")
        .trim();
      target.value = target.value ? `${target.value}\n\n${teks}` : teks;
      setStatus(
        "Selesai — periksa dan rapikan hasil pembacaan sebelum menyimpan."
      );
    } catch (e) {
      console.error(e);
      setStatus("Gagal membaca teks. Coba foto yang lebih terang/tegak, atau ketik manual.");
    } finally {
      sedang.current = false;
    }
  };

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={baca}
        className="rounded-full border border-brand-300 bg-brand-50 px-5 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100"
      >
        Baca teks dari foto (OCR)
      </button>
      {status && <p className="mt-2 text-sm text-ink/60">{status}</p>}
    </div>
  );
}

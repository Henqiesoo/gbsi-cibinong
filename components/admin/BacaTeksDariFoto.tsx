"use client";

import { useRef, useState } from "react";

// Pembaca teks (OCR) surat gembala — berjalan sepenuhnya di browser.
// Perbaikan penting:
//  - Orientasi foto dideteksi otomatis (dicoba 0°/90°/180°/270°, dipilih
//    hasil dengan keyakinan tertinggi) — foto miring tetap terbaca.
//  - Gambar diperbesar + kontras dinaikkan sebelum dibaca.
//  - Hasil dirapikan: baris-baris digabung per paragraf, simbol sampah
//    dibuang.
// Seluruh file OCR di-host sendiri di /public/ocr (tanpa CDN luar).

function rapikanTeks(mentah: string): string {
  return mentah
    .replace(/-\n(?=[a-zà-ÿ])/gi, "") // sambung kata terpenggal di ujung baris
    .replace(/[|~^`_=<>#*{}[\]\\]/g, " ") // simbol yang hampir pasti salah baca
    .split(/\n\s*\n/) // pisah paragraf pada baris kosong
    .map((p) => p.replace(/\n/g, " ").replace(/\s+/g, " ").trim())
    .filter((p) => p.replace(/[^a-zA-Z]/g, "").length >= 3)
    .join("\n\n");
}

// Gambar → kanvas: putar sesuai sudut, perbesar, abu-abu + kontras.
async function siapkanKanvas(
  file: File,
  sudut: number
): Promise<HTMLCanvasElement> {
  const bmp = await createImageBitmap(file);
  const skala = Math.min(2, 2000 / Math.max(bmp.width, bmp.height));
  const w = Math.round(bmp.width * skala);
  const h = Math.round(bmp.height * skala);

  const kanvas = document.createElement("canvas");
  const tukar = sudut % 180 !== 0;
  kanvas.width = tukar ? h : w;
  kanvas.height = tukar ? w : h;

  const ctx = kanvas.getContext("2d", { willReadFrequently: true })!;
  ctx.translate(kanvas.width / 2, kanvas.height / 2);
  ctx.rotate((sudut * Math.PI) / 180);
  ctx.drawImage(bmp, -w / 2, -h / 2, w, h);
  bmp.close();

  // Abu-abu + regangkan kontras (persentil 5–95)
  const img = ctx.getImageData(0, 0, kanvas.width, kanvas.height);
  const d = img.data;
  const histogram = new Array(256).fill(0);
  for (let i = 0; i < d.length; i += 4) {
    const y = Math.round(0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]);
    d[i] = d[i + 1] = d[i + 2] = y;
    histogram[y]++;
  }
  const total = d.length / 4;
  let bawah = 0, kum = 0;
  for (let v = 0; v < 256; v++) {
    kum += histogram[v];
    if (kum >= total * 0.05) { bawah = v; break; }
  }
  let atas = 255; kum = 0;
  for (let v = 255; v >= 0; v--) {
    kum += histogram[v];
    if (kum >= total * 0.05) { atas = v; break; }
  }
  const rentang = Math.max(1, atas - bawah);
  for (let i = 0; i < d.length; i += 4) {
    const y = Math.max(0, Math.min(255, ((d[i] - bawah) * 255) / rentang));
    d[i] = d[i + 1] = d[i + 2] = y;
  }
  ctx.putImageData(img, 0, 0);
  return kanvas;
}

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
    setStatus("Menyiapkan pembaca teks…");
    try {
      const { createWorker } = await import("tesseract.js");
      const worker = await createWorker("ind", 1, {
        workerPath: "/ocr/worker.min.js",
        corePath: "/ocr",
        langPath: "/ocr/lang",
      });

      // Coba beberapa orientasi, ambil yang paling meyakinkan.
      const sudutDicoba = [0, 270, 90, 180];
      let terbaik: { teks: string; yakin: number; sudut: number } | null = null;
      for (const sudut of sudutDicoba) {
        setStatus(`Membaca teks (orientasi ${sudut}°)…`);
        const kanvas = await siapkanKanvas(file, sudut);
        const { data } = await worker.recognize(kanvas);
        const yakin = data.confidence ?? 0;
        if (!terbaik || yakin > terbaik.yakin) {
          terbaik = { teks: data.text, yakin, sudut };
        }
        if (yakin >= 70) break; // sudah cukup meyakinkan
      }
      await worker.terminate();

      const bersih = rapikanTeks(terbaik?.teks ?? "");
      if (!bersih || (terbaik?.yakin ?? 0) < 35) {
        setStatus(
          "Teks sulit terbaca. Coba foto ulang: surat tegak lurus, cahaya terang merata, tanpa bayangan — atau ketik manual."
        );
      } else {
        target.value = target.value ? `${target.value}\n\n${bersih}` : bersih;
        setStatus(
          `Selesai (tingkat keyakinan ${Math.round(
            terbaik!.yakin
          )}%) — periksa dan rapikan hasil pembacaan sebelum menyimpan.`
        );
      }
    } catch (e) {
      console.error(e);
      setStatus(
        "Gagal membaca teks. Coba foto yang lebih terang/tegak, atau ketik manual."
      );
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

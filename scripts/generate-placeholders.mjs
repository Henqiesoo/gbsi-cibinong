// Membuat gambar placeholder JPG untuk semua foto yang direferensikan
// di kode, supaya tampilan langsung rapi saat `npm run dev` sebelum
// foto asli dimasukkan.
//
// Cara pakai:  npm run placeholders
// Script TIDAK menimpa file yang sudah ada — foto asli Anda aman.

import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const daftar = [
  { path: "public/images/hero/ibadah-utama.jpg", label: "Foto Hero — Ruang Ibadah Utama", w: 1600, h: 900 },
  { path: "public/images/tentang/jemaat.jpg", label: "Foto Jemaat", w: 1200, h: 900 },
  { path: "public/images/tentang/plakat-gbsi.jpg", label: "Foto Plakat GBSI", w: 1200, h: 900 },
  ...[1, 2, 3, 4, 5, 6].map((i) => ({
    path: `public/images/galeri/ibadah/ibadah-0${i}.jpg`,
    label: `Ibadah & Pujian ${i}`,
    w: 1200,
    h: 900,
  })),
  ...[1, 2, 3, 4, 5, 6].map((i) => ({
    path: `public/images/galeri/acara/acara-0${i}.jpg`,
    label: `Persekutuan & Acara ${i}`,
    w: 1200,
    h: 900,
  })),
  ...[1, 2, 3, 4].map((i) => ({
    path: `public/images/galeri/fasilitas/fasilitas-0${i}.jpg`,
    label: `Fasilitas ${i}`,
    w: 1200,
    h: 900,
  })),
  ...[1, 2, 3].map((i) => ({
    path: `public/images/renungan/renungan-0${i}.jpg`,
    label: `Thumbnail Renungan ${i}`,
    w: 1200,
    h: 750,
  })),
];

function svgPlaceholder(label, w, h) {
  const aman = label.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
  const fontSize = Math.round(w / 32);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#E0EAF9"/>
        <stop offset="1" stop-color="#9BBAE9"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    <text x="50%" y="48%" text-anchor="middle" font-family="sans-serif"
      font-size="${fontSize}" font-weight="bold" fill="#365CA4">${aman}</text>
    <text x="50%" y="56%" text-anchor="middle" font-family="sans-serif"
      font-size="${Math.round(fontSize * 0.7)}" fill="#365CA4">Ganti file ini dengan foto asli (nama file sama)</text>
  </svg>`;
}

let dibuat = 0;
for (const item of daftar) {
  const tujuan = join(root, item.path);
  if (existsSync(tujuan)) continue; // jangan timpa foto asli
  mkdirSync(dirname(tujuan), { recursive: true });
  await sharp(Buffer.from(svgPlaceholder(item.label, item.w, item.h)))
    .jpeg({ quality: 70 })
    .toFile(tujuan);
  dibuat++;
  console.log(`dibuat: ${item.path}`);
}

console.log(
  dibuat === 0
    ? "Semua gambar sudah ada — tidak ada placeholder yang dibuat."
    : `Selesai — ${dibuat} placeholder dibuat.`
);

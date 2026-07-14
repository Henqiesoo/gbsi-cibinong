// Pemrosesan gambar di server (route handler) memakai sharp:
// - prosesFotoUpload: perkecil & kompres foto yang diunggah admin
// - tambahWatermark: bubuhkan logo watermark transparan di tengah gambar
//   (dipakai untuk jadwal tugas — file yang diunduh jemaat selalu
//   membawa watermark)

import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export async function prosesFotoUpload(
  data: Buffer,
  lebarMaks = 1600
): Promise<Buffer> {
  return sharp(data)
    .rotate() // hormati orientasi EXIF
    .resize({ width: lebarMaks, withoutEnlargement: true })
    .jpeg({ quality: 82 })
    .toBuffer();
}

// Turunkan opasitas PNG (alpha dikali `opacity`), untuk overlay watermark.
async function logoTransparan(lebar: number, opacity: number): Promise<Buffer> {
  const fileLogo = path.join(
    process.cwd(),
    "public",
    "assets",
    "watermark",
    "logo.png"
  );
  const { data, info } = await sharp(await readFile(fileLogo))
    .resize({ width: lebar })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 3; i < data.length; i += 4) {
    data[i] = Math.round(data[i] * opacity);
  }
  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();
}

export async function tambahWatermark(data: Buffer): Promise<Buffer> {
  const dasar = sharp(data).rotate();
  const meta = await dasar.metadata();
  const lebar = Math.min(meta.width ?? 1600, 1600);

  const gambar = await dasar
    .resize({ width: lebar, withoutEnlargement: true })
    .toBuffer();
  const ukuranGambar = await sharp(gambar).metadata();

  const lebarLogo = Math.round((ukuranGambar.width ?? lebar) * 0.5);
  const logo = await logoTransparan(lebarLogo, 0.22);

  return sharp(gambar)
    .composite([{ input: logo, gravity: "center" }])
    .jpeg({ quality: 85 })
    .toBuffer();
}

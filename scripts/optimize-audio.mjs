// Memperkecil berkas MP3 musik latar: stereo -> mono, bitrate diturunkan.
// Undangan dibuka tamu lewat data seluler, jadi ukuran berkas berpengaruh besar
// pada kecepatan buka halaman.
//
// Pakai: node scripts/optimize-audio.mjs <sumber.mp3> <tujuan.mp3> [kbps]
import { readFileSync, writeFileSync } from "fs";
import { createRequire } from "module";
import vm from "vm";
import { MPEGDecoder } from "mpg123-decoder";

const require = createRequire(import.meta.url);
const sandbox = { console, setTimeout, clearTimeout };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(readFileSync(require.resolve("lamejs/lame.all.js"), "utf8"), sandbox);
const lamejs = sandbox.lamejs;

const [sumber, tujuan, kbpsArg] = process.argv.slice(2);
if (!sumber || !tujuan) {
  console.error("Pakai: node scripts/optimize-audio.mjs <sumber.mp3> <tujuan.mp3> [kbps]");
  process.exit(1);
}
const kbps = Number(kbpsArg) || 96;

const decoder = new MPEGDecoder();
await decoder.ready;

const masukan = readFileSync(sumber);
const { channelData, samplesDecoded, sampleRate } = decoder.decode(new Uint8Array(masukan));
decoder.free();

if (!samplesDecoded) {
  console.error("Gagal membaca berkas MP3.");
  process.exit(1);
}

// Campur ke mono (rata-rata kanal) lalu ubah ke PCM 16-bit
const kiri = channelData[0];
const kanan = channelData[1] ?? channelData[0];
const pcm = new Int16Array(samplesDecoded);
for (let i = 0; i < samplesDecoded; i++) {
  const v = (kiri[i] + kanan[i]) / 2;
  pcm[i] = Math.max(-32768, Math.min(32767, Math.round(v * 32767)));
}

const encoder = new lamejs.Mp3Encoder(1, sampleRate, kbps);
const potongan = [];
for (let i = 0; i < pcm.length; i += 1152) {
  const b = encoder.encodeBuffer(pcm.subarray(i, i + 1152));
  if (b.length) potongan.push(Buffer.from(b));
}
const sisa = encoder.flush();
if (sisa.length) potongan.push(Buffer.from(sisa));

const mp3 = Buffer.concat(potongan);
writeFileSync(tujuan, mp3);

const durasi = samplesDecoded / sampleRate;
console.log(
  `${sumber} (${(masukan.length / 1024 / 1024).toFixed(2)} MB) -> ${tujuan} ` +
    `(${(mp3.length / 1024 / 1024).toFixed(2)} MB) · mono ${kbps} kbps · ` +
    `${Math.floor(durasi / 60)}:${String(Math.round(durasi % 60)).padStart(2, "0")}`
);

// Sintesis musik latar undangan menjadi MP3 mono (ringan dibuka dari HP).
// Jalankan: node scripts/generate-music.mjs
//
// Menghasilkan dua lagu, keduanya bebas masalah hak cipta:
//   1. romantic-ballad.mp3 — komposisi ASLI (ditulis untuk proyek ini)
//   2. canon-in-d.mp3      — Canon in D, Johann Pachelbel (1653–1706, domain publik)
//
// Catatan lisensi: lagu populer seperti "A Thousand Years" TIDAK bisa dihasilkan
// di sini karena masih dilindungi hak cipta. Untuk memakainya, sediakan berkas
// audio berlisensi milik Anda sendiri lalu taruh di public/music/ dan tunjuk dari
// lib/wedding-config.ts.
import { readFileSync, writeFileSync } from "fs";
import { createRequire } from "module";
import vm from "vm";

// Bundel lame.all.js menempelkan API ke fungsi global `lamejs`, sementara entry
// point src/js bawaan paket rusak di Node. Jalankan bundel di sandbox VM lalu
// ambil objeknya dari sana.
const require = createRequire(import.meta.url);
const sandbox = { console, setTimeout, clearTimeout };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(readFileSync(require.resolve("lamejs/lame.all.js"), "utf8"), sandbox);
const lamejs = sandbox.lamejs;

const SR = 44100;

// Nama nada -> nomor MIDI (60 = C4 / do tengah)
const N = {};
["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].forEach((nama, i) => {
  for (let oct = 1; oct <= 6; oct++) N[`${nama}${oct}`] = 12 * (oct + 1) + i;
});
N["Bb1"] = N["A#1"];
N["Bb2"] = N["A#2"];
N["Bb3"] = N["A#3"];
N["Bb4"] = N["A#4"];
N["Bb5"] = N["A#5"];
N["Eb3"] = N["D#3"];
N["Eb4"] = N["D#4"];

const freq = (nama) => 440 * Math.pow(2, (N[nama] - 69) / 12);

// =====================================================================
// Mesin sintesis
// =====================================================================
function render({ bpm, bars, buildBar, ekor = 4 }) {
  const BEAT = 60 / bpm;
  const BAR = BEAT * 4;
  const durasi = bars * BAR + ekor;
  const total = Math.ceil(durasi * SR);
  const buf = new Float32Array(total);

  // Nada piano: penjumlahan harmonik dengan peluruhan eksponensial
  function piano(startSec, f, gain, decay, dur) {
    const start = Math.floor(startSec * SR);
    if (start >= total) return;
    const len = Math.min(Math.ceil(dur * SR), total - start);
    const harmonics = [1, 0.46, 0.24, 0.13, 0.07, 0.035, 0.02];
    const attack = 0.008;
    for (let i = 0; i < len; i++) {
      const t = i / SR;
      const env = (t < attack ? t / attack : Math.exp(-(t - attack) * decay)) * gain;
      if (env < 1e-5 && t > attack) break;
      let s = 0;
      for (let h = 0; h < harmonics.length; h++) {
        const n = h + 1;
        // inharmonisitas ringan agar terdengar seperti dawai asli
        const ff = f * n * (1 + 0.0004 * n * n);
        s += harmonics[h] * Math.sin(2 * Math.PI * ff * t) * Math.exp(-t * decay * (0.6 + n * 0.28));
      }
      buf[start + i] += s * env * 0.25;
    }
  }

  // Pad senar lembut untuk mengisi latar
  function pad(startSec, f, gain, dur) {
    const start = Math.floor(startSec * SR);
    if (start >= total) return;
    const len = Math.min(Math.ceil(dur * SR), total - start);
    const fade = 0.4;
    for (let i = 0; i < len; i++) {
      const t = i / SR;
      const rel = len / SR - t;
      const env = Math.min(1, t / fade) * Math.min(1, rel / fade) * gain;
      const vib = 1 + 0.0022 * Math.sin(2 * Math.PI * 4.6 * t);
      const s =
        Math.sin(2 * Math.PI * f * vib * t) * 0.6 +
        Math.sin(2 * Math.PI * f * 2 * vib * t) * 0.18 +
        Math.sin(2 * Math.PI * f * 3 * vib * t) * 0.06;
      buf[start + i] += s * env * 0.06;
    }
  }

  for (let bar = 0; bar < bars; bar++) {
    buildBar({ bar, t0: bar * BAR, BEAT, BAR, piano, pad });
  }

  // Gema beberapa ketukan tunda supaya terasa lapang seperti ruang aula
  const out = new Float32Array(total);
  out.set(buf);
  for (const [delay, gain] of [
    [0.041, 0.3],
    [0.083, 0.22],
    [0.137, 0.16],
    [0.211, 0.11],
    [0.317, 0.07],
  ]) {
    const d = Math.floor(delay * SR);
    for (let i = d; i < total; i++) out[i] += buf[i - d] * gain;
  }

  // Lowpass satu kutub — melembutkan nada tinggi agar tidak menusuk di speaker HP
  let prev = 0;
  for (let i = 0; i < total; i++) {
    prev += 0.28 * (out[i] - prev);
    out[i] = prev;
  }

  // Normalisasi + fade in/out supaya pengulangan (loop) mulus
  let peak = 0;
  for (let i = 0; i < total; i++) peak = Math.max(peak, Math.abs(out[i]));
  const norm = 0.82 / peak;
  const fadeIn = Math.floor(2.2 * SR);
  const fadeOut = Math.floor(3.5 * SR);
  const pcm = new Int16Array(total);
  for (let i = 0; i < total; i++) {
    let v = out[i] * norm;
    if (i < fadeIn) v *= i / fadeIn;
    if (i > total - fadeOut) v *= (total - i) / fadeOut;
    pcm[i] = Math.max(-32768, Math.min(32767, Math.round(v * 32767)));
  }
  return { pcm, durasi };
}

function tulisMp3(namaFile, pcm, durasi) {
  const encoder = new lamejs.Mp3Encoder(1, SR, 64);
  const chunks = [];
  for (let i = 0; i < pcm.length; i += 1152) {
    const b = encoder.encodeBuffer(pcm.subarray(i, i + 1152));
    if (b.length) chunks.push(Buffer.from(b));
  }
  const last = encoder.flush();
  if (last.length) chunks.push(Buffer.from(last));
  const mp3 = Buffer.concat(chunks);
  writeFileSync(`public/music/${namaFile}`, mp3);
  console.log(`OK: public/music/${namaFile} — ${(mp3.length / 1024).toFixed(0)} KB, ${durasi.toFixed(1)} detik`);
}

// =====================================================================
// LAGU 1 — "Selamanya Bersama": balada piano ASLI untuk proyek ini
// Nada dasar F mayor, 70 BPM. Progresi I–V–vi–IV yang hangat, dengan
// melodi yang ditulis sendiri (bukan kutipan lagu mana pun).
// =====================================================================
const balada = {
  // bass, akor (untuk arpeggio & pad)
  akor: [
    { bass: "F2", nada: ["F3", "A3", "C4", "F4"] }, // F
    { bass: "C2", nada: ["E3", "G3", "C4", "E4"] }, // C
    { bass: "D2", nada: ["F3", "A3", "D4", "F4"] }, // Dm
    { bass: "Bb1", nada: ["F3", "Bb3", "D4", "F4"] }, // Bb
    { bass: "F2", nada: ["F3", "A3", "C4", "F4"] },
    { bass: "C2", nada: ["E3", "G3", "C4", "E4"] },
    { bass: "D2", nada: ["F3", "A3", "D4", "F4"] },
    { bass: "Bb1", nada: ["F3", "Bb3", "D4", "F4"] },
  ],
  // Melodi asli — dua nada setengah per birama
  melodi: [
    ["A4", "C5"],
    ["Bb4", "A4"],
    ["F4", "A4"],
    ["G4", "G4"],
    ["C5", "D5"],
    ["C5", "Bb4"],
    ["A4", "G4"],
    ["F4", "F4"],
  ],
  // Bagian angkat (bridge) pada siklus terakhir
  bridge: [
    ["D5", "F5"],
    ["E5", "D5"],
    ["C5", "A4"],
    ["Bb4", "C5"],
    ["D5", "C5"],
    ["Bb4", "A4"],
    ["G4", "A4"],
    ["F4", "F4"],
  ],
};

const SIKLUS = 3;
const hasilBalada = render({
  bpm: 70,
  bars: balada.akor.length * SIKLUS,
  buildBar({ bar, t0, BEAT, BAR, piano, pad }) {
    const idx = bar % balada.akor.length;
    const siklus = Math.floor(bar / balada.akor.length);
    const a = balada.akor[idx];

    // Bas: akar di ketukan 1, oktaf atas di ketukan 3
    piano(t0, freq(a.bass), 0.9, 1.0, BEAT * 2.4);
    piano(t0 + BEAT * 2, freq(a.bass) * 2, 0.4, 1.3, BEAT * 2);

    // Arpeggio delapanan naik-turun — ciri khas balada piano
    const arp = [...a.nada, ...a.nada.slice(0, 3).reverse()];
    for (let i = 0; i < 8; i++) {
      const oct = i >= 4 ? 2 : 1;
      piano(t0 + i * (BEAT / 2), freq(arp[i % arp.length]) * oct, 0.28 - i * 0.011, 2.5, BEAT * 1.2);
    }

    // Melodi: siklus 1 hening (pembukaan lapang), siklus 2 melodi, siklus 3 bridge
    const mel = siklus === 1 ? balada.melodi[idx] : siklus === 2 ? balada.bridge[idx] : null;
    if (mel) {
      mel.forEach((nada, i) => {
        piano(t0 + i * BEAT * 2, freq(nada), 0.64, 0.8, BEAT * 2.4);
        // lapis kedua sedikit detune supaya terdengar lebih tebal & hangat
        piano(t0 + i * BEAT * 2 + 0.012, freq(nada) * 1.0012, 0.3, 0.85, BEAT * 2.2);
      });
    }

    a.nada.slice(0, 3).forEach((nada) => pad(t0, freq(nada), 0.9, BAR));
  },
});
tulisMp3("romantic-ballad.mp3", hasilBalada.pcm, hasilBalada.durasi);

// =====================================================================
// LAGU 2 — Canon in D (Johann Pachelbel, domain publik)
// =====================================================================
const canonAkor = [
  { bass: "D2", nada: ["D3", "F#3", "A3", "D4"] },
  { bass: "A2", nada: ["C#3", "E3", "A3", "C#4"] },
  { bass: "B2", nada: ["D3", "F#3", "B3", "D4"] },
  { bass: "F#2", nada: ["C#3", "F#3", "A3", "C#4"] },
  { bass: "G2", nada: ["D3", "G3", "B3", "D4"] },
  { bass: "D2", nada: ["D3", "F#3", "A3", "D4"] },
  { bass: "G2", nada: ["D3", "G3", "B3", "D4"] },
  { bass: "A2", nada: ["C#3", "E3", "A3", "C#4"] },
];
const canonMelodi = [
  ["F#5", "E5"],
  ["D5", "C#5"],
  ["B4", "A4"],
  ["B4", "C#5"],
  ["D5", "C#5"],
  ["B4", "A4"],
  ["G4", "F#4"],
  ["G4", "E4"],
];

const hasilCanon = render({
  bpm: 62,
  bars: canonAkor.length * 2,
  buildBar({ bar, t0, BEAT, BAR, piano, pad }) {
    const idx = bar % canonAkor.length;
    const siklus = Math.floor(bar / canonAkor.length);
    const a = canonAkor[idx];

    piano(t0, freq(a.bass), 0.85, 1.1, BEAT * 2.2);
    piano(t0 + BEAT * 2, freq(a.bass) * 2, 0.42, 1.4, BEAT * 2);

    const arp = [...a.nada, ...a.nada.slice(0, 3).reverse()];
    for (let i = 0; i < 8; i++) {
      const oct = i >= 4 ? 2 : 1;
      piano(t0 + i * (BEAT / 2), freq(arp[i % arp.length]) * oct, 0.3 - i * 0.012, 2.6, BEAT * 1.2);
    }

    if (siklus >= 1) {
      canonMelodi[idx].forEach((nada, i) => {
        piano(t0 + i * BEAT * 2, freq(nada), 0.62, 0.85, BEAT * 2.4);
        piano(t0 + i * BEAT * 2 + 0.012, freq(nada) * 1.001, 0.3, 0.9, BEAT * 2.2);
      });
    }

    a.nada.slice(0, 3).forEach((nada) => pad(t0, freq(nada), 0.9, BAR));
  },
});
tulisMp3("canon-in-d.mp3", hasilCanon.pcm, hasilCanon.durasi);

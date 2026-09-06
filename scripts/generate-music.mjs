// Sintesis musik latar undangan: Canon in D (Johann Pachelbel, 1653–1706 — domain publik)
// Piano lembut + pad senar, dirender jadi MP3 mono agar ringan dibuka dari HP.
// Jalankan: node scripts/generate-music.mjs
import { readFileSync, writeFileSync } from "fs";
import { createRequire } from "module";
import vm from "vm";

// Bundel lame.all.js menempelkan API ke fungsi global `lamejs`, sementara entry
// point src/js bawaan paket rusak di Node. Jalankan bundel di sandbox VM lalu
// ambil objeknya dari sana.
const require = createRequire(import.meta.url);
const bundlePath = require.resolve("lamejs/lame.all.js");
const sandbox = { console, setTimeout, clearTimeout };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(readFileSync(bundlePath, "utf8"), sandbox);
const lamejs = sandbox.lamejs;

const SR = 44100;
const BPM = 62;
const BEAT = 60 / BPM;
const BAR = BEAT * 4;

const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);
// Nama nada -> nomor MIDI
const N = {
  "D2": 38, "E2": 40, "F#2": 42, "G2": 43, "A2": 45, "B2": 47,
  "D3": 50, "E3": 52, "F#3": 54, "G3": 55, "A3": 57, "B3": 59, "C#3": 49,
  "D4": 62, "E4": 64, "F#4": 66, "G4": 67, "A4": 69, "B4": 71, "C#4": 61,
  "D5": 74, "E5": 76, "F#5": 78, "G5": 79, "A5": 81, "B5": 83, "C#5": 73,
};

// Progresi Canon in D: D – A – Bm – F#m – G – D – G – A
const progression = [
  { bass: "D2", tones: ["D3", "F#3", "A3", "D4"] },
  { bass: "A2", tones: ["C#3", "E3", "A3", "C#4"] },
  { bass: "B2", tones: ["D3", "F#3", "B3", "D4"] },
  { bass: "F#2", tones: ["C#3", "F#3", "A3", "C#4"] },
  { bass: "G2", tones: ["D3", "G3", "B3", "D4"] },
  { bass: "D2", tones: ["D3", "F#3", "A3", "D4"] },
  { bass: "G2", tones: ["D3", "G3", "B3", "D4"] },
  { bass: "A2", tones: ["C#3", "E3", "A3", "C#4"] },
];

// Melodi biola Canon yang ikonik — dua nada setengah per birama
const melody = [
  ["F#5", "E5"], ["D5", "C#5"], ["B4", "A4"], ["B4", "C#5"],
  ["D5", "C#5"], ["B4", "A4"], ["G4", "F#4"], ["G4", "E4"],
];

const CYCLES = 2;
const totalBars = progression.length * CYCLES;
const durasi = totalBars * BAR + 4; // + ekor gema
const total = Math.ceil(durasi * SR);
const buf = new Float32Array(total);

// Nada piano: penjumlahan harmonik dengan peluruhan eksponensial
function piano(startSec, freq, gain, decay, dur) {
  const start = Math.floor(startSec * SR);
  const len = Math.min(Math.ceil(dur * SR), total - start);
  if (len <= 0) return;
  const harmonics = [1, 0.46, 0.24, 0.13, 0.07, 0.035, 0.02];
  const attack = 0.008;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    // amplop: serang cepat lalu meluruh seperti dawai piano
    const env = (t < attack ? t / attack : Math.exp(-(t - attack) * decay)) * gain;
    if (env < 1e-5 && t > attack) break;
    let s = 0;
    for (let h = 0; h < harmonics.length; h++) {
      const n = h + 1;
      // inharmonisitas ringan agar terdengar seperti dawai asli
      const f = freq * n * (1 + 0.0004 * n * n);
      s += harmonics[h] * Math.sin(2 * Math.PI * f * t) * Math.exp(-t * decay * (0.6 + n * 0.28));
    }
    buf[start + i] += s * env * 0.25;
  }
}

// Pad senar lembut untuk mengisi latar
function pad(startSec, freq, gain, dur) {
  const start = Math.floor(startSec * SR);
  const len = Math.min(Math.ceil(dur * SR), total - start);
  const fade = 0.35;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const rel = len / SR - t;
    const env = Math.min(1, t / fade) * Math.min(1, rel / fade) * gain;
    const vib = 1 + 0.0022 * Math.sin(2 * Math.PI * 4.6 * t);
    const s =
      Math.sin(2 * Math.PI * freq * vib * t) * 0.6 +
      Math.sin(2 * Math.PI * freq * 2 * vib * t) * 0.18 +
      Math.sin(2 * Math.PI * freq * 3 * vib * t) * 0.06;
    buf[start + i] += s * env * 0.06;
  }
}

for (let bar = 0; bar < totalBars; bar++) {
  const step = progression[bar % progression.length];
  const mel = melody[bar % melody.length];
  const t0 = bar * BAR;
  const cycle = Math.floor(bar / progression.length);

  // Bas: nada akar di ketukan 1 dan 3
  piano(t0, midi(N[step.bass]), 0.85, 1.1, BEAT * 2.2);
  piano(t0 + BEAT * 2, midi(N[step.bass]) * 2, 0.42, 1.4, BEAT * 2);

  // Arpeggio delapanan naik-turun
  const arp = [...step.tones, ...step.tones.slice(0, 3).reverse()];
  for (let i = 0; i < 8; i++) {
    const nada = arp[i % arp.length];
    const oct = i >= 4 ? 2 : 1; // paruh kedua satu oktaf lebih tinggi
    piano(t0 + i * (BEAT / 2), midi(N[nada]) * oct, 0.3 - i * 0.012, 2.6, BEAT * 1.2);
  }

  // Melodi utama — masuk mulai siklus kedua agar pembukaan terasa lapang
  if (cycle >= 1) {
    mel.forEach((nada, i) => {
      piano(t0 + i * BEAT * 2, midi(N[nada]), 0.62, 0.85, BEAT * 2.4);
      piano(t0 + i * BEAT * 2 + 0.012, midi(N[nada]) * 1.001, 0.3, 0.9, BEAT * 2.2);
    });
  }

  // Pad akor sepanjang birama
  step.tones.slice(0, 3).forEach((nada) => pad(t0, midi(N[nada]), 0.9, BAR));
}

// Gema sederhana (beberapa ketukan tunda) supaya terasa lapang seperti ruang aula
const out = new Float32Array(total);
const taps = [
  [0.041, 0.3], [0.083, 0.22], [0.137, 0.16], [0.211, 0.11], [0.317, 0.07],
];
for (let i = 0; i < total; i++) out[i] = buf[i];
for (const [delay, gain] of taps) {
  const d = Math.floor(delay * SR);
  for (let i = d; i < total; i++) out[i] += buf[i - d] * gain;
}

// Lowpass satu kutub — melembutkan nada tinggi agar tidak menusuk di speaker HP
let prev = 0;
const a = 0.28;
for (let i = 0; i < total; i++) {
  prev += a * (out[i] - prev);
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

// Encode MP3 mono 64 kbps — cukup untuk musik latar, hemat kuota tamu
const encoder = new lamejs.Mp3Encoder(1, SR, 64);
const chunks = [];
const BLOCK = 1152;
for (let i = 0; i < pcm.length; i += BLOCK) {
  const b = encoder.encodeBuffer(pcm.subarray(i, i + BLOCK));
  if (b.length) chunks.push(Buffer.from(b));
}
const last = encoder.flush();
if (last.length) chunks.push(Buffer.from(last));

const mp3 = Buffer.concat(chunks);
writeFileSync("public/music/canon-in-d.mp3", mp3);
console.log(
  `OK: public/music/canon-in-d.mp3 — ${(mp3.length / 1024).toFixed(0)} KB, ${durasi.toFixed(1)} detik`
);

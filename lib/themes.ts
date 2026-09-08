// =====================================================================
// TEMA UNDANGAN
//
// Sebuah tema bukan sekadar ganti warna. Setiap tema menentukan:
//   • palet warna          (token --sage-*, --ivory-*, --gold-*, ...)
//   • pasangan font        (--font-display, --font-script, --font-body)
//   • bahasa bentuk        (--r-md, --r-lg, --r-foto — sudut kartu & foto)
//   • tekstur latar        (--tekstur)
//   • gaya ornamen         (field `ornamen`, dipakai komponen Ornament)
//
// Komponen tidak pernah tahu tema apa yang aktif — semuanya memakai nama
// token yang sama, dan nilainya ditukar di file ini.
//
// Warna ditulis sebagai kanal RGB dipisah spasi ("14 13 16") supaya modifier
// transparansi Tailwind seperti bg-surface/70 tetap bekerja.
// =====================================================================

export type NamaTema = "sage" | "dark" | "floral" | "minimal" | "adat" | "royal";

export type GayaOrnamen = "daun" | "deco" | "bunga" | "garis" | "bali" | "mandala";

/* Format = cara tamu menyusuri undangan. Ini yang membuat dua tema terasa
   benar-benar beda produk, bukan sekadar beda warna: urutan bagian, cara
   berpindah, bahkan pengelompokan isinya ikut berubah. */
export type FormatTema = "gulir" | "geser" | "buku" | "tab" | "lipat" | "adegan";

export const FORMAT: Record<FormatTema, { nama: string; jelas: string }> = {
  gulir: {
    nama: "Gulir panjang",
    jelas: "Satu halaman panjang, digulir dari atas ke bawah",
  },
  geser: {
    nama: "Panel geser",
    jelas: "Satu bagian satu layar penuh, digeser ke samping",
  },
  buku: {
    nama: "Buku dibalik",
    jelas: "Halaman dibalik satu per satu seperti buku acara",
  },
  tab: {
    nama: "Menu aplikasi",
    jelas: "Menu di bawah layar, isi berganti tanpa gulir panjang",
  },
  lipat: {
    nama: "Lipatan",
    jelas: "Bagian tersimpan terlipat, terbuka saat disentuh",
  },
  adegan: {
    nama: "Adegan berjalan",
    jelas: "Satu layar yang berganti sendiri seperti video",
  },
};

type Token = Record<string, string>;

export type Tema = {
  nama: string;
  deskripsi: string;
  ornamen: GayaOrnamen;
  format: FormatTema;
  token: Token;
};

// Bentuk & tekstur yang dipakai berulang
const SUDUT_LEMBUT = { "--r-md": "1rem", "--r-lg": "1.5rem", "--r-foto": "5rem" };
const SUDUT_BULAT = { "--r-md": "1.25rem", "--r-lg": "2rem", "--r-foto": "9999px" };
const SUDUT_TEGAS = { "--r-md": "0.25rem", "--r-lg": "0.375rem", "--r-foto": "0.25rem" };
// Sudut melengkung di atas saja — meniru bentuk gerbang/pelaminan
const SUDUT_GERBANG = {
  "--r-md": "0.75rem",
  "--r-lg": "1.25rem",
  "--r-foto": "48% 48% 10px 10px / 38% 38% 10px 10px",
};

const BAYANGAN_TERANG = {
  "--bayangan-kartu": "0 8px 40px -12px rgb(60 69 54 / 0.25)",
  "--bayangan-dok": "0 10px 40px -8px rgb(60 69 54 / 0.4)",
};
const BAYANGAN_GELAP = {
  "--bayangan-kartu": "0 10px 44px -12px rgb(0 0 0 / 0.75)",
  "--bayangan-dok": "0 12px 44px -8px rgb(0 0 0 / 0.85)",
};

// ---------------------------------------------------------------------
// 1. Sage & Gold — terang, hangat, natural (bawaan)
// ---------------------------------------------------------------------
const sage: Tema = {
  nama: "Sage & Gold",
  deskripsi: "Gading, sage, emas sampanye — hangat dan natural",
  ornamen: "daun",
  format: "gulir",
  token: {
    "--ivory-50": "253 251 247",
    "--ivory-100": "248 244 236",
    "--ivory-200": "239 232 218",
    "--ivory-300": "226 215 195",
    "--sage-100": "223 229 218",
    "--sage-200": "195 205 187",
    "--sage-300": "162 176 151",
    "--sage-400": "129 143 118",
    "--sage-500": "103 115 93",
    "--sage-600": "79 90 71",
    "--sage-700": "60 69 54",
    "--sage-800": "44 51 39",
    "--sage-900": "30 35 27",
    "--gold-200": "235 217 180",
    "--gold-300": "220 192 138",
    "--gold-400": "201 167 106",
    "--gold-500": "176 141 87",
    "--gold-600": "143 112 68",
    "--ink": "35 38 31",
    "--surface": "255 255 255",
    "--edge": "255 255 255",
    "--onprimary": "253 251 247",
    "--font-display": "var(--font-cormorant)",
    "--font-script": "var(--font-parisienne)",
    "--font-body": "var(--font-jakarta)",
    "--tekstur": "none",
    ...SUDUT_LEMBUT,
    ...BAYANGAN_TERANG,
  },
};

// ---------------------------------------------------------------------
// 2. Dark Luxury — hitam pekat, emas terang, huruf kapital klasik
// ---------------------------------------------------------------------
const dark: Tema = {
  nama: "Dark Luxury",
  deskripsi: "Hitam pekat, krem, emas — mewah bergaya malam gala",
  ornamen: "deco",
  format: "geser",
  token: {
    "--ivory-50": "12 11 14",
    "--ivory-100": "23 21 27",
    "--ivory-200": "44 40 50",
    "--ivory-300": "62 56 70",
    "--sage-100": "44 40 50",
    "--sage-200": "62 56 70",
    "--sage-300": "120 111 132",
    "--sage-400": "150 140 160",
    "--sage-500": "180 170 186",
    "--sage-600": "208 199 212",
    "--sage-700": "212 175 105",
    "--sage-800": "243 235 220",
    "--sage-900": "7 6 9",
    "--gold-200": "247 233 202",
    "--gold-300": "236 210 152",
    "--gold-400": "218 184 112",
    "--gold-500": "204 168 96",
    "--gold-600": "224 192 130",
    "--ink": "240 232 218",
    "--surface": "26 24 31",
    "--edge": "86 76 96",
    "--onprimary": "16 14 19",
    "--font-display": "var(--font-cinzel)",
    "--font-script": "var(--font-parisienne)",
    "--font-body": "var(--font-jakarta)",
    // Cahaya emas samar dari atas
    "--tekstur":
      "radial-gradient(120% 60% at 50% 0%, rgb(212 175 105 / 0.10), transparent 60%)",
    ...SUDUT_LEMBUT,
    ...BAYANGAN_GELAP,
  },
};

// ---------------------------------------------------------------------
// 3. Floral Watercolor — blush, mawar kering, sapuan cat air
// ---------------------------------------------------------------------
const floral: Tema = {
  nama: "Floral Watercolor",
  deskripsi: "Blush, mawar kering, dan sapuan cat air yang lembut",
  ornamen: "bunga",
  format: "buku",
  token: {
    "--ivory-50": "255 250 250",
    "--ivory-100": "253 242 242",
    "--ivory-200": "247 226 227",
    "--ivory-300": "238 205 208",
    "--sage-100": "250 231 233",
    "--sage-200": "236 202 206",
    "--sage-300": "204 156 165",
    "--sage-400": "176 124 134",
    "--sage-500": "148 98 110",
    "--sage-600": "124 78 91",
    "--sage-700": "158 82 100", // aksi: mawar tua
    "--sage-800": "92 54 66",
    "--sage-900": "56 30 39",
    "--gold-200": "247 226 210",
    "--gold-300": "236 200 176",
    "--gold-400": "216 158 140",
    "--gold-500": "192 126 112",
    "--gold-600": "163 100 90",
    "--ink": "78 46 55",
    "--surface": "255 255 255",
    "--edge": "255 255 255",
    "--onprimary": "255 250 250",
    "--font-display": "var(--font-playfair)",
    "--font-script": "var(--font-greatvibes)",
    "--font-body": "var(--font-jakarta)",
    // Noda cat air lembut di beberapa titik
    "--tekstur":
      "radial-gradient(40% 25% at 8% 4%, rgb(236 202 206 / 0.55), transparent 70%), radial-gradient(35% 22% at 95% 22%, rgb(247 226 210 / 0.6), transparent 70%), radial-gradient(45% 25% at 20% 82%, rgb(250 231 233 / 0.7), transparent 72%)",
    ...SUDUT_BULAT,
    "--bayangan-kartu": "0 10px 40px -14px rgb(148 98 110 / 0.35)",
    "--bayangan-dok": "0 10px 40px -8px rgb(148 98 110 / 0.4)",
  },
};

// ---------------------------------------------------------------------
// 4. Minimalis Modern — hitam-putih, sudut tegas, huruf geometris
// ---------------------------------------------------------------------
const minimal: Tema = {
  nama: "Minimalis Modern",
  deskripsi: "Putih bersih, sudut tegas, tipografi geometris tanpa hiasan",
  ornamen: "garis",
  format: "tab",
  token: {
    "--ivory-50": "250 250 249",
    "--ivory-100": "244 244 242",
    "--ivory-200": "228 228 225",
    "--ivory-300": "208 208 204",
    "--sage-100": "236 236 234",
    "--sage-200": "214 214 211",
    "--sage-300": "168 168 164",
    "--sage-400": "132 132 128",
    "--sage-500": "96 96 93",
    "--sage-600": "64 64 62",
    "--sage-700": "24 24 23",
    "--sage-800": "18 18 17",
    "--sage-900": "10 10 10",
    "--gold-200": "224 224 221",
    "--gold-300": "186 186 182",
    "--gold-400": "140 140 136",
    "--gold-500": "110 110 106",
    "--gold-600": "82 82 79",
    "--ink": "24 24 23",
    "--surface": "255 255 255",
    "--edge": "228 228 225",
    "--onprimary": "250 250 249",
    "--font-display": "var(--font-jost)",
    "--font-script": "var(--font-jost)",
    "--font-body": "var(--font-jost)",
    "--tekstur": "none",
    ...SUDUT_TEGAS,
    "--bayangan-kartu": "0 1px 2px rgb(0 0 0 / 0.06)",
    "--bayangan-dok": "0 6px 24px -8px rgb(0 0 0 / 0.18)",
  },
};

// ---------------------------------------------------------------------
// 5. Nusantara Bali — cokelat tanah, kuning emas, candi bentar & poleng
// ---------------------------------------------------------------------
const adat: Tema = {
  nama: "Nusantara Bali",
  deskripsi: "Candi bentar, penjor, dan kain poleng — nuansa budaya Bali",
  ornamen: "bali",
  format: "lipat",
  token: {
    "--ivory-50": "250 245 235",
    "--ivory-100": "243 234 217",
    "--ivory-200": "228 211 182",
    "--ivory-300": "208 184 145",
    "--sage-100": "236 219 190",
    "--sage-200": "208 182 142",
    "--sage-300": "165 137 100",
    "--sage-400": "136 108 74",
    "--sage-500": "108 83 55",
    "--sage-600": "84 62 39",
    "--sage-700": "108 60 24", // aksi: cokelat soga
    "--sage-800": "62 42 26",
    "--sage-900": "38 25 15",
    "--gold-200": "247 226 168",
    "--gold-300": "233 200 118",
    "--gold-400": "206 165 66",
    "--gold-500": "176 136 44",
    "--gold-600": "140 106 32",
    "--ink": "56 38 23",
    "--surface": "255 252 245",
    "--edge": "228 211 182",
    "--onprimary": "250 245 235",
    "--font-display": "var(--font-marcellus)",
    "--font-script": "var(--font-pinyon)",
    "--font-body": "var(--font-jakarta)",
    // Foto interior pura Bali sebagai latar halaman — yang terlihat di sisi
    // kiri-kanan saat undangan dibuka di tablet atau komputer. Diberi lapisan
    // gelap supaya kolom undangan tetap menonjol.
    "--tekstur":
      "linear-gradient(rgb(32 21 13 / 0.62), rgb(32 21 13 / 0.72)), url('/photos/bali-latar-samping.jpg')",
    "--tekstur-size": "cover",
    "--r-md": "0.5rem",
    "--r-lg": "0.75rem",
    "--r-foto": "9999px",
    ...BAYANGAN_TERANG,
  },
};

// ---------------------------------------------------------------------
// 6. Royal Red — merah marun, emas, bentuk gerbang pelaminan
//    Mengacu pada referensi undangan video bergaya Indian/Nikkah:
//    marun #7A1E1E, emas #FFD700, latar krem #F5EFE6.
// ---------------------------------------------------------------------
const royal: Tema = {
  nama: "Royal Red",
  deskripsi: "Marun & emas — bukan halaman gulir, melainkan adegan yang berjalan sendiri",
  ornamen: "mandala",
  format: "adegan",
  token: {
    "--ivory-50": "245 239 230", // #F5EFE6 dari referensi
    "--ivory-100": "238 228 214",
    "--ivory-200": "223 205 182",
    "--ivory-300": "203 177 145",
    "--sage-100": "240 216 216",
    "--sage-200": "222 184 184",
    "--sage-300": "186 132 132",
    "--sage-400": "154 102 102",
    "--sage-500": "128 74 74",
    "--sage-600": "104 52 52",
    "--sage-700": "122 30 30", // #7A1E1E — aksi
    "--sage-800": "88 20 20",
    "--sage-900": "48 12 12",
    "--gold-200": "255 240 190",
    "--gold-300": "247 219 130",
    "--gold-400": "224 186 74",
    "--gold-500": "190 152 42",
    "--gold-600": "156 122 28",
    "--ink": "72 24 24",
    "--surface": "255 252 246",
    "--edge": "224 186 74",
    "--onprimary": "255 246 224",
    "--font-display": "var(--font-cinzel)",
    "--font-script": "var(--font-pinyon)",
    "--font-body": "var(--font-jakarta)",
    // Kilau emas bertaburan seperti pada referensi
    "--tekstur":
      "radial-gradient(circle at 12% 8%, rgb(224 186 74 / 0.30) 0 1.5px, transparent 2px), radial-gradient(circle at 78% 18%, rgb(224 186 74 / 0.26) 0 2px, transparent 2.5px), radial-gradient(circle at 32% 46%, rgb(224 186 74 / 0.22) 0 1.5px, transparent 2px), radial-gradient(circle at 88% 72%, rgb(224 186 74 / 0.28) 0 2px, transparent 2.5px), radial-gradient(circle at 20% 88%, rgb(224 186 74 / 0.24) 0 1.5px, transparent 2px), radial-gradient(120% 45% at 50% 0%, rgb(122 30 30 / 0.10), transparent 65%)",
    ...SUDUT_GERBANG,
    "--bayangan-kartu": "0 10px 40px -14px rgb(122 30 30 / 0.4)",
    "--bayangan-dok": "0 10px 40px -8px rgb(122 30 30 / 0.45)",
  },
};

export const TEMA: Record<NamaTema, Tema> = { sage, dark, floral, minimal, adat, royal };

export const TEMA_BAWAAN: NamaTema = "sage";

export const DAFTAR_TEMA = Object.entries(TEMA).map(([id, t]) => ({
  id: id as NamaTema,
  ...t,
}));

// Baca parameter ?tema= dari URL; nilai tak dikenal jatuh ke tema bawaan
export function bacaTema(nilai: string | string[] | undefined): NamaTema {
  const t = Array.isArray(nilai) ? nilai[0] : nilai;
  if (t === "dark-luxury") return "dark"; // alias lama
  return t && t in TEMA ? (t as NamaTema) : TEMA_BAWAAN;
}

// CSS untuk disisipkan di halaman. Dirender di server sehingga tidak ada
// kedipan warna saat halaman pertama kali tampil.
export function cssTema(tema: NamaTema): string {
  if (tema === TEMA_BAWAAN) return ""; // nilai bawaan sudah ada di globals.css
  const isi = Object.entries(TEMA[tema].token)
    .map(([k, v]) => `${k}:${v}`)
    .join(";");
  return `:root{${isi}}`;
}

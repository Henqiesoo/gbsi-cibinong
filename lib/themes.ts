// =====================================================================
// TEMA UNDANGAN
//
// Setiap tema hanyalah kumpulan nilai CSS variable. Komponen tidak perlu tahu
// tema apa yang aktif — semuanya memakai nama warna yang sama (sage, ivory,
// gold, surface, ...) dan nilainya ditukar di sini.
//
// Nilai ditulis sebagai kanal RGB dipisah spasi ("14 13 16") supaya modifier
// transparansi Tailwind seperti bg-surface/70 tetap bekerja.
// =====================================================================

export type NamaTema = "sage" | "dark";

type Token = Record<string, string>;

// ---------------------------------------------------------------------
// Tema 1 — Sage & Gold: terang, hangat, natural (bawaan)
// ---------------------------------------------------------------------
const sage: Token = {
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
};

// ---------------------------------------------------------------------
// Tema 2 — Dark Luxury: hitam pekat, emas sampanye, kesan mewah malam hari
//
// Nama token dipertahankan, tetapi perannya dibalik: latar jadi gelap, teks
// jadi krem, dan tombol utama memakai emas dengan teks gelap di atasnya.
// ---------------------------------------------------------------------
const dark: Token = {
  // Latar halaman & permukaan (dari paling gelap ke agak terang)
  "--ivory-50": "12 11 14", // latar halaman
  "--ivory-100": "23 21 27", // panel/chip
  "--ivory-200": "44 40 50", // garis tepi halus
  "--ivory-300": "62 56 70", // garis tepi input

  // Skala "sage" dipakai untuk teks & aksi
  "--sage-100": "44 40 50", // badge gelap
  "--sage-200": "62 56 70",
  "--sage-300": "120 111 132", // placeholder
  "--sage-400": "150 140 160", // teks paling redup
  "--sage-500": "180 170 186", // teks isi
  "--sage-600": "208 199 212", // teks isi terang
  "--sage-700": "212 175 105", // AKSI: tombol utama & sorotan = emas
  "--sage-800": "243 235 220", // judul
  "--sage-900": "7 6 9", // permukaan paling gelap (cover & footer)

  // Emas dibuat lebih terang agar tetap terbaca di atas hitam
  "--gold-200": "247 233 202",
  "--gold-300": "236 210 152",
  "--gold-400": "218 184 112",
  "--gold-500": "204 168 96",
  "--gold-600": "224 192 130",

  "--ink": "240 232 218",
  "--surface": "26 24 31", // kartu / panel melayang
  "--edge": "86 76 96", // tepi kartu
  "--onprimary": "16 14 19", // teks gelap di atas tombol emas

  // Bayangan dibuat lebih pekat supaya kartu tetap terbaca di atas hitam
  "--bayangan-kartu": "0 10px 44px -12px rgb(0 0 0 / 0.75)",
  "--bayangan-dok": "0 12px 44px -8px rgb(0 0 0 / 0.85)",
};

export const TEMA: Record<NamaTema, Token> = { sage, dark };

export const TEMA_BAWAAN: NamaTema = "sage";

// Baca parameter ?tema= dari URL; nilai tak dikenal jatuh ke tema bawaan
export function bacaTema(nilai: string | string[] | undefined): NamaTema {
  const t = Array.isArray(nilai) ? nilai[0] : nilai;
  return t === "dark" || t === "dark-luxury" ? "dark" : TEMA_BAWAAN;
}

// CSS untuk disisipkan di halaman. Dirender di server sehingga tidak ada
// kedipan warna saat halaman pertama kali tampil.
export function cssTema(tema: NamaTema): string {
  if (tema === TEMA_BAWAAN) return ""; // nilai bawaan sudah ada di globals.css
  const isi = Object.entries(TEMA[tema])
    .map(([k, v]) => `${k}:${v}`)
    .join(";");
  return `:root{${isi}}`;
}

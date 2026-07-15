// Konten halaman Tentang yang bisa diedit dari panel admin
// (/admin/tentang): sejarah cabang, struktur kepengurusan, dan periode.
// Disimpan sebagai teks di tabel `pengaturan`; bila belum ada, dipakai
// isi bawaan hasil transkripsi dokumen resmi gereja.

import { getPengaturan } from "@/lib/data/pengaturan";
import { supabaseSiap, supabaseServer } from "@/lib/supabase";

// ——— Sejarah (paragraf dipisah baris kosong) ———

export const SEJARAH_DEFAULT = `Gereja Berea Sungrak Indonesia Cabang Cibinong di Jalan Tapos, Kel. Ciriung, Kec. Cibinong, Kabupaten Bogor, dirintis oleh Bp. Andreas dan Bp. Hardi Nurmadi. Diawali dari komsel keluarga hingga beberapa jemaat berkumpul sekitar enam kepala keluarga, ibadah perdana dilaksanakan pada 30 September 2007 pukul 08.00 WIB di Perumahan Nirwana Estate, di rumah salah satu jemaat (Bp. Nurmadi dan Ibu Ferry Nurmadi).

Seiring berjalannya waktu jumlah jemaat semakin besar dan tempat ibadah tidak lagi memadai, sehingga ibadah dipindahkan ke Jalan Tapos yang saat ini menjadi gedung Gereja Berea Sungrak Indonesia Cabang Cibinong. Rumah yang telah berdiri didedikasikan sebagai gereja dan direnovasi menjadi tempat ibadah di atas tanah seluas ±400 m² dengan bangunan gedung gereja 329 m², terdiri dari ruang ibadah raya, ruang pastori, ruang sekolah minggu dan pengajaran Alkitabiah (komsel), dapur dan ruang makan jemaat, ruang pertemuan jemaat, ruang istirahat, tempat parkir dan taman, serta gudang.

Saat ini jemaat berjumlah sekitar seratusan orang yang aktif beribadah. GBSI Cabang Cibinong menjadi gereja yang setia, taat, dan tunduk pada otoritas Roh Kudus, serta merupakan perpanjangan terstruktur dari Gereja Pusat yang berada di Ruko Pinangsia Blok H38–H39, Karawaci, Tangerang Selatan.

Gereja terdaftar resmi di Kementerian Agama pada 14 Desember 2023 dengan nomor B-13923/KK.10.01/BA.04/12/2023, Provinsi Jawa Barat, sebagai tempat ibadah (gereja).`;

export async function getSejarah(): Promise<string[]> {
  const teks = (await getPengaturan("sejarah_teks")) || SEJARAH_DEFAULT;
  return teks
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

// ——— Struktur kepengurusan ———
// Format teks (satu baris per unit):
//   Nama Unit | Pengurus          → unit mandiri (mis. Penasehat)
//   # Nama Bidang | Pengurus      → bidang utama
//   - Nama Sub-unit | Pengurus    → sub-unit dari bidang di atasnya

export const STRUKTUR_PERIODE_DEFAULT = "2026–2027";

export const STRUKTUR_DEFAULT = `Penasehat | Idt Monica Selvia
# Bidang Kependetaan | Ev. Kalvin Erick
- Ibadah | Ferdian & Ev. Fransiska
- Koor & Musik | Ev. Anastasia
# Bidang Pendidikan | Ev. Hengky So
- Laskar Kristus | Arjuna
- Sekolah Minggu | Gracia & Ev. Anny Yuliana
- Youth & Teen | Jhonny
# Bidang Administrasi | Ev. Anny Yuliana
- Pembangunan | Jacky Senjaya
- Sekretariat Umum | Ev. Annastasia
- Keuangan | Gracia Putri Laia
# Bidang Moral Etika | Rachel & Fransiska
- Pernikahan & Kedukaan | Ev. Salidjan
- Kunjungan Jemaat | Dc. Silvia & Bp. Yosua
- Rumah Tangga | Natalia & Prely`;

export type SubUnit = { nama: string; pengurus: string };
export type UnitStruktur = {
  nama: string;
  pengurus: string;
  bidang: boolean; // true = bidang utama (punya sub-unit)
  sub: SubUnit[];
};

export function parseStruktur(teks: string): UnitStruktur[] {
  const hasil: UnitStruktur[] = [];
  for (const barisMentah of teks.split("\n")) {
    const baris = barisMentah.trim();
    if (!baris) continue;
    const isBidang = baris.startsWith("#");
    const isSub = baris.startsWith("-");
    const [nama, pengurus] = baris
      .replace(/^[#-]\s*/, "")
      .split("|")
      .map((x) => (x ?? "").trim());
    if (!nama) continue;
    if (isSub && hasil.length > 0) {
      hasil[hasil.length - 1].sub.push({ nama, pengurus: pengurus ?? "" });
    } else {
      hasil.push({
        nama,
        pengurus: pengurus ?? "",
        bidang: isBidang,
        sub: [],
      });
    }
  }
  return hasil;
}

export async function getStruktur(): Promise<{
  periode: string;
  unit: UnitStruktur[];
}> {
  const [teks, periode] = await Promise.all([
    getPengaturan("struktur_teks"),
    getPengaturan("struktur_periode"),
  ]);
  return {
    periode: periode || STRUKTUR_PERIODE_DEFAULT,
    unit: parseStruktur(teks || STRUKTUR_DEFAULT),
  };
}

// ——— Foto pengurus ———
// Foto per unit (Koordinator, Penasehat, tiap bidang) yang diunggah dari
// panel admin. Kunci pencocokan: nama unit (huruf kecil).

export type FotoPengurus = { id: string; unit: string; url: string };

export async function getDaftarFotoPengurus(): Promise<FotoPengurus[]> {
  if (!supabaseSiap()) return [];
  const { data, error } = await supabaseServer()
    .from("foto_pengurus")
    .select("id, unit, url")
    .order("unit");
  if (error || !data) return [];
  return data as FotoPengurus[];
}

export async function getFotoPengurus(): Promise<Record<string, string>> {
  const daftar = await getDaftarFotoPengurus();
  const peta: Record<string, string> = {};
  for (const f of daftar) peta[f.unit.toLowerCase()] = f.url;
  return peta;
}

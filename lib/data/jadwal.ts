// Data jadwal ibadah mingguan.
// Nanti bila pindah ke Supabase: ganti isi getJadwal() dengan query,
// tipe JadwalItem tetap sama sehingga komponen tidak perlu diubah.

export type JadwalItem = {
  hari: string;
  kegiatan: string;
  jam: string;
  keterangan?: string;
};

const jadwal: JadwalItem[] = [
  { hari: "Senin–Sabtu", kegiatan: "Doa Pagi / Baca Alkitab", jam: "05:00" },
  { hari: "Rabu", kegiatan: "Ibadah Doa Tengah Minggu", jam: "19:00" },
  { hari: "Sabtu", kegiatan: "Persiapan Ibadah Hari Tuhan", jam: "19:00" },
  { hari: "Minggu", kegiatan: "Ibadah Hari Tuhan", jam: "08:00" },
  { hari: "Minggu", kegiatan: "Koor", jam: "12:00" },
  { hari: "Minggu", kegiatan: "Berea Academy", jam: "14:00" },
  { hari: "Minggu", kegiatan: "Lecture", jam: "19:00" },
];

export async function getJadwal(): Promise<JadwalItem[]> {
  return jadwal;
}

// Ringkasan untuk section preview di Beranda.
export async function getJadwalUtama(): Promise<JadwalItem[]> {
  return [jadwal[3], jadwal[1], jadwal[5], jadwal[0]];
}

export type Guest = {
  id: string;
  nama: string;
  slug: string;
  jumlah_tamu_max: number;
};

export type RsvpStatus = "hadir" | "tidak_hadir";

// Konfirmasi yang sudah pernah dikirim tamu (untuk mengisi ulang formulir)
export type RsvpAwal = {
  status: RsvpStatus;
  jumlah_hadir: number;
  catatan: string | null;
} | null;

// Satu baris hasil fungsi get_undangan(slug)
export type UndanganRow = Guest & {
  rsvp_status: RsvpStatus | null;
  rsvp_jumlah_hadir: number | null;
  rsvp_catatan: string | null;
};

// Satu baris hasil fungsi admin_rekap(password)
export type RekapRow = Guest & {
  status: RsvpStatus | null;
  jumlah_hadir: number | null;
  catatan: string | null;
  waktu_konfirmasi: string | null;
};

export type Ucapan = {
  id: string;
  nama: string;
  pesan: string;
  created_at: string;
};

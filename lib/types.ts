export type Guest = {
  id: string;
  nama: string;
  slug: string;
  jumlah_tamu_max: number;
};

export type RsvpStatus = "hadir" | "tidak_hadir";

export type Rsvp = {
  id: string;
  guest_id: string;
  status: RsvpStatus;
  jumlah_hadir: number;
  catatan: string | null;
  created_at: string;
};

export type Ucapan = {
  id: string;
  nama: string;
  pesan: string;
  created_at: string;
};

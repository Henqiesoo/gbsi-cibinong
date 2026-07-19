-- Skema database GBSI Cibinong.
-- Jalankan SEKALI di Supabase: buka SQL Editor → tempel seluruh isi file
-- ini → Run. Aman dijalankan ulang (idempotent).

-- ——— Tabel konten ———

create table if not exists renungan (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  judul text not null,
  tanggal date not null,
  ayat text,
  kutipan_ayat text,
  cuplikan text not null,
  thumbnail text,
  isi jsonb not null default '[]'::jsonb,
  atribusi text,
  created_at timestamptz not null default now()
);

create table if not exists galeri (
  id uuid primary key default gen_random_uuid(),
  kategori text not null check (kategori in ('ibadah', 'acara', 'fasilitas')),
  alt text not null,
  url text not null,
  created_at timestamptz not null default now()
);

create table if not exists jadwal (
  id uuid primary key default gen_random_uuid(),
  hari text not null,
  kegiatan text not null,
  jam text not null,
  urutan integer not null default 0
);

create table if not exists jadwal_tugas (
  id uuid primary key default gen_random_uuid(),
  judul text not null,
  url text not null,
  created_at timestamptz not null default now()
);

create table if not exists pengaturan (
  kunci text primary key,
  nilai text not null
);

create table if not exists acara (
  id uuid primary key default gen_random_uuid(),
  judul text not null,
  tema text,
  tanggal date not null,
  poster text,
  created_at timestamptz not null default now()
);

create table if not exists foto_pengurus (
  id uuid primary key default gen_random_uuid(),
  nama text unique not null,
  url text not null,
  created_at timestamptz not null default now()
);

create table if not exists musik (
  id uuid primary key default gen_random_uuid(),
  judul text not null,
  url text not null,
  created_at timestamptz not null default now()
);

create table if not exists surat_gembala (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  judul text not null,
  tanggal date not null,
  isi jsonb not null default '[]'::jsonb,
  gambar text,
  created_at timestamptz not null default now()
);

-- Statistik pengunjung (anonim): wilayah perkiraan dari jaringan
-- internet pengunjung + halaman yang dibuka. Tanpa data pribadi.
create table if not exists kunjungan (
  id uuid primary key default gen_random_uuid(),
  sesi text not null,
  path text not null,
  negara text,
  wilayah text,
  kota text,
  created_at timestamptz not null default now()
);

create index if not exists kunjungan_created_at_idx
  on kunjungan (created_at);

-- ——— Keamanan ———
-- RLS diaktifkan tanpa policy publik: tabel hanya bisa diakses lewat
-- server (service role) — yaitu melalui panel admin berpassword.

alter table renungan enable row level security;
alter table galeri enable row level security;
alter table jadwal enable row level security;
alter table jadwal_tugas enable row level security;
alter table pengaturan enable row level security;
alter table acara enable row level security;
alter table surat_gembala enable row level security;
alter table foto_pengurus enable row level security;
alter table musik enable row level security;
alter table kunjungan enable row level security;

-- ——— Storage ———
-- Bucket "publik" untuk semua file (foto galeri, hero, thumbnail
-- renungan, jadwal tugas). Boleh dibaca siapa saja; penulisan hanya
-- lewat service role (panel admin).

insert into storage.buckets (id, name, public)
values ('publik', 'publik', true)
on conflict (id) do nothing;

-- ——— Jadwal ibadah awal (sesuai jadwal statis website) ———

insert into jadwal (hari, kegiatan, jam, urutan)
select * from (values
  ('Senin–Sabtu', 'Doa Pagi / Baca Alkitab', '05:00', 0),
  ('Rabu', 'Ibadah Doa Tengah Minggu', '19:00', 1),
  ('Sabtu', 'Persiapan Ibadah Hari Tuhan', '19:00', 2),
  ('Minggu', 'Ibadah Hari Tuhan', '08:00', 3),
  ('Minggu', 'Koor', '12:00', 4),
  ('Minggu', 'Berea Academy', '14:00', 5),
  ('Minggu', 'Lecture', '19:00', 6)
) as v(hari, kegiatan, jam, urutan)
where not exists (select 1 from jadwal);

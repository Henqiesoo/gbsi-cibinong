-- =====================================================================
-- Schema Supabase untuk Undangan Pernikahan Digital
-- Jalankan seluruh file ini di: Supabase Dashboard -> SQL Editor -> Run
-- =====================================================================

-- Tabel daftar tamu (satu baris = satu link undangan personal)
create table if not exists public.guests (
  id uuid primary key default gen_random_uuid(),
  nama text not null,
  slug text not null unique,
  jumlah_tamu_max int not null default 2,
  created_at timestamptz not null default now()
);

-- Tabel konfirmasi kehadiran (RSVP), satu konfirmasi per tamu
create table if not exists public.rsvp (
  id uuid primary key default gen_random_uuid(),
  guest_id uuid not null references public.guests (id) on delete cascade,
  status text not null check (status in ('hadir', 'tidak_hadir')),
  jumlah_hadir int not null default 1,
  catatan text,
  created_at timestamptz not null default now(),
  unique (guest_id)
);

-- Tabel ucapan & doa
create table if not exists public.ucapan (
  id uuid primary key default gen_random_uuid(),
  nama text not null,
  pesan text not null,
  created_at timestamptz not null default now()
);

-- =====================================================================
-- Row Level Security
-- Prinsip: pengunjung (anon key) hanya bisa membaca guests & ucapan,
-- mengirim RSVP & ucapan. Rekap RSVP hanya dibaca lewat service role
-- (panel admin di server), tidak pernah dari browser.
-- =====================================================================

alter table public.guests enable row level security;
alter table public.rsvp enable row level security;
alter table public.ucapan enable row level security;

-- Tamu: publik boleh baca (untuk resolve slug -> nama)
create policy "guests_select_public"
  on public.guests for select
  to anon, authenticated
  using (true);

-- RSVP: publik boleh insert & update konfirmasinya (upsert per guest_id)
create policy "rsvp_insert_public"
  on public.rsvp for insert
  to anon, authenticated
  with check (status in ('hadir', 'tidak_hadir') and jumlah_hadir between 0 and 20);

create policy "rsvp_update_public"
  on public.rsvp for update
  to anon, authenticated
  using (true)
  with check (status in ('hadir', 'tidak_hadir') and jumlah_hadir between 0 and 20);

-- RSVP: publik boleh baca miliknya (dibutuhkan agar upsert bisa mengembalikan baris)
create policy "rsvp_select_public"
  on public.rsvp for select
  to anon, authenticated
  using (true);

-- Ucapan: publik boleh baca & kirim
create policy "ucapan_select_public"
  on public.ucapan for select
  to anon, authenticated
  using (true);

create policy "ucapan_insert_public"
  on public.ucapan for insert
  to anon, authenticated
  with check (char_length(nama) between 1 and 100 and char_length(pesan) between 1 and 500);

-- =====================================================================
-- Realtime untuk wall ucapan
-- =====================================================================
alter publication supabase_realtime add table public.ucapan;

-- =====================================================================
-- Contoh data tamu (hapus / sesuaikan)
-- Link undangan: https://domain-anda.vercel.app/invite/<slug>
-- =====================================================================
insert into public.guests (nama, slug, jumlah_tamu_max) values
  ('Bapak Budi Santoso & Keluarga', 'budi-santoso', 4),
  ('Ibu Sari Dewi', 'sari-dewi', 2),
  ('Andi Wijaya', 'andi-wijaya', 1)
on conflict (slug) do nothing;

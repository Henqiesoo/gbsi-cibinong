-- =====================================================================
-- Schema Supabase untuk Undangan Pernikahan Digital
-- Jalankan seluruh file ini di: Supabase Dashboard -> SQL Editor -> Run
--
-- Prinsip keamanan:
--   Tabel `guests` dan `rsvp` TIDAK dapat diakses langsung memakai anon key
--   (tidak ada policy publik). Browser hanya bisa lewat fungsi RPC di bawah,
--   sehingga daftar tamu maupun rekap RSVP tidak bisa diunduh sembarangan.
--   Tabel `ucapan` memang publik karena isinya tampil untuk semua tamu.
-- =====================================================================

create extension if not exists pgcrypto with schema extensions;

-- ---------------------------------------------------------------------
-- Tabel
-- ---------------------------------------------------------------------

-- Daftar tamu (satu baris = satu link undangan personal)
create table if not exists public.guests (
  id uuid primary key default gen_random_uuid(),
  nama text not null,
  slug text not null unique,
  jumlah_tamu_max int not null default 2,
  created_at timestamptz not null default now()
);

-- Konfirmasi kehadiran, satu konfirmasi per tamu
create table if not exists public.rsvp (
  id uuid primary key default gen_random_uuid(),
  guest_id uuid not null references public.guests (id) on delete cascade,
  status text not null check (status in ('hadir', 'tidak_hadir')),
  jumlah_hadir int not null default 1,
  catatan text,
  created_at timestamptz not null default now(),
  unique (guest_id)
);

-- Ucapan & doa
create table if not exists public.ucapan (
  id uuid primary key default gen_random_uuid(),
  nama text not null,
  pesan text not null,
  created_at timestamptz not null default now()
);

-- Password panel admin, disimpan sebagai hash bcrypt
create table if not exists public.admin_config (
  id int primary key default 1,
  password_hash text not null,
  -- Token sesi acak; ditukar dengan password saat login lalu disimpan
  -- sebagai cookie httpOnly oleh server Next.js
  session_token text not null default encode(extensions.gen_random_bytes(32), 'hex'),
  updated_at timestamptz not null default now(),
  constraint admin_config_tunggal check (id = 1)
);

-- ---------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------
alter table public.guests enable row level security;
alter table public.rsvp enable row level security;
alter table public.ucapan enable row level security;
alter table public.admin_config enable row level security;

-- guests, rsvp, admin_config: tanpa policy publik (akses hanya lewat RPC)

-- ucapan: wall publik — semua orang boleh baca & kirim
drop policy if exists "ucapan_select_public" on public.ucapan;
create policy "ucapan_select_public"
  on public.ucapan for select
  to anon, authenticated
  using (true);

drop policy if exists "ucapan_insert_public" on public.ucapan;
create policy "ucapan_insert_public"
  on public.ucapan for insert
  to anon, authenticated
  with check (char_length(nama) between 1 and 100 and char_length(pesan) between 1 and 500);

-- Realtime untuk wall ucapan
do $$
begin
  alter publication supabase_realtime add table public.ucapan;
exception
  when duplicate_object then null;
end;
$$;

-- ---------------------------------------------------------------------
-- Fungsi: buka satu undangan berdasarkan slug (+ RSVP yang sudah ada)
-- ---------------------------------------------------------------------
create or replace function public.get_undangan(p_slug text)
returns table (
  id uuid,
  nama text,
  slug text,
  jumlah_tamu_max int,
  rsvp_status text,
  rsvp_jumlah_hadir int,
  rsvp_catatan text
)
language sql
security definer
set search_path = public
as $$
  select g.id, g.nama, g.slug, g.jumlah_tamu_max,
         r.status, r.jumlah_hadir, r.catatan
  from public.guests g
  left join public.rsvp r on r.guest_id = g.id
  where g.slug = p_slug
  limit 1;
$$;

-- ---------------------------------------------------------------------
-- Fungsi: kirim / perbarui konfirmasi kehadiran
-- ---------------------------------------------------------------------
create or replace function public.kirim_rsvp(
  p_guest_id uuid,
  p_status text,
  p_jumlah_hadir int,
  p_catatan text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_max int;
begin
  if p_status not in ('hadir', 'tidak_hadir') then
    raise exception 'Status kehadiran tidak valid';
  end if;

  select jumlah_tamu_max into v_max from public.guests where id = p_guest_id;
  if v_max is null then
    raise exception 'Tamu tidak ditemukan';
  end if;

  insert into public.rsvp (guest_id, status, jumlah_hadir, catatan)
  values (
    p_guest_id,
    p_status,
    case
      when p_status = 'hadir' then least(greatest(coalesce(p_jumlah_hadir, 1), 1), v_max)
      else 0
    end,
    nullif(btrim(coalesce(left(p_catatan, 300), '')), '')
  )
  on conflict (guest_id) do update
    set status = excluded.status,
        jumlah_hadir = excluded.jumlah_hadir,
        catatan = excluded.catatan,
        created_at = now();
end;
$$;

-- ---------------------------------------------------------------------
-- Fungsi: verifikasi password admin (internal, tidak dibuka ke anon)
-- ---------------------------------------------------------------------
create or replace function public.cek_admin(p_password text)
returns boolean
language sql
security definer
set search_path = public, extensions
as $$
  select exists (
    select 1 from public.admin_config
    where password_hash = extensions.crypt(coalesce(p_password, ''), password_hash)
  );
$$;

-- ---------------------------------------------------------------------
-- Fungsi: login admin — tukar password dengan token sesi
-- ---------------------------------------------------------------------
create or replace function public.admin_login(p_password text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_token text;
begin
  if not public.cek_admin(p_password) then
    -- Jeda kecil untuk memperlambat percobaan tebak password
    perform pg_sleep(0.4);
    raise exception 'Password salah' using errcode = '28000';
  end if;
  select session_token into v_token from public.admin_config where id = 1;
  return v_token;
end;
$$;

-- ---------------------------------------------------------------------
-- Fungsi: verifikasi token sesi dari cookie
-- ---------------------------------------------------------------------
create or replace function public.admin_cek_sesi(p_token text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_config
    where id = 1
      and length(coalesce(p_token, '')) > 0
      and session_token = p_token
  );
$$;

-- ---------------------------------------------------------------------
-- Fungsi: rekap RSVP untuk panel admin
-- ---------------------------------------------------------------------
create or replace function public.admin_rekap(p_token text)
returns table (
  id uuid,
  nama text,
  slug text,
  jumlah_tamu_max int,
  status text,
  jumlah_hadir int,
  catatan text,
  waktu_konfirmasi timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.admin_cek_sesi(p_token) then
    raise exception 'Sesi admin tidak sah' using errcode = '28000';
  end if;

  return query
    select g.id, g.nama, g.slug, g.jumlah_tamu_max,
           r.status, r.jumlah_hadir, r.catatan, r.created_at
    from public.guests g
    left join public.rsvp r on r.guest_id = g.id
    order by g.created_at desc;
end;
$$;

-- ---------------------------------------------------------------------
-- Fungsi: tambah tamu dari panel admin (slug otomatis & unik)
-- ---------------------------------------------------------------------
create or replace function public.admin_tambah_tamu(
  p_token text,
  p_nama text,
  p_jumlah_tamu_max int
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_nama text := btrim(coalesce(p_nama, ''));
  v_dasar text;
  v_slug text;
  v_n int := 0;
begin
  if not public.admin_cek_sesi(p_token) then
    raise exception 'Sesi admin tidak sah' using errcode = '28000';
  end if;
  if v_nama = '' then
    raise exception 'Nama tamu wajib diisi';
  end if;

  -- Nama -> slug: huruf kecil, tanpa tanda baca, spasi jadi tanda hubung
  v_dasar := left(regexp_replace(regexp_replace(lower(v_nama), '[^a-z0-9\s-]', '', 'g'), '[\s-]+', '-', 'g'), 50);
  v_dasar := btrim(v_dasar, '-');
  if v_dasar = '' then
    v_dasar := 'tamu';
  end if;

  v_slug := v_dasar;
  while exists (select 1 from public.guests where slug = v_slug) loop
    v_n := v_n + 1;
    v_slug := v_dasar || '-' || v_n;
  end loop;

  insert into public.guests (nama, slug, jumlah_tamu_max)
  values (v_nama, v_slug, least(greatest(coalesce(p_jumlah_tamu_max, 2), 1), 20));

  return v_slug;
end;
$$;

-- ---------------------------------------------------------------------
-- Hak akses fungsi: cabut default PUBLIC, beri hanya yang diperlukan
-- ---------------------------------------------------------------------
revoke execute on function public.get_undangan(text) from public;
revoke execute on function public.kirim_rsvp(uuid, text, int, text) from public;
revoke execute on function public.cek_admin(text) from public;
revoke execute on function public.admin_login(text) from public;
revoke execute on function public.admin_cek_sesi(text) from public;
revoke execute on function public.admin_rekap(text) from public;
revoke execute on function public.admin_tambah_tamu(text, text, int) from public;

-- Supabase memasang default privileges yang otomatis memberi EXECUTE ke
-- anon/authenticated untuk setiap fungsi baru di schema public, jadi revoke
-- dari PUBLIC saja tidak cukup untuk fungsi internal.
revoke execute on function public.cek_admin(text) from anon, authenticated;

grant execute on function public.get_undangan(text) to anon, authenticated;
grant execute on function public.kirim_rsvp(uuid, text, int, text) to anon, authenticated;
grant execute on function public.admin_login(text) to anon, authenticated;
grant execute on function public.admin_cek_sesi(text) to anon, authenticated;
grant execute on function public.admin_rekap(text) to anon, authenticated;
grant execute on function public.admin_tambah_tamu(text, text, int) to anon, authenticated;

-- ---------------------------------------------------------------------
-- WAJIB: set password panel admin (/admin).
-- Password disimpan sebagai hash bcrypt di database — tidak perlu ditaruh di
-- environment variable maupun di dalam kode. Untuk menggantinya di kemudian
-- hari, jalankan ulang perintah ini dengan password baru.
-- ---------------------------------------------------------------------
insert into public.admin_config (id, password_hash)
values (1, extensions.crypt('ganti-password-rahasia', extensions.gen_salt('bf', 10)))
on conflict (id) do update
  set password_hash = excluded.password_hash, updated_at = now();

-- ---------------------------------------------------------------------
-- Contoh data tamu — hapus / sesuaikan sesuai daftar undangan Anda.
-- Link undangan: https://domain-anda.vercel.app/invite/<slug>
-- ---------------------------------------------------------------------
insert into public.guests (nama, slug, jumlah_tamu_max) values
  ('Bapak Budi Santoso & Keluarga', 'budi-santoso', 4),
  ('Ibu Sari Dewi', 'sari-dewi', 2),
  ('Sdr. Andi Wijaya', 'andi-wijaya', 1)
on conflict (slug) do nothing;

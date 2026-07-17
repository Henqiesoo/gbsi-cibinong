# 💐 Undangan Pernikahan Digital

Website undangan pernikahan digital — **Next.js 14 (App Router) + Tailwind CSS + Supabase**, siap deploy ke **Vercel**. Mobile-first (dioptimalkan untuk tamu yang membuka dari WhatsApp di HP).

## ✨ Fitur

- **Cover personal per tamu** via URL slug — `/invite/[slug]`, nama tamu diambil dari tabel `guests`
- **Countdown timer** menuju tanggal acara
- **Detail acara** akad & resepsi: tanggal, waktu, lokasi + embed Google Maps
- **Galeri foto** grid responsif dengan lightbox (navigasi swipe/panah/keyboard)
- **RSVP** — konfirmasi hadir/tidak + jumlah tamu, tersimpan ke tabel `rsvp` (bisa diubah ulang)
- **Wall ucapan & doa** — realtime via Supabase Realtime
- **Amplop digital** — nomor rekening dengan tombol salin + QRIS
- **Panel admin** di `/admin` (dilindungi password): rekap RSVP, statistik kehadiran, tambah tamu + salin link undangan, export CSV

Tema warna: **Sage Green · Cream · Champagne Gold** — font serif *Playfair Display* & script *Great Vibes* untuk nama pasangan.

## 🚀 Setup

### 1. Siapkan Supabase

1. Buat project baru di [supabase.com](https://supabase.com)
2. Buka **SQL Editor**, salin seluruh isi [`supabase/schema.sql`](supabase/schema.sql), lalu **Run**.
   Ini membuat tabel `guests`, `rsvp`, `ucapan` beserta RLS policy, mengaktifkan realtime untuk `ucapan`, dan mengisi 3 tamu contoh.
3. Catat kredensial dari **Project Settings → API**:
   - `Project URL`
   - `anon public` key
   - `service_role` key (rahasia — hanya untuk server)

### 2. Konfigurasi environment

```bash
cp .env.example .env.local
```

Isi `.env.local`:

| Variabel | Keterangan |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (dipakai panel admin & export CSV di server) |
| `ADMIN_PASSWORD` | Password login `/admin` |

### 3. Sesuaikan data pernikahan

Semua data (nama pasangan, orang tua, tanggal, lokasi & embed Google Maps, rekening, ayat) ada di **satu file**: [`lib/wedding-config.ts`](lib/wedding-config.ts).

- **Foto galeri**: ganti file placeholder di `public/gallery/` dengan foto asli (lalu sesuaikan daftar `gallery` di config).
- **QRIS**: ganti `public/qris.svg` dengan gambar QRIS asli (mis. `qris.jpg`, lalu ubah `gift.qrisImage`).
- **Embed Google Maps**: buka Google Maps → Share → Embed a map → salin URL `src` iframe ke `mapsEmbedUrl`.

### 4. Jalankan lokal

```bash
npm install
npm run dev
```

Buka:

- `http://localhost:3000` — undangan umum (tanpa nama tamu)
- `http://localhost:3000/invite/budi-santoso` — contoh undangan personal
- `http://localhost:3000/admin` — panel admin

## ☁️ Deploy ke Vercel

1. Push repo ini ke GitHub
2. Di [vercel.com](https://vercel.com) → **Add New Project** → import repo (framework otomatis terdeteksi: Next.js)
3. Tambahkan **Environment Variables** (keempat variabel di atas) di pengaturan project
4. **Deploy** 🎉

## 📱 Membagikan undangan via WhatsApp

Tambah tamu dari panel `/admin` (atau via SQL), lalu klik **Salin link**. Contoh pesan:

```
Kepada Yth. Bapak Budi Santoso & Keluarga

Dengan memohon rahmat Tuhan YME, kami mengundang
Bapak/Ibu ke acara pernikahan kami:

✨ Raka & Nadia ✨
Sabtu, 12 September 2026

Buka undangan lengkap di sini:
https://domain-anda.vercel.app/invite/budi-santoso

Merupakan suatu kehormatan apabila
Bapak/Ibu berkenan hadir. 🙏
```

## 🗂 Skema Database

```
guests : id, nama, slug (unique), jumlah_tamu_max, created_at
rsvp   : id, guest_id (FK, unique), status (hadir/tidak_hadir), jumlah_hadir, catatan, created_at
ucapan : id, nama, pesan, created_at
```

Keamanan: RLS aktif — browser (anon key) hanya bisa membaca `guests`/`ucapan` dan mengirim RSVP/ucapan. Rekap RSVP dibaca lewat service role key di server (panel admin), tidak pernah diekspos ke browser.

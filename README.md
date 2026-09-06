# 💍 Undangan Pernikahan Digital — Jonny & Veren

Website undangan pernikahan digital: **Next.js 14 (App Router) + Tailwind CSS + Supabase**, siap deploy ke **Vercel**. Dirancang mobile-first karena mayoritas tamu membukanya dari WhatsApp di HP.

> Data di dalam repo ini (nama lengkap, tanggal, alamat, rekening, kisah) adalah **contoh** untuk demo. Semuanya diganti dari satu file: [`lib/wedding-config.ts`](lib/wedding-config.ts).

## ✨ Fitur

| Fitur | Keterangan |
|---|---|
| **Cover personal** | `/invite/[slug]` — nama tamu diambil dari tabel `guests` |
| **Countdown** | Hitung mundur ke hari-H + tombol simpan ke Google Calendar |
| **Detail acara** | Pemberkatan & resepsi: tanggal, jam, dress code, embed Google Maps |
| **Perjalanan kami** | Linimasa kisah pasangan |
| **Galeri** | Grid mozaik + lightbox (geser di HP, panah/keyboard di desktop) |
| **RSVP** | Hadir / berhalangan + jumlah tamu + catatan, tersimpan ke tabel `rsvp` |
| **Ucapan & doa** | Kirim pesan + daftar realtime dari tabel `ucapan` |
| **Amplop digital** | Rekening dengan tombol salin, QRIS, alamat kirim hadiah |
| **Musik latar** | Canon in D (Pachelbel) dengan tombol putar/berhenti mengambang |
| **Panel admin** | `/admin` berpassword: statistik, rekap RSVP, tambah tamu, export CSV |

Tema: **sage green · ivory · champagne gold**, font serif *Cormorant Garamond* dan skrip *Parisienne* untuk nama pasangan.

## 🚀 Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka:

- `http://localhost:3000` — undangan versi umum
- `http://localhost:3000/invite/hengky-pianister` — contoh undangan personal
- `http://localhost:3000/admin` — panel admin

Repo ini sudah berisi kredensial **publik** project Supabase demo di [`lib/supabase/config.ts`](lib/supabase/config.ts), jadi tidak perlu konfigurasi apa pun untuk mencoba. Kunci `anon` memang dirancang publik — pengamanannya bertumpu pada Row Level Security dan fungsi RPC di database, bukan pada kerahasiaan kunci.

## 🔧 Memakai project Supabase sendiri

1. Buat project di [supabase.com](https://supabase.com)
2. Buka **SQL Editor**, jalankan seluruh isi [`supabase/schema.sql`](supabase/schema.sql). Sebelum menjalankan, ganti `ganti-password-rahasia` di bagian bawah file dengan password panel admin yang Anda inginkan.
3. Salin `.env.example` menjadi `.env.local`, isi `NEXT_PUBLIC_UNDANGAN_SUPABASE_URL` dan `NEXT_PUBLIC_UNDANGAN_SUPABASE_ANON_KEY` dari **Project Settings → API**

Tidak ada service role key dan tidak ada password di environment variable.

## 🎨 Menyesuaikan isi undangan

Semua di [`lib/wedding-config.ts`](lib/wedding-config.ts): nama pasangan, orang tua, Instagram, tanggal, lokasi + link Google Maps, dress code, linimasa kisah, daftar foto galeri, rekening, QRIS, dan ayat.

- **Foto** — taruh di `public/photos/`, lalu sesuaikan daftar `gallery`, `coverPhoto`, `heroPhoto`, serta `photo` masing-masing mempelai.
- **QRIS** — ganti `public/qris.svg` dengan gambar QRIS asli.
- **Embed Maps** — Google Maps → Share → Embed a map → salin URL di atribut `src` ke `mapsEmbedUrl`.
- **Musik** — ganti `public/music/canon-in-d.mp3`, atau hasilkan ulang dengan `node scripts/generate-music.mjs` (file itu mensintesis Canon in D karya Pachelbel, domain publik, jadi tidak ada masalah hak cipta).

## ☁️ Deploy ke Vercel

1. Push repo ke GitHub
2. [vercel.com](https://vercel.com) → **Add New Project** → import repo (Next.js terdeteksi otomatis)
3. **Deploy** — tanpa environment variable pun langsung jalan memakai project Supabase demo

Bila memakai Supabase sendiri, tambahkan `NEXT_PUBLIC_UNDANGAN_SUPABASE_URL` dan `NEXT_PUBLIC_UNDANGAN_SUPABASE_ANON_KEY` di **Settings → Environment Variables**. Awalan `UNDANGAN_` dipakai agar tidak bentrok dengan variabel Supabase milik website lain yang berbagi project Vercel yang sama.

## 📱 Membagikan undangan lewat WhatsApp

Tambah tamu di `/admin`, klik **Salin link**, lalu kirim:

```
Kepada Yth. Bapak/Ibu Budi Santoso & Keluarga

Dengan memohon berkat Tuhan Yang Maha Kuasa,
kami mengundang Bapak/Ibu ke pernikahan kami:

✨ Jonny & Veren ✨
Sabtu, 15 Mei 2027

Undangan lengkap:
https://domain-anda.vercel.app/invite/budi-santoso

Merupakan suatu kehormatan bila Bapak/Ibu
berkenan hadir dan memberikan doa restu. 🙏
```

## 🔐 Model keamanan

Tabel `guests` dan `rsvp` **tidak punya policy publik** — memakai anon key dari browser, keduanya mengembalikan nol baris. Semua akses lewat fungsi `SECURITY DEFINER`:

| Fungsi | Hak akses | Kegunaan |
|---|---|---|
| `get_undangan(slug)` | anon | Buka **satu** undangan sesuai slug — daftar tamu tidak bisa diunduh borongan |
| `kirim_rsvp(...)` | anon | Kirim/ubah RSVP; status divalidasi, `jumlah_hadir` dibatasi `jumlah_tamu_max` |
| `admin_login(password)` | anon | Tukar password dengan token sesi (bcrypt, ada jeda anti tebak) |
| `admin_cek_sesi(token)` | anon | Verifikasi cookie sesi |
| `admin_rekap(token)` | anon | Rekap RSVP — hanya jalan dengan token sesi sah |
| `admin_tambah_tamu(token, ...)` | anon | Tambah tamu + slug otomatis unik |
| `cek_admin(password)` | **ditolak** | Internal saja, tidak bisa dipanggil dari luar |

Password admin disimpan sebagai **hash bcrypt** di tabel `admin_config`; token sesi disimpan sebagai cookie **httpOnly**. Tabel `ucapan` sengaja terbuka untuk publik karena isinya memang ditampilkan ke semua tamu (dengan batas panjang nama 100 dan pesan 500 karakter).

## 🗂 Skema database

```
guests       : id, nama, slug (unique), jumlah_tamu_max, created_at
rsvp         : id, guest_id (FK, unique), status (hadir/tidak_hadir),
               jumlah_hadir, catatan, created_at
ucapan       : id, nama, pesan, created_at
admin_config : id, password_hash (bcrypt), session_token, updated_at
```

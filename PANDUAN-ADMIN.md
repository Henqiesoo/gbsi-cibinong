# Panduan Panel Admin — Website GBSI Cibinong

Panduan singkat untuk pengurus gereja. Tidak perlu keahlian teknis —
semua pengelolaan dilakukan lewat browser.

## Masuk ke panel

1. Buka `https://<alamat-website>/admin` (contoh:
   `https://gbsi-cibinong.vercel.app/admin`)
2. Masukkan password admin yang diberikan pengelola website
3. Selesai — sesi login bertahan 30 hari di perangkat tersebut

> Password diatur lewat environment variable `ADMIN_PASSWORD` di Vercel.
> Untuk mengganti password: ubah nilainya di Vercel → deploy ulang.
> Semua sesi lama otomatis keluar saat password diganti.

## Apa saja yang bisa dikelola

| Menu | Fungsi |
|---|---|
| **Tema Tahunan** | Ganti teks tema yang tampil besar di halaman depan (tiap awal tahun) + poster tema (opsional). Moto "Mari Roh Jiwaku, Kembalilah kepada Firman!" di footer tidak ikut berubah. |
| **Acara & Seminar** | Umumkan acara dengan tanggal, tema, dan poster. Acara mendatang tampil di Beranda & halaman Acara; yang sudah lewat otomatis masuk Arsip. |
| **Surat Gembala** | Tulis surat gembala — ketik manual atau baca otomatis dari foto surat (OCR). Jemaat bisa mengunduh PDF-nya (berwatermark). |
| **Renungan** | Tulis renungan baru, edit, atau hapus. Paragraf dipisah baris kosong; thumbnail bisa diunggah. |
| **Halaman Tentang** | Edit sejarah gereja, visi & misi, periode + struktur kepengurusan, foto tiap pengurus, serta foto jemaat & plakat di bagian bawah halaman. |
| **Galeri** | Unggah foto ke kategori Ibadah & Pujian / Persekutuan & Acara / Fasilitas, atau hapus foto. |
| **Foto Beranda** | Ganti foto besar di halaman depan (disarankan foto melebar, ≥1600px). |
| **Jadwal Ibadah** | Ubah jadwal kegiatan mingguan (format: `Hari \| Kegiatan \| Jam`, satu baris per kegiatan). |
| **Jadwal Tugas** | Unggah gambar jadwal tugas pelayanan. Tampil di halaman Jadwal Ibadah dan bisa diunduh jemaat — file otomatis diberi watermark saat diunggah. |
| **Musik Latar** | Unggah beberapa lagu MP3 sebagai pilihan, tandai satu yang Aktif untuk diputar di Beranda, hapus yang tidak dipakai. |

Perubahan langsung tampil di website (tanpa perlu deploy ulang).

## Penyiapan awal (sekali saja, oleh pengelola website)

1. **Supabase** — buat project gratis di [supabase.com](https://supabase.com):
   - SQL Editor → jalankan seluruh isi `supabase/schema.sql`
   - Project Settings → API → salin *Project URL* dan *service_role key*
2. **Vercel** — Project → Settings → Environment Variables, isi:
   - `NEXT_PUBLIC_SUPABASE_URL` — Project URL Supabase
   - `SUPABASE_SERVICE_ROLE_KEY` — service_role key (rahasia!)
   - `ADMIN_PASSWORD` — password panel admin (pilih yang kuat)
3. Deploy ulang. Buka `/admin` — semua menu aktif.

Sebelum Supabase tersambung, website tetap berjalan dengan konten statis
bawaan; panel admin menampilkan panduan penyiapan ini di Dasbor.

## Catatan keamanan

- Jangan bagikan `SUPABASE_SERVICE_ROLE_KEY` kepada siapa pun — kunci ini
  hanya diisi di Vercel, tidak pernah ditampilkan di browser.
- Bagikan password admin hanya kepada pengurus yang bertugas.
- Watermark developer (logo + teks) diambil dari
  `public/assets/watermark/` dan `lib/watermark.ts`.

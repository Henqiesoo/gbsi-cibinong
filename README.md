# Website GBSI Cibinong

Website Gereja Berea Sungrak Indonesia (GBSI) Cabang Cibinong.
Dibangun dengan **Next.js 14 (App Router) + TypeScript + Tailwind CSS**.
Semua konten masih statis (belum memakai database).

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## Mengganti foto placeholder dengan foto asli

Semua foto berada di `public/images/`. Saat ini berisi gambar placeholder
bergradasi teal dengan label — **cukup timpa file-nya dengan foto asli,
nama file tetap sama**, tanpa perlu mengubah kode:

| Folder | Isi | Nama file |
|---|---|---|
| `public/images/hero/` | 1 foto ruang ibadah utama (lanskap, ≥1600px) | `ibadah-utama.jpg` |
| `public/images/tentang/` | foto jemaat & plakat GBSI | `jemaat.jpg`, `plakat-gbsi.jpg` |
| `public/images/galeri/ibadah/` | foto ibadah, pujian, koor | `ibadah-01.jpg` … `ibadah-06.jpg` |
| `public/images/galeri/acara/` | foto seminar, persekutuan | `acara-01.jpg` … `acara-06.jpg` |
| `public/images/galeri/fasilitas/` | foto ruangan/venue | `fasilitas-01.jpg` … `fasilitas-04.jpg` |
| `public/images/renungan/` | thumbnail artikel renungan | `renungan-01.jpg` … `renungan-03.jpg` |

Menambah foto galeri: taruh file baru di folder kategorinya, lalu tambahkan
satu entri di `lib/data/galeri.ts`.

Bila ada placeholder yang terhapus, jalankan `npm run placeholders`
(tidak akan menimpa foto asli yang sudah ada).

## Mengedit konten

Semua teks dan data dipusatkan agar mudah diedit:

- **Kontak, alamat, WhatsApp, navigasi** → `lib/site.ts`
- **Jadwal ibadah** → `lib/data/jadwal.ts`
- **Renungan** (judul, tanggal, isi) → `lib/data/renungan.ts`
- **Daftar foto galeri** → `lib/data/galeri.ts`
- **Sejarah, Visi & Misi, struktur pelayanan** (masih placeholder,
  ditandai `TODO`) → `app/tentang/page.tsx`

## Struktur proyek

```
app/            → halaman (App Router): /, /tentang, /jadwal,
                  /renungan, /renungan/[slug], /galeri, /kontak
components/     → Navbar, Footer, Hero, CardRenungan, JadwalTable,
                  GaleriGrid (tab + lightbox), KontakForm, dst.
lib/            → data statis & info situs (siap dipindah ke Supabase)
public/images/  → semua foto
scripts/        → pembuat gambar placeholder
```

## Rencana ke depan (belum dikerjakan)

- **Supabase**: fungsi data di `lib/data/*.ts` sudah dibuat `async` dengan
  tipe yang tetap — nanti tinggal mengganti isi fungsi (mis. `getSemuaRenungan`)
  dengan query Supabase tanpa menyentuh komponen/halaman.
- **Form kontak**: saat ini meneruskan pesan lewat WhatsApp (tanpa backend).
- **Deploy**: dilakukan manual ke Vercel setelah review lokal.

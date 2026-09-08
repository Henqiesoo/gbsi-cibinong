# 💍 Undangan Pernikahan Digital — Kim Jun Lung & Song Ve Ren

Website undangan pernikahan digital: **Next.js 14 (App Router) + Tailwind CSS + Supabase**, siap deploy ke **Vercel**. Dirancang mobile-first karena mayoritas tamu membukanya dari WhatsApp di HP.

**Katalog seluruh tema:** https://gbsi-cibinong-git-claude-digital-wedding-invit-e04395-henqiesoo.vercel.app/tema

| # | Tema | Pratinjau | Format halaman | Karakter |
|---|---|---|---|---|
| 1 | **Sage & Gold** | [buka](https://gbsi-cibinong-git-claude-digital-wedding-invit-e04395-henqiesoo.vercel.app/) | **Gulir panjang** — dari atas ke bawah | Gading & sage, serif Cormorant, sudut lembut, ornamen daun |
| 2 | **Dark Luxury** | [buka](https://gbsi-cibinong-git-claude-digital-wedding-invit-e04395-henqiesoo.vercel.app/?tema=dark) | **Panel geser** — satu bagian satu layar, digeser ke samping | Hitam & emas, kapital Cinzel, ornamen art deco |
| 3 | **Floral Watercolor** | [buka](https://gbsi-cibinong-git-claude-digital-wedding-invit-e04395-henqiesoo.vercel.app/?tema=floral) | **Buku dibalik** — halaman dibalik satu per satu | Blush & mawar, Playfair + Great Vibes, foto bulat, sapuan cat air |
| 4 | **Minimalis Modern** | [buka](https://gbsi-cibinong-git-claude-digital-wedding-invit-e04395-henqiesoo.vercel.app/?tema=minimal) | **Menu aplikasi** — lima menu di bawah layar | Putih–hitam, Jost geometris, sudut tegas, garis polos |
| 5 | **Nusantara Bali** | [buka](https://gbsi-cibinong-git-claude-digital-wedding-invit-e04395-henqiesoo.vercel.app/?tema=adat) | **Lipatan** — bagian terlipat, terbuka saat disentuh | Cokelat soga & kunyit, Marcellus, foto pura Bali & pita poleng |
| 6 | **Royal Red** | [buka](https://gbsi-cibinong-git-claude-digital-wedding-invit-e04395-henqiesoo.vercel.app/?tema=royal) | **Adegan berjalan** — 13 adegan berganti sendiri seperti video | Marun & emas, Cinzel + Pinyon, lengkung gerbang pelaminan |

Tema dipilih lewat parameter `?tema=` di URL mana pun, termasuk link undangan personal — mis. `https://gbsi-cibinong-git-claude-digital-wedding-invit-e04395-henqiesoo.vercel.app/invite/rudi-hartono?tema=royal`.

### Panel admin, satu per tema

Daftar tamunya satu untuk semua tema; yang membedakan hanyalah tema apa yang menempel pada link yang disalin. Buka panel sesuai tema yang mau dikirim, lalu klik **Salin link** pada tamu yang bersangkutan — link yang tersalin sudah membawa `?tema=` yang benar. Tombol **Buka** di sebelahnya untuk memeriksanya lebih dulu.

| Tema | Panel admin |
|---|---|
| 1 Sage & Gold | [`/admin?tema=sage`](https://gbsi-cibinong-git-claude-digital-wedding-invit-e04395-henqiesoo.vercel.app/admin?tema=sage) |
| 2 Dark Luxury | [`/admin?tema=dark`](https://gbsi-cibinong-git-claude-digital-wedding-invit-e04395-henqiesoo.vercel.app/admin?tema=dark) |
| 3 Floral Watercolor | [`/admin?tema=floral`](https://gbsi-cibinong-git-claude-digital-wedding-invit-e04395-henqiesoo.vercel.app/admin?tema=floral) |
| 4 Minimalis Modern | [`/admin?tema=minimal`](https://gbsi-cibinong-git-claude-digital-wedding-invit-e04395-henqiesoo.vercel.app/admin?tema=minimal) |
| 5 Nusantara Bali | [`/admin?tema=adat`](https://gbsi-cibinong-git-claude-digital-wedding-invit-e04395-henqiesoo.vercel.app/admin?tema=adat) |
| 6 Royal Red | [`/admin?tema=royal`](https://gbsi-cibinong-git-claude-digital-wedding-invit-e04395-henqiesoo.vercel.app/admin?tema=royal) |

Pindah tema cukup lewat deretan tombol di dalam panel — tidak perlu login ulang.

Contoh undangan personal per tamu:

| Tamu | Link |
|---|---|
| Bapak Hengky Pianister & Keluarga | [`/invite/hengky-pianister`](https://gbsi-cibinong-git-claude-digital-wedding-invit-e04395-henqiesoo.vercel.app/invite/hengky-pianister) |
| Bapak Rudi Hartono & Keluarga | [`/invite/rudi-hartono`](https://gbsi-cibinong-git-claude-digital-wedding-invit-e04395-henqiesoo.vercel.app/invite/rudi-hartono) |
| Ibu Melisa Tanuwijaya | [`/invite/melisa-tanuwijaya`](https://gbsi-cibinong-git-claude-digital-wedding-invit-e04395-henqiesoo.vercel.app/invite/melisa-tanuwijaya) |
| Sdri. Clara Gunawan | [`/invite/clara-gunawan`](https://gbsi-cibinong-git-claude-digital-wedding-invit-e04395-henqiesoo.vercel.app/invite/clara-gunawan) |

> Data di dalam repo ini (nama lengkap, tanggal, alamat, rekening, kisah) adalah **contoh** untuk demo. Semuanya diganti dari satu file: [`lib/wedding-config.ts`](lib/wedding-config.ts).
>
> Foto di `public/photos/` juga **contoh** — ganti dengan foto pasangan yang bersangkutan sebelum undangan dipakai untuk acara sungguhan.

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
| **Musik latar** | Balada piano orisinal, dengan tombol putar/berhenti mengambang |
| **Galeri satu sumber** | Daftar foto ada di `lib/wedding-config.ts` — menggantinya mengganti galeri di keenam tema sekaligus |
| **Putar otomatis** | Tombol khusus untuk merekam video undangan tanpa menyentuh layar — menggulir sendiri di format gulir, berpindah panel sendiri di format lain |
| **Panel admin per tema** | `/admin?tema=<id>` berpassword: statistik, rekap RSVP, tambah/ubah/hapus tamu, export CSV. Tema yang dipilih di panel ikut menempel pada setiap link tamu yang disalin |

### 🎨 Sistem tema

Sebuah tema di sini bukan sekadar ganti warna. Setiap tema di [`lib/themes.ts`](lib/themes.ts) menentukan lima hal sekaligus:

| Aspek | Token | Contoh perbedaan |
|---|---|---|
| Palet warna | `--sage-*`, `--ivory-*`, `--gold-*` | Sage hangat vs marun royal |
| Pasangan font | `--font-display`, `--font-script`, `--font-body` | Cormorant vs Cinzel vs Jost |
| Bahasa bentuk | `--r-md`, `--r-lg`, `--r-foto` | Sudut membulat vs tegas; foto bulat vs **lengkung gerbang** |
| Tekstur latar | `--tekstur` | Sapuan cat air, kilau emas, motif batik |
| Gaya ornamen | field `ornamen` | Daun · art deco · bunga · garis · jepun Bali · gerbang |
| **Format halaman** | field `format` | Cara tamu menyusuri undangan — lihat di bawah |

#### Enam tema, enam format halaman

Yang paling membedakan satu tema dari tema lain bukan warnanya, melainkan **cara tamu menyusurinya**. Setiap tema memakai tata letak sendiri di `components/format/`, dengan urutan — bahkan pengelompokan — bagian yang berbeda:

| Format | Tema | Cara jalan | Urutan bagian |
|---|---|---|---|
| `gulir` | Sage & Gold | Halaman panjang, digulir ke bawah | Urutan klasik, sembilan bagian berurutan |
| `geser` | Dark Luxury | Digeser ke samping, satu bagian satu layar penuh, ada titik penanda & panah | Galeri dimajukan ke urutan kedua — suasana dijual lebih dulu |
| `buku` | Floral Watercolor | Halaman dibalik dengan tombol, ada animasi balik halaman & garis lipat | Urutan buku acara: kenalan → kisah → acara → ucapan → konfirmasi |
| `tab` | Minimalis Modern | Menu tetap di bawah layar, isi berganti seketika tanpa animasi | Diringkas jadi **lima menu**; mempelai & kisah menyatu ke Beranda, amplop menyatu ke RSVP |
| `lipat` | Nusantara Bali | Seluruh isi tersimpan dalam lipatan bernomor, terbuka saat disentuh | Halaman jadi pendek: pembuka + tujuh lipatan + penutup |
| `adegan` | Royal Red | Satu layar yang berganti sendiri seperti video | 13 adegan, tiga di antaranya berhenti menunggu tamu |

Tema **Nusantara Bali** memakai foto pengantin berbusana adat Bali untuk sampul, pembuka, dan galerinya sendiri (`weddingConfig.bali`), foto interior pura sebagai latar sisi kiri-kanan saat dibuka di tablet/komputer, serta pita poleng hitam-putih sebagai pemisah bagian.

Tema **Sage & Gold** mengisi sisi kiri-kanan layar lebar dengan motif ranting daun tipis, garis emas, dan ornamen yang mengapit kolom isi (`components/HiasanTepi.tsx`). Semuanya CSS + SVG sebaris — tanpa berkas gambar, tanpa pustaka tambahan — dan hanya dirender pada lebar ≥ 1024px, sehingga tampilan HP tidak berubah sama sekali.

Kelima format non-gulir punya tombol **putar otomatis** sendiri (`components/format/PutarOtomatis.tsx`): undangan berpindah panel sendiri dan menggulir isi tiap panel pelan-pelan — pengganti gulir otomatis saat merekam video.

#### Tema 6 — format adegan

Tema **Royal Red** paling jauh bedanya: satu layar penuh berisi **13 adegan yang berganti sendiri**, mengikuti alur undangan video — gerbang pelaminan, untaian bunga turun, lingkaran inisial, mempelai melangkah ke altar, lalu bingkai undangan.

- Semua latarnya **foto asli**, bukan gambar vektor. Tiap adegan digarap seperti potongan film: gerak kamera pelan (dolly maju / pan menyamping), gradasi warna hangat kemerahan, bokeh cahaya lilin, vignette, dan butiran film halus — semuanya dari CSS, tanpa berkas tambahan (`components/royal/LatarFoto.tsx`)
- Foto latar tiap adegan diatur dari satu konstanta `FOTO` di `components/CinematicInvitation.tsx`
- Bingkai ornamen emas dengan salib tetap berupa SVG — ini memang dimaksudkan sebagai *overlay* di atas foto, bukan latar
- Tiga elemennya — monogram bulat, kartu undangan, dan dua kartu rangkaian acara — memakai satu komponen bertepi foil emas (`components/royal/KartuFoil.tsx`): bingkai 3 px bergradasi emas, sapuan kilau miring, bidang dalam marun gelap dengan garis sorot, dan satu sampai dua bidang kabur di belakang sebagai bayangan bertumpuk. Satu komponen supaya gradasinya benar-benar sama di ketiganya
- Salib, sulur sudut, dan titik hias di dalam kartu digambar dua kali: bayangan gelap yang digeser turun, lalu emas bergradasi di atasnya, jadi ikut terbaca timbul
- Kartu monogram (satu-satunya) memakai kemiringan 3D ringan — maksimal 7°, mengikuti tetikus di komputer dan kemiringan perangkat di HP, murni CSS transform tanpa WebGL, dan diam bila tamu menyalakan "kurangi gerak"
- Adegan ke-4 memakai **foto asli** lorong menuju altar, supaya terasa nyata seperti undangan video pada umumnya
- Adegan isi (mempelai, acara, galeri, RSVP, amplop, ucapan) memakai **latar pelaminan yang sama** seperti adegan pembuka, bukan lembar putih; warna teksnya ditukar lewat token di satu tempat sehingga komponennya tidak perlu diubah
- Bernuansa pemberkatan Kristen: salib di puncak bingkai, ayat Kejadian 2:24
- Adegan berjalan otomatis; adegan interaktif (RSVP, amplop, ucapan) berhenti menunggu tamu dan punya tombol **Lanjut**
- Ada bilah kemajuan seperti cerita media sosial, tombol jeda, ketuk kiri/kanan, dan tombol panah keyboard
- Karena berjalan sendiri, tema ini **tidak perlu putar otomatis** untuk direkam jadi video

Komponen isi tidak pernah tahu tema apa yang aktif. Menambah tema ketujuh dengan format yang sudah ada cukup **menyalin satu objek** di `lib/themes.ts`; format baru cukup menambah satu komponen tata letak di `components/format/`. Kedua-duanya tidak menyentuh komponen isi, dan seluruh tema langsung ikut menerima perbaikan fitur apa pun.

Font non-bawaan dimuat dengan `preload: false`, sehingga berkas font tema lain tidak ikut membebani halaman.

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
- **Musik** — dua lagu bawaan tersedia di `public/music/`, keduanya bebas masalah hak cipta dan dihasilkan oleh `node scripts/generate-music.mjs`:

  | Berkas | Keterangan |
  |---|---|
  | `a-thousand-years.mp3` | Berkas unggahan pemilik proyek — **dipakai saat ini** |
  | `romantic-ballad.mp3` | Balada piano **orisinal**, bebas lisensi |
  | `canon-in-d.mp3` | Canon in D — Pachelbel, domain publik |

  Tinggal ubah `music.src` di `lib/wedding-config.ts` untuk berpindah lagu.

  Berkas MP3 baru sebaiknya diperkecil dulu agar ringan dibuka lewat data seluler:

  ```bash
  node scripts/optimize-audio.mjs lagu-asli.mp3 public/music/lagu.mp3 64
  ```

  > **Hak cipta:** "A Thousand Years" (Christina Perri) masih dilindungi hak cipta. Pastikan Anda memiliki hak/lisensi untuk memakainya, terutama untuk pemakaian komersial atau bila videonya diunggah ke Instagram/TikTok/YouTube yang memindai audio secara otomatis. Dua berkas lain di atas bebas masalah lisensi.

## ☁️ Deploy ke Vercel

1. Push repo ke GitHub
2. [vercel.com](https://vercel.com) → **Add New Project** → import repo (Next.js terdeteksi otomatis)
3. **Deploy** — tanpa environment variable pun langsung jalan memakai project Supabase demo

Bila memakai Supabase sendiri, tambahkan `NEXT_PUBLIC_UNDANGAN_SUPABASE_URL` dan `NEXT_PUBLIC_UNDANGAN_SUPABASE_ANON_KEY` di **Settings → Environment Variables**. Awalan `UNDANGAN_` dipakai agar tidak bentrok dengan variabel Supabase milik website lain yang berbagi project Vercel yang sama.

## 🎬 Merekam video undangan untuk media sosial

Undangan punya tombol **gulir otomatis** (ikon panah bawah, di bawah tombol musik):

1. Buka undangan, ketuk ikon panah bawah
2. Pilih kecepatan — Pelan (±100 dtk), Sedang (±60 dtk), atau Cepat (±38 dtk)
3. Ketuk **Mulai rekam** — halaman kembali ke atas lalu bergulir sendiri
4. Rekam layar HP; dok navigasi otomatis disembunyikan agar hasilnya bersih

Menyentuh layar akan menghentikan gulir otomatis, jadi jangan sentuh apa pun selama merekam.

## 👤 Mengganti nama pada undangan

Ada dua jenis nama yang berbeda:

| Yang diganti | Caranya |
|---|---|
| **Nama tamu** (yang muncul di cover, per orang) | Buka `/admin?tema=<tema yang dipakai>` → tabel tamu → tombol **Ubah**. Bisa juga menambah tamu baru lewat formulir di atas tabel. Kolom "Link baru" dikosongkan saja agar link yang sudah disebar tetap hidup. |
| **Nama mempelai & data acara** | Edit [`lib/wedding-config.ts`](lib/wedding-config.ts), lalu deploy ulang |

## 📱 Membagikan undangan lewat WhatsApp

Tambah tamu di `/admin`, pilih temanya di bagian **Tema link undangan**, klik **Salin link**, lalu kirim:

```
Kepada Yth. Bapak/Ibu Budi Santoso & Keluarga

Dengan memohon berkat Tuhan Yang Maha Kuasa,
kami mengundang Bapak/Ibu ke pernikahan kami:

✨ Kim Jun Lung & Song Ve Ren ✨
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
| `admin_ubah_tamu(token, ...)` | anon | Ubah nama / kuota tamu (link lama dipertahankan) |
| `admin_hapus_tamu(token, id)` | anon | Hapus tamu beserta RSVP-nya |
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

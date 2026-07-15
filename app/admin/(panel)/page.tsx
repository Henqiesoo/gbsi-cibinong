import Link from "next/link";
import { adminSiap } from "@/lib/admin-auth";
import { supabaseSiap } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const fitur = [
  {
    href: "/admin/tema",
    judul: "Tema Tahunan",
    deskripsi: "Ganti teks tema di halaman depan tiap tahun (+ poster).",
  },
  {
    href: "/admin/acara",
    judul: "Acara & Seminar",
    deskripsi: "Umumkan acara dengan poster; arsip tersimpan otomatis.",
  },
  {
    href: "/admin/renungan",
    judul: "Renungan",
    deskripsi: "Tulis, ubah, atau hapus renungan mingguan.",
  },
  {
    href: "/admin/galeri",
    judul: "Galeri",
    deskripsi: "Unggah foto ibadah, acara, dan fasilitas.",
  },
  {
    href: "/admin/beranda",
    judul: "Foto Beranda",
    deskripsi: "Ganti foto besar di halaman depan.",
  },
  {
    href: "/admin/jadwal",
    judul: "Jadwal Ibadah",
    deskripsi: "Ubah jadwal kegiatan mingguan.",
  },
  {
    href: "/admin/jadwal-tugas",
    judul: "Jadwal Tugas",
    deskripsi: "Unggah jadwal tugas pelayanan (bisa diunduh jemaat).",
  },
];

export default function AdminDasborPage() {
  const sbSiap = supabaseSiap();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-ink">Dasbor</h1>
        <p className="mt-2 max-w-2xl text-ink/70">
          Selamat melayani! Dari panel ini pengurus dapat memperbarui konten
          website tanpa menyentuh kode.
        </p>
      </div>

      {/* Status konfigurasi */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div
          className={`rounded-2xl border p-5 ${
            adminSiap()
              ? "border-emerald-200 bg-emerald-50"
              : "border-amber-200 bg-amber-50"
          }`}
        >
          <p className="text-sm font-semibold text-ink">Password Admin</p>
          <p className="mt-1 text-sm text-ink/70">
            {adminSiap()
              ? "Aktif — panel terlindungi password."
              : "Belum di-set (env ADMIN_PASSWORD)."}
          </p>
        </div>
        <div
          className={`rounded-2xl border p-5 ${
            sbSiap
              ? "border-emerald-200 bg-emerald-50"
              : "border-amber-200 bg-amber-50"
          }`}
        >
          <p className="text-sm font-semibold text-ink">
            Penyimpanan Konten (Supabase)
          </p>
          <p className="mt-1 text-sm text-ink/70">
            {sbSiap
              ? "Tersambung — semua fitur pengelolaan aktif."
              : "Belum tersambung — website memakai konten statis bawaan."}
          </p>
        </div>
      </div>

      {!sbSiap && (
        <div className="rounded-2xl border border-cream-200 bg-white p-6">
          <h2 className="font-serif text-xl font-semibold text-ink">
            Cara menyambungkan Supabase (sekali saja)
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink/80">
            <li>
              Buat project gratis di <strong>supabase.com</strong>, lalu buka{" "}
              <em>SQL Editor</em> dan jalankan isi file{" "}
              <code className="font-mono">supabase/schema.sql</code> dari
              repository ini.
            </li>
            <li>
              Di Supabase, buka <em>Project Settings → API</em>: salin{" "}
              <em>Project URL</em> dan <em>service_role key</em>.
            </li>
            <li>
              Di Vercel, buka <em>Settings → Environment Variables</em> dan isi:{" "}
              <code className="font-mono">NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
              <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code>,{" "}
              <code className="font-mono">ADMIN_PASSWORD</code>.
            </li>
            <li>Deploy ulang. Selesai — semua menu di atas langsung aktif.</li>
          </ol>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fitur.map((f) => (
          <Link
            key={f.href}
            href={f.href}
            className="rounded-2xl border border-cream-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <h2 className="font-serif text-lg font-semibold text-ink">
              {f.judul}
            </h2>
            <p className="mt-1 text-sm text-ink/60">{f.deskripsi}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

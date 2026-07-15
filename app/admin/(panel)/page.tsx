import Link from "next/link";
import { adminSiap } from "@/lib/admin-auth";
import { BUCKET, supabaseSiap, supabaseServer } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// ——— Pemeriksaan kesiapan database ———

const TABEL_WAJIB = [
  "renungan",
  "galeri",
  "jadwal",
  "jadwal_tugas",
  "pengaturan",
  "acara",
  "surat_gembala",
  "foto_pengurus",
];

type HasilCek = { nama: string; ok: boolean; pesan?: string };

// Jenis key dari JWT Supabase ("service_role" yang benar; "anon" salah).
function jenisKey(): string | null {
  const k = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  const bagian = k.split(".");
  if (bagian.length !== 3) return null; // format key baru (bukan JWT)
  try {
    const payload = JSON.parse(
      Buffer.from(bagian[1], "base64").toString("utf8")
    );
    return typeof payload.role === "string" ? payload.role : null;
  } catch {
    return null;
  }
}

// Batasi tiap pemeriksaan maks 5 detik agar Dasbor tak menggantung
// bila Supabase lambat/tak terjangkau.
async function denganBatasWaktu<T>(
  janji: PromiseLike<T>,
  gagal: T
): Promise<T> {
  const batas = new Promise<T>((resolve) =>
    setTimeout(() => resolve(gagal), 5000)
  );
  return Promise.race([Promise.resolve(janji).catch(() => gagal), batas]);
}

async function cekDatabase(): Promise<{
  tabel: HasilCek[];
  bucket: HasilCek;
  role: string | null;
}> {
  const sb = supabaseServer();

  const cekTabel = TABEL_WAJIB.map((t) =>
    denganBatasWaktu(
      sb
        .from(t)
        .select("*", { head: true, count: "exact" })
        .limit(1)
        .abortSignal(AbortSignal.timeout(4500))
        .then(({ error }) => ({
          nama: t,
          ok: !error,
          pesan: error?.message?.slice(0, 120),
        })),
      { nama: t, ok: false, pesan: "tidak merespons (timeout)" }
    )
  );

  const cekBucket = denganBatasWaktu(
    sb.storage
      .getBucket(BUCKET)
      .then(({ data, error }) => ({
        nama: `storage bucket "${BUCKET}"`,
        ok: Boolean(data) && !error,
        pesan: error?.message?.slice(0, 120),
      })),
    {
      nama: `storage bucket "${BUCKET}"`,
      ok: false,
      pesan: "tidak merespons (timeout)",
    }
  );

  const [tabel, bucket] = await Promise.all([
    Promise.all(cekTabel),
    cekBucket,
  ]);
  return { tabel, bucket, role: jenisKey() };
}

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
    href: "/admin/surat-gembala",
    judul: "Surat Gembala",
    deskripsi: "Ketik atau baca otomatis dari foto surat (OCR).",
  },
  {
    href: "/admin/renungan",
    judul: "Renungan",
    deskripsi: "Tulis, ubah, atau hapus renungan mingguan.",
  },
  {
    href: "/admin/tentang",
    judul: "Halaman Tentang",
    deskripsi: "Edit sejarah gereja dan struktur kepengurusan.",
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

export default async function AdminDasborPage() {
  const sbSiap = supabaseSiap();
  const cek = sbSiap ? await cekDatabase() : null;
  const adaMasalah =
    cek && (cek.tabel.some((t) => !t.ok) || !cek.bucket.ok ||
      (cek.role !== null && cek.role !== "service_role"));

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

      {/* Pemeriksaan database — tampil bila Supabase tersambung */}
      {cek && (
        <div
          className={`rounded-2xl border p-6 ${
            adaMasalah
              ? "border-amber-300 bg-amber-50"
              : "border-cream-200 bg-white"
          }`}
        >
          <h2 className="font-serif text-xl font-semibold text-ink">
            Pemeriksaan Database
          </h2>

          {cek.role !== null && cek.role !== "service_role" && (
            <p className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <strong>Key yang terpasang adalah &ldquo;{cek.role}&rdquo;, bukan
              service_role.</strong> Buka Supabase → Project Settings → API,
              salin <em>service_role</em> key (bagian &ldquo;Project API
              keys&rdquo;, yang bertanda rahasia), tempel ke variabel{" "}
              <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code> di
              Vercel, lalu deploy ulang. Tanpa itu semua penyimpanan akan
              gagal.
            </p>
          )}

          <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
            {[...cek.tabel, cek.bucket].map((h) => (
              <li key={h.nama} className="flex items-start gap-2 text-sm">
                <span className={h.ok ? "text-emerald-600" : "text-red-600"}>
                  {h.ok ? "✓" : "✗"}
                </span>
                <span className="min-w-0">
                  <code className="font-mono text-ink">{h.nama}</code>
                  {!h.ok && h.pesan && (
                    <span className="block text-xs text-red-600">
                      {h.pesan}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>

          {adaMasalah ? (
            <p className="mt-4 text-sm leading-relaxed text-ink/80">
              Ada bagian database yang belum siap (tanda ✗). Perbaikannya:
              buka <strong>Supabase → SQL Editor</strong>, jalankan seluruh isi
              file <code className="font-mono">supabase/schema.sql</code>{" "}
              <em>versi terbaru</em> dari repository (aman dijalankan
              berulang — tabel yang sudah ada tidak tersentuh), lalu muat
              ulang halaman ini.
            </p>
          ) : (
            <p className="mt-4 text-sm text-emerald-700">
              Semua tabel dan penyimpanan siap — seluruh fitur admin dapat
              digunakan.
            </p>
          )}
        </div>
      )}

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

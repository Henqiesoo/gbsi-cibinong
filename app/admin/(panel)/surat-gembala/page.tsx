import Link from "next/link";
import BacaTeksDariFoto from "@/components/admin/BacaTeksDariFoto";
import Pemberitahuan from "@/components/admin/Pemberitahuan";
import { getSemuaSurat } from "@/lib/data/surat-gembala";
import { formatTanggal } from "@/lib/data/renungan";

export const dynamic = "force-dynamic";

const kelasInput =
  "mt-2 w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-base text-ink placeholder:text-ink/40 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30";

export default async function AdminSuratGembalaPage({
  searchParams,
}: {
  searchParams: { ok?: string; err?: string };
}) {
  const semua = await getSemuaSurat();

  return (
    <div className="space-y-8">
      <div className="max-w-2xl">
        <h1 className="font-serif text-3xl font-semibold text-ink">
          Surat Gembala
        </h1>
        <p className="mt-2 text-ink/70">
          Surat dari Gembala di Gereja Pusat Karawaci. Isi bisa diketik
          manual, atau unggah foto surat lalu klik{" "}
          <em>Baca teks dari foto</em> — hasilnya tinggal dirapikan.
        </p>
      </div>
      <Pemberitahuan ok={searchParams.ok} err={searchParams.err} />

      <form
        action="/api/admin/surat-gembala"
        method="post"
        encType="multipart/form-data"
        className="max-w-2xl space-y-4 rounded-2xl border border-cream-200 bg-white p-6"
      >
        <h2 className="font-serif text-xl font-semibold text-ink">
          Tambah Surat
        </h2>
        <div>
          <label htmlFor="judul" className="block text-sm font-semibold text-ink">
            Judul <span className="text-red-500">*</span>
          </label>
          <input
            id="judul"
            name="judul"
            type="text"
            required
            placeholder="contoh: Surat Gembala — Juli 2026"
            className={kelasInput}
          />
        </div>
        <div>
          <label htmlFor="tanggal" className="block text-sm font-semibold text-ink">
            Tanggal <span className="text-red-500">*</span>
          </label>
          <input id="tanggal" name="tanggal" type="date" required className={kelasInput} />
        </div>
        <div>
          <label htmlFor="gambar" className="block text-sm font-semibold text-ink">
            Foto / scan surat (opsional)
          </label>
          <input
            id="gambar"
            name="gambar"
            type="file"
            accept="image/*"
            className="mt-2 w-full text-sm text-ink/70 file:mr-3 file:rounded-full file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-700"
          />
          <BacaTeksDariFoto inputFileId="gambar" textareaId="isi" />
        </div>
        <div>
          <label htmlFor="isi" className="block text-sm font-semibold text-ink">
            Isi surat <span className="text-red-500">*</span>
          </label>
          <p className="mt-1 text-xs text-ink/50">
            Pisahkan antar-paragraf dengan satu baris kosong.
          </p>
          <textarea id="isi" name="isi" rows={14} required className={kelasInput} />
        </div>
        <button
          type="submit"
          className="rounded-full bg-brand-600 px-7 py-3 text-base font-semibold text-white hover:bg-brand-500"
        >
          Simpan Surat
        </button>
      </form>

      {semua.length > 0 && (
        <ul className="space-y-3">
          {semua.map((s) => (
            <li
              key={s.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cream-200 bg-white p-5"
            >
              <div className="min-w-0">
                <p className="font-serif text-lg font-semibold leading-snug text-ink">
                  {s.judul}
                </p>
                <p className="mt-0.5 text-sm text-ink/60">
                  {formatTanggal(s.tanggal)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/surat-gembala/${s.slug}`}
                  className="rounded-full border border-cream-300 px-4 py-1.5 text-sm font-medium text-ink hover:border-brand-400 hover:text-brand-700"
                >
                  Lihat
                </Link>
                <form
                  action={`/api/admin/surat-gembala/${s.id}/hapus`}
                  method="post"
                >
                  <button
                    type="submit"
                    className="rounded-full border border-cream-300 px-4 py-1.5 text-sm font-medium text-red-600 hover:border-red-300"
                  >
                    Hapus
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

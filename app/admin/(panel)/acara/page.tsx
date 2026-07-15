/* eslint-disable @next/next/no-img-element */
import Pemberitahuan from "@/components/admin/Pemberitahuan";
import { getSemuaAcara } from "@/lib/data/acara";
import { formatTanggal } from "@/lib/data/renungan";

export const dynamic = "force-dynamic";

const kelasInput =
  "mt-2 w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-base text-ink placeholder:text-ink/40 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30";

export default async function AdminAcaraPage({
  searchParams,
}: {
  searchParams: { ok?: string; err?: string; detail?: string };
}) {
  const semua = await getSemuaAcara();

  return (
    <div className="space-y-8">
      <div className="max-w-2xl">
        <h1 className="font-serif text-3xl font-semibold text-ink">
          Acara & Seminar
        </h1>
        <p className="mt-2 text-ink/70">
          Acara yang tanggalnya belum lewat tampil di Beranda dan halaman
          Acara; yang sudah lewat otomatis masuk Arsip Acara.
        </p>
      </div>
      <Pemberitahuan ok={searchParams.ok} err={searchParams.err} detail={searchParams.detail} />

      <form
        action="/api/admin/acara"
        method="post"
        encType="multipart/form-data"
        className="max-w-xl space-y-4 rounded-2xl border border-cream-200 bg-white p-6"
      >
        <h2 className="font-serif text-xl font-semibold text-ink">
          Tambah Acara
        </h2>
        <div>
          <label htmlFor="judul" className="block text-sm font-semibold text-ink">
            Nama acara <span className="text-red-500">*</span>
          </label>
          <input
            id="judul"
            name="judul"
            type="text"
            required
            placeholder="contoh: Seminar Firman"
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
          <label htmlFor="tema" className="block text-sm font-semibold text-ink">
            Tema / keterangan singkat
          </label>
          <input
            id="tema"
            name="tema"
            type="text"
            placeholder="contoh: Allah Memakai Orang yang Tidak Lupa Kasih Karunia"
            className={kelasInput}
          />
        </div>
        <div>
          <label htmlFor="poster" className="block text-sm font-semibold text-ink">
            Poster (opsional)
          </label>
          <input
            id="poster"
            name="poster"
            type="file"
            accept="image/*"
            className="mt-2 w-full text-sm text-ink/70 file:mr-3 file:rounded-full file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-700"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-brand-600 px-7 py-3 text-base font-semibold text-white hover:bg-brand-500"
        >
          Simpan Acara
        </button>
      </form>

      {semua.length > 0 && (
        <ul className="space-y-3">
          {semua.map((a) => (
            <li
              key={a.id}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-cream-200 bg-white p-4"
            >
              {a.poster && (
                <img
                  src={a.poster}
                  alt=""
                  className="h-16 w-12 shrink-0 rounded-lg object-cover"
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="font-medium leading-snug text-ink">{a.judul}</p>
                <p className="text-sm text-ink/60">
                  {formatTanggal(a.tanggal)}
                  {a.tema ? ` · ${a.tema}` : ""}
                </p>
              </div>
              <form action={`/api/admin/acara/${a.id}/hapus`} method="post">
                <button
                  type="submit"
                  className="rounded-full border border-cream-300 px-4 py-1.5 text-sm font-medium text-red-600 hover:border-red-300"
                >
                  Hapus
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

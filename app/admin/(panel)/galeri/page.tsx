/* eslint-disable @next/next/no-img-element */
import Pemberitahuan from "@/components/admin/Pemberitahuan";
import { getGaleri, labelKategori } from "@/lib/data/galeri";

export const dynamic = "force-dynamic";

const kelasInput =
  "mt-2 w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-base text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30";

export default async function AdminGaleriPage({
  searchParams,
}: {
  searchParams: { ok?: string; err?: string };
}) {
  const foto = await getGaleri();

  return (
    <div className="space-y-8">
      <h1 className="font-serif text-3xl font-semibold text-ink">Galeri</h1>
      <Pemberitahuan ok={searchParams.ok} err={searchParams.err} />

      {/* Form unggah */}
      <form
        action="/api/admin/galeri"
        method="post"
        encType="multipart/form-data"
        className="max-w-xl space-y-4 rounded-2xl border border-cream-200 bg-white p-6"
      >
        <h2 className="font-serif text-xl font-semibold text-ink">
          Unggah Foto Baru
        </h2>
        <div>
          <label htmlFor="foto" className="block text-sm font-semibold text-ink">
            File foto <span className="text-red-500">*</span>
          </label>
          <input
            id="foto"
            name="foto"
            type="file"
            accept="image/*"
            required
            className="mt-2 w-full text-sm text-ink/70 file:mr-3 file:rounded-full file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-700"
          />
        </div>
        <div>
          <label htmlFor="kategori" className="block text-sm font-semibold text-ink">
            Kategori <span className="text-red-500">*</span>
          </label>
          <select id="kategori" name="kategori" required className={kelasInput}>
            <option value="ibadah">{labelKategori.ibadah}</option>
            <option value="acara">{labelKategori.acara}</option>
            <option value="fasilitas">{labelKategori.fasilitas}</option>
          </select>
        </div>
        <div>
          <label htmlFor="alt" className="block text-sm font-semibold text-ink">
            Keterangan singkat
          </label>
          <input
            id="alt"
            name="alt"
            type="text"
            placeholder="contoh: Ibadah Hari Tuhan, Juli 2026"
            className={kelasInput}
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-brand-600 px-7 py-3 text-base font-semibold text-white hover:bg-brand-500"
        >
          Unggah
        </button>
      </form>

      {/* Daftar foto */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {foto.map((f) => (
          <figure
            key={f.id ?? f.src}
            className="overflow-hidden rounded-2xl border border-cream-200 bg-white"
          >
            <img
              src={f.src}
              alt={f.alt}
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="space-y-2 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                {labelKategori[f.kategori]}
              </p>
              <p className="line-clamp-2 text-sm text-ink/70">{f.alt}</p>
              {f.id ? (
                <form action={`/api/admin/galeri/${f.id}/hapus`} method="post">
                  <button
                    type="submit"
                    className="text-sm font-medium text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </form>
              ) : (
                <p className="text-xs text-ink/40">bawaan statis</p>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

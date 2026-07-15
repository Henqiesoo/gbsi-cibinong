/* eslint-disable @next/next/no-img-element */
import Pemberitahuan from "@/components/admin/Pemberitahuan";
import { getTemaTahunan } from "@/lib/data/pengaturan";

export const dynamic = "force-dynamic";

export default async function AdminTemaPage({
  searchParams,
}: {
  searchParams: { ok?: string; err?: string };
}) {
  const tema = await getTemaTahunan();

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-serif text-3xl font-semibold text-ink">
        Tema Tahunan
      </h1>
      <p className="text-ink/70">
        Teks tema tampil sebagai judul besar di halaman depan. Ganti setiap
        awal tahun — moto gereja &ldquo;Mari Roh Jiwaku, Kembalilah kepada
        Firman!&rdquo; tetap di footer dan tidak ikut berubah.
      </p>
      <Pemberitahuan ok={searchParams.ok} err={searchParams.err} />

      <form
        action="/api/admin/tema"
        method="post"
        encType="multipart/form-data"
        className="space-y-5 rounded-2xl border border-cream-200 bg-white p-6"
      >
        <div>
          <label htmlFor="teks" className="block text-sm font-semibold text-ink">
            Teks tema <span className="text-red-500">*</span>
          </label>
          <input
            id="teks"
            name="teks"
            type="text"
            required
            defaultValue={tema.teks}
            className="mt-2 w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-base text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          />
        </div>

        <div>
          <label htmlFor="label" className="block text-sm font-semibold text-ink">
            Label kecil di atas tema
          </label>
          <input
            id="label"
            name="label"
            type="text"
            defaultValue={tema.label}
            placeholder="contoh: Tema Tahun 2026 atau Tema Periode 2026/2027"
            className="mt-2 w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-base text-ink placeholder:text-ink/40 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          />
        </div>

        {tema.poster && (
          <figure className="overflow-hidden rounded-xl border border-cream-200">
            <img src={tema.poster} alt="Poster tema saat ini" className="w-full" />
            <figcaption className="flex items-center justify-between p-3 text-sm text-ink/60">
              Poster tema saat ini
              <label className="flex items-center gap-2 font-medium text-red-600">
                <input type="checkbox" name="hapus_poster" value="1" />
                Hapus poster
              </label>
            </figcaption>
          </figure>
        )}

        <div>
          <label htmlFor="poster" className="block text-sm font-semibold text-ink">
            Poster tema {tema.poster ? "(kosongkan bila tidak diganti)" : "(opsional)"}
          </label>
          <input
            id="poster"
            name="poster"
            type="file"
            accept="image/*"
            className="mt-2 w-full text-sm text-ink/70 file:mr-3 file:rounded-full file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-700"
          />
          <p className="mt-1 text-xs text-ink/50">
            Bila diisi, poster tampil di halaman depan tepat di bawah foto
            utama.
          </p>
        </div>

        <button
          type="submit"
          className="rounded-full bg-brand-600 px-7 py-3 text-base font-semibold text-white hover:bg-brand-500"
        >
          Simpan Tema
        </button>
      </form>
    </div>
  );
}

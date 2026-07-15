/* eslint-disable @next/next/no-img-element */
import Pemberitahuan from "@/components/admin/Pemberitahuan";
import { getJadwalTugas } from "@/lib/data/jadwal-tugas";

export const dynamic = "force-dynamic";

export default async function AdminJadwalTugasPage({
  searchParams,
}: {
  searchParams: { ok?: string; err?: string; detail?: string };
}) {
  const daftar = await getJadwalTugas();

  return (
    <div className="space-y-8">
      <div className="max-w-2xl">
        <h1 className="font-serif text-3xl font-semibold text-ink">
          Jadwal Tugas Pelayanan
        </h1>
        <p className="mt-2 text-ink/70">
          Unggah gambar jadwal tugas (JPG/PNG). Jadwal tampil di halaman{" "}
          <em>Jadwal Ibadah</em> dan dapat diunduh jemaat — setiap file
          otomatis diberi watermark saat diunggah.
        </p>
      </div>
      <Pemberitahuan ok={searchParams.ok} err={searchParams.err} detail={searchParams.detail} />

      <form
        action="/api/admin/jadwal-tugas"
        method="post"
        encType="multipart/form-data"
        className="max-w-xl space-y-4 rounded-2xl border border-cream-200 bg-white p-6"
      >
        <h2 className="font-serif text-xl font-semibold text-ink">
          Unggah Jadwal Baru
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
            placeholder="contoh: Jadwal Tugas Pelayanan Agustus 2026"
            className="mt-2 w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-base text-ink placeholder:text-ink/40 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          />
        </div>
        <div>
          <label htmlFor="file" className="block text-sm font-semibold text-ink">
            File gambar <span className="text-red-500">*</span>
          </label>
          <input
            id="file"
            name="file"
            type="file"
            accept="image/*"
            required
            className="mt-2 w-full text-sm text-ink/70 file:mr-3 file:rounded-full file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-700"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-brand-600 px-7 py-3 text-base font-semibold text-white hover:bg-brand-500"
        >
          Unggah
        </button>
      </form>

      {daftar.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {daftar.map((j) => (
            <figure
              key={j.id}
              className="overflow-hidden rounded-2xl border border-cream-200 bg-white"
            >
              <img
                src={j.url}
                alt={j.judul}
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="space-y-2 p-4">
                <p className="font-medium text-ink">{j.judul}</p>
                <div className="flex items-center gap-3">
                  <a
                    href={`/api/jadwal-tugas/${j.id}/unduh`}
                    className="text-sm font-medium text-brand-600 hover:underline"
                  >
                    Unduh
                  </a>
                  <form
                    action={`/api/admin/jadwal-tugas/${j.id}/hapus`}
                    method="post"
                  >
                    <button
                      type="submit"
                      className="text-sm font-medium text-red-600 hover:underline"
                    >
                      Hapus
                    </button>
                  </form>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}

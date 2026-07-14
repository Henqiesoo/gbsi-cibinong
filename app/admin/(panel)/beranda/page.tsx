/* eslint-disable @next/next/no-img-element */
import Pemberitahuan from "@/components/admin/Pemberitahuan";
import { getHeroUrl } from "@/lib/data/pengaturan";

export const dynamic = "force-dynamic";

export default async function AdminBerandaPage({
  searchParams,
}: {
  searchParams: { ok?: string; err?: string };
}) {
  const heroSekarang = await getHeroUrl();

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-serif text-3xl font-semibold text-ink">
        Foto Beranda
      </h1>
      <p className="text-ink/70">
        Foto besar yang tampil di bagian atas halaman depan. Disarankan foto
        lanskap (melebar) ruang ibadah, minimal lebar 1600 piksel.
      </p>
      <Pemberitahuan ok={searchParams.ok} err={searchParams.err} />

      <figure className="overflow-hidden rounded-2xl border border-cream-200">
        <img
          src={heroSekarang}
          alt="Foto hero saat ini"
          className="aspect-[16/9] w-full object-cover"
        />
        <figcaption className="bg-white p-3 text-sm text-ink/60">
          Foto beranda saat ini
        </figcaption>
      </figure>

      <form
        action="/api/admin/beranda"
        method="post"
        encType="multipart/form-data"
        className="space-y-4 rounded-2xl border border-cream-200 bg-white p-6"
      >
        <label htmlFor="foto" className="block text-sm font-semibold text-ink">
          Pilih foto pengganti <span className="text-red-500">*</span>
        </label>
        <input
          id="foto"
          name="foto"
          type="file"
          accept="image/*"
          required
          className="w-full text-sm text-ink/70 file:mr-3 file:rounded-full file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-700"
        />
        <button
          type="submit"
          className="rounded-full bg-brand-600 px-7 py-3 text-base font-semibold text-white hover:bg-brand-500"
        >
          Ganti Foto Beranda
        </button>
      </form>
    </div>
  );
}

import Pemberitahuan from "@/components/admin/Pemberitahuan";
import { getJadwal } from "@/lib/data/jadwal";

export const dynamic = "force-dynamic";

export default async function AdminJadwalPage({
  searchParams,
}: {
  searchParams: { ok?: string; err?: string; detail?: string };
}) {
  const jadwal = await getJadwal();
  const teksAwal = jadwal
    .map((j) => `${j.hari} | ${j.kegiatan} | ${j.jam}`)
    .join("\n");

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-serif text-3xl font-semibold text-ink">
        Jadwal Ibadah
      </h1>
      <Pemberitahuan ok={searchParams.ok} err={searchParams.err} detail={searchParams.detail} />

      <form
        action="/api/admin/jadwal"
        method="post"
        className="space-y-4 rounded-2xl border border-cream-200 bg-white p-6"
      >
        <div>
          <label htmlFor="jadwal" className="block text-sm font-semibold text-ink">
            Daftar kegiatan mingguan
          </label>
          <p className="mt-1 text-sm text-ink/60">
            Satu kegiatan per baris, dengan format:{" "}
            <code className="rounded bg-cream-100 px-1.5 py-0.5 font-mono text-xs">
              Hari | Kegiatan | Jam
            </code>
            . Urutan baris = urutan tampil di website.
          </p>
          <textarea
            id="jadwal"
            name="jadwal"
            rows={10}
            required
            defaultValue={teksAwal}
            className="mt-3 w-full rounded-xl border border-cream-300 bg-white px-4 py-3 font-mono text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-brand-600 px-7 py-3 text-base font-semibold text-white hover:bg-brand-500"
        >
          Simpan Jadwal
        </button>
      </form>
    </div>
  );
}

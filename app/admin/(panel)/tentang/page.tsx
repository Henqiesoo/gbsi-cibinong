import Pemberitahuan from "@/components/admin/Pemberitahuan";
import { getPengaturan } from "@/lib/data/pengaturan";
import {
  SEJARAH_DEFAULT,
  STRUKTUR_DEFAULT,
  getStruktur,
} from "@/lib/data/tentang";

export const dynamic = "force-dynamic";

const kelasArea =
  "mt-3 w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30";

export default async function AdminTentangPage({
  searchParams,
}: {
  searchParams: { ok?: string; err?: string };
}) {
  const [sejarahTersimpan, strukturTersimpan, struktur] = await Promise.all([
    getPengaturan("sejarah_teks"),
    getPengaturan("struktur_teks"),
    getStruktur(),
  ]);
  // Tampilkan teks tersimpan; bila belum ada, tampilkan bawaan.
  const sejarahAwal = sejarahTersimpan || SEJARAH_DEFAULT;
  const strukturAwal = strukturTersimpan || STRUKTUR_DEFAULT;

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="font-serif text-3xl font-semibold text-ink">
        Halaman Tentang
      </h1>
      <p className="text-ink/70">
        Sejarah gereja dan struktur kepengurusan pada halaman{" "}
        <em>Tentang Kami</em> diedit dari sini.
      </p>
      <Pemberitahuan ok={searchParams.ok} err={searchParams.err} />

      <form
        action="/api/admin/tentang"
        method="post"
        className="space-y-6 rounded-2xl border border-cream-200 bg-white p-6"
      >
        <div>
          <label htmlFor="sejarah" className="block text-sm font-semibold text-ink">
            Sejarah GBSI Cibinong
          </label>
          <p className="mt-1 text-sm text-ink/60">
            Pisahkan antar-paragraf dengan satu baris kosong.
          </p>
          <textarea
            id="sejarah"
            name="sejarah"
            rows={14}
            required
            defaultValue={sejarahAwal}
            className={kelasArea}
          />
        </div>

        <div>
          <label htmlFor="periode" className="block text-sm font-semibold text-ink">
            Periode kepengurusan
          </label>
          <input
            id="periode"
            name="periode"
            type="text"
            defaultValue={struktur.periode}
            placeholder="contoh: 2026–2027"
            className="mt-2 w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-base text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          />
        </div>

        <div>
          <label htmlFor="struktur" className="block text-sm font-semibold text-ink">
            Struktur kepengurusan
          </label>
          <p className="mt-1 text-sm leading-relaxed text-ink/60">
            Satu unit per baris, format{" "}
            <code className="rounded bg-cream-100 px-1.5 py-0.5 font-mono text-xs">
              Nama Unit | Pengurus
            </code>
            . Awali dengan <code className="rounded bg-cream-100 px-1 font-mono text-xs">#</code>{" "}
            untuk bidang utama, dan{" "}
            <code className="rounded bg-cream-100 px-1 font-mono text-xs">-</code>{" "}
            untuk sub-unit di bawah bidang tersebut.
          </p>
          <textarea
            id="struktur"
            name="struktur"
            rows={18}
            required
            defaultValue={strukturAwal}
            className={`${kelasArea} font-mono`}
          />
        </div>

        <button
          type="submit"
          className="rounded-full bg-brand-600 px-7 py-3 text-base font-semibold text-white hover:bg-brand-500"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}

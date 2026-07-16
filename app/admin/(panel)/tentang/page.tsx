/* eslint-disable @next/next/no-img-element */
import Pemberitahuan from "@/components/admin/Pemberitahuan";
import { getPengaturan } from "@/lib/data/pengaturan";
import {
  MISI_DEFAULT,
  SEJARAH_DEFAULT,
  STRUKTUR_DEFAULT,
  VISI_DEFAULT,
  daftarNamaPengurus,
  getDaftarFotoPengurus,
  getFotoTentang,
  getStruktur,
} from "@/lib/data/tentang";

export const dynamic = "force-dynamic";

const kelasArea =
  "mt-3 w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30";

export default async function AdminTentangPage({
  searchParams,
}: {
  searchParams: { ok?: string; err?: string; detail?: string };
}) {
  const [
    sejarahTersimpan,
    strukturTersimpan,
    visiTersimpan,
    misiTersimpan,
    struktur,
    fotoPengurus,
    fotoTentang,
  ] = await Promise.all([
    getPengaturan("sejarah_teks"),
    getPengaturan("struktur_teks"),
    getPengaturan("visi_teks"),
    getPengaturan("misi_teks"),
    getStruktur(),
    getDaftarFotoPengurus(),
    getFotoTentang(),
  ]);
  // Semua orang dalam struktur bisa diberi foto (satu foto per orang).
  const pilihanNama = daftarNamaPengurus(struktur.unit);
  // Tampilkan teks tersimpan; bila belum ada, tampilkan bawaan.
  const sejarahAwal = sejarahTersimpan || SEJARAH_DEFAULT;
  const strukturAwal = strukturTersimpan || STRUKTUR_DEFAULT;
  const visiAwal = visiTersimpan || VISI_DEFAULT;
  const misiAwal = misiTersimpan || MISI_DEFAULT;
  const daftarFotoHalaman = [
    {
      jenis: "jemaat",
      judul: "Foto Jemaat",
      keterangan: "Foto kiri di bagian bawah halaman Tentang.",
      url: fotoTentang.jemaat,
    },
    {
      jenis: "plakat",
      judul: "Foto Plakat GBSI",
      keterangan: "Foto kanan di bagian bawah halaman Tentang.",
      url: fotoTentang.plakat,
    },
  ];

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="font-serif text-3xl font-semibold text-ink">
        Halaman Tentang
      </h1>
      <p className="text-ink/70">
        Sejarah, visi &amp; misi, struktur kepengurusan, serta foto pada
        halaman <em>Tentang Kami</em> diedit dari sini.
      </p>
      <Pemberitahuan ok={searchParams.ok} err={searchParams.err} detail={searchParams.detail} />

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
          <label htmlFor="visi" className="block text-sm font-semibold text-ink">
            Visi
          </label>
          <p className="mt-1 text-sm text-ink/60">
            Satu teks utuh, tampil di kotak &ldquo;Visi&rdquo;.
          </p>
          <textarea
            id="visi"
            name="visi"
            rows={4}
            required
            defaultValue={visiAwal}
            className={kelasArea}
          />
        </div>

        <div>
          <label htmlFor="misi" className="block text-sm font-semibold text-ink">
            Misi
          </label>
          <p className="mt-1 text-sm text-ink/60">
            Satu butir misi per baris — nomornya dibuat otomatis di website.
          </p>
          <textarea
            id="misi"
            name="misi"
            rows={6}
            required
            defaultValue={misiAwal}
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

      {/* Foto pengurus */}
      <div className="space-y-4 rounded-2xl border border-cream-200 bg-white p-6">
        <div>
          <h2 className="font-serif text-xl font-semibold text-ink">
            Foto Pengurus
          </h2>
          <p className="mt-1 text-sm text-ink/60">
            Satu foto per orang — semua {pilihanNama.length} pengurus dalam
            struktur bisa diberi foto. Orang yang melayani di beberapa unit
            otomatis memakai foto yang sama. Tanpa foto, tampil lingkaran
            inisial.
          </p>
        </div>

        <form
          action="/api/admin/foto-pengurus"
          method="post"
          encType="multipart/form-data"
          className="flex flex-wrap items-end gap-3"
        >
          <div className="min-w-48 flex-1">
            <label htmlFor="nama" className="block text-sm font-semibold text-ink">
              Nama pengurus
            </label>
            <select
              id="nama"
              name="nama"
              required
              className="mt-2 w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-base text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
            >
              {pilihanNama.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div className="min-w-48 flex-1">
            <label htmlFor="foto" className="block text-sm font-semibold text-ink">
              Foto
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
          <button
            type="submit"
            className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-500"
          >
            Unggah
          </button>
        </form>

        {fotoPengurus.length > 0 && (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {fotoPengurus.map((f) => (
              <li
                key={f.id}
                className="rounded-xl border border-cream-200 p-3 text-center"
              >
                <img
                  src={f.url}
                  alt={f.nama}
                  className="mx-auto h-16 w-16 rounded-full object-cover"
                />
                <p className="mt-2 text-sm font-medium text-ink">{f.nama}</p>
                <form
                  action={`/api/admin/foto-pengurus/${f.id}/hapus`}
                  method="post"
                >
                  <button
                    type="submit"
                    className="mt-1 text-xs font-medium text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Foto jemaat & plakat di bagian bawah halaman Tentang */}
      <div className="space-y-4 rounded-2xl border border-cream-200 bg-white p-6">
        <div>
          <h2 className="font-serif text-xl font-semibold text-ink">
            Foto Halaman Tentang
          </h2>
          <p className="mt-1 text-sm text-ink/60">
            Dua foto besar di bagian bawah halaman <em>Tentang Kami</em>{" "}
            (foto jemaat dan foto plakat GBSI). Disarankan foto melebar
            (lanskap), minimal lebar 1200 piksel.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {daftarFotoHalaman.map((f) => (
            <div
              key={f.jenis}
              className="space-y-3 rounded-xl border border-cream-200 p-4"
            >
              <img
                src={f.url}
                alt={f.judul}
                className="aspect-[4/3] w-full rounded-lg object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-ink">{f.judul}</p>
                <p className="text-xs text-ink/60">{f.keterangan}</p>
              </div>
              <form
                action="/api/admin/tentang/foto"
                method="post"
                encType="multipart/form-data"
                className="space-y-2"
              >
                <input type="hidden" name="jenis" value={f.jenis} />
                <input
                  name="foto"
                  type="file"
                  accept="image/*"
                  required
                  aria-label={`Pilih foto pengganti ${f.judul}`}
                  className="w-full text-sm text-ink/70 file:mr-3 file:rounded-full file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-700"
                />
                <button
                  type="submit"
                  className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-500"
                >
                  Ganti Foto
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

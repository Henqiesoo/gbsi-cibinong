import FormUnggahMusik from "@/components/admin/FormUnggahMusik";
import Pemberitahuan from "@/components/admin/Pemberitahuan";
import { MUSIK_BAWAAN, getDaftarMusik, getMusikAktif } from "@/lib/data/musik";

export const dynamic = "force-dynamic";

export default async function AdminMusikPage({
  searchParams,
}: {
  searchParams: { ok?: string; err?: string; detail?: string };
}) {
  const [daftar, aktif] = await Promise.all([
    getDaftarMusik(),
    getMusikAktif(),
  ]);

  return (
    <div className="space-y-8">
      <div className="max-w-2xl">
        <h1 className="font-serif text-3xl font-semibold text-ink">
          Musik Latar
        </h1>
        <p className="mt-2 text-ink/70">
          Musik yang diputar di Beranda. Unggah beberapa lagu sebagai
          pilihan, tandai satu yang <strong>Aktif</strong>, dan hapus yang
          tidak dipakai. Bila tidak ada lagu di daftar, dipakai musik bawaan
          website.
        </p>
      </div>
      <Pemberitahuan ok={searchParams.ok} err={searchParams.err} detail={searchParams.detail} />

      <FormUnggahMusik />

      <ul className="max-w-2xl space-y-3">
        {/* Musik bawaan selalu ada sebagai pilihan terakhir */}
        <li
          className={`rounded-2xl border bg-white p-5 ${
            aktif === MUSIK_BAWAAN ? "border-brand-400" : "border-cream-200"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-medium text-ink">
                Musik bawaan website
                {aktif === MUSIK_BAWAAN && (
                  <span className="ml-2 rounded-full bg-brand-100 px-3 py-0.5 text-xs font-semibold text-brand-700">
                    Aktif
                  </span>
                )}
              </p>
              <p className="text-sm text-ink/50">
                File /audio/latar.mp3 — dipakai bila tidak ada lagu unggahan
                yang aktif
              </p>
            </div>
          </div>
          <audio
            controls
            preload="none"
            src={MUSIK_BAWAAN}
            className="mt-3 h-10 w-full"
          />
        </li>

        {daftar.map((m) => (
          <li
            key={m.id}
            className={`rounded-2xl border bg-white p-5 ${
              aktif === m.url ? "border-brand-400" : "border-cream-200"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="min-w-0 font-medium text-ink">
                {m.judul}
                {aktif === m.url && (
                  <span className="ml-2 rounded-full bg-brand-100 px-3 py-0.5 text-xs font-semibold text-brand-700">
                    Aktif
                  </span>
                )}
              </p>
              <div className="flex shrink-0 items-center gap-2">
                {aktif !== m.url && (
                  <form action={`/api/admin/musik/${m.id}/aktif`} method="post">
                    <button
                      type="submit"
                      className="rounded-full bg-brand-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-brand-500"
                    >
                      Jadikan Aktif
                    </button>
                  </form>
                )}
                <form action={`/api/admin/musik/${m.id}/hapus`} method="post">
                  <button
                    type="submit"
                    className="rounded-full border border-cream-300 px-4 py-1.5 text-sm font-medium text-red-600 hover:border-red-300"
                  >
                    Hapus
                  </button>
                </form>
              </div>
            </div>
            <audio
              controls
              preload="none"
              src={m.url}
              className="mt-3 h-10 w-full"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

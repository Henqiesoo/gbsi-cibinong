import Link from "next/link";
import Pemberitahuan from "@/components/admin/Pemberitahuan";
import { formatTanggal, getSemuaRenungan } from "@/lib/data/renungan";

export const dynamic = "force-dynamic";

export default async function AdminRenunganPage({
  searchParams,
}: {
  searchParams: { ok?: string; err?: string };
}) {
  const semua = await getSemuaRenungan();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-3xl font-semibold text-ink">Renungan</h1>
        <Link
          href="/admin/renungan/baru"
          className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-500"
        >
          + Tulis Renungan
        </Link>
      </div>

      <Pemberitahuan ok={searchParams.ok} err={searchParams.err} />

      <ul className="space-y-3">
        {semua.map((r) => (
          <li
            key={r.slug}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cream-200 bg-white p-5"
          >
            <div className="min-w-0">
              <p className="font-serif text-lg font-semibold leading-snug text-ink">
                {r.judul}
              </p>
              <p className="mt-0.5 text-sm text-ink/60">
                {formatTanggal(r.tanggal)}
                {r.ayat ? ` · ${r.ayat}` : ""}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href={`/renungan/${r.slug}`}
                className="rounded-full border border-cream-300 px-4 py-1.5 text-sm font-medium text-ink hover:border-brand-400 hover:text-brand-700"
              >
                Lihat
              </Link>
              {r.id ? (
                <>
                  <Link
                    href={`/admin/renungan/${r.id}/edit`}
                    className="rounded-full border border-cream-300 px-4 py-1.5 text-sm font-medium text-ink hover:border-brand-400 hover:text-brand-700"
                  >
                    Edit
                  </Link>
                  <form
                    action={`/api/admin/renungan/${r.id}/hapus`}
                    method="post"
                  >
                    <button
                      type="submit"
                      className="rounded-full border border-cream-300 px-4 py-1.5 text-sm font-medium text-red-600 hover:border-red-300"
                    >
                      Hapus
                    </button>
                  </form>
                </>
              ) : (
                <span className="text-xs text-ink/40">
                  bawaan statis — aktifkan Supabase untuk mengelola
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

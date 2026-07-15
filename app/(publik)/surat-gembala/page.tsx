import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { getSemuaSurat } from "@/lib/data/surat-gembala";
import { formatTanggal } from "@/lib/data/renungan";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Surat Gembala",
  description: `Surat gembala dari Gereja Pusat untuk jemaat ${site.namaLengkap}.`,
};

export const revalidate = 300;

export default async function SuratGembalaPage() {
  const semua = await getSemuaSurat();

  return (
    <>
      <PageHeader
        kicker="Dari Gembala Kita"
        judul="Surat Gembala"
        deskripsi="Pesan penggembalaan dari Gembala di Gereja Pusat Karawaci untuk jemaat GBSI Cabang Cibinong."
      />

      <section className="mx-auto max-w-content px-4 py-12 sm:px-6 md:py-16">
        {semua.length === 0 ? (
          <p className="rounded-2xl bg-brand-50 p-8 text-center text-ink/70">
            Belum ada surat gembala yang dipublikasikan. Silakan kembali lagi.
          </p>
        ) : (
          <ul className="mx-auto max-w-3xl space-y-4">
            {semua.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/surat-gembala/${s.slug}`}
                  className="block rounded-2xl border border-cream-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                    {formatTanggal(s.tanggal)}
                  </p>
                  <h2 className="mt-1.5 font-serif text-xl font-semibold leading-snug text-ink">
                    {s.judul}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/60">
                    {s.isi[0]}
                  </p>
                  <span className="mt-3 inline-block text-sm font-semibold text-brand-600">
                    Baca surat →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

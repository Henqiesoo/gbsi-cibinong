import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSemuaSurat, getSuratBySlug } from "@/lib/data/surat-gembala";
import { formatTanggal } from "@/lib/data/renungan";

type Props = { params: { slug: string } };

export const revalidate = 300;

export async function generateStaticParams() {
  const semua = await getSemuaSurat();
  return semua.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const surat = await getSuratBySlug(params.slug);
  if (!surat) return {};
  return { title: surat.judul, description: surat.isi[0]?.slice(0, 160) };
}

export default async function DetailSuratGembalaPage({ params }: Props) {
  const surat = await getSuratBySlug(params.slug);
  if (!surat) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
      <Link
        href="/surat-gembala"
        className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 18.5L4 12l6.5-6.5M4 12h16"
          />
        </svg>
        Semua Surat Gembala
      </Link>

      <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-brand-600">
        Surat Gembala · {formatTanggal(surat.tanggal)}
      </p>
      <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">
        {surat.judul}
      </h1>

      <div className="mt-8 space-y-5">
        {surat.isi.map((paragraf) => (
          <p
            key={paragraf.slice(0, 40)}
            className="text-base leading-relaxed text-ink/80 sm:text-lg"
          >
            {paragraf}
          </p>
        ))}
      </div>

      {surat.gambar && (
        <figure className="mt-10">
          <Image
            src={surat.gambar}
            alt={`Surat asli: ${surat.judul}`}
            width={1400}
            height={1800}
            className="h-auto w-full rounded-2xl border border-cream-200"
          />
          <figcaption className="mt-2 text-center text-sm text-ink/50">
            Surat asli
          </figcaption>
        </figure>
      )}
    </article>
  );
}

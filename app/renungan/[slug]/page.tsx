import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatTanggal,
  getRenunganBySlug,
  getSemuaRenungan,
} from "@/lib/data/renungan";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const semua = await getSemuaRenungan();
  return semua.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const renungan = await getRenunganBySlug(params.slug);
  if (!renungan) return {};
  return {
    title: renungan.judul,
    description: renungan.cuplikan,
  };
}

export default async function DetailRenunganPage({ params }: Props) {
  const renungan = await getRenunganBySlug(params.slug);
  if (!renungan) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
      <Link
        href="/renungan"
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
        Kembali ke Renungan
      </Link>

      <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-brand-600">
        {formatTanggal(renungan.tanggal)}
        {renungan.ayat ? ` · ${renungan.ayat}` : ""}
      </p>
      <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">
        {renungan.judul}
      </h1>

      {renungan.kutipanAyat && (
        <blockquote className="mt-6 border-l-4 border-brand-300 pl-5">
          <p className="font-serif text-lg italic leading-relaxed text-ink/80">
            {renungan.kutipanAyat}
          </p>
        </blockquote>
      )}

      <figure className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-cream-200">
        <Image
          src={renungan.thumbnail}
          alt={renungan.judul}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </figure>

      <div className="mt-8 space-y-5">
        {renungan.isi.map((paragraf) => (
          <p
            key={paragraf.slice(0, 40)}
            className="text-base leading-relaxed text-ink/80 sm:text-lg"
          >
            {paragraf}
          </p>
        ))}
      </div>

      {renungan.atribusi && (
        <p className="mt-8 border-t border-cream-200 pt-5 text-sm italic text-ink/60">
          {renungan.atribusi}
        </p>
      )}

      <div className="mt-12 rounded-2xl bg-brand-50 p-6 text-center sm:p-8">
        <p className="font-serif text-lg font-semibold text-ink">
          Tuhan Yesus memberkati Saudara.
        </p>
        <p className="mt-1 text-sm text-ink/60">
          Bagikan renungan ini kepada keluarga dan sahabat.
        </p>
      </div>
    </article>
  );
}

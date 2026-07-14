import Image from "next/image";
import Link from "next/link";
import { formatTanggal, type Renungan } from "@/lib/data/renungan";

export default function CardRenungan({ renungan }: { renungan: Renungan }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link
        href={`/renungan/${renungan.slug}`}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        <Image
          src={renungan.thumbnail}
          alt={renungan.judul}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-600">
          {formatTanggal(renungan.tanggal)}
          {renungan.ayat ? ` · ${renungan.ayat}` : ""}
        </p>
        <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-ink">
          <Link
            href={`/renungan/${renungan.slug}`}
            className="hover:text-brand-700"
          >
            {renungan.judul}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-ink/70">
          {renungan.cuplikan}
        </p>
        <Link
          href={`/renungan/${renungan.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          Baca selengkapnya
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
              d="M13.5 5.5L20 12l-6.5 6.5M20 12H4"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}

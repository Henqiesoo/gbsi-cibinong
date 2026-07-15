import Image from "next/image";
import { formatTanggal } from "@/lib/data/renungan";
import type { Acara } from "@/lib/data/acara";

// Kartu acara/seminar dengan poster (dipakai di Beranda & halaman Acara).
export default function CardAcara({ acara }: { acara: Acara }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-sm">
      {acara.poster && (
        <span className="relative block aspect-[3/4] bg-cream-100">
          <Image
            src={acara.poster}
            alt={`Poster ${acara.judul}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </span>
      )}
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          {formatTanggal(acara.tanggal)}
        </p>
        <h3 className="mt-1.5 font-serif text-lg font-semibold leading-snug text-ink">
          {acara.judul}
        </h3>
        {acara.tema && (
          <p className="mt-1.5 text-sm leading-relaxed text-ink/60">
            {acara.tema}
          </p>
        )}
      </div>
    </article>
  );
}

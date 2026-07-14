import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

// Ganti foto hero di /public/images/hero/ibadah-utama.jpg
// (disarankan lanskap, minimal 1600px lebar).
export default function Hero() {
  return (
    <section className="relative flex min-h-[70vh] items-center md:min-h-[80vh]">
      <Image
        src="/images/hero/ibadah-utama.jpg"
        alt="Jemaat GBSI Cibinong di ruang ibadah utama"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Overlay gelap tipis supaya teks tetap terbaca */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/50 to-ink/30" />

      <div className="relative mx-auto w-full max-w-content px-4 py-20 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-200">
          Gereja Berea Sungrak Indonesia · Cabang Cibinong
        </p>
        <h1 className="mt-4 max-w-2xl font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
          {site.tagline}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream-100">
          Mari bertumbuh bersama dalam Firman Tuhan. Kami menantikan kehadiran
          Saudara dalam ibadah dan persekutuan di GBSI Cibinong.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/jadwal"
            className="rounded-full bg-brand-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-colors hover:bg-brand-400"
          >
            Jadwal Ibadah
          </Link>
          <Link
            href="/kontak"
            className="rounded-full border border-white/60 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            Hubungi Kami
          </Link>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { getHeroUrl } from "@/lib/data/pengaturan";
import { site } from "@/lib/site";

// Foto hero bisa diganti dari panel admin (/admin/beranda). Sebelum
// Supabase tersambung, dipakai /images/hero/ibadah-utama.jpg.
export default async function Hero() {
  const heroUrl = await getHeroUrl();
  return (
    <section className="relative flex min-h-[70vh] items-center md:min-h-[80vh]">
      <Image
        src={heroUrl}
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
        <p className="mt-5 max-w-2xl text-base italic leading-relaxed text-cream-100 sm:text-lg">
          “Tetapi pada malam itu juga segera saudara-saudara di situ menyuruh
          Paulus dan Silas berangkat ke Berea. Setibanya di situ pergilah
          mereka ke rumah ibadat orang Yahudi. Orang-orang Yahudi di kota itu
          lebih baik hatinya dari pada orang-orang Yahudi di Tesalonika,
          karena mereka menerima firman itu dengan segala kerelaan hati dan
          setiap hari mereka menyelidiki Kitab Suci untuk mengetahui, apakah
          semuanya itu benar demikian.”
        </p>
        <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-brand-200">
          Kisah Para Rasul 17:10-11 (TB)
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

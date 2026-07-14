import Image from "next/image";
import Link from "next/link";
import CardRenungan from "@/components/CardRenungan";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import { getGaleriPreview } from "@/lib/data/galeri";
import { getJadwalUtama } from "@/lib/data/jadwal";
import { getRenunganTerbaru } from "@/lib/data/renungan";

export default async function BerandaPage() {
  const [jadwalUtama, renunganTerbaru, galeriPreview] = await Promise.all([
    getJadwalUtama(),
    getRenunganTerbaru(3),
    getGaleriPreview(6),
  ]);

  return (
    <>
      <Hero />

      {/* Preview jadwal ibadah */}
      <section className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            kicker="Mari Beribadah"
            judul="Jadwal Ibadah"
            deskripsi="Kami menantikan kehadiran Saudara. Berikut jadwal kegiatan utama setiap minggunya."
          />
          <Link
            href="/jadwal"
            className="text-sm font-semibold text-brand-600 hover:text-brand-700 hover:underline"
          >
            Lihat jadwal lengkap →
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {jadwalUtama.map((item) => (
            <div
              key={`${item.hari}-${item.kegiatan}`}
              className="rounded-2xl border border-cream-200 bg-white p-6 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                {item.hari}
              </p>
              <p className="mt-2 font-serif text-lg font-semibold leading-snug text-ink">
                {item.kegiatan}
              </p>
              <p className="mt-3 text-2xl font-bold text-brand-700">
                {item.jam}
                <span className="ml-1 text-xs font-medium text-ink/50">
                  WIB
                </span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Preview renungan */}
      <section className="bg-cream-100">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              kicker="Firman Tuhan"
              judul="Renungan Terbaru"
              deskripsi="Renungan Firman untuk menguatkan perjalanan iman Saudara setiap hari."
            />
            <Link
              href="/renungan"
              className="text-sm font-semibold text-brand-600 hover:text-brand-700 hover:underline"
            >
              Semua renungan →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {renunganTerbaru.map((r) => (
              <CardRenungan key={r.slug} renungan={r} />
            ))}
          </div>
        </div>
      </section>

      {/* Preview galeri */}
      <section className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            kicker="Dokumentasi"
            judul="Galeri Kegiatan"
            deskripsi="Sekilas kebersamaan jemaat dalam ibadah, pujian, dan persekutuan."
          />
          <Link
            href="/galeri"
            className="text-sm font-semibold text-brand-600 hover:text-brand-700 hover:underline"
          >
            Lihat semua foto →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {galeriPreview.map((foto) => (
            <Link
              key={foto.src}
              href="/galeri"
              className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-cream-200"
            >
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Ajakan / CTA */}
      <section className="bg-brand-700">
        <div className="mx-auto max-w-content px-4 py-16 text-center sm:px-6 md:py-20">
          <h2 className="mx-auto max-w-2xl font-serif text-3xl font-semibold text-white sm:text-4xl">
            Saudara Selalu Disambut di Rumah Tuhan
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-brand-100">
            Datang dan beribadahlah bersama kami. Bila ada pertanyaan atau
            permohonan doa, jangan ragu untuk menghubungi kami.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/kontak"
              className="rounded-full bg-white px-7 py-3.5 text-base font-semibold text-brand-700 shadow-lg transition-colors hover:bg-cream-100"
            >
              Hubungi Kami
            </Link>
            <Link
              href="/tentang"
              className="rounded-full border border-white/60 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Tentang GBSI Cibinong
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

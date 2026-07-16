import Image from "next/image";
import Link from "next/link";
import BackgroundMusic from "@/components/BackgroundMusic";
import CardAcara from "@/components/CardAcara";
import CardRenungan from "@/components/CardRenungan";
import FadeIn from "@/components/FadeIn";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import { getAcaraMendatang } from "@/lib/data/acara";
import { getGaleriPreview } from "@/lib/data/galeri";
import { getJadwalUtama } from "@/lib/data/jadwal";
import { getTemaTahunan } from "@/lib/data/pengaturan";
import { getRenunganTerbaru } from "@/lib/data/renungan";

export const revalidate = 300;

export default async function BerandaPage() {
  const [jadwalUtama, renunganTerbaru, galeriPreview, acaraMendatang, tema] =
    await Promise.all([
      getJadwalUtama(),
      getRenunganTerbaru(3),
      getGaleriPreview(6),
      getAcaraMendatang(),
      getTemaTahunan(),
    ]);

  return (
    <>
      {/* Musik latar hanya di Beranda — berhenti saat pindah halaman */}
      <BackgroundMusic />
      <Hero />

      {/* Poster tema tahunan (tampil bila diunggah lewat panel admin) */}
      {tema.poster && (
        <section className="mx-auto max-w-content px-4 pt-16 sm:px-6 md:pt-24">
          <figure className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-sm">
            <Image
              src={tema.poster}
              alt={`Poster tema: ${tema.teks}`}
              width={1200}
              height={800}
              className="h-auto w-full"
            />
          </figure>
        </section>
      )}

      {/* Acara & seminar mendatang (otomatis tersembunyi bila kosong) */}
      {acaraMendatang.length > 0 && (
        <section className="mx-auto max-w-content px-4 pt-16 sm:px-6 md:pt-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              kicker="Jangan Lewatkan"
              judul="Acara & Seminar"
              deskripsi="Kegiatan yang akan datang — mari hadir dan ajak keluarga."
            />
            <Link
              href="/acara"
              className="text-sm font-semibold text-brand-600 hover:text-brand-700 hover:underline"
            >
              Semua acara →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {acaraMendatang.slice(0, 3).map((a) => (
              <CardAcara key={a.id} acara={a} />
            ))}
          </div>
        </section>
      )}

      {/* Preview jadwal ibadah */}
      <section className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-24">
        <FadeIn className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            kicker="Mari Sukseskan Ibadah"
            judul="Jadwal Ibadah"
            deskripsi="Berikut adalah jadwal kegiatan kami."
          />
          <Link
            href="/jadwal"
            className="text-sm font-semibold text-brand-600 hover:text-brand-700 hover:underline"
          >
            Lihat jadwal lengkap →
          </Link>
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {jadwalUtama.map((item, i) => (
            <FadeIn
              key={`${item.hari}-${item.kegiatan}`}
              delay={i * 70}
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
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Preview renungan */}
      <section className="bg-cream-100">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-24">
          <FadeIn className="flex flex-wrap items-end justify-between gap-4">
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
          </FadeIn>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {renunganTerbaru.map((r, i) => (
              <FadeIn key={r.slug} delay={i * 70}>
                <CardRenungan renungan={r} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Preview galeri */}
      <section className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-24">
        <FadeIn className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            kicker="Dokumentasi"
            judul="Galeri Kegiatan"
            deskripsi="Berikut adalah kebersamaan kami dalam persekutuan, pelayanan, komsel pengajaran, seminar, kelas Akademi Berea, dan lecture."
          />
          <Link
            href="/galeri"
            className="text-sm font-semibold text-brand-600 hover:text-brand-700 hover:underline"
          >
            Lihat semua foto →
          </Link>
        </FadeIn>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {galeriPreview.map((foto, i) => (
            <FadeIn key={foto.src} delay={i * 60}>
              <Link
                href="/galeri"
                className="group relative block aspect-[4/3] overflow-hidden rounded-xl bg-cream-200"
              >
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Ajakan / CTA */}
      <section className="bg-brand-700">
        <FadeIn className="mx-auto max-w-content px-4 py-16 text-center sm:px-6 md:py-20">
          <p className="mx-auto max-w-3xl font-serif text-xl font-medium italic leading-relaxed text-white sm:text-2xl">
            “Tetapi saatnya akan datang dan sudah tiba sekarang, bahwa
            penyembah-penyembah benar akan menyembah Bapa dalam roh dan
            kebenaran; sebab Bapa menghendaki penyembah-penyembah demikian.
            Allah itu Roh dan barangsiapa menyembah Dia, harus menyembah-Nya
            dalam roh dan kebenaran.”
          </p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-brand-200">
            Yohanes 4:23-24 (TB)
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
        </FadeIn>
      </section>
    </>
  );
}

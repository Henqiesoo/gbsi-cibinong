import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JadwalTable from "@/components/JadwalTable";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import { getJadwal } from "@/lib/data/jadwal";
import { getJadwalTugas } from "@/lib/data/jadwal-tugas";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Jadwal Ibadah",
  description: `Jadwal ibadah dan kegiatan mingguan ${site.namaLengkap}.`,
};

export const revalidate = 300;

export default async function JadwalPage() {
  const [jadwal, jadwalTugas] = await Promise.all([
    getJadwal(),
    getJadwalTugas(),
  ]);

  return (
    <>
      <PageHeader
        kicker="Mari Beribadah"
        judul="Jadwal Ibadah"
        deskripsi="Jadwal kegiatan mingguan GBSI Cibinong. Seluruh kegiatan bertempat di gedung gereja, Jalan Tapos No. 403 Ciriung, Cibinong."
      />

      <section className="mx-auto max-w-content px-4 py-12 sm:px-6 md:py-16">
        <JadwalTable jadwal={jadwal} />

        {/* Jadwal tugas pelayanan (diunggah pengurus lewat panel admin) */}
        {jadwalTugas.length > 0 && (
          <div className="mt-14">
            <SectionHeading
              kicker="Pelayanan"
              judul="Jadwal Tugas"
              deskripsi="Jadwal tugas pelayanan terbaru — klik unduh untuk menyimpan."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {jadwalTugas.map((j) => (
                <figure
                  key={j.id}
                  className="overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-sm"
                >
                  <a href={`/api/jadwal-tugas/${j.id}/unduh`}>
                    <span className="relative block aspect-[4/3]">
                      <Image
                        src={j.url}
                        alt={j.judul}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </span>
                  </a>
                  <figcaption className="flex items-center justify-between gap-3 p-4">
                    <p className="font-medium leading-snug text-ink">
                      {j.judul}
                    </p>
                    <a
                      href={`/api/jadwal-tugas/${j.id}/unduh`}
                      className="shrink-0 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500"
                    >
                      Unduh
                    </a>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 rounded-2xl bg-brand-50 p-6 sm:p-8">
          <h2 className="font-serif text-xl font-semibold text-ink">
            Baru pertama kali berkunjung?
          </h2>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink/70">
            Saudara tidak perlu sungkan — datang saja sesuai jadwal di atas,
            atau hubungi kami terlebih dahulu bila memerlukan informasi
            tambahan. Kami dengan senang hati menyambut Saudara.
          </p>
          <Link
            href="/kontak"
            className="mt-5 inline-block rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
          >
            Hubungi Kami
          </Link>
        </div>
      </section>
    </>
  );
}

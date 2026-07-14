import type { Metadata } from "next";
import Link from "next/link";
import JadwalTable from "@/components/JadwalTable";
import PageHeader from "@/components/PageHeader";
import { getJadwal } from "@/lib/data/jadwal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Jadwal Ibadah",
  description: `Jadwal ibadah dan kegiatan mingguan ${site.namaLengkap}.`,
};

export default async function JadwalPage() {
  const jadwal = await getJadwal();

  return (
    <>
      <PageHeader
        kicker="Mari Beribadah"
        judul="Jadwal Ibadah"
        deskripsi="Jadwal kegiatan mingguan GBSI Cibinong. Seluruh kegiatan bertempat di gedung gereja, Jalan Tapos No. 403 Ciriung, Cibinong."
      />

      <section className="mx-auto max-w-content px-4 py-12 sm:px-6 md:py-16">
        <JadwalTable jadwal={jadwal} />

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

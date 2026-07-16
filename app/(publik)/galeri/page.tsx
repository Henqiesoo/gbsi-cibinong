import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import GaleriGrid from "@/components/GaleriGrid";
import PageHeader from "@/components/PageHeader";
import { getGaleri } from "@/lib/data/galeri";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Galeri",
  description: `Dokumentasi ibadah, persekutuan, dan fasilitas ${site.namaLengkap}.`,
};

export const revalidate = 300;

export default async function GaleriPage() {
  const foto = await getGaleri();

  return (
    <>
      <PageHeader
        kicker="Dokumentasi"
        judul="Galeri"
        deskripsi="Kebersamaan jemaat GBSI Cibinong dalam ibadah, pujian, persekutuan, dan berbagai kegiatan. Klik foto untuk memperbesar."
      />

      <section className="mx-auto max-w-content px-4 py-12 sm:px-6 md:py-16">
        <FadeIn>
          <GaleriGrid foto={foto} />
        </FadeIn>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: `Sejarah, visi & misi, serta struktur pelayanan ${site.namaLengkap}.`,
};

// ——— Konten di bawah ini adalah placeholder yang mudah diedit ———

const sejarah = [
  {
    periode: "1969 · Seoul, Korea",
    judul: "Gereja Sungrak Berdiri",
    isi: "Gereja Sungrak (Sungrak Church) didirikan di Seoul, Korea Selatan, oleh Pdt. Kim Ki Dong. Dari gereja inilah lahir Gerakan Berea — pelayanan yang menekankan kembalinya umat kepada pemahaman Firman Tuhan yang utuh, seperti jemaat Berea yang setiap hari menyelidiki Kitab Suci (Kisah Para Rasul 17:11).",
  },
  {
    periode: "Masuk ke Indonesia",
    judul: "Gereja Berea Sungrak Indonesia",
    isi: "Melalui pelayanan Pdt. Yohana Kho, pengajaran Berea dan pelayanan Gereja Sungrak dibawa masuk ke Indonesia, hingga berdirilah Gereja Berea Sungrak Indonesia (GBSI) yang melayani jemaat di berbagai kota.", // TODO: lengkapi tahun & detail sejarah
  },
  {
    periode: "GBSI Cabang Cibinong",
    judul: "Pelayanan di Cibinong",
    isi: "GBSI Cabang Cibinong hadir untuk melayani jemaat di wilayah Cibinong dan sekitarnya — bertekun dalam doa pagi setiap hari, ibadah Hari Tuhan, dan pendalaman Firman melalui Berea Academy.", // TODO: lengkapi tahun berdiri & kisah singkat cabang
  },
];

// TODO: Visi & Misi masih placeholder — akan diisi manual.
const visi =
  "Menjadi gereja yang berakar dalam Firman Tuhan dan menjadi berkat bagi Cibinong dan sekitarnya. (Placeholder — akan diisi)";

const misi = [
  "Membawa jemaat kembali kepada Firman Tuhan. (Placeholder)",
  "Membina jemaat melalui pengajaran Berea. (Placeholder)",
  "Menjangkau jiwa-jiwa melalui kesaksian dan pelayanan kasih. (Placeholder)",
  "Membangun persekutuan jemaat yang saling menguatkan. (Placeholder)",
];

// TODO: nama divisi masih placeholder — sesuaikan dengan struktur asli.
const divisiPelayanan = [
  {
    nama: "Divisi Ibadah & Pujian",
    deskripsi: "Pelayanan ibadah, musik, dan koor.",
  },
  {
    nama: "Divisi Doa",
    deskripsi: "Doa pagi dan ibadah doa tengah minggu.",
  },
  {
    nama: "Divisi Pengajaran",
    deskripsi: "Berea Academy dan pendalaman Alkitab.",
  },
  {
    nama: "Divisi Persekutuan & Diakonia",
    deskripsi: "Persekutuan jemaat dan pelayanan kasih.",
  },
];

export default function TentangPage() {
  return (
    <>
      <PageHeader
        kicker="Tentang Kami"
        judul="GBSI Cabang Cibinong"
        deskripsi="Bagian dari keluarga besar Gereja Berea Sungrak Indonesia — persekutuan jemaat yang rindu kembali kepada Firman Tuhan."
      />

      {/* Sejarah */}
      <section className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-24">
        <SectionHeading
          kicker="Perjalanan Kami"
          judul="Sejarah GBSI"
          deskripsi="Dari Seoul hingga Cibinong — Tuhan menuntun langkah demi langkah."
        />

        <ol className="relative mt-12 space-y-10 border-l-2 border-brand-200 pl-6 sm:pl-8">
          {sejarah.map((babak) => (
            <li key={babak.judul} className="relative">
              <span className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-4 border-cream-50 bg-brand-600 sm:-left-[39px]" />
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
                {babak.periode}
              </p>
              <h3 className="mt-1 font-serif text-2xl font-semibold text-ink">
                {babak.judul}
              </h3>
              <p className="mt-2 max-w-3xl text-base leading-relaxed text-ink/70">
                {babak.isi}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Visi & Misi */}
      <section className="bg-cream-100">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-24">
          <SectionHeading kicker="Arah Pelayanan" judul="Visi & Misi" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-cream-200 bg-white p-8 shadow-sm">
              <h3 className="font-serif text-xl font-semibold text-brand-700">
                Visi
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink/80">
                {visi}
              </p>
            </div>
            <div className="rounded-2xl border border-cream-200 bg-white p-8 shadow-sm">
              <h3 className="font-serif text-xl font-semibold text-brand-700">
                Misi
              </h3>
              <ul className="mt-3 space-y-3">
                {misi.map((item, i) => (
                  <li key={item} className="flex gap-3 text-base leading-relaxed text-ink/80">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Struktur pelayanan */}
      <section className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-24">
        <SectionHeading
          kicker="Pelayan Tuhan"
          judul="Struktur Pelayanan"
          deskripsi="Pelayanan GBSI Cibinong dikoordinasikan bersama dalam beberapa divisi."
        />

        <div className="mt-10 rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Koordinator
          </p>
          <p className="mt-2 font-serif text-2xl font-semibold text-ink">
            Ev. Peterus Daniel Imanuel, S.Th.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {divisiPelayanan.map((divisi) => (
            <div
              key={divisi.nama}
              className="rounded-2xl border border-cream-200 bg-white p-6 shadow-sm"
            >
              <h3 className="font-serif text-lg font-semibold leading-snug text-ink">
                {divisi.nama}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">
                {divisi.deskripsi}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Foto jemaat & plakat */}
      <section className="mx-auto max-w-content px-4 pb-16 sm:px-6 md:pb-24">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Ganti foto di /public/images/tentang/ */}
          <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream-200">
            <Image
              src="/images/tentang/jemaat.jpg"
              alt="Jemaat GBSI Cibinong"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </figure>
          <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream-200">
            <Image
              src="/images/tentang/plakat-gbsi.jpg"
              alt="Plakat GBSI Cabang Cibinong"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </figure>
        </div>
      </section>
    </>
  );
}

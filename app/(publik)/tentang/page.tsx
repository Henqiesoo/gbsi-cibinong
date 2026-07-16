import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import {
  KOORDINATOR,
  getFotoPengurus,
  getFotoTentang,
  getMisi,
  getSejarah,
  getStruktur,
  getVisi,
  pisahNama,
} from "@/lib/data/tentang";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: `Sejarah, visi & misi, serta struktur pelayanan ${site.namaLengkap}.`,
};

export const revalidate = 300;

// Garis besar perjalanan (dari Gereja Sungrak Korea hingga Cibinong).
const perjalanan = [
  {
    periode: "1969 · Seoul, Korea",
    judul: "Gereja Sungrak Berdiri",
    isi: "Gereja Sungrak (Sungrak Church) didirikan di Seoul, Korea Selatan, oleh Pdt. Kim Ki Dong. Dari gereja inilah lahir Gerakan Berea — pelayanan yang menekankan kembalinya umat kepada pemahaman Firman Tuhan yang utuh, seperti jemaat Berea yang setiap hari menyelidiki Kitab Suci (Kisah Para Rasul 17:11).",
  },
  {
    periode: "Masuk ke Indonesia",
    judul: "Gereja Berea Sungrak Indonesia",
    isi: "Melalui pelayanan Pdt. Yohana Kho, pengajaran Berea dan pelayanan Gereja Sungrak dibawa masuk ke Indonesia, hingga berdirilah Gereja Berea Sungrak Indonesia (GBSI) yang melayani jemaat di berbagai kota, dengan Gereja Pusat di Karawaci, Tangerang.",
  },
  {
    periode: "30 September 2007",
    judul: "GBSI Cabang Cibinong",
    isi: "Berawal dari komsel keluarga, GBSI Cabang Cibinong melaksanakan ibadah perdananya dan terus bertumbuh melayani jemaat di wilayah Cibinong dan sekitarnya hingga hari ini.",
  },
];

const ukuranAvatar = {
  besar: { kelas: "h-28 w-28 border-4 text-4xl", sizes: "112px" },
  kecil: { kelas: "h-16 w-16 border-2 text-xl", sizes: "64px" },
  mini: { kelas: "h-10 w-10 border-2 text-sm", sizes: "40px" },
} as const;

// Avatar bulat satu orang: foto bila ada, bila tidak inisial nama.
function Avatar({
  foto,
  nama,
  ukuran,
}: {
  foto?: string;
  nama: string;
  ukuran: keyof typeof ukuranAvatar;
}) {
  const u = ukuranAvatar[ukuran];
  if (foto) {
    return (
      <span
        title={nama}
        className={`relative block shrink-0 overflow-hidden rounded-full border-white shadow-md ${u.kelas}`}
      >
        <Image
          src={foto}
          alt={nama}
          fill
          sizes={u.sizes}
          className="object-cover"
        />
      </span>
    );
  }
  return (
    <span
      title={nama}
      className={`flex shrink-0 items-center justify-center rounded-full border-white bg-brand-100 font-serif font-bold text-brand-700 shadow-md ${u.kelas}`}
    >
      {nama.replace(/^(Ev|Idt|Dc|Bp|Ibu)\.?\s+/i, "").charAt(0).toUpperCase()}
    </span>
  );
}

// Deretan avatar untuk satu unit — satu avatar per orang (unit berdua
// otomatis tampil dua foto berdampingan).
function DeretAvatar({
  pengurus,
  fotoMap,
  ukuran,
}: {
  pengurus: string;
  fotoMap: Record<string, string>;
  ukuran: keyof typeof ukuranAvatar;
}) {
  const orang = pisahNama(pengurus);
  if (orang.length === 0) return null;
  return (
    <span className="flex justify-center -space-x-2">
      {orang.map((n) => (
        <Avatar
          key={n}
          nama={n}
          foto={fotoMap[n.toLowerCase()]}
          ukuran={ukuran}
        />
      ))}
    </span>
  );
}

export default async function TentangPage() {
  const [sejarah, struktur, fotoPengurus, visi, misi, fotoTentang] =
    await Promise.all([
      getSejarah(),
      getStruktur(),
      getFotoPengurus(),
      getVisi(),
      getMisi(),
      getFotoTentang(),
    ]);
  const unitMandiri = struktur.unit.filter((u) => !u.bidang);
  const bidang = struktur.unit.filter((u) => u.bidang);

  return (
    <>
      <PageHeader
        kicker="Tentang Kami"
        judul="GBSI Cabang Cibinong"
        deskripsi="Bagian dari keluarga besar Gereja Berea Sungrak Indonesia — persekutuan jemaat yang rindu kembali kepada Firman Tuhan."
      />

      {/* Perjalanan */}
      <section className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-24">
        <SectionHeading
          kicker="Perjalanan Kami"
          judul="Dari Seoul hingga Cibinong"
          deskripsi="Tuhan menuntun langkah demi langkah."
        />

        <ol className="relative mt-12 space-y-10 border-l-2 border-brand-200 pl-6 sm:pl-8">
          {perjalanan.map((babak) => (
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

      {/* Sejarah lengkap cabang (bisa diedit dari panel admin) */}
      <section className="bg-cream-100">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-24">
          <SectionHeading
            kicker="Kisah Kami"
            judul="Sejarah GBSI Cibinong"
          />
          <div className="mt-8 max-w-3xl space-y-5">
            {sejarah.map((paragraf) => (
              <p
                key={paragraf.slice(0, 40)}
                className="text-base leading-relaxed text-ink/80"
              >
                {paragraf}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-24">
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
                <li
                  key={item}
                  className="flex gap-3 text-base leading-relaxed text-ink/80"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Struktur kepengurusan (bisa diedit dari panel admin) */}
      <section className="bg-cream-100">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-24">
          <SectionHeading
            kicker="Pelayan Tuhan"
            judul="Struktur Kepengurusan"
            deskripsi={`Struktur kepengurusan GBSI Cibinong periode ${struktur.periode}.`}
          />

          {/* Koordinator — paling atas */}
          <div className="mx-auto mt-10 max-w-md rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center">
            <span className="flex justify-center">
              <Avatar
                foto={
                  fotoPengurus[KOORDINATOR.nama.toLowerCase()] ??
                  "/images/tentang/koordinator.jpg"
                }
                nama={KOORDINATOR.nama}
                ukuran="besar"
              />
            </span>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-brand-600">
              {KOORDINATOR.jabatan}
            </p>
            <p className="mt-2 font-serif text-2xl font-semibold text-ink">
              {KOORDINATOR.nama}
            </p>
          </div>

          {/* Penasehat & unit mandiri lain — di bawah koordinator */}
          {unitMandiri.length > 0 && (
            <div className="mx-auto mt-4 grid max-w-md gap-4">
              {unitMandiri.map((u) => (
                <div
                  key={u.nama}
                  className="rounded-2xl border border-cream-200 bg-white p-8 text-center"
                >
                  <DeretAvatar
                    pengurus={u.pengurus || u.nama}
                    fotoMap={fotoPengurus}
                    ukuran="besar"
                  />
                  <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-brand-600">
                    {u.nama}
                  </p>
                  <p className="mt-2 font-serif text-xl font-semibold text-ink">
                    {u.pengurus}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Bidang-bidang — setiap orang (termasuk sub-unit) berfoto */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {bidang.map((b) => (
              <div
                key={b.nama}
                className="rounded-2xl border border-cream-200 bg-white p-6 text-center shadow-sm"
              >
                <DeretAvatar
                  pengurus={b.pengurus || b.nama}
                  fotoMap={fotoPengurus}
                  ukuran="kecil"
                />
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-brand-600">
                  {b.nama}
                </p>
                <p className="mt-1 font-serif text-lg font-semibold leading-snug text-ink">
                  {b.pengurus}
                </p>
                {b.sub.length > 0 && (
                  <ul className="mt-4 space-y-3 border-t border-cream-200 pt-4">
                    {b.sub.map((s) => (
                      <li key={s.nama} className="flex items-center gap-3">
                        <DeretAvatar
                          pengurus={s.pengurus || s.nama}
                          fotoMap={fotoPengurus}
                          ukuran="mini"
                        />
                        <span className="min-w-0 text-left text-sm leading-snug">
                          <span className="block font-medium text-ink">
                            {s.nama}
                          </span>
                          {s.pengurus && (
                            <span className="block text-ink/60">
                              {s.pengurus}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Foto jemaat & plakat (bisa diganti dari panel admin) */}
      <section className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-4 md:grid-cols-2">
          <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream-200">
            <Image
              src={fotoTentang.jemaat}
              alt="Jemaat GBSI Cibinong"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </figure>
          <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream-200">
            <Image
              src={fotoTentang.plakat}
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

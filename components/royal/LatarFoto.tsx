// Latar adegan tema Royal Red.
//
// Sebelumnya latarnya berupa gambar vektor (SVG) buatan sendiri — hasilnya
// terbaca sebagai animasi 2D flat seperti templat Canva/After Effects. Kini
// setiap adegan memakai FOTO asli, digarap seperti potongan film:
//
//   • gerak kamera pelan (dolly maju / pan menyamping), bukan diam
//   • gradasi warna hangat kemerahan menimpa foto
//   • titik-titik cahaya lilin & lampu gantung yang kabur (bokeh)
//   • vignette gelap di tepi supaya mata tertuju ke tengah
//   • butiran film halus supaya tidak terasa "bersih" seperti render vektor
//
// Foto yang dipakai bisa diganti dari satu tempat: konstanta FOTO di
// components/CinematicInvitation.tsx.

type Gerak = "dolly" | "geser" | "diam";

export default function LatarFoto({
  src,
  posisi = "center",
  gerak = "dolly",
  buram = 0,
  gelap = 0.35,
  taruh = "tengah",
  children,
}: {
  src: string;
  /* object-position foto, mis. "center 35%" */
  posisi?: string;
  gerak?: Gerak;
  /* Kekaburan latar dalam piksel — dipakai pada adegan yang isinya padat */
  buram?: number;
  /* Kepekatan lapisan hitam di atas foto (0–1) */
  gelap?: number;
  taruh?: "tengah" | "bawah";
  children?: React.ReactNode;
}) {
  const kelasGerak =
    gerak === "dolly" ? "art-dolly" : gerak === "geser" ? "art-geser" : "scale-105";

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#100609]">
      {/* Foto diperbesar sedikit lebih besar dari kekaburannya, supaya tepi
          yang meleber tidak menyisakan bidang kosong di pinggir layar */}
      <div className="absolute inset-0" style={{ transform: `scale(${1 + buram / 55})` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          className={`h-full w-full object-cover ${kelasGerak}`}
          style={{
            objectPosition: posisi,
            filter: buram ? `blur(${buram}px) saturate(1.05)` : "saturate(1.04) contrast(1.04)",
          }}
        />
      </div>

      {/* Gradasi warna: merah marun hangat khas ruang pemberkatan */}
      <div className="absolute inset-0 bg-[#4a1016] opacity-40 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1c0709]/85 via-transparent to-[#1c0709]/45" />

      {/* Titik cahaya lilin & lampu gantung yang kabur */}
      <div className="sinema-bokeh pointer-events-none absolute inset-0" />

      {/* Vignette + butiran film */}
      <div className="sinema-vignette pointer-events-none absolute inset-0" />
      <div className="sinema-butir pointer-events-none absolute inset-0" />

      {/* Lapisan gelap tambahan untuk adegan yang isinya banyak teks */}
      <div className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: gelap }} />

      <div
        className={`relative flex h-full flex-col items-center px-7 text-center ${
          taruh === "bawah" ? "justify-end pb-16" : "justify-center"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

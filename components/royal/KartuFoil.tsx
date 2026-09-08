/* Kartu bertepi foil emas — dipakai bersama oleh tiga elemen tema Royal
   Red: monogram bulat, kartu undangan utama, dan kartu rangkaian acara.

   Sengaja satu komponen supaya gradasi emasnya benar-benar sama persis di
   ketiganya; kalau nilainya disalin ke tiga tempat, cepat atau lambat
   salah satunya bergeser dan ketiganya berhenti terasa satu sistem.

   Susunannya berlapis:
     • satu atau dua bidang kabur di belakang  → bayangan jatuh bertumpuk
     • bingkai luar berisi 3 px gradasi emas   → tepi foil
     • sapuan putih miring di atas bingkai     → kilau
     • bidang dalam marun gelap + garis sorot  → isi kartu

   Semuanya CSS bawaan: gradient, box-shadow, filter blur. Tanpa berkas
   gambar dan tanpa pustaka tambahan. */

const EMAS =
  "linear-gradient(125deg, #fff3d0 0%, #f6dfa0 15%, #c99b3f 35%, #7a5518 50%, #c99b3f 65%, #f6dfa0 85%, #fff3d0 100%)";

const KILAU =
  "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.55) 42%, transparent 54%)";

const ISI =
  "linear-gradient(165deg, rgba(255,255,255,0.06) 0%, transparent 30%), linear-gradient(165deg,#4a1f1f 0%,#3a1616 55%,#2a0e0e 100%)";

const GLOW = {
  besar: "0 0 22px 3px rgba(246,223,160,0.4), 0 40px 90px rgba(0,0,0,0.6)",
  kecil: "0 0 16px 2px rgba(246,223,160,0.4), 0 12px 30px rgba(0,0,0,0.5)",
} as const;

export default function KartuFoil({
  radiusLuar,
  radiusDalam,
  glow = "besar",
  /* Banyaknya bidang bayangan di belakang kartu. Monogram tidak memakainya
     (0); kartu acara cukup satu supaya HP kelas bawah tidak menanggung
     empat bidang blur sekaligus saat dua kartu tampil bersamaan. */
  bayangan = 0,
  className = "",
  isiClassName = "",
  gaya,
  children,
}: {
  radiusLuar: string;
  radiusDalam: string;
  glow?: keyof typeof GLOW;
  bayangan?: 0 | 1 | 2;
  className?: string;
  isiClassName?: string;
  gaya?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div className={`relative ${className}`} style={gaya}>
      {bayangan >= 1 && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            inset: "22px -8px -20px 8px",
            borderRadius: radiusLuar,
            background: "rgba(0,0,0,0.4)",
            filter: "blur(22px)",
            zIndex: 0,
          }}
        />
      )}
      {bayangan >= 2 && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            inset: "10px -3px -10px 3px",
            borderRadius: radiusLuar,
            background: "rgba(90,55,10,0.3)",
            filter: "blur(12px)",
            zIndex: 1,
          }}
        />
      )}

      {/* Bingkai foil: paddingnya sendiri yang menjadi tepi emas */}
      <div
        className="relative"
        style={{
          zIndex: 2,
          padding: "3px",
          borderRadius: radiusLuar,
          backgroundImage: EMAS,
          boxShadow: GLOW[glow],
        }}
      >
        {/* Kilau diagonal di atas foil */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ borderRadius: radiusLuar, backgroundImage: KILAU }}
        />

        <div
          className={`relative ${isiClassName}`}
          style={{
            borderRadius: radiusDalam,
            backgroundImage: ISI,
            boxShadow: "0 2px 0 rgba(255,225,170,0.15) inset",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

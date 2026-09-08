import { weddingConfig } from "@/lib/wedding-config";

// Latar pembuka tema Nusantara. Bawaannya foto pengantin berbusana adat
// Bali di depan gapura pura — undangan terasa lebih personal daripada
// memakai foto bangunan kosong.
export default function LatarPura({
  className = "",
  src = weddingConfig.bali.coverPhoto,
  /* Titik potong foto. Foto aslinya mendatar: di layar HP yang jangkung
     yang terpotong adalah sisi kiri-kanan, sedangkan di wadah yang lebih
     mendatar nilai ini yang menentukan bagian mana yang terlihat. */
  posisi = "center 30%",
}: {
  className?: string;
  src?: string;
  posisi?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      style={{ objectPosition: posisi }}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  );
}

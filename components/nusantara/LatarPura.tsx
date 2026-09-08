// Latar pembuka tema Nusantara: foto gapura pura Bali berdaun pintu emas.
// Sebelumnya bagian ini berupa gambar SVG buatan sendiri, tetapi hasilnya
// terasa seperti kartun — foto asli jauh lebih meyakinkan untuk undangan.
export default function LatarPura({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/photos/bali-pura.jpg"
      alt=""
      className={`absolute inset-0 h-full w-full object-cover object-center ${className}`}
    />
  );
}

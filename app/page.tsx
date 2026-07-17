import Invitation from "@/components/Invitation";

// Halaman utama: undangan versi umum (tanpa nama tamu personal).
// Tamu dengan link personal membuka /invite/[slug].
export default function HomePage() {
  return <Invitation guest={null} />;
}

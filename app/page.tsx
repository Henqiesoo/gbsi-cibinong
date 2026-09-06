import Invitation from "@/components/Invitation";

// Halaman utama: undangan versi umum tanpa nama tamu.
// Tamu dengan link personal membuka /invite/[slug].
export default function HomePage() {
  return <Invitation guest={null} rsvpAwal={null} />;
}

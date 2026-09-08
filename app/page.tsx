import Invitation from "@/components/Invitation";
import CinematicInvitation from "@/components/CinematicInvitation";
import { bacaTema, cssTema, TEMA } from "@/lib/themes";

// Halaman utama: undangan versi umum tanpa nama tamu.
// Tamu dengan link personal membuka /invite/[slug].
export default function HomePage({
  searchParams,
}: {
  searchParams: { tema?: string };
}) {
  const tema = bacaTema(searchParams.tema);
  const css = cssTema(tema);

  return (
    <>
      {/* Dirender di server sehingga warna sudah benar sejak cat pertama */}
      {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
      {/* Tema dengan format "adegan" bukan halaman gulir, melainkan
          rangkaian adegan yang berganti sendiri. */}
      {TEMA[tema].format === "adegan" ? (
        <CinematicInvitation guest={null} rsvpAwal={null} />
      ) : (
        <Invitation guest={null} rsvpAwal={null} tema={tema} />
      )}
    </>
  );
}

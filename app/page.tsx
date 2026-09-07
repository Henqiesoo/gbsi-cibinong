import Invitation from "@/components/Invitation";
import CinematicInvitation from "@/components/CinematicInvitation";
import { bacaTema, cssTema } from "@/lib/themes";

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
      {/* Tema Royal Red bukan halaman gulir, melainkan rangkaian adegan
          yang berganti sendiri — jadi tata letaknya memang berbeda. */}
      {tema === "royal" ? (
        <CinematicInvitation guest={null} rsvpAwal={null} />
      ) : (
        <Invitation guest={null} rsvpAwal={null} tema={tema} />
      )}
    </>
  );
}

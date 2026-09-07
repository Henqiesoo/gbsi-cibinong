import Invitation from "@/components/Invitation";
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
      <Invitation guest={null} rsvpAwal={null} tema={tema} />
    </>
  );
}

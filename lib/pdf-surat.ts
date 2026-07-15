// Unduhan PDF surat gembala — memakai layout & watermark yang sama
// dengan PDF renungan (lib/pdf-renungan.tsx), berlabel "Surat Gembala".

import type { Renungan } from "@/lib/data/renungan";
import type { SuratGembala } from "@/lib/data/surat-gembala";
import { watermark } from "@/lib/watermark";

// Dipanggil dari browser (tombol "Unduh PDF" di halaman surat).
export async function unduhPdfSurat(surat: SuratGembala) {
  const [{ pdf }, { buatDokumenRenungan }] = await Promise.all([
    import("@react-pdf/renderer"),
    import("@/lib/pdf-renungan"),
  ]);

  const sebagaiArtikel: Renungan = {
    slug: surat.slug,
    judul: surat.judul,
    tanggal: surat.tanggal,
    cuplikan: "",
    thumbnail: "",
    isi: surat.isi,
  };

  const logoSrc = new URL(watermark.logo, window.location.origin).href;
  const blob = await pdf(
    buatDokumenRenungan(sebagaiArtikel, { logoSrc, label: "Surat Gembala" })
  ).toBlob();

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `surat-gembala-${surat.slug}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

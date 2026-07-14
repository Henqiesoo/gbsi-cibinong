// Generator PDF renungan — satu-satunya tempat layout PDF didefinisikan.
// Dipakai oleh tombol "Unduh PDF" (browser) dan skrip preview (Node).
// Watermark (logo + teks) diambil dari lib/watermark.ts.

import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { formatTanggal, type Renungan } from "@/lib/data/renungan";
import { watermark } from "@/lib/watermark";
import { site } from "@/lib/site";

// Matikan pemenggalan kata pola Inggris — tidak cocok untuk Bahasa Indonesia.
Font.registerHyphenationCallback((kata) => [kata]);

const styles = StyleSheet.create({
  halaman: {
    paddingTop: 56,
    paddingBottom: 72,
    paddingHorizontal: 64,
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#22313A",
  },
  kop: {
    fontSize: 9,
    color: "#23747E",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  meta: {
    fontSize: 9,
    color: "#6B7A85",
    marginBottom: 14,
  },
  judul: {
    fontFamily: "Times-Bold",
    fontSize: 22,
    lineHeight: 1.25,
    marginBottom: 14,
  },
  kutipan: {
    borderLeftWidth: 2,
    borderLeftColor: "#7FC8CD",
    paddingLeft: 12,
    marginBottom: 16,
  },
  kutipanTeks: {
    fontFamily: "Times-Italic",
    fontSize: 12,
    lineHeight: 1.5,
    color: "#3A4A55",
  },
  paragraf: {
    lineHeight: 1.7,
    textAlign: "justify",
    marginBottom: 10,
  },
  atribusi: {
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: "#D8CFC0",
    fontFamily: "Helvetica-Oblique",
    fontSize: 9,
    color: "#6B7A85",
  },
  // Watermark posisi "footer": logo kecil + teks kredit di kaki halaman
  kakiHalaman: {
    position: "absolute",
    left: 64,
    right: 64,
    bottom: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 0.5,
    borderTopColor: "#D8CFC0",
    paddingTop: 8,
  },
  kakiKiri: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  kakiLogo: {
    height: 14,
  },
  kakiTeks: {
    fontSize: 8,
    color: "#8A9299",
  },
  // Watermark posisi "tengah": overlay logo transparan besar
  tengahWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  tengahLogo: {
    width: 320,
    opacity: 0.06,
  },
});

export type PosisiWatermarkPdf = "footer" | "tengah";

type OpsiPdf = {
  // URL absolut (browser) atau path file (Node) menuju logo watermark.
  logoSrc: string;
  posisi?: PosisiWatermarkPdf;
};

export function buatDokumenRenungan(renungan: Renungan, opsi: OpsiPdf) {
  const posisi = opsi.posisi ?? watermark.posisiPdf;

  return (
    <Document
      title={renungan.judul}
      author={site.namaLengkap}
      creator={watermark.teks}
    >
      <Page size="A4" style={styles.halaman}>
        {/* Overlay tengah — muncul di setiap halaman */}
        {posisi === "tengah" && (
          <View style={styles.tengahWrap} fixed>
            <Image src={opsi.logoSrc} style={styles.tengahLogo} />
          </View>
        )}

        <Text style={styles.kop}>{site.namaLengkap}</Text>
        <Text style={styles.meta}>
          Renungan · {formatTanggal(renungan.tanggal)}
          {renungan.ayat ? ` · ${renungan.ayat}` : ""}
        </Text>

        <Text style={styles.judul}>{renungan.judul}</Text>

        {renungan.kutipanAyat && (
          <View style={styles.kutipan}>
            <Text style={styles.kutipanTeks}>{renungan.kutipanAyat}</Text>
          </View>
        )}

        {renungan.isi.map((paragraf) => (
          <Text key={paragraf.slice(0, 40)} style={styles.paragraf}>
            {paragraf}
          </Text>
        ))}

        {renungan.atribusi && (
          <Text style={styles.atribusi}>{renungan.atribusi}</Text>
        )}

        {/* Kaki halaman — muncul di setiap halaman */}
        <View style={styles.kakiHalaman} fixed>
          <View style={styles.kakiKiri}>
            {posisi === "footer" && (
              <Image src={opsi.logoSrc} style={styles.kakiLogo} />
            )}
            <Text style={styles.kakiTeks}>{watermark.teks}</Text>
          </View>
          <Text
            style={styles.kakiTeks}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}

// Dipanggil dari browser (tombol "Unduh PDF").
export async function unduhPdfRenungan(renungan: Renungan) {
  const { pdf } = await import("@react-pdf/renderer");
  const logoSrc = new URL(watermark.logo, window.location.origin).href;
  const blob = await pdf(buatDokumenRenungan(renungan, { logoSrc })).toBlob();

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `renungan-${renungan.slug}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

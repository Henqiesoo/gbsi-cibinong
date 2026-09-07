import type { Metadata } from "next";
import { DAFTAR_TEMA, TEMA_BAWAAN } from "@/lib/themes";
import { weddingConfig } from "@/lib/wedding-config";

export const metadata: Metadata = {
  title: "Pilihan Tema — Undangan Pernikahan Digital",
  description: "Katalog tema undangan pernikahan digital yang tersedia.",
};

// Halaman katalog: memperlihatkan seluruh tema beserta link pratinjaunya.
// Berguna saat menunjukkan pilihan desain kepada calon pengguna.
export default function TemaPage() {
  const { groom, bride } = weddingConfig.couple;

  return (
    <div className="min-h-screen bg-[#faf7f2] px-5 py-14 text-[#23261f]">
      <div className="mx-auto max-w-3xl">
        <header className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b08d57]">
            Katalog Desain
          </p>
          <h1 className="mt-4 font-serif text-4xl font-light md:text-5xl">Pilihan Tema</h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#67735d]">
            Enam tema dengan warna, tipografi, bentuk, dan ornamen yang berbeda. Semua fitur
            (RSVP, galeri, amplop digital, gulir otomatis) sama di setiap tema.
          </p>
        </header>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {DAFTAR_TEMA.map((t, i) => {
            // Ambil beberapa warna kunci tema untuk ditampilkan sebagai contoh palet
            const contoh = ["--ivory-50", "--sage-700", "--sage-800", "--gold-400"].map(
              (k) => `rgb(${t.token[k]})`
            );
            const url = t.id === TEMA_BAWAAN ? "/" : `/?tema=${t.id}`;

            return (
              <a
                key={t.id}
                href={url}
                className="group block rounded-2xl border border-[#e2d7c3] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#b08d57]">
                      Tema {i + 1}
                    </p>
                    <h2 className="mt-1 font-serif text-2xl font-light">{t.nama}</h2>
                  </div>
                  <div className="flex shrink-0 gap-1.5 pt-1">
                    {contoh.map((c, j) => (
                      <span
                        key={j}
                        className="h-6 w-6 rounded-full border border-black/10"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[#67735d]">{t.deskripsi}</p>

                <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#3c4536] group-hover:text-[#b08d57]">
                  Lihat pratinjau
                  <span aria-hidden="true">→</span>
                </p>
              </a>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-[#e2d7c3] bg-white p-6">
          <h2 className="font-serif text-xl">Mencoba dengan nama tamu</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#67735d]">
            Tambahkan <code className="rounded bg-[#f8f4ec] px-1.5 py-0.5">?tema=</code> pada link
            undangan mana pun. Contoh untuk tamu bernama Rudi Hartono dengan tema Royal Red:
          </p>
          <p className="mt-3 break-all rounded-xl bg-[#f8f4ec] px-4 py-3 font-mono text-xs text-[#3c4536]">
            /invite/rudi-hartono?tema=royal
          </p>
          <p className="mt-4 text-xs text-[#849371]">
            Pernikahan {groom.nickname} &amp; {bride.nickname} · {weddingConfig.eventDateLabel} ·
            data contoh untuk demo
          </p>
        </div>
      </div>
    </div>
  );
}

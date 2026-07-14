import type { Renungan } from "@/lib/data/renungan";

const kelasInput =
  "mt-2 w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-base text-ink placeholder:text-ink/40 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30";

// Form renungan untuk buat baru maupun edit (dipakai dua halaman admin).
export default function FormRenungan({
  action,
  awal,
}: {
  action: string;
  awal?: Renungan;
}) {
  return (
    <form
      action={action}
      method="post"
      encType="multipart/form-data"
      className="space-y-5"
    >
      <div>
        <label htmlFor="judul" className="block text-sm font-semibold text-ink">
          Judul <span className="text-red-500">*</span>
        </label>
        <input
          id="judul"
          name="judul"
          type="text"
          required
          defaultValue={awal?.judul}
          className={kelasInput}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="tanggal" className="block text-sm font-semibold text-ink">
            Tanggal <span className="text-red-500">*</span>
          </label>
          <input
            id="tanggal"
            name="tanggal"
            type="date"
            required
            defaultValue={awal?.tanggal}
            className={kelasInput}
          />
        </div>
        <div>
          <label htmlFor="ayat" className="block text-sm font-semibold text-ink">
            Referensi ayat
          </label>
          <input
            id="ayat"
            name="ayat"
            type="text"
            placeholder="contoh: Mazmur 116:7"
            defaultValue={awal?.ayat}
            className={kelasInput}
          />
        </div>
      </div>

      <div>
        <label htmlFor="kutipan_ayat" className="block text-sm font-semibold text-ink">
          Kutipan ayat pembuka
        </label>
        <textarea
          id="kutipan_ayat"
          name="kutipan_ayat"
          rows={2}
          placeholder="Kutipan ayat lengkap beserta referensinya (tampil miring di atas artikel)"
          defaultValue={awal?.kutipanAyat}
          className={kelasInput}
        />
      </div>

      <div>
        <label htmlFor="isi" className="block text-sm font-semibold text-ink">
          Isi renungan <span className="text-red-500">*</span>
        </label>
        <p className="mt-1 text-xs text-ink/50">
          Pisahkan antar-paragraf dengan satu baris kosong.
        </p>
        <textarea
          id="isi"
          name="isi"
          rows={14}
          required
          defaultValue={awal?.isi.join("\n\n")}
          className={kelasInput}
        />
      </div>

      <div>
        <label htmlFor="cuplikan" className="block text-sm font-semibold text-ink">
          Cuplikan singkat
        </label>
        <p className="mt-1 text-xs text-ink/50">
          Tampil di kartu daftar renungan. Bila dikosongkan, dipakai awal
          paragraf pertama.
        </p>
        <textarea
          id="cuplikan"
          name="cuplikan"
          rows={3}
          defaultValue={awal?.cuplikan}
          className={kelasInput}
        />
      </div>

      <div>
        <label htmlFor="atribusi" className="block text-sm font-semibold text-ink">
          Atribusi sumber
        </label>
        <input
          id="atribusi"
          name="atribusi"
          type="text"
          placeholder="contoh: Diringkas dari Khotbah Pdt Kim Ki Dong"
          defaultValue={awal?.atribusi}
          className={kelasInput}
        />
      </div>

      <div>
        <label htmlFor="thumbnail" className="block text-sm font-semibold text-ink">
          Foto thumbnail {awal ? "(kosongkan bila tidak diganti)" : ""}
        </label>
        <input
          id="thumbnail"
          name="thumbnail"
          type="file"
          accept="image/*"
          className="mt-2 w-full text-sm text-ink/70 file:mr-3 file:rounded-full file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-700"
        />
      </div>

      <button
        type="submit"
        className="rounded-full bg-brand-600 px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-500"
      >
        Simpan
      </button>
    </form>
  );
}

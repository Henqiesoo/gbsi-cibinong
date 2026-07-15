import { supabaseSiap } from "@/lib/supabase";

// Banner status untuk halaman admin: pesan sukses/gagal dari query string
// + peringatan bila Supabase belum dikonfigurasi. `detail` berisi pesan
// error asli dari database/storage agar penyebabnya jelas.
export default function Pemberitahuan({
  ok,
  err,
  detail,
}: {
  ok?: string;
  err?: string;
  detail?: string;
}) {
  const pesanErr: Record<string, string> = {
    supabase:
      "Supabase belum dikonfigurasi — perubahan belum bisa disimpan. Ikuti panduan di Dasbor.",
    lengkapi: "Data belum lengkap. Mohon isi semua kolom yang wajib.",
    simpan: "Gagal menyimpan.",
    format: "Format file tidak didukung — unggah gambar JPG atau PNG.",
  };

  return (
    <div className="space-y-3">
      {!supabaseSiap() && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          <strong>Supabase belum tersambung.</strong> Website masih menampilkan
          konten statis bawaan. Buka <a href="/admin" className="underline">Dasbor</a>{" "}
          untuk panduan menyambungkan.
        </p>
      )}
      {ok && (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
          Tersimpan. Perubahan sudah tampil di website.
        </p>
      )}
      {err && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <p>{pesanErr[err] ?? "Terjadi kesalahan."}</p>
          {detail && (
            <p className="mt-2 rounded-lg bg-red-100 p-2 font-mono text-xs">
              {detail}
            </p>
          )}
          {err === "simpan" && (
            <p className="mt-2">
              Bila pesan di atas menyebut tabel tidak ditemukan (
              <em>could not find the table</em>) atau <em>row-level
              security</em>, buka <a href="/admin" className="underline font-semibold">Dasbor</a>{" "}
              — bagian <strong>Pemeriksaan Database</strong> menunjukkan cara
              memperbaikinya.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

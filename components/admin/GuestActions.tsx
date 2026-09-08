"use client";

import { useState } from "react";
import { deleteGuestAction, editGuestAction } from "@/app/admin/actions";
import type { NamaTema } from "@/lib/themes";

type Props = {
  id: string;
  nama: string;
  slug: string;
  jumlahTamuMax: number;
  /* Tema yang sedang dipilih di panel admin. Link yang disalin selalu
     membawa tema ini — sebelumnya link disalin polos tanpa ?tema= sehingga
     undangan yang dikirim selalu terbuka dengan tema bawaan. */
  tema: NamaTema;
};

// Tombol salin link + buka + ubah nama + hapus untuk satu baris tamu
export default function GuestActions({ id, nama, slug, jumlahTamuMax, tema }: Props) {
  const [disalin, setDisalin] = useState(false);
  const [bukaUbah, setBukaUbah] = useState(false);
  const [proses, setProses] = useState(false);
  const [galat, setGalat] = useState<string | null>(null);

  const jalan = `/invite/${slug}?tema=${tema}`;

  async function salinLink() {
    const url = `${window.location.origin}${jalan}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const el = document.createElement("textarea");
      el.value = url;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setDisalin(true);
    setTimeout(() => setDisalin(false), 2000);
  }

  async function simpan(formData: FormData) {
    setProses(true);
    setGalat(null);
    const hasil = await editGuestAction(formData);
    setProses(false);
    if (hasil?.error) setGalat(hasil.error);
    else setBukaUbah(false);
  }

  async function hapus() {
    if (!confirm(`Hapus tamu "${nama}"? Konfirmasi RSVP-nya ikut terhapus.`)) return;
    setProses(true);
    setGalat(null);
    const formData = new FormData();
    formData.set("id", id);
    const hasil = await deleteGuestAction(formData);
    setProses(false);
    if (hasil?.error) setGalat(hasil.error);
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={salinLink}
          title={jalan}
          className="rounded-full border border-ivory-300 px-3 py-1.5 text-xs text-sage-600 transition hover:border-gold-400 hover:text-gold-600"
        >
          {disalin ? "✓ Tersalin" : "Salin link"}
        </button>
        <a
          href={jalan}
          target="_blank"
          rel="noopener noreferrer"
          title={jalan}
          className="rounded-full border border-ivory-300 px-3 py-1.5 text-xs text-sage-600 transition hover:border-gold-400 hover:text-gold-600"
        >
          Buka
        </a>
        <button
          onClick={() => setBukaUbah((v) => !v)}
          className="rounded-full border border-ivory-300 px-3 py-1.5 text-xs text-sage-600 transition hover:border-gold-400 hover:text-gold-600"
        >
          {bukaUbah ? "Batal" : "Ubah"}
        </button>
        <button
          onClick={hapus}
          disabled={proses}
          className="rounded-full border border-red-200 px-3 py-1.5 text-xs text-red-500 transition hover:bg-red-50 disabled:opacity-50"
        >
          Hapus
        </button>
      </div>

      {bukaUbah && (
        <form action={simpan} className="space-y-2 rounded-xl bg-ivory-100/70 p-3">
          <input type="hidden" name="id" value={id} />
          <div>
            <label className="mb-1 block text-[10px] uppercase tracking-wider text-sage-400">
              Nama tamu
            </label>
            <input name="nama" defaultValue={nama} required className="input !py-2 text-xs" />
          </div>
          <div className="flex gap-2">
            <div className="w-24">
              <label className="mb-1 block text-[10px] uppercase tracking-wider text-sage-400">
                Maks. tamu
              </label>
              <input
                name="jumlah_tamu_max"
                type="number"
                min={1}
                max={20}
                defaultValue={jumlahTamuMax}
                className="input !py-2 text-xs"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-[10px] uppercase tracking-wider text-sage-400">
                Link baru (opsional)
              </label>
              <input
                name="slug_baru"
                placeholder={slug}
                className="input !py-2 text-xs"
                title="Kosongkan agar link lama tetap hidup"
              />
            </div>
          </div>
          <p className="text-[10px] leading-relaxed text-sage-400">
            Link dibiarkan kosong = link lama tetap aktif, aman bila undangan sudah terlanjur
            disebar.
          </p>
          <button type="submit" disabled={proses} className="btn-primary w-full !py-2 text-xs">
            {proses ? "Menyimpan…" : "Simpan perubahan"}
          </button>
        </form>
      )}

      {galat && <p className="text-[11px] text-red-500">{galat}</p>}
    </div>
  );
}

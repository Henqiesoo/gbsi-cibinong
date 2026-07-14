"use client";

import { useState } from "react";
import { site } from "@/lib/site";

// Form kontak tanpa backend: saat dikirim, pesan diteruskan lewat
// WhatsApp (membuka wa.me dengan pesan terisi otomatis).
// Nanti bila sudah ada backend/Supabase, ganti handleSubmit dengan
// pengiriman ke server.
export default function KontakForm() {
  const [nama, setNama] = useState("");
  const [kontak, setKontak] = useState("");
  const [pesan, setPesan] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const teks = [
      "Syalom, saya ingin bertanya melalui website GBSI Cibinong.",
      "",
      `Nama: ${nama}`,
      `Email/WA: ${kontak}`,
      "",
      pesan,
    ].join("\n");
    window.open(
      `${site.whatsappHref}?text=${encodeURIComponent(teks)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="nama"
          className="block text-sm font-semibold text-ink"
        >
          Nama
        </label>
        <input
          id="nama"
          type="text"
          required
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama lengkap"
          className="mt-2 w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-base text-ink placeholder:text-ink/40 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
        />
      </div>

      <div>
        <label
          htmlFor="kontak"
          className="block text-sm font-semibold text-ink"
        >
          Email / Nomor WhatsApp
        </label>
        <input
          id="kontak"
          type="text"
          required
          value={kontak}
          onChange={(e) => setKontak(e.target.value)}
          placeholder="Supaya kami dapat membalas"
          className="mt-2 w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-base text-ink placeholder:text-ink/40 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
        />
      </div>

      <div>
        <label
          htmlFor="pesan"
          className="block text-sm font-semibold text-ink"
        >
          Pesan
        </label>
        <textarea
          id="pesan"
          required
          rows={5}
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
          placeholder="Tulis pertanyaan atau permohonan doa Saudara…"
          className="mt-2 w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-base text-ink placeholder:text-ink/40 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-brand-600 px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-brand-500 sm:w-auto"
      >
        Kirim lewat WhatsApp
      </button>
      <p className="text-sm text-ink/60">
        Pesan akan diteruskan melalui WhatsApp ke {site.telepon}.
      </p>
    </form>
  );
}

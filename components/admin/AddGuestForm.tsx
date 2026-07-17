"use client";

import { useRef, useState } from "react";
import { addGuestAction } from "@/app/admin/actions";

export default function AddGuestForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await addGuestAction(formData);
    setLoading(false);
    if (result?.error) setError(result.error);
    else formRef.current?.reset();
  }

  return (
    <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-sage-700">Tambah Tamu Baru</h2>
      <form ref={formRef} action={handleSubmit} className="mt-3 flex flex-wrap items-end gap-3">
        <div className="min-w-[220px] flex-1">
          <label className="mb-1 block text-xs text-sage-400">Nama tamu</label>
          <input name="nama" className="input !py-2.5" placeholder="cth: Bapak Budi & Keluarga" required />
        </div>
        <div className="w-36">
          <label className="mb-1 block text-xs text-sage-400">Maks. tamu</label>
          <input
            name="jumlah_tamu_max"
            type="number"
            min={1}
            max={20}
            defaultValue={2}
            className="input !py-2.5"
          />
        </div>
        <button type="submit" disabled={loading} className="btn-primary !py-2.5 text-xs">
          {loading ? "Menyimpan…" : "+ Tambah"}
        </button>
      </form>
      {error && <p className="mt-3 rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>}
    </div>
  );
}

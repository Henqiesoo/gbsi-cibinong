"use client";

import { useState } from "react";
import { loginAction } from "@/app/admin/actions";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await loginAction(formData);
    setLoading(false);
    if (result?.error) setError(result.error);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-sage-800 px-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-center font-serif text-2xl text-sage-800">Panel Admin</h1>
        <p className="mt-2 text-center text-sm text-sage-400">
          Masukkan password untuk melihat rekap RSVP
        </p>

        <form action={handleSubmit} className="mt-6 space-y-4">
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password admin"
            required
            autoFocus
          />
          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
          )}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Memeriksa…" : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}

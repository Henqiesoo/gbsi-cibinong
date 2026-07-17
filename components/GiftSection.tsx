"use client";

import { useState } from "react";
import { weddingConfig } from "@/lib/wedding-config";

export default function GiftSection() {
  const { accounts, qrisImage } = weddingConfig.gift;
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showQris, setShowQris] = useState(false);

  async function copyNumber(number: string, index: number) {
    try {
      await navigator.clipboard.writeText(number);
    } catch {
      // Fallback untuk browser lama / WebView WhatsApp
      const el = document.createElement("textarea");
      el.value = number;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }

  return (
    <section className="bg-white/60 px-6 py-16 text-center">
      <h2 className="section-title">Amplop Digital</h2>
      <p className="section-subtitle">
        Doa restu Anda adalah hadiah terindah bagi kami. Namun apabila memberi adalah tanda kasih,
        Anda dapat mengirimkannya melalui:
      </p>

      <div className="mx-auto mt-10 max-w-md space-y-4">
        {accounts.map((account, i) => (
          <div key={account.bank + account.number} className="card px-6 py-5 text-left">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gold-500">
                  {account.bank}
                </p>
                <p className="mt-1 font-serif text-xl tracking-wider text-sage-700">
                  {account.number}
                </p>
                <p className="mt-0.5 text-xs text-sage-400">a.n. {account.holder}</p>
              </div>
              <button
                onClick={() => copyNumber(account.number, i)}
                className="btn-outline shrink-0 !px-4 !py-2 text-xs"
              >
                {copiedIndex === i ? "✓ Tersalin" : "Salin"}
              </button>
            </div>
          </div>
        ))}

        <div className="card px-6 py-5">
          <button
            onClick={() => setShowQris((v) => !v)}
            className="flex w-full items-center justify-between text-left"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gold-500">QRIS</p>
              <p className="mt-1 text-sm text-sage-500">Scan untuk kirim via e-wallet / m-banking</p>
            </div>
            <svg
              className={`h-5 w-5 text-sage-400 transition-transform ${showQris ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          {showQris && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={qrisImage}
              alt="Kode QRIS untuk amplop digital"
              className="mx-auto mt-4 w-56 rounded-xl border border-cream-200"
            />
          )}
        </div>
      </div>
    </section>
  );
}

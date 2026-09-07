"use client";

import { useState } from "react";
import { weddingConfig } from "@/lib/wedding-config";
import Reveal from "@/components/Reveal";

// Menyalin teks; pakai cara lama bila clipboard API diblokir (mis. WebView WhatsApp)
async function salinTeks(teks: string) {
  try {
    await navigator.clipboard.writeText(teks);
    return;
  } catch {
    const el = document.createElement("textarea");
    el.value = teks;
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }
}

export default function GiftSection() {
  const { accounts, qrisImage, address } = weddingConfig.gift;
  const [disalin, setDisalin] = useState<string | null>(null);
  const [bukaQris, setBukaQris] = useState(false);

  async function salin(nilai: string, kunci: string) {
    await salinTeks(nilai);
    setDisalin(kunci);
    setTimeout(() => setDisalin(null), 2000);
  }

  return (
    <section id="hadiah" className="scroll-mt-4 bg-surface/70 px-6 py-20 text-center">
      <Reveal>
        <p className="eyebrow">Wedding Gift</p>
        <h2 className="section-title mt-3">Amplop Digital</h2>
        <p className="section-sub">
          Doa restu Anda adalah hadiah terindah bagi kami. Namun bila memberi adalah tanda kasih,
          Anda dapat mengirimkannya melalui:
        </p>
        <div className="hairline mt-8" />
      </Reveal>

      <div className="mx-auto mt-12 max-w-md space-y-4">
        {accounts.map((akun, i) => (
          <Reveal key={akun.bank + akun.number} delay={i * 90}>
            <div className="glass px-6 py-5 text-left">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gold-500">
                    {akun.bank}
                  </p>
                  <p className="mt-1.5 font-serif text-2xl tracking-wide text-sage-800">
                    {akun.number}
                  </p>
                  <p className="mt-1 truncate text-xs text-sage-400">a.n. {akun.holder}</p>
                </div>
                <button
                  onClick={() => salin(akun.number, akun.bank)}
                  className="shrink-0 rounded-full border border-gold-400/70 px-4 py-2 text-xs font-semibold text-gold-600 transition active:scale-95 hover:bg-gold-400/10"
                >
                  {disalin === akun.bank ? "✓ Tersalin" : "Salin"}
                </button>
              </div>
            </div>
          </Reveal>
        ))}

        <Reveal delay={180}>
          <div className="glass px-6 py-5">
            <button
              onClick={() => setBukaQris((v) => !v)}
              aria-expanded={bukaQris}
              className="flex w-full items-center justify-between gap-4 text-left"
            >
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-gold-500">
                  QRIS
                </p>
                <p className="mt-1 text-sm text-sage-500">Scan lewat e-wallet atau m-banking</p>
              </div>
              <svg
                className={`h-5 w-5 shrink-0 text-sage-400 transition-transform ${bukaQris ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {bukaQris && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrisImage}
                alt="Kode QRIS untuk amplop digital"
                className="mx-auto mt-5 w-56 rounded-2xl border border-ivory-200"
              />
            )}
          </div>
        </Reveal>

        <Reveal delay={240}>
          <div className="glass px-6 py-5 text-left">
            <p className="text-[11px] font-bold uppercase tracking-widest text-gold-500">
              Kirim Hadiah
            </p>
            <p className="mt-2 text-sm leading-relaxed text-sage-600">{address}</p>
            <button
              onClick={() => salin(address, "alamat")}
              className="mt-3 text-xs font-semibold text-gold-600 underline underline-offset-4"
            >
              {disalin === "alamat" ? "✓ Alamat tersalin" : "Salin alamat"}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

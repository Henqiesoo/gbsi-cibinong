"use client";

import { useState } from "react";

// Menyalin URL undangan personal tamu (untuk dibagikan via WhatsApp)
export default function CopyLinkButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const url = `${window.location.origin}/invite/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const el = document.createElement("textarea");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={copy}
      className="rounded-full border border-cream-200 px-3 py-1.5 text-xs text-sage-600 transition hover:border-gold-400 hover:text-gold-600"
      title={`/invite/${slug}`}
    >
      {copied ? "✓ Tersalin" : "Salin link"}
    </button>
  );
}

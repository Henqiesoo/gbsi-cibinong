"use client";

// Link ke profil Instagram GBSI Cibinong.
//
// Di sebagian perangkat Android, aplikasi Instagram membuka link profil
// web biasa (instagram.com/nama) ke akun pengguna sendiri, bukan ke
// profil yang dituju. Untuk Android (Chrome/Samsung Internet/WebView)
// dipakai URL intent:// dengan path /_u/ yang memerintahkan aplikasi
// membuka profil GBSI secara eksplisit; bila aplikasi tidak terpasang,
// browser membuka link web sebagai cadangan. Perangkat lain (iPhone,
// laptop, Firefox) tetap memakai link web biasa.

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const INTENT_ANDROID =
  `intent://www.instagram.com/_u/${site.instagramUser}/` +
  "#Intent;package=com.instagram.android;scheme=https;" +
  `S.browser_fallback_url=${encodeURIComponent(site.instagramUrl)};end`;

export default function LinkInstagram({
  className,
  ariaLabel,
  children,
}: {
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}) {
  const [href, setHref] = useState(site.instagramUrl);

  useEffect(() => {
    const ua = navigator.userAgent;
    // Hanya Android ber-mesin Chromium — Firefox tidak mengenal intent://.
    if (/android/i.test(ua) && !/firefox|fxios/i.test(ua)) {
      setHref(INTENT_ANDROID);
    }
  }, []);

  // Deep link intent:// dibuka di tab yang sama — target="_blank" bisa
  // meninggalkan tab kosong / diblokir; aplikasi tetap terbuka di atasnya.
  const targetBaru = href.startsWith("intent://") ? undefined : "_blank";

  return (
    <a
      href={href}
      target={targetBaru}
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </a>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

// Wrapper fade-in reusable (CSS murni, tanpa library animasi).
// - Saat pertama terlihat di viewport (IntersectionObserver), elemen
//   memudar masuk: opacity 0→1 + naik sedikit dari bawah (~500ms).
// - Konten tetap ada di DOM sejak render server → aman untuk SEO dan
//   tetap terbaca screen reader (opacity tidak menyembunyikan dari
//   pembaca layar).
// - Pengguna dengan "prefers-reduced-motion" melihat konten langsung
//   tanpa animasi (diatur di globals.css).
// - Tanpa JavaScript, konten tetap tampil (fallback <noscript> di
//   layout).
export default function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number; // ms, untuk efek berurutan antar kartu
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tampak, setTampak] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Elemen yang sudah berada di viewport saat halaman dimuat ikut
    // ter-fade-in lewat observer yang langsung menembak.
    const io = new IntersectionObserver(
      (entri) => {
        if (entri[0].isIntersecting) {
          setTampak(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -32px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`fade-mula ${tampak ? "fade-tampil" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

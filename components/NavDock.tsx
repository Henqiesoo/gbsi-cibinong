"use client";

import { useEffect, useState } from "react";

const items = [
  {
    id: "beranda",
    label: "Beranda",
    icon: "M2.25 12l8.955-8.955a1.125 1.125 0 011.59 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75",
  },
  {
    id: "mempelai",
    label: "Mempelai",
    icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.098 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
  },
  {
    id: "acara",
    label: "Acara",
    icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5",
  },
  {
    id: "galeri",
    label: "Galeri",
    icon: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M2.25 6h19.5v12H2.25V6zM15 9a.75.75 0 11-1.5 0 .75.75 0 011.5 0z",
  },
  {
    id: "rsvp",
    label: "RSVP",
    icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    id: "hadiah",
    label: "Hadiah",
    icon: "M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z",
  },
];

// Dok navigasi mengambang di bawah layar — pola yang familiar di HP
export default function NavDock({ visible }: { visible: boolean }) {
  const [active, setActive] = useState("beranda");

  // Sorot menu sesuai bagian yang sedang terlihat
  useEffect(() => {
    if (!visible) return;
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const shown = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (shown) setActive(shown.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.01, 0.25, 0.5] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [visible]);

  return (
    <nav
      aria-label="Navigasi undangan"
      className={`fixed inset-x-0 bottom-0 z-40 flex justify-center pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="mx-3 flex w-full max-w-md items-center justify-between gap-0.5 rounded-full border border-white/70 bg-white/85 px-2 py-2 shadow-[0_10px_40px_-8px_rgba(60,69,54,0.4)] backdrop-blur-xl">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? "true" : undefined}
              className={`flex flex-1 flex-col items-center gap-1 rounded-full px-1 py-1.5 transition ${
                isActive ? "bg-sage-700 text-ivory-50" : "text-sage-500 active:bg-ivory-100"
              }`}
            >
              <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              <span className="text-[9px] font-medium leading-none">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

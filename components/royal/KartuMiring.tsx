"use client";

import { useEffect, useRef, useState } from "react";

/* Kemiringan 3D ringan — dipakai HANYA pada kartu monogram di tema Royal
   Red, bukan di seluruh bagian, supaya tetap ringan di HP.

   Murni CSS transform (perspective + rotateX/rotateY); tidak ada WebGL,
   tidak ada pustaka 3D. Di komputer mengikuti gerak tetikus, di HP
   mengikuti kemiringan perangkat. Bila tamu memasang "kurangi gerak" di
   sistemnya, kartu diam saja. Sudutnya dibatasi kecil supaya terasa
   halus, bukan seperti kartu permainan. */
export default function KartuMiring({
  maks = 7,
  className = "",
  children,
}: {
  maks?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const [sudut, setSudut] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const batas = (n: number) => Math.max(-maks, Math.min(maks, n));

    // Perbarui paling banyak sekali per frame — mousemove menyala sangat
    // sering, dan setState tiap kejadian akan memberatkan tanpa perlu.
    const jadwalkan = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        setSudut(targetRef.current);
      });
    };

    const saatTetikus = (e: MouseEvent) => {
      targetRef.current = {
        x: batas((0.5 - e.clientY / window.innerHeight) * 2 * maks),
        y: batas((e.clientX / window.innerWidth - 0.5) * 2 * maks),
      };
      jadwalkan();
    };

    const saatMiring = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      // beta ~45° = HP dipegang wajar; selisihnya yang dijadikan kemiringan
      targetRef.current = { x: batas(-(e.beta - 45) / 4), y: batas(e.gamma / 4) };
      jadwalkan();
    };

    window.addEventListener("mousemove", saatTetikus);
    window.addEventListener("deviceorientation", saatMiring);
    return () => {
      window.removeEventListener("mousemove", saatTetikus);
      window.removeEventListener("deviceorientation", saatMiring);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [maks]);

  return (
    <div className={`[perspective:900px] ${className}`}>
      <div
        className="transition-transform duration-500 ease-out will-change-transform [transform-style:preserve-3d]"
        style={{ transform: `rotateX(${sudut.x}deg) rotateY(${sudut.y}deg)` }}
      >
        {children}
      </div>
    </div>
  );
}

"use client";

// Siluet pasangan pengantin dilihat dari belakang, berjalan menuju altar.
// Digambar sendiri dengan SVG: mempelai pria bersetelan hitam, mempelai wanita
// bergaun putih panjang dengan veil — nuansa pemberkatan Kristen.
export default function SiluetPasangan({ jalan = false }: { jalan?: boolean }) {
  return (
    <svg
      viewBox="0 0 240 300"
      className={`h-full w-full ${jalan ? "art-melangkah" : ""}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gaun" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#fdfaf4" />
          <stop offset="70%" stopColor="#f2e8da" />
          <stop offset="100%" stopColor="#e2d3bf" />
        </linearGradient>
        <linearGradient id="veil" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="jas" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#26262c" />
          <stop offset="100%" stopColor="#121216" />
        </linearGradient>
      </defs>

      {/* Bayangan di lantai */}
      <ellipse cx="120" cy="288" rx="76" ry="9" fill="#3b2415" opacity="0.28" />

      {/* Mempelai pria — setelan hitam, dilihat dari belakang */}
      <g>
        <path d="M78 132c0-16 8-25 20-25s20 9 20 25v96H78z" fill="url(#jas)" />
        <path d="M98 107c-9 0-15 6-15 14h30c0-8-6-14-15-14z" fill="#1a1a1f" />
        {/* kepala & rambut */}
        <ellipse cx="98" cy="92" rx="13" ry="15" fill="#20161a" />
        <path d="M85 90c1-9 6-14 13-14s12 5 13 14c-4-5-8-7-13-7s-9 2-13 7z" fill="#100c0e" />
        {/* lengan */}
        <path d="M78 138l-8 62 10 2 8-56z" fill="#1c1c21" />
        <path d="M118 138l8 62-10 2-8-56z" fill="#1c1c21" />
        {/* celana */}
        <path d="M84 220h12v66H84zM100 220h12v66h-12z" fill="#141419" />
      </g>

      {/* Mempelai wanita — gaun putih panjang, veil menjuntai */}
      <g>
        <path
          d="M142 140c0-15 7-24 18-24s18 9 18 24l16 128h-68z"
          fill="url(#gaun)"
        />
        {/* ekor gaun */}
        <path d="M126 268c14-26 26-40 34-40s20 14 34 40z" fill="#f7f0e5" opacity="0.95" />
        {/* veil */}
        <path
          d="M160 104c-16 0-24 12-24 30 0 40 4 78 10 122h28c6-44 10-82 10-122 0-18-8-30-24-30z"
          fill="url(#veil)"
        />
        {/* kepala & rambut sanggul */}
        <ellipse cx="160" cy="98" rx="12.5" ry="14" fill="#2b1d20" />
        <circle cx="160" cy="84" r="7" fill="#241619" />
        {/* buket bunga di sisi */}
        <g transform="translate(186 176)">
          <circle r="9" fill="#e8dfd2" opacity="0.9" />
          <circle cx="-5" cy="-4" r="4.6" fill="#f6efe4" />
          <circle cx="5" cy="-3" r="4.2" fill="#efe4d6" />
          <circle cx="0" cy="5" r="4" fill="#f3ead6" />
          <path d="M0 8v16" stroke="#8fa07c" strokeWidth="1.6" />
        </g>
      </g>
    </svg>
  );
}

"use client";

/* Hiasan di dalam kartu undangan: salib di puncak, sulur di dua sudut
   bawah, dan titik-titik kecil. Tepi lengkung kartunya sendiri sekarang
   dibuat oleh KartuFoil (bingkai foil 3 px), jadi berkas ini tinggal
   mengurus ornamennya.

   Tiap garis tetap digambar dua kali: bayangan gelap yang digeser sedikit
   ke bawah, lalu emas bergradasi di atasnya — supaya ornamennya ikut
   terbaca timbul, sama seperti tepi kartunya. */
export default function BingkaiOrnamen({ className = "" }: { className?: string }) {
  const SULUR = "M30 380c14 0 24-8 26-22-10 2-18 8-20 16M270 380c-14 0-24-8-26-22 10 2 18 8 20 16";
  const SALIB = "M150 18v24M140 28h20";

  return (
    <svg viewBox="0 0 300 420" preserveAspectRatio="none" className={className} aria-hidden="true">
      <defs>
        {/* Gradasi foil emas: sorot terang, badan emas tua, lalu sorot lagi */}
        <linearGradient id="foil-emas" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fdf0c9" />
          <stop offset="16%" stopColor="#f5d584" />
          <stop offset="38%" stopColor="#c79a3c" />
          <stop offset="52%" stopColor="#a37418" />
          <stop offset="68%" stopColor="#d9ad4e" />
          <stop offset="86%" stopColor="#f7e3a8" />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>
        {/* Cahaya tipis yang membuat emasnya terasa memantul */}
        <filter id="kilau-emas" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.1" floodColor="#f5d584" floodOpacity="0.32" />
        </filter>
      </defs>

      {/* Lapisan bayangan: garis yang sama, digeser turun & digelapkan */}
      <g
        transform="translate(0 2.2)"
        fill="none"
        stroke="#1b0508"
        strokeOpacity="0.75"
        strokeLinecap="round"
      >
        <path d={SULUR} strokeWidth="1.8" />
        <path d={SALIB} strokeWidth="3" />
      </g>

      {/* Lapisan foil emas di atasnya */}
      <g fill="none" strokeLinecap="round" filter="url(#kilau-emas)">
        <path d={SULUR} stroke="url(#foil-emas)" strokeWidth="1.5" />
        <path d={SALIB} stroke="url(#foil-emas)" strokeWidth="2.6" />
      </g>

      {/* Titik-titik hias — juga diberi bayangan supaya ikut timbul */}
      <g>
        {[
          [30, 158],
          [270, 158],
          [150, 400],
        ].map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy + 2} r="2.6" fill="#1b0508" opacity="0.7" />
            <circle cx={cx} cy={cy} r="2.4" fill="url(#foil-emas)" />
          </g>
        ))}
      </g>
    </svg>
  );
}

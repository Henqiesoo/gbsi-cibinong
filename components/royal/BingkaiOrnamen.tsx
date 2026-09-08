"use client";

/* Bingkai ornamen emas yang membungkus teks undangan — bentuk lengkung
   gerbang dengan sulur di keempat sudut.

   Garisnya tidak lagi satu warna rata. Tiap garis digambar dua kali:
   sekali dengan warna gelap yang digeser sedikit ke bawah (bayangan
   cetakan), lalu di atasnya garis emas bergradasi banyak titik warna.
   Hasilnya terbaca seperti foil emas yang timbul dari kertas, bukan
   garis vektor datar. Semuanya SVG — tanpa berkas gambar tambahan. */
export default function BingkaiOrnamen({ className = "" }: { className?: string }) {
  const LENGKUNG_LUAR = "M12 130a138 138 0 01276 0v266a12 12 0 01-12 12H24a12 12 0 01-12-12z";
  const LENGKUNG_DALAM = "M22 132a128 128 0 01256 0v256a8 8 0 01-8 8H30a8 8 0 01-8-8z";
  const SULUR = "M30 380c14 0 24-8 26-22-10 2-18 8-20 16M270 380c-14 0-24-8-26-22 10 2 18 8 20 16";
  const SALIB = "M150 2v22M141 11h18";

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
        {/* Gradasi lebih redup untuk garis tipis di dalam */}
        <linearGradient id="foil-emas-redup" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8b6508" />
          <stop offset="30%" stopColor="#e8c877" />
          <stop offset="62%" stopColor="#a97c1c" />
          <stop offset="100%" stopColor="#f5d584" />
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
        <path d={LENGKUNG_LUAR} strokeWidth="2.6" />
        <path d={LENGKUNG_DALAM} strokeWidth="1.1" strokeOpacity="0.5" />
        <path d={SULUR} strokeWidth="1.8" />
        <path d={SALIB} strokeWidth="3" />
      </g>

      {/* Lapisan foil emas di atasnya */}
      <g fill="none" strokeLinecap="round" filter="url(#kilau-emas)">
        <path d={LENGKUNG_LUAR} stroke="url(#foil-emas)" strokeWidth="2.4" />
        <path d={LENGKUNG_DALAM} stroke="url(#foil-emas-redup)" strokeWidth="0.9" opacity="0.85" />
        <path d={SULUR} stroke="url(#foil-emas)" strokeWidth="1.5" />
        <path d={SALIB} stroke="url(#foil-emas)" strokeWidth="2.6" />
      </g>

      {/* Titik-titik hias — juga diberi bayangan supaya ikut timbul */}
      <g>
        {[
          [30, 150],
          [270, 150],
          [150, 404],
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

"use client";

// Ilustrasi latar pelaminan, digambar sendiri dengan SVG (bukan foto stok),
// jadi bebas masalah lisensi dan ukurannya sangat ringan.
// Nuansa: gerbang gereja melengkung, tirai marun, lampu gantung kristal,
// untaian bunga putih, dan jalan setapak berlilin saat senja.
export default function ArtPelaminan({ fase = 0 }: { fase?: number }) {
  return (
    <svg
      viewBox="0 0 390 780"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="langit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a2a2a" />
          <stop offset="45%" stopColor="#8d5a44" />
          <stop offset="75%" stopColor="#d9a273" />
          <stop offset="100%" stopColor="#f0d3ab" />
        </linearGradient>
        <linearGradient id="tirai" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5e1414" />
          <stop offset="60%" stopColor="#7a1e1e" />
          <stop offset="100%" stopColor="#4a0f0f" />
        </linearGradient>
        <linearGradient id="lantai" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c9a07a" />
          <stop offset="100%" stopColor="#8a5f45" />
        </linearGradient>
        <radialGradient id="cahaya" cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#ffe9bd" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffe9bd" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lilin" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd98a" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ffd98a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Langit senja */}
      <rect width="390" height="780" fill="url(#langit)" />
      <ellipse cx="195" cy="330" rx="230" ry="200" fill="url(#cahaya)" />

      {/* Siluet pepohonan di kejauhan */}
      <g fill="#3b2020" opacity="0.55">
        <circle cx="34" cy="352" r="62" />
        <circle cx="86" cy="330" r="46" />
        <circle cx="356" cy="344" r="66" />
        <circle cx="306" cy="326" r="44" />
      </g>

      {/* Lantai / jalan setapak */}
      <path d="M0 560h390v220H0z" fill="url(#lantai)" />
      <path d="M195 560 L286 780 H104 Z" fill="#e8d3b6" opacity="0.85" />
      <path d="M195 560 L250 780 H140 Z" fill="#f3e5cf" opacity="0.6" />

      {/* Gerbang melengkung — bentuk pintu gereja */}
      <g>
        <path
          d="M96 600V300a99 99 0 01198 0v300h-26V300a73 73 0 00-146 0v300z"
          fill="#f6ead5"
          opacity="0.28"
        />
        <path
          d="M104 600V304a91 91 0 01182 0v296"
          fill="none"
          stroke="#e8c87a"
          strokeWidth="2.5"
          opacity="0.9"
        />
        <path
          d="M122 600V308a73 73 0 01146 0v292"
          fill="none"
          stroke="#e8c87a"
          strokeWidth="1.2"
          opacity="0.6"
        />
      </g>

      {/* Tirai marun kiri & kanan */}
      <path d="M0 150c40 40 56 130 54 250-1 90 6 200 14 380H0z" fill="url(#tirai)" />
      <path d="M390 150c-40 40-56 130-54 250 1 90-6 200-14 380h68z" fill="url(#tirai)" />
      <g stroke="#a83a3a" strokeWidth="1" opacity="0.5" fill="none">
        <path d="M18 170c22 120 20 330 12 610M40 200c16 120 14 300 8 580" />
        <path d="M372 170c-22 120-20 330-12 610M350 200c-16 120-14 300-8 580" />
      </g>

      {/* Lampu gantung kristal */}
      <g className="art-ayun" style={{ transformOrigin: "195px 120px" }}>
        <path d="M195 120v52" stroke="#e8c87a" strokeWidth="1.6" />
        <path d="M158 196a37 26 0 0174 0z" fill="#f6e3b0" opacity="0.9" />
        <path d="M152 196h86" stroke="#e8c87a" strokeWidth="2" />
        {[164, 178, 195, 212, 226].map((x, i) => (
          <g key={x}>
            <path d={`M${x} 196v${12 + (i % 2) * 8}`} stroke="#e8c87a" strokeWidth="1" />
            <circle cx={x} cy={210 + (i % 2) * 8} r="3.4" fill="#ffe9b8" />
          </g>
        ))}
        <circle cx="195" cy="200" r="26" fill="#ffe0a0" opacity="0.28" />
      </g>

      {/* Untaian bunga putih — muncul pada fase 2 ke atas */}
      <g
        className="art-muncul"
        style={{ opacity: fase >= 1 ? 1 : 0, transitionDelay: "160ms" }}
      >
        {[
          [118, 250],
          [150, 214],
          [195, 196],
          [240, 214],
          [272, 250],
        ].map(([x, y], i) => (
          <g key={x} className="art-ayun-halus" style={{ transformOrigin: `${x}px ${y}px`, animationDelay: `${i * 0.4}s` }}>
            <path d={`M${x} ${y}v${58 + (i % 2) * 22}`} stroke="#dfe6d2" strokeWidth="1" opacity="0.8" />
            {Array.from({ length: 5 }).map((_, j) => (
              <circle
                key={j}
                cx={x + (j % 2 ? 3.5 : -3.5)}
                cy={y + 12 + j * 12}
                r={3.6 - j * 0.25}
                fill="#fdf6ea"
                opacity="0.94"
              />
            ))}
            <circle cx={x} cy={y + 70 + (i % 2) * 22} r="4.6" fill="#f7dede" opacity="0.9" />
          </g>
        ))}
      </g>

      {/* Lilin di sepanjang jalan setapak */}
      <g className="art-muncul" style={{ opacity: fase >= 1 ? 1 : 0 }}>
        {[
          [112, 640],
          [92, 700],
          [70, 762],
          [278, 640],
          [298, 700],
          [320, 762],
        ].map(([x, y], i) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="17" fill="url(#lilin)" className="art-kedip" style={{ animationDelay: `${i * 0.3}s` }} />
            <rect x={x - 3} y={y} width="6" height="16" rx="2" fill="#fdf3e0" />
            <circle cx={x} cy={y - 3} r="3" fill="#ffcf72" />
          </g>
        ))}
      </g>

      {/* Kelopak bunga berserak di lantai */}
      <g fill="#c96a6a" opacity="0.65">
        {[
          [140, 690],
          [175, 730],
          [222, 706],
          [255, 752],
          [190, 668],
          [128, 748],
        ].map(([x, y]) => (
          <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="5" ry="3" />
        ))}
      </g>
    </svg>
  );
}

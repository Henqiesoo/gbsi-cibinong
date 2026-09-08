// Latar bernuansa Bali untuk tema Nusantara — digambar sendiri dengan SVG,
// jadi bebas lisensi dan ukurannya hanya beberapa kilobyte.
//
// Isinya: langit senja, siluet Gunung Agung, sawah terasering, candi bentar
// (gerbang belah) di tengah, kain poleng hitam-putih di kaki gerbang, sepasang
// penjor bambu melengkung, dan bunga jepun (kamboja) yang berayun.
//
// Kanvas dibuat tinggi (390x760) supaya saat dipasang pada layar HP yang
// jangkung, gambarnya nyaris tidak terpotong: gerbang tetap utuh di bawah dan
// langit tetap lapang di atas untuk nama pasangan.

// Satu belahan candi bentar. Belahan kanan memakai bentuk yang sama, dicerminkan.
function BelahGerbang() {
  return (
    <g>
      {/* Badan gerbang bertingkat, makin tinggi ke arah tengah */}
      <path
        d="M124 700 V560 h7 V520 h7 V482 h7 V448 h7 V418 h7 V394 h7 V376 h16 V700 Z"
        fill="#4a3423"
      />
      {/* Bidang dalam sedikit lebih terang — kena cahaya dari celah gerbang */}
      <path d="M174 376 h8 V700 h-8 Z" fill="#5f4431" />
      {/* Pahatan mendatar tiap tingkat */}
      {[420, 458, 496, 534, 572, 610].map((y) => (
        <rect
          key={y}
          x="124"
          y={y}
          width="58"
          height="6"
          fill="#2c1e13"
          opacity="0.5"
        />
      ))}
      {/* Relief belah ketupat khas pahatan batu Bali */}
      {[476, 552, 628].map((y) => (
        <path
          key={y}
          d={`M155 ${y}l10 13-10 13-10-13z`}
          fill="#2c1e13"
          opacity="0.42"
        />
      ))}
      {/* Kain poleng — kotak hitam-putih yang dililitkan pada pura */}
      <g>
        <rect x="98" y="640" width="94" height="34" fill="#f2ece0" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <rect
              x={98 + i * 15.7}
              y={i % 2 === 0 ? 640 : 657}
              width="15.7"
              height="17"
              fill="#1f1913"
            />
            <rect
              x={98 + i * 15.7}
              y={i % 2 === 0 ? 657 : 640}
              width="15.7"
              height="17"
              fill="#f2ece0"
            />
          </g>
        ))}
      </g>
      {/* Kaki & undakan */}
      <rect x="92" y="674" width="100" height="26" fill="#3b2a1c" />
      <rect x="84" y="700" width="108" height="30" fill="#4a3423" />
      <rect x="76" y="730" width="116" height="30" fill="#3b2a1c" />
    </g>
  );
}

// Penjor: bambu tinggi melengkung dengan janur yang menjuntai
function Penjor({ x, arah }: { x: number; arah: 1 | -1 }) {
  return (
    /* Penempatan dipisah dari animasi: animasi CSS menulis properti
       `transform`, yang akan MENIMPA atribut transform bila keduanya
       dipasang pada elemen yang sama — penjor kanan sempat tertumpuk di
       kiri karena ini. */
    <g transform={`translate(${x} 0) scale(${arah} 1)`}>
      <g className="art-ayun-halus" style={{ transformOrigin: "0px 760px" }}>
        <path
          d="M0 760 C6 600 14 430 34 306 C42 250 58 216 82 206"
          stroke="#8a6a3a"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        {/* Ujung penjor menjuntai ke bawah */}
        <path
          d="M82 206 C92 216 92 240 84 262"
          stroke="#c9a44f"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M84 262 l-6 26 l6 -7 l6 7 z" fill="#e7d08a" />
        {/* Janur yang menggantung sepanjang batang */}
        {[
          [22, 400],
          [30, 340],
          [44, 288],
          [64, 240],
        ].map(([px, py]) => (
          <g key={`${px}-${py}`}>
            <path
              d={`M${px} ${py} c7 12 7 26 2 40`}
              stroke="#e0c67c"
              strokeWidth="2.2"
              fill="none"
            />
            <circle cx={px + 3} cy={py + 45} r="3.4" fill="#f2e2a8" />
          </g>
        ))}
        {/* Lamak di pangkal */}
        <rect
          x="-11"
          y="620"
          width="22"
          height="56"
          rx="3"
          fill="#e7d08a"
          opacity="0.9"
        />
        <path d="M-11 676 l11 14 l11 -14 z" fill="#e7d08a" opacity="0.9" />
      </g>
    </g>
  );
}

// Bunga jepun (kamboja): lima kelopak putih dengan inti kuning
function Jepun({
  x,
  y,
  r,
  delay,
}: {
  x: number;
  y: number;
  r: number;
  delay: number;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g
        className="art-ayun-halus"
        style={{ transformOrigin: "0px 0px", animationDelay: `${delay}s` }}
      >
        {[0, 72, 144, 216, 288].map((sudut) => (
          <ellipse
            key={sudut}
            rx={r * 0.42}
            ry={r * 0.82}
            cy={-r * 0.55}
            fill="#fdf6e6"
            opacity="0.95"
            transform={`rotate(${sudut})`}
          />
        ))}
        <circle r={r * 0.32} fill="#f2cf72" />
      </g>
    </g>
  );
}

export default function ArtBali({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 390 760"
      preserveAspectRatio="xMidYMax slice"
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bali-langit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f9dfae" />
          <stop offset="40%" stopColor="#f2ba85" />
          <stop offset="100%" stopColor="#dd8f66" />
        </linearGradient>
        <linearGradient id="bali-sawah" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b9b64" />
          <stop offset="100%" stopColor="#586840" />
        </linearGradient>
      </defs>

      <rect width="390" height="760" fill="url(#bali-langit)" />

      {/* Matahari rendah */}
      <circle cx="195" cy="428" r="52" fill="#fbe6b4" opacity="0.5" />
      <circle cx="195" cy="428" r="28" fill="#fdf2cf" opacity="0.75" />

      {/* Siluet Gunung Agung */}
      <path
        d="M-20 470 L88 322 L146 388 L212 296 L306 412 L410 470 Z"
        fill="#7b6053"
        opacity="0.5"
      />
      <path
        d="M146 388 L212 296 L254 348 L200 384 Z"
        fill="#8f7264"
        opacity="0.45"
      />

      {/* Sawah terasering */}
      <path
        d="M-20 478 Q195 452 410 480 L410 760 L-20 760 Z"
        fill="url(#bali-sawah)"
        opacity="0.92"
      />
      {[512, 546, 584, 626, 672].map((y, i) => (
        <path
          key={y}
          d={`M-20 ${y} Q195 ${y - 18 - i * 2} 410 ${y}`}
          stroke="#4a5936"
          strokeWidth="2.2"
          fill="none"
          opacity="0.4"
        />
      ))}

      <Penjor x={30} arah={1} />
      <Penjor x={360} arah={-1} />

      {/* Candi bentar — dua belahan yang saling berhadapan */}
      <BelahGerbang />
      <g transform="translate(390 0) scale(-1 1)">
        <BelahGerbang />
      </g>

      {/* Jalan setapak yang membelah gerbang */}
      <path
        d="M176 760 L214 760 L206 620 L184 620 Z"
        fill="#efe0c4"
        opacity="0.5"
      />

      <Jepun x={64} y={122} r={14} delay={0} />
      <Jepun x={324} y={168} r={12} delay={1.2} />
      <Jepun x={132} y={70} r={9} delay={2.1} />
      <Jepun x={272} y={92} r={10} delay={0.7} />
    </svg>
  );
}

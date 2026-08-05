import type { Profession } from "@/data/professions";

export function ProfessionArtwork({ visual, accent }: Pick<Profession, "visual" | "accent">) {
  if (visual === "electric") {
    return (
      <svg viewBox="0 0 360 250" role="img" aria-label="Ilustração de um painel elétrico" className="profession-artwork">
        <defs>
          <linearGradient id="electricBg" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#eef3fb" />
            <stop offset="1" stopColor="#c8d3e5" />
          </linearGradient>
        </defs>
        <rect width="360" height="250" rx="24" fill="url(#electricBg)" />
        <rect x="66" y="30" width="228" height="190" rx="15" fill="#e5e9ef" stroke="#929cac" strokeWidth="4" />
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <g key={`${row}-${col}`} transform={`translate(${92 + col * 48} ${60 + row * 46})`}>
              <rect width="34" height="30" rx="4" fill="#273142" />
              <rect x="5" y="5" width="24" height="9" rx="3" fill={row === 1 && col === 2 ? accent : "#d8dde7"} />
              <circle cx="17" cy="23" r="3" fill="#808b9c" />
            </g>
          )),
        )}
        <path d="M20 205 C65 150 105 218 150 162 S245 135 339 80" fill="none" stroke={accent} strokeWidth="8" strokeLinecap="round" />
        <circle cx="330" cy="84" r="12" fill="#fff" stroke={accent} strokeWidth="6" />
      </svg>
    );
  }

  if (visual === "fitness") {
    return (
      <svg viewBox="0 0 360 250" role="img" aria-label="Ilustração de treino personalizado" className="profession-artwork">
        <defs>
          <linearGradient id="fitnessBg" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#181a1f" />
            <stop offset="1" stopColor="#343841" />
          </linearGradient>
        </defs>
        <rect width="360" height="250" rx="24" fill="url(#fitnessBg)" />
        <circle cx="222" cy="80" r="34" fill={accent} opacity="0.85" />
        <path d="M218 114 C182 122 164 150 159 197 L257 197 C251 150 241 126 218 114Z" fill="#111318" />
        <path d="M175 139 L105 172" stroke="#f6f7fb" strokeWidth="18" strokeLinecap="round" />
        <path d="M245 139 L310 164" stroke="#f6f7fb" strokeWidth="18" strokeLinecap="round" />
        <g transform="translate(42 152)">
          <rect x="0" y="15" width="80" height="18" rx="9" fill={accent} />
          <rect x="4" y="3" width="17" height="42" rx="5" fill="#f6f7fb" />
          <rect x="59" y="3" width="17" height="42" rx="5" fill="#f6f7fb" />
        </g>
        <path d="M25 45 H146" stroke="#fff" strokeOpacity="0.2" strokeWidth="12" strokeLinecap="round" />
        <path d="M25 70 H115" stroke="#fff" strokeOpacity="0.14" strokeWidth="8" strokeLinecap="round" />
      </svg>
    );
  }

  if (visual === "photo") {
    return (
      <svg viewBox="0 0 360 250" role="img" aria-label="Ilustração editorial de fotografia" className="profession-artwork">
        <defs>
          <linearGradient id="photoBg" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#eee4dc" />
            <stop offset="1" stopColor="#b99178" />
          </linearGradient>
        </defs>
        <rect width="360" height="250" rx="24" fill="url(#photoBg)" />
        <circle cx="256" cy="79" r="48" fill="#fff4" />
        <path d="M60 205 C88 131 128 90 188 62 C220 110 245 152 270 205Z" fill="#352921" opacity="0.84" />
        <rect x="34" y="35" width="116" height="84" rx="9" fill="#fff" transform="rotate(-8 34 35)" />
        <rect x="44" y="45" width="96" height="64" rx="5" fill={accent} opacity="0.65" transform="rotate(-8 44 45)" />
        <circle cx="100" cy="76" r="19" fill="#fff9" />
        <path d="M78 100 L101 77 L124 101" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="286" cy="178" r="36" fill="#211b17" />
        <circle cx="286" cy="178" r="22" fill="#61758f" stroke="#fff" strokeWidth="5" />
      </svg>
    );
  }

  if (visual === "auto") {
    return (
      <svg viewBox="0 0 360 250" role="img" aria-label="Ilustração de diagnóstico automotivo" className="profession-artwork">
        <defs>
          <linearGradient id="autoBg" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#111318" />
            <stop offset="1" stopColor="#343a46" />
          </linearGradient>
        </defs>
        <rect width="360" height="250" rx="24" fill="url(#autoBg)" />
        <path d="M55 157 L83 104 C91 87 105 79 126 77 H245 C265 79 279 88 289 106 L311 157" fill="#111" stroke="#b7c1d0" strokeWidth="6" />
        <path d="M100 105 H263 L279 141 H84Z" fill="#4a5668" />
        <rect x="48" y="145" width="270" height="53" rx="17" fill="#1c222c" stroke="#7d8796" strokeWidth="4" />
        <circle cx="105" cy="198" r="23" fill="#0b0d11" stroke="#8893a4" strokeWidth="7" />
        <circle cx="263" cy="198" r="23" fill="#0b0d11" stroke="#8893a4" strokeWidth="7" />
        <path d="M34 44 H150" stroke={accent === "#20232b" ? "#5c83ff" : accent} strokeWidth="8" strokeLinecap="round" />
        <path d="M34 68 H110" stroke="#fff" strokeOpacity="0.22" strokeWidth="7" strokeLinecap="round" />
        <circle cx="293" cy="57" r="24" fill="#5c83ff" opacity="0.9" />
        <path d="M283 57 L290 64 L305 48" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 360 250" role="img" aria-label="Ilustração de nail design" className="profession-artwork">
      <defs>
        <linearGradient id="nailsBg" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fff0f5" />
          <stop offset="1" stopColor="#f0b4c9" />
        </linearGradient>
      </defs>
      <rect width="360" height="250" rx="24" fill="url(#nailsBg)" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${78 + i * 57} ${47 + (i % 2) * 12}) rotate(${i * 5 - 8})`}>
          <rect width="38" height="145" rx="19" fill="#f8d8cb" />
          <rect x="4" y="4" width="30" height="62" rx="15" fill={i % 2 ? accent : "#f8f3ef"} />
          <path d="M10 30 C18 16 25 16 32 28" fill="none" stroke="#fff" strokeWidth="3" opacity="0.8" />
        </g>
      ))}
      <circle cx="54" cy="196" r="24" fill="#fff" opacity="0.85" />
      <path d="M45 197 C52 184 61 184 67 197 C60 208 51 209 45 197Z" fill={accent} />
      <circle cx="316" cy="42" r="14" fill="#fff" opacity="0.7" />
    </svg>
  );
}

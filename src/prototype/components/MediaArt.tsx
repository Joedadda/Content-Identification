import type { ThumbKind } from "../types";

export function MediaArt({
  kind,
  alt,
  duration,
}: {
  kind: ThumbKind;
  alt: string;
  duration?: string;
}) {
  const labelled = alt.length > 0;
  return (
    <div
      className={`wa-media wa-media-${kind}`}
      role={labelled ? "img" : undefined}
      aria-label={labelled ? alt : undefined}
      aria-hidden={labelled ? undefined : true}
    >
      {kind === "speech" && <SpeechScene />}
      {kind === "rain" && <RainScene />}
      {kind === "tiger" && <TigerScene />}
      {kind === "link" && <LinkScene />}
      {kind === "speech" && (
        <>
          <span className="wa-play" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="28" height="28">
              <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" />
            </svg>
          </span>
          {duration && <span className="wa-duration">{duration}</span>}
        </>
      )}
    </div>
  );
}

function SpeechScene() {
  return (
    <svg viewBox="0 0 640 360" aria-hidden="true">
      <defs>
        <radialGradient id="spot" cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#f3d7a4" />
          <stop offset="55%" stopColor="#c4845a" />
          <stop offset="100%" stopColor="#4a2c28" />
        </radialGradient>
        <linearGradient id="curtain" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#6e2430" />
          <stop offset="100%" stopColor="#3a1218" />
        </linearGradient>
      </defs>
      <rect width="640" height="360" fill="url(#spot)" />
      <path d="M0 0h92v360H0z" fill="url(#curtain)" />
      <path d="M548 0h92v360h-92z" fill="url(#curtain)" />
      <path d="M92 0c28 40 28 80 0 120 28 36 28 78 0 116 28 40 28 80 0 124V0z" fill="#7a3140" opacity="0.85" />
      <path d="M548 0c-28 40-28 80 0 120-28 36-28 78 0 116-28 40-28 80 0 124V0z" fill="#7a3140" opacity="0.85" />
      <ellipse cx="320" cy="318" rx="150" ry="22" fill="#2a1814" opacity="0.35" />
      <rect x="248" y="214" width="144" height="78" rx="6" fill="#8a5a32" />
      <rect x="236" y="206" width="168" height="16" rx="3" fill="#a56b3c" />
      <rect x="300" y="168" width="8" height="52" fill="#2c2c2c" />
      <circle cx="304" cy="164" r="14" fill="#1a1a1a" />
      <circle cx="318" cy="118" r="28" fill="#e0b394" />
      <path d="M292 108c4-18 48-18 52 2-8-8-40-10-52-2z" fill="#6d645c" />
      <rect x="286" y="142" width="68" height="78" rx="20" fill="#f4f1ea" />
      <path d="M286 168c-22 8-30 36-18 48 16-18 22-28 18-48z" fill="#f7f4ee" />
      <path d="M354 168c22 8 30 36 18 48-16-18-22-28-18-48z" fill="#efeae2" />
      <g fill="#2a1814" opacity="0.55">
        <ellipse cx="168" cy="300" rx="22" ry="16" />
        <ellipse cx="214" cy="308" rx="20" ry="14" />
        <ellipse cx="430" cy="306" rx="22" ry="15" />
        <ellipse cx="478" cy="298" rx="18" ry="13" />
      </g>
      <rect x="0" y="300" width="640" height="60" fill="#1a100e" opacity="0.28" />
    </svg>
  );
}

function RainScene() {
  return (
    <svg viewBox="0 0 640 480" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#8e99a3" />
          <stop offset="100%" stopColor="#b7c0c6" />
        </linearGradient>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.18" />
          </feComponentTransfer>
        </filter>
      </defs>
      <rect width="640" height="480" fill="url(#sky)" />
      <rect x="40" y="150" width="120" height="210" fill="#c4897c" />
      <rect x="168" y="118" width="150" height="242" fill="#d7c4a8" />
      <rect x="330" y="92" width="130" height="268" fill="#b9c3b2" />
      <rect x="470" y="140" width="140" height="220" fill="#c46b5a" />
      <g fill="#6d7c86" opacity="0.55">
        <rect x="58" y="176" width="16" height="22" />
        <rect x="86" y="176" width="16" height="22" />
        <rect x="114" y="176" width="16" height="22" />
        <rect x="58" y="214" width="16" height="22" />
        <rect x="86" y="214" width="16" height="22" />
        <rect x="114" y="214" width="16" height="22" />
        <rect x="190" y="150" width="18" height="24" />
        <rect x="222" y="150" width="18" height="24" />
        <rect x="254" y="150" width="18" height="24" />
        <rect x="190" y="190" width="18" height="24" />
        <rect x="222" y="190" width="18" height="24" />
        <rect x="254" y="190" width="18" height="24" />
        <rect x="356" y="124" width="16" height="22" />
        <rect x="386" y="124" width="16" height="22" />
        <rect x="416" y="124" width="16" height="22" />
        <rect x="356" y="162" width="16" height="22" />
        <rect x="386" y="162" width="16" height="22" />
        <rect x="416" y="162" width="16" height="22" />
      </g>
      <g fill="#f3e2b0">
        <rect x="86" y="214" width="16" height="22" />
        <rect x="254" y="150" width="18" height="24" />
        <rect x="386" y="162" width="16" height="22" />
        <rect x="500" y="176" width="16" height="22" />
      </g>
      <rect x="0" y="340" width="640" height="140" fill="#5d666c" />
      <path d="M0 390h640" stroke="#8a9398" strokeWidth="10" />
      <ellipse cx="250" cy="430" rx="90" ry="16" fill="#3e474c" opacity="0.45" />
      <g transform="translate(250 292)">
        <rect x="36" y="58" width="132" height="46" rx="10" fill="#f0c14a" />
        <path d="M48 58h78c18 0 28-16 24-34H78L48 58z" fill="#1b1b1b" />
        <path d="M78 28h62l-8 26H70z" fill="#d7e4ea" />
        <rect x="18" y="78" width="28" height="22" rx="4" fill="#f0c14a" />
        <circle cx="52" cy="112" r="14" fill="#222" />
        <circle cx="148" cy="112" r="14" fill="#222" />
        <circle cx="108" cy="114" r="10" fill="#222" />
        <circle cx="52" cy="112" r="6" fill="#d5d8da" />
        <circle cx="148" cy="112" r="6" fill="#d5d8da" />
      </g>
      <g stroke="#d5dbe0" strokeWidth="2" opacity="0.55">
        <path d="M40 20l-10 28M90 8l-10 28M140 30l-10 28M200 12l-10 28M260 24l-10 28M320 6l-10 28M390 18l-10 28M450 8l-10 28M520 22l-10 28M580 14l-10 28" />
      </g>
      <rect width="640" height="480" filter="url(#grain)" opacity="0.35" />
    </svg>
  );
}

function TigerScene() {
  return (
    <svg viewBox="0 0 640 480" aria-hidden="true">
      <defs>
        <linearGradient id="room" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#f7d7b0" />
          <stop offset="100%" stopColor="#f3b98a" />
        </linearGradient>
        <linearGradient id="window" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffd27a" />
          <stop offset="100%" stopColor="#ff8b6a" />
        </linearGradient>
      </defs>
      <rect width="640" height="480" fill="url(#room)" />
      <rect x="210" y="36" width="220" height="150" rx="8" fill="url(#window)" />
      <path d="M320 36v150M210 110h220" stroke="#fff6e8" strokeWidth="6" />
      <rect x="70" y="250" width="500" height="150" rx="28" fill="#f7efe6" />
      <ellipse cx="250" cy="300" rx="78" ry="36" fill="#efcf72" />
      <path d="M188 292c-20-28 8-70 40-78 8 24 8 48-6 70" fill="#f0b429" />
      <path d="M230 230c8-20 36-24 48-8 4 16-10 28-24 30-12 0-22-8-24-22z" fill="#e7a317" />
      <path d="M210 248h70M206 262h78M214 276h60" stroke="#c47c12" strokeWidth="4" strokeLinecap="round" />
      <circle cx="268" cy="246" r="3.5" fill="#3a2a16" />
      <circle cx="286" cy="244" r="3.5" fill="#3a2a16" />
      <g transform="translate(360 168)">
        <path d="M40 150c-8-70 20-120 48-132 10 28 8 60-4 92 28-8 60 6 70 36-30 8-62 10-90 4z" fill="#7d1f3a" />
        <circle cx="78" cy="78" r="26" fill="#efc2a4" />
        <path d="M54 66c6-20 44-20 50 2-16-10-36-10-50-2z" fill="#2c241f" />
        <circle cx="70" cy="80" r="2.2" fill="#3a2a22" />
        <circle cx="88" cy="80" r="2.2" fill="#3a2a22" />
        <path d="M74 90c6 4 12 4 16 0" stroke="#c48b76" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

function LinkScene() {
  return (
    <svg viewBox="0 0 160 120" aria-hidden="true">
      <rect width="160" height="120" fill="#1c2b33" />
      <rect x="16" y="78" width="128" height="10" rx="2" fill="#d7e2dc" />
      <rect x="16" y="94" width="86" height="7" rx="2" fill="#8aa097" />
      <circle cx="80" cy="46" r="18" fill="#000" opacity="0.35" />
      <path d="M74 36v20l16-10-16-10z" fill="#fff" />
    </svg>
  );
}

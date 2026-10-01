import { cn } from "@/lib/utils";

type SceneProps = {
  reducedMotion: boolean;
  className?: string;
};

export function Scene({
  id,
  reducedMotion,
  className,
}: SceneProps & { id: string }) {
  if (id === "lisbon-rain") {
    return <LisbonRain reducedMotion={reducedMotion} className={className} />;
  }
  if (id === "harbor") {
    return <Harbor reducedMotion={reducedMotion} className={className} />;
  }
  if (id === "market") {
    return <Market reducedMotion={reducedMotion} className={className} />;
  }
  return <Cropped reducedMotion={reducedMotion} className={className} />;
}

function LisbonRain({ reducedMotion, className }: SceneProps) {
  return (
    <svg
      viewBox="0 0 640 360"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    >
      <rect width="640" height="360" fill="#141820" />
      <rect x="0" y="250" width="640" height="110" fill="#1c2430" />
      <g opacity="0.9">
        <rect x="40" y="70" width="70" height="190" fill="#242c38" />
        <rect x="130" y="40" width="90" height="220" fill="#1a2230" />
        <rect x="420" y="56" width="80" height="204" fill="#2a3342" />
        <rect x="520" y="90" width="100" height="170" fill="#1e2733" />
      </g>
      <rect x="250" y="120" width="18" height="140" fill="#3a3428" />
      <circle cx="259" cy="108" r="10" fill="#e0b15a" opacity="0.85" />
      <rect x="70" y="268" width="500" height="8" fill="#0e1218" />
      <g fill="#d7dee8" opacity="0.55">
        <ellipse cx="180" cy="248" rx="10" ry="22" />
        <ellipse cx="230" cy="246" rx="9" ry="24" />
        <ellipse cx="300" cy="244" rx="11" ry="26" />
        <ellipse cx="360" cy="248" rx="8" ry="20" />
        <ellipse cx="410" cy="242" rx="10" ry="28" />
      </g>
      <ellipse cx="300" cy="220" rx="11" ry="26" fill="#f2efe6" />
      <path d="M80 300 H560" stroke="#8ea0b5" strokeOpacity="0.25" />
      <g stroke="#9bb0c6" strokeOpacity="0.35" strokeWidth="1">
        {Array.from({ length: 18 }, (_, i) => (
          <line
            key={i}
            x1={20 + i * 36}
            y1={10 + (i % 3) * 8}
            x2={8 + i * 36}
            y2={70 + (i % 3) * 8}
          />
        ))}
      </g>
    </svg>
  );
}

function Harbor({ className }: SceneProps) {
  return (
    <svg
      viewBox="0 0 640 360"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    >
      <rect width="640" height="360" fill="#8ea4b0" />
      <rect x="0" y="0" width="640" height="150" fill="#6d8494" />
      <path d="M0 180 C80 150 140 210 220 180 C300 150 360 200 460 170 C540 148 600 190 640 160 V360 H0 Z" fill="#3e5968" />
      <path d="M0 210 C90 190 150 240 240 214 C330 188 400 230 500 206 C560 194 610 220 640 208 V360 H0 Z" fill="#2c4554" />
      <rect x="70" y="150" width="28" height="120" fill="#6b6258" />
      <rect x="120" y="168" width="22" height="102" fill="#5c554c" />
      <rect x="470" y="156" width="36" height="130" fill="#73685c" />
      <path d="M40 250 H600" stroke="#c5b7a4" strokeWidth="10" />
      <circle cx="210" cy="92" r="18" fill="#d5dde3" opacity="0.7" />
    </svg>
  );
}

function Market({ className }: SceneProps) {
  return (
    <svg
      viewBox="0 0 640 360"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    >
      <rect width="640" height="360" fill="#2a211c" />
      <rect x="40" y="80" width="120" height="180" fill="#3d2e24" />
      <rect x="180" y="60" width="150" height="200" fill="#4a3426" />
      <rect x="360" y="90" width="130" height="170" fill="#3a2c22" />
      <rect x="510" y="110" width="90" height="150" fill="#463226" />
      <g>
        <circle cx="100" cy="70" r="8" fill="#e7a34a" />
        <circle cx="250" cy="48" r="10" fill="#f0b15a" />
        <circle cx="430" cy="72" r="7" fill="#d9923e" />
      </g>
      <g fill="#c4b2a2" opacity="0.8">
        <ellipse cx="150" cy="250" rx="12" ry="28" />
        <ellipse cx="210" cy="246" rx="11" ry="30" />
        <ellipse cx="390" cy="252" rx="12" ry="26" />
        <ellipse cx="460" cy="248" rx="10" ry="28" />
      </g>
      <ellipse cx="300" cy="236" rx="16" ry="36" fill="#d7e4f2" />
      <circle cx="300" cy="196" r="12" fill="#e7eef6" />
      <path d="M0 300 H640 V360 H0 Z" fill="#1a1410" />
    </svg>
  );
}

function Cropped({ className }: SceneProps) {
  const cells = [];
  for (let y = 0; y < 8; y += 1) {
    for (let x = 0; x < 12; x += 1) {
      const shade = 40 + ((x * 17 + y * 29) % 50);
      cells.push(
        <rect
          key={`${x}-${y}`}
          x={x * 54}
          y={y * 46}
          width="54"
          height="46"
          fill={`oklch(0.${shade} 0.02 70)`}
        />,
      );
    }
  }
  return (
    <svg
      viewBox="0 0 640 360"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    >
      <rect width="640" height="360" fill="#6b645c" />
      {cells}
      <rect x="18" y="18" width="604" height="324" fill="none" stroke="#f4efe6" strokeOpacity="0.35" strokeWidth="8" />
      <rect x="36" y="36" width="568" height="288" fill="none" stroke="#1c1917" strokeOpacity="0.35" strokeWidth="4" />
    </svg>
  );
}

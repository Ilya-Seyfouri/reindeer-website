/**
 * A Santa-tracker style globe: a slowly turning night-time Earth with a
 * dotted flight path from Rudy HQ to the shopper's home, and a reindeer
 * sleigh placed along it by `progress` (0 = at HQ, 1 = delivered).
 * It's an illustration of the order's stage, not a live map position.
 */

const START = { x: 92, y: 262 };
const CONTROL = { x: 205, y: 18 };
const END = { x: 318, y: 214 };

/** Point and direction on the flight path (a quadratic curve) at t. */
function along(t: number) {
  const u = 1 - t;
  const x = u * u * START.x + 2 * u * t * CONTROL.x + t * t * END.x;
  const y = u * u * START.y + 2 * u * t * CONTROL.y + t * t * END.y;
  const dx = 2 * u * (CONTROL.x - START.x) + 2 * t * (END.x - CONTROL.x);
  const dy = 2 * u * (CONTROL.y - START.y) + 2 * t * (END.y - CONTROL.y);
  return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
}

/** The part of the path flown so far, as its own quadratic curve (de Casteljau split). */
function flownPath(t: number) {
  const c1 = { x: START.x + (CONTROL.x - START.x) * t, y: START.y + (CONTROL.y - START.y) * t };
  const p = along(t);
  return `M${START.x} ${START.y}Q${c1.x} ${c1.y} ${p.x} ${p.y}`;
}

const stars = [
  [28, 40, 1.6], [70, 22, 1.1], [120, 58, 1.3], [300, 30, 1.5], [352, 70, 1.2], [380, 24, 1],
  [24, 130, 1.1], [384, 150, 1.4], [46, 330, 1.2], [372, 318, 1.3], [160, 26, 0.9], [250, 50, 1.1],
  [12, 220, 1], [395, 250, 0.9], [340, 372, 1.1], [60, 380, 1],
] as const;

/** Simple continent shapes on a 600-wide strip; drawn twice so the drift loops seamlessly. */
const LAND =
  "M30 150c20-30 70-40 95-20 15 12 5 35 25 45 18 9 10 40-15 45-30 6-45 30-70 20-25-10-55-50-35-90z" +
  "M150 95c25-15 60-10 70 8 8 15-12 22-8 36 5 18-20 22-38 14-22-9-45-40-24-58z" +
  "M250 175c18-12 45-6 52 12 6 16-6 40-4 62 2 26-22 40-36 22-14-18-6-40-18-58-9-14-6-30 6-38z" +
  "M330 110c30-20 95-22 130-4 22 11 40 4 55 20 14 16-6 32-30 34-26 3-40 22-70 18-26-4-36-20-60-26-30-8-48-24-25-42z" +
  "M440 215c18-8 42-2 46 14 4 14-10 26-28 24-20-2-34-28-18-38z" +
  "M520 160c16-10 40-8 50 6 8 12-4 26-20 24-18-2-44-18-30-30z";

export function SleighTracker({ progress, caption }: { progress: number; caption: string }) {
  const t = Math.min(1, Math.max(0, progress));
  const sleigh = along(Math.max(0.04, Math.min(0.97, t)));
  const delivered = t >= 1;

  return (
    <figure className="overflow-hidden rounded-3xl bg-[oklch(0.2_0.05_265)] text-white shadow-[0_18px_40px_-24px_oklch(0.2_0.05_265/0.7)]">
      <svg viewBox="0 0 410 400" role="img" aria-label={caption} className="block w-full">
        <defs>
          <radialGradient id="sky" cx="50%" cy="40%" r="75%">
            <stop offset="0" stopColor="oklch(0.32 0.07 265)" />
            <stop offset="1" stopColor="oklch(0.18 0.05 265)" />
          </radialGradient>
          <radialGradient id="ocean" cx="38%" cy="34%" r="75%">
            <stop offset="0" stopColor="oklch(0.5 0.09 240)" />
            <stop offset="0.65" stopColor="oklch(0.33 0.08 250)" />
            <stop offset="1" stopColor="oklch(0.22 0.06 260)" />
          </radialGradient>
          <radialGradient id="shade" cx="35%" cy="30%" r="80%">
            <stop offset="0.55" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.45" />
          </radialGradient>
          <radialGradient id="nose-glow">
            <stop offset="0" stopColor="oklch(0.7 0.22 25)" stopOpacity="0.9" />
            <stop offset="1" stopColor="oklch(0.7 0.22 25)" stopOpacity="0" />
          </radialGradient>
          <clipPath id="globe-clip">
            <circle cx="205" cy="250" r="150" />
          </clipPath>
        </defs>

        <rect width="410" height="400" fill="url(#sky)" />
        {stars.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#fff" className="tracker-twinkle" style={{ animationDelay: `${(i % 5) * 0.7}s` }} />
        ))}

        {/* Globe: ocean, drifting continents, grid lines, then shading for depth */}
        <circle cx="205" cy="250" r="158" fill="oklch(0.6 0.1 240 / 0.18)" />
        <circle cx="205" cy="250" r="150" fill="url(#ocean)" />
        <g clipPath="url(#globe-clip)">
          <g className="tracker-drift" fill="oklch(0.62 0.09 150)">
            <path d={LAND} transform="translate(55 100)" />
            <path d={LAND} transform="translate(655 100)" />
          </g>
          {/* Snowy north pole cap */}
          <ellipse cx="205" cy="104" rx="90" ry="22" fill="oklch(0.96 0.01 240)" opacity="0.9" />
          <g fill="none" stroke="oklch(1 0 0 / 0.14)" strokeWidth="1">
            {[-100, -50, 0, 50, 100].map((dy) => (
              <ellipse key={dy} cx="205" cy={250 + dy} rx={Math.sqrt(150 * 150 - dy * dy)} ry={Math.sqrt(150 * 150 - dy * dy) * 0.12} />
            ))}
            {[30, 75, 115, 150].map((rx) => (
              <ellipse key={rx} cx="205" cy="250" rx={rx} ry="150" />
            ))}
          </g>
        </g>
        <circle cx="205" cy="250" r="150" fill="url(#shade)" />

        {/* Flight path: dotted ahead, solid where the sleigh has already flown */}
        <path
          d={`M${START.x} ${START.y}Q${CONTROL.x} ${CONTROL.y} ${END.x} ${END.y}`}
          fill="none"
          stroke="oklch(0.95 0.03 85 / 0.55)"
          strokeWidth="2"
          strokeDasharray="2 7"
          strokeLinecap="round"
        />
        {t > 0 ? (
          <path d={flownPath(t)} fill="none" stroke="oklch(0.85 0.12 85)" strokeWidth="2.5" strokeLinecap="round" />
        ) : null}

        {/* Rudy HQ */}
        <g transform={`translate(${START.x} ${START.y})`}>
          <circle r="7" fill="oklch(0.85 0.12 85)" stroke="#fff" strokeWidth="2" />
          <text y="24" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">
            Rudy HQ
          </text>
        </g>
        {/* Your home */}
        <g transform={`translate(${END.x} ${END.y})`}>
          <path d="M-9 2l9-9 9 9v9h-18z" fill={delivered ? "oklch(0.85 0.12 85)" : "#fff"} />
          <rect x="-2.5" y="5" width="5" height="6" fill="oklch(0.3 0.08 265)" />
          <text y="26" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">
            Your home
          </text>
        </g>

        {/* The sleigh, pointing along the path, bobbing gently */}
        {!delivered ? (
          <g transform={`translate(${sleigh.x} ${sleigh.y}) rotate(${sleigh.angle})`}>
            <g className="tracker-bob">
              <circle cx="30" cy="-6" r="12" fill="url(#nose-glow)" />
              {/* Reindeer */}
              <path d="M8-8c4-3 12-3 16 0l3-4 3 1-2 5c2 1 2 4 0 5l-4 1-1 6h-2l-1-5h-8l-2 5h-2l0-6c-3-1-3-6 0-8z" fill="oklch(0.55 0.08 50)" />
              <path d="M25-13l-2-5m2 5l3-5m-3 5l-1-3" stroke="oklch(0.4 0.06 50)" strokeWidth="1.4" strokeLinecap="round" />
              <circle cx="30" cy="-6" r="2.2" fill="oklch(0.65 0.24 25)" />
              {/* Reins and sleigh */}
              <path d="M8-5l-10 4" stroke="oklch(0.85 0.12 85)" strokeWidth="1" />
              <path d="M-26-8h20c2 0 3 2 2 4l-3 6h-17c-4 0-6-4-4-8z" fill="oklch(0.5 0.18 22)" />
              <path d="M-28 6h26c3 0 4-2 5-4" stroke="oklch(0.85 0.12 85)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              {/* Gift sack */}
              <circle cx="-20" cy="-11" r="5" fill="oklch(0.5 0.1 150)" />
            </g>
          </g>
        ) : (
          <g transform={`translate(${END.x} ${END.y - 26})`} className="tracker-bob">
            <circle r="13" fill="oklch(0.5 0.1 150)" />
            <path d="M-6 0l4 4 8-8" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
      </svg>
      <figcaption className="flex items-center justify-center gap-2 px-5 py-4 text-center font-bold">
        <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-[oklch(0.65_0.24_25)] shadow-[0_0_10px_oklch(0.7_0.22_25)]" />
        {caption}
      </figcaption>
    </figure>
  );
}

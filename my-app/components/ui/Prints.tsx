/* Festive print assets from the brand board: a snowy forest skyline
   and a repeating tree / paw / sparkle pattern (see .print-festive in globals.css). */

const trees: { x: number; h: number }[] = [
  { x: 40, h: 70 },
  { x: 85, h: 110 },
  { x: 125, h: 80 },
  { x: 330, h: 60 },
  { x: 365, h: 95 },
  { x: 560, h: 75 },
  { x: 790, h: 85 },
  { x: 830, h: 125 },
  { x: 875, h: 70 },
  { x: 1080, h: 65 },
  { x: 1120, h: 100 },
  { x: 1300, h: 90 },
  { x: 1345, h: 130 },
  { x: 1390, h: 75 },
];

/** Height of the rolling hills (0–200 scale, 200 = bottom) at a point across the 1440-wide skyline. */
function hillY(x: number) {
  const t = x / 1440;
  return 166 + 9 * Math.sin(t * Math.PI * 2 * 2 + 0.6) + 5 * Math.sin(t * Math.PI * 2 * 5 + 2);
}

const hillPath = (() => {
  let d = `M0 ${hillY(0).toFixed(1)}`;
  for (let x = 24; x <= 1440; x += 24) d += `L${x} ${hillY(x).toFixed(1)}`;
  return `${d}V200H0Z`;
})();

/** Ragged edge for one tier of needles, from (cx - half, y) to (cx + half, y), dipping in spikes. */
function tierPath(cx: number, top: number, bottom: number, half: number, spikes: number) {
  let d = `M${cx} ${top}L${cx - half} ${bottom}`;
  for (let i = 1; i <= spikes; i++) {
    const x = cx - half + ((2 * half) / spikes) * i;
    const xm = x - half / spikes;
    d += `L${xm.toFixed(2)} ${(bottom - 3.2).toFixed(2)}L${x.toFixed(2)} ${bottom}`;
  }
  return `${d}Z`;
}

const PINE_TIERS = [
  { top: 2, bottom: 30, half: 10, spikes: 4 },
  { top: 14, bottom: 46, half: 15, spikes: 5 },
  { top: 28, bottom: 62, half: 20, spikes: 6 },
  { top: 42, bottom: 80, half: 25, spikes: 7 },
];

/** A realistic-ish pine: layered ragged tiers in dark pine green, a light-catching side, dusted with snow. */
function Pine({ style }: { style: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 60 100" className="absolute" style={style} aria-hidden="true" focusable="false">
      {/* Trunk */}
      <path d="M27 76h6l1.2 24h-8.4z" fill="#24160d" />
      <path d="M27 76h2.2l-.6 24h-1.8z" fill="#3b2617" />
      {PINE_TIERS.map((t, i) => (
        <g key={i}>
          {/* Shadowed needles */}
          <path d={tierPath(30, t.top, t.bottom, t.half, t.spikes)} fill="#173322" />
          {/* Sunlit left half */}
          <path d={`M30 ${t.top}L${30 - t.half} ${t.bottom}L${30 - t.half * 0.2} ${t.bottom - 2}Z`} fill="#24492f" />
          {/* Snow resting on the tier */}
          <path
            d={`M30 ${t.top + 0.5}L${30 - t.half * 0.32} ${t.top + (t.bottom - t.top) * 0.36}q${t.half * 0.32} -2.2 ${t.half * 0.62} 0.4L30 ${t.top + 0.5}z`}
            fill="#f4f1ea"
            opacity="0.85"
          />
        </g>
      ))}
    </svg>
  );
}

const sparkle = (x: number, y: number, r: number) =>
  `M${x} ${y - r}C${x + r * 0.15} ${y - r * 0.15} ${x + r * 0.15} ${y - r * 0.15} ${x + r} ${y}C${x + r * 0.15} ${y + r * 0.15} ${x + r * 0.15} ${y + r * 0.15} ${x} ${y + r}C${x - r * 0.15} ${y + r * 0.15} ${x - r * 0.15} ${y + r * 0.15} ${x - r} ${y}C${x - r * 0.15} ${y - r * 0.15} ${x - r * 0.15} ${y - r * 0.15} ${x} ${y - r}Z`;

/**
 * Rolling hills with pines, sitting flush on top of a dark band. The hills
 * stretch to any width; each tree keeps its own shape and is placed on the
 * hill, so nothing gets cropped on wide screens.
 */
export function ForestSkyline({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-20 w-full overflow-hidden sm:h-28 md:h-36 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="absolute inset-0 size-full" focusable="false">
        <g className="fill-caramel" opacity="0.55">
          <path d={sparkle(240, 60, 9)} />
          <path d={sparkle(470, 95, 6)} />
          <path d={sparkle(690, 45, 11)} />
          <path d={sparkle(980, 80, 7)} />
          <path d={sparkle(1220, 50, 9)} />
        </g>
      </svg>
      {trees.map((t) => {
        // Tree heights are on the same 0–200 scale as the hills; its trunk base sinks a little into the hill.
        const base = hillY(t.x) + 8;
        return (
          <Pine
            key={t.x}
            style={{
              left: `${(t.x / 1440) * 100}%`,
              bottom: `${((200 - base) / 200) * 100}%`,
              height: `${(t.h / 200) * 100}%`,
              transform: "translateX(-50%)",
            }}
          />
        );
      })}
      <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="absolute inset-0 size-full" focusable="false">
        <path d={hillPath} className="fill-chocolate-deep" />
      </svg>
    </div>
  );
}

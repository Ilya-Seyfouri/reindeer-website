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

/** Pine tree with three tiers, base sitting on y. */
function tree(x: number, base: number, h: number) {
  const w = h * 0.5;
  const tiers = [0, 0.32, 0.6];
  return tiers
    .map((t, i) => {
      const top = base - h + t * h;
      const bottom = top + h * (0.48 + i * 0.04);
      const half = (w / 2) * (0.55 + i * 0.22);
      return `M${x} ${top}L${x - half} ${bottom}H${x + half}Z`;
    })
    .join("");
}

const sparkle = (x: number, y: number, r: number) =>
  `M${x} ${y - r}C${x + r * 0.15} ${y - r * 0.15} ${x + r * 0.15} ${y - r * 0.15} ${x + r} ${y}C${x + r * 0.15} ${y + r * 0.15} ${x + r * 0.15} ${y + r * 0.15} ${x} ${y + r}C${x - r * 0.15} ${y + r * 0.15} ${x - r * 0.15} ${y + r * 0.15} ${x - r} ${y}C${x - r * 0.15} ${y - r * 0.15} ${x - r * 0.15} ${y - r * 0.15} ${x} ${y - r}Z`;

/** Rolling snowy hills with pines, drawn to sit flush on top of a dark band. */
export function ForestSkyline({ className = "" }: { className?: string }) {
  const base = 190;
  return (
    <svg
      viewBox="0 0 1440 200"
      preserveAspectRatio="xMidYMax slice"
      className={`block h-20 w-full sm:h-28 md:h-36 ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <g className="fill-caramel" opacity="0.55">
        <path d={sparkle(240, 60, 9)} />
        <path d={sparkle(470, 95, 6)} />
        <path d={sparkle(690, 45, 11)} />
        <path d={sparkle(980, 80, 7)} />
        <path d={sparkle(1220, 50, 9)} />
      </g>
      <circle cx="690" cy="45" r="3" className="fill-rudolph" />
      <g className="fill-cocoa-deep">
        {trees.map((t) => (
          <path key={t.x} d={tree(t.x, base, t.h)} />
        ))}
        <path d="M0 175C200 140 380 150 560 172S900 150 1100 165 1340 150 1440 160V200H0Z" />
      </g>
    </svg>
  );
}

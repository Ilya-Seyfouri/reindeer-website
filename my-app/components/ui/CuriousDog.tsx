/** A curious dog face: head tilted, one ear perked, one brow raised, with a question mark. Decorative. */
export function CuriousDog({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 132 120" aria-hidden="true" focusable="false" className={className}>
      {/* Question mark, floating by the perked ear */}
      <text
        x="112"
        y="34"
        textAnchor="middle"
        fontSize="34"
        fontWeight="700"
        fill="var(--color-rudolph)"
        style={{ fontFamily: "var(--font-display)" }}
        transform="rotate(14 112 26)"
      >
        ?
      </text>

      <g transform="rotate(-13 60 68)">
        {/* Floppy ear (left) and perked ear (right) */}
        <path d="M30 44c-14 2-22 20-18 38 2 8 10 9 14 3l10-26z" fill="var(--color-chocolate)" />
        <path d="M84 40c6-16 16-24 22-22 4 8 0 26-8 36z" fill="var(--color-chocolate)" />
        <path d="M89 40c4-9 9-14 12-14 2 5-1 15-5 21z" fill="var(--color-caramel)" opacity="0.55" />

        {/* Head */}
        <ellipse cx="60" cy="68" rx="35" ry="33" fill="var(--color-fawn-deep)" />
        {/* Forehead blaze and muzzle */}
        <path d="M60 40c-5 0-7 14-7 24h14c0-10-2-24-7-24z" fill="var(--color-fawn-soft)" />
        <ellipse cx="60" cy="84" rx="20" ry="15" fill="var(--color-fawn-soft)" />

        {/* Brows: the right one raised */}
        <path d="M41 54q6-4 12 0" stroke="var(--color-chocolate-deep)" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M67 49q7-7 14-2" stroke="var(--color-chocolate-deep)" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Eyes, glancing up */}
        <circle cx="47" cy="63" r="5.5" fill="var(--color-ink)" />
        <circle cx="74" cy="61" r="6.5" fill="var(--color-ink)" />
        <circle cx="48.5" cy="61" r="1.8" fill="var(--color-white)" />
        <circle cx="76" cy="58.5" r="2.2" fill="var(--color-white)" />

        {/* Nose and a small, puzzled mouth */}
        <ellipse cx="60" cy="77" rx="7" ry="5" fill="var(--color-ink)" />
        <ellipse cx="58" cy="75.5" rx="2.2" ry="1.2" fill="var(--color-white)" opacity="0.5" />
        <path d="M60 82v4m-7 4q7 2 14-2" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

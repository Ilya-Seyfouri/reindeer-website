/**
 * A golden bone-shaped biscuit with a couple of sparkles: the picture for the
 * gourmet dog treats. Decorative, so it's hidden from screen readers; the
 * treat's name is always written next to it.
 */
export function TreatArt({ className = "" }: { className?: string }) {
  // The bone: a bar with two round lobes at each end
  const bone = (
    <>
      <rect x="17" y="27" width="30" height="12" rx="3" />
      <circle cx="16" cy="26" r="7" />
      <circle cx="16" cy="40" r="7" />
      <circle cx="48" cy="26" r="7" />
      <circle cx="48" cy="40" r="7" />
    </>
  );

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" className={className}>
      <g transform="rotate(-18 32 33)">
        {/* Baked edge, drawn a little bigger and lower for a chunky, cartoon look */}
        <g fill="#B8732F" stroke="#B8732F" strokeWidth="4" strokeLinejoin="round" transform="translate(0 1.5)">
          {bone}
        </g>
        {/* Biscuit top */}
        <g fill="#E7A957">{bone}</g>
        {/* Shine on the lobes */}
        <g fill="#FFF3DC" opacity="0.7">
          <ellipse cx="13.5" cy="23.5" rx="2.6" ry="1.6" transform="rotate(-30 13.5 23.5)" />
          <ellipse cx="45.5" cy="23.5" rx="2.6" ry="1.6" transform="rotate(-30 45.5 23.5)" />
        </g>
        {/* Docking holes, like a real baked biscuit */}
        <g fill="#B8732F">
          <circle cx="25" cy="33" r="1.5" />
          <circle cx="32" cy="33" r="1.5" />
          <circle cx="39" cy="33" r="1.5" />
        </g>
      </g>
      {/* Sparkles */}
      <g fill="currentColor">
        <path d="M54 8c.5 3 1.4 3.9 4.4 4.4-3 .5-3.9 1.4-4.4 4.4-.5-3-1.4-3.9-4.4-4.4 3-.5 3.9-1.4 4.4-4.4z" />
        <path d="M9 50c.4 2.2 1 2.8 3.2 3.2-2.2.4-2.8 1-3.2 3.2-.4-2.2-1-2.8-3.2-3.2 2.2-.4 2.8-1 3.2-3.2z" />
        <circle cx="57" cy="47" r="1.4" />
      </g>
    </svg>
  );
}

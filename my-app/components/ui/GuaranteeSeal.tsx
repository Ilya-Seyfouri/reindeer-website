import { useId } from "react";
import { guarantee } from "@/config/product";

/** Circumference of the r=72 text path, so the ring text closes without a gap or overlap. */
const RING = 2 * Math.PI * 72;

/** Round "30 days · 100% money-back guarantee" seal. */
export function GuaranteeSeal({ className = "" }: { className?: string }) {
  const pathId = useId();
  const ring = "100% MONEY-BACK GUARANTEE • ";

  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label={`${guarantee.days}-day 100% money-back guarantee`}
      className={`shrink-0 ${className}`}
    >
      <defs>
        <path id={pathId} d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
      </defs>
      <circle cx="100" cy="100" r="98" fill="var(--color-chocolate)" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="var(--color-fawn)" strokeWidth="1.5" strokeDasharray="2 5" />
      <text
        aria-hidden="true"
        fill="var(--color-fawn)"
        fontSize="17.5"
        fontWeight="700"
        fontFamily="var(--font-sans)"
      >
        <textPath href={`#${pathId}`} textLength={RING} lengthAdjust="spacing">
          {ring}
        </textPath>
      </text>
      <text
        aria-hidden="true"
        x="100"
        y="105"
        textAnchor="middle"
        fill="white"
        fontSize="56"
        fontFamily="var(--font-display)"
      >
        {guarantee.days}
      </text>
      <text
        aria-hidden="true"
        x="100"
        y="131"
        textAnchor="middle"
        fill="var(--color-fawn)"
        fontSize="16"
        fontWeight="700"
        letterSpacing="1.5"
        fontFamily="var(--font-sans)"
      >
        DAYS
      </text>
    </svg>
  );
}

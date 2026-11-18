"use client";

import { MinusIcon, PlusIcon } from "@/components/ui/icons";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max,
  label = "Quantity",
  compact = false,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max: number;
  label?: string;
  compact?: boolean;
}) {
  const btn = `grid place-items-center rounded-full text-ink transition-colors duration-200 hover:bg-fawn-soft disabled:opacity-35 disabled:hover:bg-transparent ${
    compact ? "size-11" : "size-12"
  }`;
  return (
    <div
      role="group"
      aria-label={label}
      className={`inline-flex items-center rounded-full bg-white p-1 shadow-[inset_0_0_0_1.5px_var(--color-line-strong)] ${
        compact ? "" : "min-h-14"
      }`}
    >
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={value <= 1 && min === 0 ? "Remove" : "Decrease quantity"}
      >
        <MinusIcon size={20} />
      </button>
      <output aria-live="polite" className={`text-center font-bold tabular-nums ${compact ? "w-8" : "w-10 text-xl"}`}>
        {value}
      </output>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <PlusIcon size={20} />
      </button>
    </div>
  );
}

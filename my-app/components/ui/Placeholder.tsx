import { CameraIcon, PlayIcon } from "@/components/ui/icons";
import { site } from "@/config/product";

/**
 * A clearly labelled stand-in for your own photos and video.
 * To swap in a real photo, replace the <Placeholder> with:
 *   <Image src="/photos/hero.jpg" alt="..." fill sizes="..." className="object-cover" />
 * inside the same aspect-ratio box.
 */
export function Placeholder({
  label,
  detail,
  ratio,
  kind = "photo",
  className = "",
  tone = "light",
  compact = false,
}: {
  label: string;
  detail?: string;
  ratio: string;
  kind?: "photo" | "video";
  className?: string;
  tone?: "light" | "deep";
  /** Icon only, for small thumbnails */
  compact?: boolean;
}) {
  const [w, h] = ratio.split(":").map(Number);
  const Icon = kind === "video" ? PlayIcon : CameraIcon;

  return (
    <div
      role="img"
      aria-label={`${label}${detail ? `: ${detail}` : ""} (placeholder)`}
      style={{ aspectRatio: `${w} / ${h}` }}
      className={`relative isolate grid w-full place-items-center overflow-hidden ${
        tone === "deep" ? "bg-fawn-deep/45" : "bg-fawn-soft"
      } ${className}`}
    >
      {/* Soft grain so empty frames don't look flat */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, oklch(1 0 0 / 0.7), transparent 55%), radial-gradient(circle at 80% 90%, oklch(0.74 0.085 61 / 0.35), transparent 50%)",
        }}
      />
      {compact ? (
        <CameraIcon size={22} className="text-caramel-deep" />
      ) : (
      <div className="flex max-w-[22ch] flex-col items-center gap-2 p-5 text-center text-ink-soft">
        <span
          className={`grid place-items-center rounded-full bg-white/80 text-cocoa ${
            kind === "video" ? "size-16 sm:size-20" : "size-11"
          }`}
        >
          <Icon size={kind === "video" ? 30 : 22} className={kind === "video" ? "translate-x-0.5" : ""} />
        </span>
        <span className="text-[0.9375rem] font-bold tracking-wide text-ink">
          {label} <span className="font-normal text-ink-soft">· {ratio}</span>
        </span>
        {detail ? <span className="text-[0.9375rem] leading-snug">{detail}</span> : null}
      </div>
      )}
      {site.showPlaceholderMarkers && !compact ? (
        <span aria-hidden="true" className="pointer-events-none absolute inset-2.5 rounded-[inherit] border-2 border-dashed border-caramel/40" />
      ) : null}
    </div>
  );
}

/** Marks a placeholder value (price, count, time) with a dotted underline while markers are on. */
export function Ph({ children }: { children: React.ReactNode }) {
  if (!site.showPlaceholderMarkers) return <>{children}</>;
  return (
    <span className="ph-mark" title="Placeholder: edit in config/product.ts">
      {children}
    </span>
  );
}

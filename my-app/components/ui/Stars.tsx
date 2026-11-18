import { StarIcon } from "@/components/ui/icons";

export function Stars({
  rating,
  size = 20,
  label,
  className = "",
}: {
  rating: number;
  size?: number;
  label?: string;
  className?: string;
}) {
  const full = Math.round(rating);
  return (
    <span
      role="img"
      aria-label={label ?? `Rated ${rating} out of 5`}
      className={`inline-flex items-center gap-0.5 text-caramel ${className}`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} size={size} className={i < full ? "" : "text-line-strong"} />
      ))}
    </span>
  );
}

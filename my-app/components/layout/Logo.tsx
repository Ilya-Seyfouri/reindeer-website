import Link from "next/link";
import { site } from "@/config/product";

/** Wordmark with a small antler mark. Swap for your own logo file any time. */
export function Logo({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={`inline-flex min-h-12 items-center gap-2 rounded-lg ${tone === "light" ? "text-white" : "text-ink"} ${className}`}
    >
      <svg
        viewBox="0 0 32 32"
        className={`size-7 shrink-0 ${tone === "light" ? "text-fawn" : "text-caramel"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M11 27c0-6-1-9-4-12M7 15c-2-1-3-3-3-6M7 15c0-3 1-5 3-6M9 20c-2 0-4-1-5-3" />
        <path d="M21 27c0-6 1-9 4-12M25 15c2-1 3-3 3-6M25 15c0-3-1-5-3-6M23 20c2 0 4-1 5-3" />
      </svg>
      <span className="font-display text-[1.5rem] leading-none tracking-[-0.01em] sm:text-[1.625rem]">{site.name}</span>
    </Link>
  );
}

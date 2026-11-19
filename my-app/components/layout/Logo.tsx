import Image from "next/image";
import Link from "next/link";
import logoMark from "@/app/images/logo.png";
import { site } from "@/config/product";

/** Wordmark with the reindeer-dog mark (app/images/logo.png). */
export function Logo({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={`inline-flex min-h-12 items-center gap-2 rounded-lg ${tone === "light" ? "text-white" : "text-ink"} ${className}`}
    >
      <span
        className={`grid shrink-0 place-items-center ${tone === "light" ? "size-11 rounded-full bg-fawn-soft p-1" : "size-10"}`}
      >
        <Image src={logoMark} alt="" width={44} height={44} priority className="size-full" />
      </span>
      <span className="font-display text-[1.5rem] leading-none tracking-[-0.01em] sm:text-[1.625rem]">{site.name}</span>
    </Link>
  );
}

"use client";

import { useRef, useState } from "react";
import { Placeholder } from "@/components/ui/Placeholder";
import { product } from "@/config/product";

/** Swipeable photo gallery. Thumbnails on tablet and up, dots on phones. */
export function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const images = product.images;

  function goTo(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: index * track.clientWidth, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <div className="relative -mx-(--safe-left) sm:mx-0">
        <div
          ref={trackRef}
          onScroll={(e) => {
            const el = e.currentTarget;
            const i = Math.round(el.scrollLeft / el.clientWidth);
            if (i !== active) setActive(i);
          }}
          className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] sm:rounded-3xl [&::-webkit-scrollbar]:hidden"
          aria-roledescription="carousel"
          aria-label="Product photos"
          tabIndex={0}
        >
          {images.map((img, i) => (
            <div
              key={img.label}
              className="w-full shrink-0 snap-center snap-always"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${images.length}`}
            >
              <Placeholder label={img.label} detail={img.detail} ratio={img.ratio} />
            </div>
          ))}
        </div>
        <p
          aria-hidden="true"
          className="absolute top-4 right-[max(1rem,var(--safe-right))] rounded-full bg-white/90 px-3 py-1 text-base font-bold tabular-nums sm:right-4 sm:hidden"
        >
          {active + 1} / {images.length}
        </p>
      </div>

      {/* Dots (phones) */}
      <div className="flex justify-center gap-1 sm:hidden">
        {images.map((img, i) => (
          <button
            key={img.label}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show photo ${i + 1}`}
            aria-current={i === active}
            className="grid size-8 place-items-center"
          >
            <span
              className={`block size-2.5 rounded-full transition-[transform,background-color] duration-300 ${
                i === active ? "scale-125 bg-cocoa" : "bg-line-strong"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Thumbnails (tablet and up) */}
      <div className="hidden grid-cols-4 gap-3 sm:grid">
        {images.map((img, i) => (
          <button
            key={img.label}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show ${img.label.toLowerCase()}`}
            aria-current={i === active}
            className={`overflow-hidden rounded-xl transition-[box-shadow,opacity] duration-300 ${
              i === active
                ? "opacity-100 shadow-[0_0_0_2.5px_var(--color-cocoa)]"
                : "opacity-70 shadow-[0_0_0_1.5px_var(--color-line)] hover:opacity-100"
            }`}
          >
            <Placeholder label={img.label} ratio="1:1" compact />
          </button>
        ))}
      </div>
    </div>
  );
}

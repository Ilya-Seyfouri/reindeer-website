"use client";

import { useRef, useState } from "react";
import { GuaranteeSeal } from "@/components/ui/GuaranteeSeal";
import { Placeholder } from "@/components/ui/Placeholder";
import { product } from "@/config/product";

/** Big swipeable photo with a row of thumbnails underneath, edge to edge with it. */
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
      <div
        ref={trackRef}
        onScroll={(e) => {
          const el = e.currentTarget;
          const i = Math.round(el.scrollLeft / el.clientWidth);
          if (i !== active) setActive(i);
        }}
        className="-mx-(--safe-left) flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] sm:mx-0 sm:rounded-3xl [&::-webkit-scrollbar]:hidden"
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
            <div className="relative">
              <Placeholder label={img.label} detail={img.detail} ratio={img.ratio} />
              {i === 0 ? (
                <GuaranteeSeal className="absolute top-3 right-3 size-24 drop-shadow-[0_8px_16px_oklch(0.22_0.035_50/0.3)] sm:top-4 sm:right-4 sm:size-28 lg:size-32" />
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-2 sm:gap-3" style={{ gridTemplateColumns: `repeat(${images.length}, minmax(0, 1fr))` }}>
        {images.map((img, i) => (
          <button
            key={img.label}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show ${img.label.toLowerCase()}`}
            aria-current={i === active}
            className={`overflow-hidden rounded-xl transition-[box-shadow,opacity] duration-300 sm:rounded-2xl ${
              i === active
                ? "opacity-100 shadow-[0_0_0_2.5px_var(--color-cocoa)]"
                : "opacity-75 shadow-[0_0_0_1.5px_var(--color-line)] hover:opacity-100"
            }`}
          >
            <Placeholder label={img.label} ratio="1:1" compact />
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { Placeholder } from "@/components/ui/Placeholder";
import { product } from "@/config/product";

/** Big swipeable photo with a row of four thumbnails underneath. */
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
            <Placeholder label={img.label} detail={img.detail} ratio={img.ratio} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2.5 sm:gap-3 lg:max-w-[85%]">
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

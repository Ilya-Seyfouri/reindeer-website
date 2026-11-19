"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Snowfall } from "@/components/layout/Snowfall";
import { GuaranteeSeal } from "@/components/ui/GuaranteeSeal";
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
              <div className="relative">
                <Image
                  src={img.src}
                  alt={img.alt}
                  placeholder="blur"
                  preload={i === 0}
                  sizes="(min-width: 1024px) 560px, (min-width: 640px) 90vw, 100vw"
                  className="aspect-square w-full bg-fawn-soft object-cover"
                />
                {i === 0 ? (
                  <GuaranteeSeal className="absolute top-3 right-3 size-24 drop-shadow-[0_8px_16px_oklch(0.22_0.035_50/0.3)] sm:top-4 sm:right-4 sm:size-28 lg:size-32" />
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <Snowfall className="sm:rounded-3xl" />

        {/* Phones swipe the photo, so dots on the photo stand in for the thumbnails. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center sm:hidden">
          <div className="pointer-events-auto flex items-center rounded-full bg-white/85 px-1.5 shadow-[0_4px_14px_-6px_oklch(0.22_0.035_50/0.5)] backdrop-blur-sm">
            {images.map((img, i) => (
              <button
                key={img.label}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show ${img.label.toLowerCase()}`}
                aria-current={i === active}
                // The pill stays slim; the invisible ::after makes each dot a ~44px tap target
                className="relative grid h-8 w-9 place-items-center after:absolute after:-inset-y-2 after:inset-x-0"
              >
                <span
                  className={`block h-2 rounded-full transition-[width,background-color] duration-300 ${
                    i === active ? "w-5 bg-cocoa" : "w-2 bg-ink/30"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden gap-3 sm:grid" style={{ gridTemplateColumns: `repeat(${images.length}, minmax(0, 1fr))` }}>
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
            <Image
              src={img.src}
              alt=""
              placeholder="blur"
              sizes="(min-width: 1024px) 110px, 20vw"
              className="aspect-square w-full bg-fawn-soft object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

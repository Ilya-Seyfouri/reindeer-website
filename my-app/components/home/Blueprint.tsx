"use client";

import { useState } from "react";
import { Placeholder } from "@/components/ui/Placeholder";
import { blueprint } from "@/config/product";

/** Drafting-paper grid in the brand's fawn, drawn on cocoa. */
const grid = {
  backgroundImage:
    "linear-gradient(oklch(0.82 0.07 64 / 0.08) 1px, transparent 1px), linear-gradient(90deg, oklch(0.82 0.07 64 / 0.08) 1px, transparent 1px)",
  backgroundSize: "32px 32px",
  backgroundPosition: "center top",
};

function CornerMarks() {
  const mark = "absolute size-5 border-fawn/70";
  return (
    <>
      <span aria-hidden="true" className={`${mark} -top-3 -left-3 border-t-[1.5px] border-l-[1.5px]`} />
      <span aria-hidden="true" className={`${mark} -top-3 -right-3 border-t-[1.5px] border-r-[1.5px]`} />
      <span aria-hidden="true" className={`${mark} -bottom-3 -left-3 border-b-[1.5px] border-l-[1.5px]`} />
      <span aria-hidden="true" className={`${mark} -right-3 -bottom-3 border-r-[1.5px] border-b-[1.5px]`} />
    </>
  );
}

export function Blueprint() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section aria-labelledby="blueprint-title" className="on-dark section bg-cocoa text-white" style={grid}>
      <div className="wrap">
        <div className="mx-auto max-w-[40rem] text-center">
          <h2 id="blueprint-title" className="reveal h-section">
            {blueprint.title}
          </h2>
          <p className="reveal lead mx-auto mt-5 max-w-[36ch] text-on-cocoa-soft">{blueprint.intro}</p>
        </div>

        <figure className="mx-auto mt-12 max-w-[64rem] sm:mt-16">
          <div className="reveal relative">
            <CornerMarks />
            {/*
              Swap in your drawing:
              <Image src="/photos/blueprint.png" alt="Diagram of the costume ..." fill className="object-contain" />
              then move each pin's x / y in config/product.ts to line up with it.
            */}
            <Placeholder
              label={blueprint.image.label}
              detail={blueprint.image.detail}
              ratio={blueprint.image.ratio}
              tone="deep"
              className="rounded-2xl"
            />
            <div aria-hidden="true" className="reveal-fade absolute inset-0">
              {blueprint.parts.map((part, i) => (
                <span
                  key={part.title}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${part.x}%`, top: `${part.y}%` }}
                >
                  <span
                    className={`grid size-8 place-items-center rounded-full font-bold tabular-nums shadow-[0_0_0_5px_oklch(0.3_0.05_50/0.35)] transition-[transform,background-color,color] duration-300 ease-(--ease-out-quart) sm:size-10 sm:text-lg ${
                      active === i ? "scale-115 bg-fawn text-cocoa" : "bg-white text-cocoa"
                    }`}
                  >
                    {i + 1}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <figcaption className="mt-12 sm:mt-14">
            <ol className="reveal-stagger grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
              {blueprint.parts.map((part, i) => (
                <li
                  key={part.title}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  className="flex gap-4"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <span
                    aria-hidden="true"
                    className={`grid size-9 shrink-0 place-items-center rounded-full font-bold tabular-nums transition-colors duration-300 ${
                      active === i ? "bg-fawn text-cocoa" : "shadow-[inset_0_0_0_1.5px_var(--color-fawn)] text-fawn"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-lg leading-snug font-bold">{part.title}</p>
                    <p className="mt-1 text-on-cocoa-soft">{part.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

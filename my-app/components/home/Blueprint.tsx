"use client";

import Image from "next/image";
import { useState } from "react";
import { Snowfall } from "@/components/layout/Snowfall";
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
    <section data-section="blueprint" aria-labelledby="blueprint-title" className="on-dark section relative bg-cocoa text-white" style={grid}>
      <div className="wrap">
        <div className="mx-auto max-w-[40rem] text-center">
          <h2 id="blueprint-title" className="reveal h-section">
            {blueprint.title}
          </h2>
          <p className="reveal lead mx-auto mt-5 max-w-[36ch] text-on-cocoa-soft">{blueprint.intro}</p>
        </div>

        <figure className="mx-auto mt-10 max-w-[64rem] sm:mt-16">
          {/* The full drawing with numbered callouts. */}
          <div className="reveal relative">
            <CornerMarks />
            {/* The drawing has no background, so it sits on the same soft fawn panel. */}
            <div
              className="relative isolate overflow-hidden rounded-2xl bg-fawn-deep/45"
              style={{ aspectRatio: `${blueprint.image.src.width} / ${blueprint.image.src.height}` }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 opacity-60"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 20%, oklch(1 0 0 / 0.7), transparent 55%), radial-gradient(circle at 80% 90%, oklch(0.74 0.085 61 / 0.35), transparent 50%)",
                }}
              />
              <Image
                src={blueprint.image.src}
                alt={blueprint.image.alt}
                fill
                sizes="(min-width: 1088px) 1024px, 94vw"
                className="object-cover"
              />
            </div>
            {/* Callouts: a numbered pin in the clear space, with a leader line to the part it names */}
            <div aria-hidden="true" className="reveal-fade absolute inset-0">
              <svg className="absolute inset-0 size-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                {blueprint.parts.map((part, i) => (
                  <line
                    key={part.title}
                    x1={part.x}
                    y1={part.pinY}
                    x2={part.x}
                    y2={part.y}
                    vectorEffect="non-scaling-stroke"
                    strokeWidth={1.5}
                    className={`transition-[stroke] duration-300 ${active === i ? "stroke-cocoa" : "stroke-white"}`}
                  />
                ))}
              </svg>
              {blueprint.parts.map((part, i) => (
                <span key={part.title}>
                  <span
                    className={`absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 transition-colors duration-300 sm:size-2.5 ${
                      active === i ? "bg-cocoa ring-fawn" : "bg-white ring-cocoa/40"
                    }`}
                    style={{ left: `${part.x}%`, top: `${part.y}%` }}
                  />
                  <span
                    className={`absolute grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-sm font-bold tabular-nums shadow-[0_0_0_4px_oklch(0.3_0.05_50/0.25)] transition-[transform,background-color,color] duration-300 ease-(--ease-out-quart) sm:size-10 sm:text-lg ${
                      active === i ? "scale-115 bg-cocoa text-white" : "bg-white text-cocoa"
                    }`}
                    style={{ left: `${part.x}%`, top: `${part.pinY}%` }}
                  >
                    {i + 1}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <figcaption className="mt-8 sm:mt-14">
            {/* Phones: just the four names, two by two. Bigger screens add a line about each. */}
            <ol className="reveal-stagger grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-x-8 sm:gap-y-7 lg:grid-cols-4">
              {blueprint.parts.map((part, i) => (
                <li
                  key={part.title}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  className="flex items-center gap-3 sm:items-start sm:gap-4"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <span
                    aria-hidden="true"
                    className={`grid size-8 shrink-0 place-items-center rounded-full text-[0.9375rem] sm:size-9 sm:text-base font-bold tabular-nums transition-colors duration-300 ${
                      active === i ? "bg-fawn text-cocoa" : "shadow-[inset_0_0_0_1.5px_var(--color-fawn)] text-fawn"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-[1.0625rem] leading-snug font-bold sm:text-lg">{part.title}</p>
                    <p className="mt-1 hidden text-on-cocoa-soft sm:block">{part.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </figcaption>
        </figure>
      </div>
      <Snowfall />
    </section>
  );
}

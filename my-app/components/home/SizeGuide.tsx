"use client";

import { useState } from "react";
import { BuyButton } from "@/components/home/BuyButton";
import { useSelection } from "@/components/home/ProductSelection";
import { Placeholder } from "@/components/ui/Placeholder";
import { product, type SizeId } from "@/config/product";

type Unit = "in" | "cm";

const steps = [
  { title: "Chest", body: "Wrap a soft tape around the widest part of the chest, just behind the front legs. This is the one that matters most." },
  { title: "Neck", body: "Measure where the collar usually sits. Leave room for two fingers." },
  { title: "Back", body: "From the base of the neck to the base of the tail." },
];

function range([min, max]: readonly [number, number], unit: Unit) {
  if (unit === "in") return `${min}–${max}`;
  return `${Math.round(min * 2.54)}–${Math.round(max * 2.54)}`;
}

export function SizeGuide() {
  const [unit, setUnit] = useState<Unit>("in");
  const { size, setSize } = useSelection();

  function pick(id: SizeId) {
    setSize(id);
  }

  return (
    <section id="size-guide" aria-labelledby="size-title" className="section bg-fawn">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <h2 id="size-title" className="reveal h-section max-w-[16ch]">
              Find the right size in 30 seconds
            </h2>
            <p className="reveal lead mt-5 max-w-[40ch]">
              All you need is a soft tape measure, or a piece of string and a ruler.
            </p>

            <div className="reveal mt-8 overflow-hidden rounded-3xl">
              <Placeholder label="DIAGRAM" detail="Dog outline showing where to measure chest, neck and back" ratio="4:3" />
            </div>

            <ol className="reveal-stagger mt-8 flex flex-col gap-6">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-4" style={{ "--i": i } as React.CSSProperties}>
                  <span
                    aria-hidden="true"
                    className="grid size-11 shrink-0 place-items-center rounded-full bg-cocoa font-display text-xl text-white"
                  >
                    {i + 1}
                  </span>
                  <p className="pt-1.5">
                    <strong className="text-xl">{step.title}.</strong> {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="reveal flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xl font-bold">Size chart</p>
              <div role="radiogroup" aria-label="Units" className="inline-flex rounded-full bg-white/60 p-1">
                {(["in", "cm"] as const).map((u) => (
                  <button
                    key={u}
                    type="button"
                    role="radio"
                    aria-checked={unit === u}
                    onClick={() => setUnit(u)}
                    className={`min-h-11 min-w-20 rounded-full px-4 font-bold transition-[background-color,color] duration-200 ${
                      unit === u ? "bg-cocoa text-white" : "text-ink hover:bg-white"
                    }`}
                  >
                    {u === "in" ? "Inches" : "Cm"}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-3xl bg-white">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">
                  Dog costume sizes with chest, neck and back measurements in {unit === "in" ? "inches" : "centimetres"}
                </caption>
                <thead>
                  <tr className="border-b border-line text-base text-ink-soft">
                    <th scope="col" className="py-4 pr-2 pl-5 font-bold sm:pl-6">
                      Size
                    </th>
                    <th scope="col" className="px-2 py-4 font-bold">
                      Chest
                    </th>
                    <th scope="col" className="px-2 py-4 font-bold">
                      Neck
                    </th>
                    <th scope="col" className="py-4 pr-5 pl-2 font-bold sm:pr-6">
                      Back
                    </th>
                  </tr>
                </thead>
                {product.sizes.map((s) => {
                  const active = size === s.id;
                  return (
                    <tbody
                      key={s.id}
                      className={`border-b border-line transition-colors duration-200 last:border-0 ${active ? "bg-fawn-soft" : ""}`}
                    >
                      <tr className="text-lg tabular-nums">
                        <th scope="row" className="pt-4 pr-2 pl-5 align-top sm:pl-6">
                          <span className="font-display text-[1.625rem] leading-none">{s.id}</span>
                        </th>
                        <td className="px-2 pt-4 font-bold">{range(s.chest, unit)}</td>
                        <td className="px-2 pt-4">{range(s.neck, unit)}</td>
                        <td className="pt-4 pr-5 pl-2 sm:pr-6">{range(s.back, unit)}</td>
                      </tr>
                      <tr>
                        <td colSpan={4} className="px-5 pt-1.5 pb-4 sm:px-6">
                          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                            <span className="text-base text-ink-soft">Fits {s.breeds}</span>
                            <button
                              type="button"
                              onClick={() => pick(s.id)}
                              aria-pressed={active}
                              className={`inline-flex min-h-11 items-center rounded-full px-4 text-base font-bold transition-[background-color,color,box-shadow] duration-200 ${
                                active
                                  ? "bg-cocoa text-white"
                                  : "shadow-[inset_0_0_0_1.5px_var(--color-line-strong)] hover:bg-fawn-soft"
                              }`}
                            >
                              {active ? `Size ${s.id} selected` : `Choose ${s.id}`}
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
            <p className="mt-5 max-w-[46ch]">
              <strong>Between two sizes?</strong> Pick the bigger one. If it&rsquo;s not right, we&rsquo;ll swap it for
              free.
            </p>
            <BuyButton className="mt-8" />
          </div>
        </div>
      </div>
    </section>
  );
}

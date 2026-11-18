"use client";

import { useState } from "react";
import { BuyButton } from "@/components/home/BuyButton";
import { CheckIcon } from "@/components/ui/icons";
import { Ph } from "@/components/ui/Placeholder";
import { bundles, product } from "@/config/product";
import { formatMoney, priceFor, shippingFor } from "@/lib/pricing";

export function Bundle() {
  const [quantity, setQuantity] = useState(bundles.find((b) => b.popular)?.quantity ?? 2);

  return (
    <section id="bundle" aria-labelledby="bundle-title" className="section bg-fawn">
      <div className="wrap">
        <div className="max-w-[40rem]">
          <h2 id="bundle-title" className="reveal h-section">
            Two dogs? Save on the pair.
          </h2>
          <p className="reveal lead mt-5">
            Bundle up for a second pup, a friend&rsquo;s dog, or the grandkids&rsquo; dog. The more you get, the more
            you save, and shipping is free from 2.
          </p>
        </div>

        <fieldset className="mt-10">
          <legend className="sr-only">Choose how many costumes</legend>
          <div className="reveal-stagger grid gap-3 md:grid-cols-3 md:gap-5">
            {bundles.map((bundle, i) => {
              const total = priceFor(bundle.quantity);
              const full = product.price * bundle.quantity;
              const each = Math.round(total / bundle.quantity);
              const active = quantity === bundle.quantity;
              return (
                <label
                  key={bundle.quantity}
                  style={{ "--i": i } as React.CSSProperties}
                  className={`relative flex cursor-pointer flex-col rounded-3xl bg-white p-5 transition-[box-shadow,transform] duration-300 ease-(--ease-out-quart) has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-caramel-deep sm:p-6 ${
                    active
                      ? "shadow-[inset_0_0_0_3px_var(--color-cocoa),0_14px_30px_-18px_oklch(0.3_0.05_50/0.5)]"
                      : "shadow-[inset_0_0_0_1.5px_transparent] hover:-translate-y-0.5"
                  }`}
                >
                  <input
                    type="radio"
                    name="bundle"
                    value={bundle.quantity}
                    checked={active}
                    onChange={() => setQuantity(bundle.quantity)}
                    className="sr-only"
                  />
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-[1.75rem] leading-tight">{bundle.label}</p>
                      <p className="mt-1 font-bold text-ink-soft">{bundle.note}</p>
                    </div>
                    <span
                      aria-hidden="true"
                      className={`grid size-8 shrink-0 place-items-center rounded-full transition-colors duration-200 ${
                        active ? "bg-cocoa text-white" : "shadow-[inset_0_0_0_2px_var(--color-line-strong)]"
                      }`}
                    >
                      {active ? <CheckIcon size={18} strokeWidth={2.5} /> : null}
                    </span>
                  </div>
                  <div className="mt-6 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 border-t border-line pt-4">
                    <span className="text-[1.75rem] font-bold tabular-nums">
                      <Ph>{formatMoney(total)}</Ph>
                    </span>
                    {bundle.percentOff > 0 ? (
                      <s className="text-lg text-ink-soft tabular-nums">{formatMoney(full)}</s>
                    ) : null}
                  </div>
                  <p className="mt-1 text-base text-ink-soft">
                    {bundle.quantity > 1 ? `${formatMoney(each)} each · ` : ""}
                    {shippingFor(bundle.quantity) === 0 ? "Free shipping" : `+ ${formatMoney(shippingFor(bundle.quantity))} shipping`}
                  </p>
                  {bundle.popular ? (
                    <span className="absolute -top-3 left-5 rounded-full bg-cocoa px-3 py-1 text-[0.9375rem] font-bold text-white sm:left-6">
                      Most popular
                    </span>
                  ) : null}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="reveal mt-10 flex flex-col gap-2">
          <BuyButton quantity={quantity} />
          <p className="max-w-[48ch] text-base">
            Need different sizes? Add them here, then change the size of each one in your cart.
          </p>
        </div>
      </div>
    </section>
  );
}

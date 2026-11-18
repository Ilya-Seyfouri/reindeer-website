"use client";

import { useEffect, useState } from "react";
import { useSelection } from "@/components/home/ProductSelection";
import { Ph } from "@/components/ui/Placeholder";
import { product } from "@/config/product";
import { formatMoney, priceFor } from "@/lib/pricing";

/**
 * Phones and small tablets only. Slides up whenever the main buy button
 * and the closing call to action are both off screen.
 */
export function StickyBuyBar() {
  const { size, quantity, buy, goToSizePicker } = useSelection();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targets = [document.getElementById("hero-buy"), document.getElementById("final-cta"), document.querySelector("footer")].filter(
      (el): el is HTMLElement => el !== null,
    );
    const onScreen = new Map<Element, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => onScreen.set(entry.target, entry.isIntersecting));
        setVisible(![...onScreen.values()].some(Boolean));
      },
      { rootMargin: "0px 0px -40px 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      data-sticky-buy
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-(--z-sticky) border-t border-line bg-white shadow-[0_-10px_30px_-18px_oklch(0.3_0.05_50/0.35)] transition-transform duration-400 ease-(--ease-out-expo) will-change-transform lg:hidden ${
        visible ? "translate-y-0" : "translate-y-[calc(100%+12px)]"
      }`}
      style={{ paddingBottom: "max(0.75rem, var(--safe-bottom))" }}
    >
      <div className="wrap flex items-center gap-4 pt-3">
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate font-bold">{product.shortName}</p>
          <p className="text-ink-soft tabular-nums">
            {size ? `Size ${size} · ` : ""}
            <Ph>{formatMoney(size ? priceFor(quantity) : product.price)}</Ph>
          </p>
        </div>
        <button
          type="button"
          onClick={() => (size ? buy() : goToSizePicker())}
          className="btn btn-primary shrink-0 px-6"
        >
          {size ? "Add to cart" : "Choose size"}
        </button>
      </div>
    </div>
  );
}

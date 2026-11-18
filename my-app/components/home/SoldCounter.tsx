"use client";

import { useEffect, useState } from "react";
import { BagIcon } from "@/components/ui/icons";
import { Ph } from "@/components/ui/Placeholder";
import { product, site } from "@/config/product";

const format = new Intl.NumberFormat(site.locale);

/**
 * "14,232 sold", counting up to the real total once when the page loads.
 * The number comes from product.soldCount and never goes past it: keep it
 * true. To tick up as orders come in, feed it a live count from your orders.
 */
export function SoldCounter({ total = product.soldCount }: { total?: number }) {
  const [shown, setShown] = useState(total);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const from = Math.round(total * 0.96);
    const duration = 1400;
    let frame = 0;
    let start: number | undefined;
    const step = (now: number) => {
      start ??= now;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      setShown(Math.round(from + (total - from) * eased));
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [total]);

  return (
    <span className="inline-flex items-center gap-1.5">
      <BagIcon size={18} />
      <span>
        <strong className="font-bold text-ink tabular-nums">
          <Ph>{format.format(shown)}</Ph>
        </strong>{" "}
        sold
      </span>
    </span>
  );
}

"use client";

import { useSelection } from "@/components/home/ProductSelection";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Ph } from "@/components/ui/Placeholder";
import { product } from "@/config/product";
import { formatMoney } from "@/lib/pricing";

/**
 * The call to action that closes every section. It takes the shopper back
 * to the three purchase options, where they choose 1, 2 or 3 and add to cart.
 */
export function BuyButton({
  tone = "dark",
  className = "",
  note,
}: {
  tone?: "dark" | "light";
  className?: string;
  note?: React.ReactNode;
}) {
  const { goToOptions } = useSelection();

  return (
    <div className={`flex flex-col items-start gap-3 ${className}`}>
      <button
        type="button"
        onClick={goToOptions}
        className={`btn btn-lg w-full sm:w-auto sm:min-w-[20rem] ${tone === "light" ? "btn-light" : "btn-primary"}`}
      >
        <span>
          Get yours · from <Ph>{formatMoney(product.price)}</Ph>
        </span>
        <ArrowRightIcon size={20} className="shrink-0" />
      </button>
      {note ? <p className={`text-base ${tone === "light" ? "text-on-cocoa-soft" : "text-ink-soft"}`}>{note}</p> : null}
    </div>
  );
}

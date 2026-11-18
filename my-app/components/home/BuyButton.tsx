"use client";

import { useSelection } from "@/components/home/ProductSelection";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Ph } from "@/components/ui/Placeholder";
import { product } from "@/config/product";
import { formatMoney, priceFor } from "@/lib/pricing";

/**
 * The call to action that closes every section.
 * With a size chosen it adds straight to the cart; without one it takes
 * the shopper back to the size picker, and says so on the button.
 */
export function BuyButton({
  tone = "dark",
  quantity,
  className = "",
  note,
}: {
  tone?: "dark" | "light";
  quantity?: number;
  className?: string;
  note?: React.ReactNode;
}) {
  const { size, quantity: selectedQuantity, buy, goToSizePicker } = useSelection();
  const qty = quantity ?? selectedQuantity;

  return (
    <div className={`flex flex-col items-start gap-3 ${className}`}>
      <button
        type="button"
        onClick={() => (size ? buy({ quantity: qty }) : goToSizePicker())}
        className={`btn btn-lg w-full sm:w-auto sm:min-w-[20rem] ${tone === "light" ? "btn-light" : "btn-primary"}`}
      >
        {size ? (
          <span>
            Add {qty > 1 ? `${qty} ` : ""}to cart · Size {size} · <Ph>{formatMoney(priceFor(qty))}</Ph>
          </span>
        ) : (
          <>
            <span>
              Choose your size · <Ph>{formatMoney(qty > 1 ? priceFor(qty) : product.price)}</Ph>
            </span>
            <ArrowRightIcon size={20} className="shrink-0" />
          </>
        )}
      </button>
      {note ? <p className={`text-base ${tone === "light" ? "text-on-cocoa-soft" : "text-ink-soft"}`}>{note}</p> : null}
    </div>
  );
}

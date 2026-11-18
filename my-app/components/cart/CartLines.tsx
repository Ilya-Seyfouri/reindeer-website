"use client";

import { useCart } from "@/components/cart/CartProvider";
import { Ph, Placeholder } from "@/components/ui/Placeholder";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { product } from "@/config/product";
import { formatMoney, nextBundleFor, shippingFor } from "@/lib/pricing";

export function CartLines() {
  const { quantity, setQuantity, clear } = useCart();
  if (quantity === 0) return null;

  return (
    <div className="flex gap-4 py-5">
      <div className="w-[5.5rem] shrink-0 overflow-hidden rounded-xl sm:w-24">
        <Placeholder label="CART THUMBNAIL" ratio="1:1" compact />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-bold leading-snug">{product.name}</p>
            <p className="text-base text-ink-soft">One size · adjustable fit</p>
          </div>
          <p className="shrink-0 font-bold tabular-nums">
            <Ph>{formatMoney(product.price * quantity)}</Ph>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <QuantityStepper
            compact
            value={quantity}
            min={1}
            max={product.maxQuantity}
            label="Quantity"
            onChange={setQuantity}
          />
          <button
            type="button"
            onClick={clear}
            className="inline-flex min-h-11 items-center px-1 text-base font-bold text-ink-soft underline decoration-line-strong decoration-2 underline-offset-4 hover:text-ink hover:decoration-current"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

/** "Add 1 more and save 15%" — shown while a better bundle is in reach. */
export function BundleNudge() {
  const { totals, add } = useCart();
  const next = nextBundleFor(totals.quantity);
  if (!next || totals.quantity === 0) return null;
  const needed = next.quantity - totals.quantity;

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-fawn-soft p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="leading-snug">
        <strong>
          Add {needed} more and save <Ph>{next.percentOff}%</Ph>
        </strong>
        {totals.shipping > 0 && shippingFor(next.quantity) === 0 ? " plus free shipping." : "."}
        <span className="block text-base text-ink-soft">Great for a second dog or a gift.</span>
      </p>
      <button type="button" onClick={() => add(needed)} className="btn btn-secondary min-h-12 shrink-0 px-5 text-base">
        Add {needed} more
      </button>
    </div>
  );
}

export function CartSummary() {
  const { totals } = useCart();
  return (
    <dl className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 text-[1.0625rem]">
      <dt>
        Subtotal ({totals.quantity} {totals.quantity === 1 ? "costume" : "costumes"})
      </dt>
      <dd className="text-right tabular-nums">
        <Ph>{formatMoney(totals.subtotal)}</Ph>
      </dd>
      {totals.discount > 0 ? (
        <>
          <dt className="font-bold text-success">Bundle saving ({totals.percentOff}% off)</dt>
          <dd className="text-right font-bold text-success tabular-nums">−{formatMoney(totals.discount)}</dd>
        </>
      ) : null}
      <dt>Shipping</dt>
      <dd className="text-right tabular-nums">
        {totals.shipping === 0 ? <strong>Free</strong> : <Ph>{formatMoney(totals.shipping)}</Ph>}
      </dd>
      <dt className="mt-2 border-t border-line pt-3 text-xl font-bold">Total</dt>
      <dd className="mt-2 border-t border-line pt-3 text-right text-xl font-bold tabular-nums">
        <Ph>{formatMoney(totals.total)}</Ph>
      </dd>
    </dl>
  );
}

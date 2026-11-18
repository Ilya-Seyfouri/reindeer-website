"use client";

import { useCart } from "@/components/cart/CartProvider";
import { Ph, Placeholder } from "@/components/ui/Placeholder";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { product, type SizeId } from "@/config/product";
import { formatMoney, nextBundleFor, shippingFor } from "@/lib/pricing";

export function CartLines() {
  const { lines, setQuantity, changeSize, remove } = useCart();

  return (
    <ul className="divide-y divide-line">
      {lines.map((line) => (
        <li key={line.size} className="flex gap-4 py-5">
          <div className="w-[5.5rem] shrink-0 overflow-hidden rounded-xl sm:w-24">
            <Placeholder label="CART THUMBNAIL" ratio="1:1" compact />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <p className="font-bold leading-snug">{product.name}</p>
              <p className="shrink-0 font-bold tabular-nums">
                <Ph>{formatMoney(product.price * line.quantity)}</Ph>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
              <label className="relative inline-flex items-center">
                <span className="sr-only">Size</span>
                <select
                  value={line.size}
                  onChange={(e) => changeSize(line.size, e.target.value as SizeId)}
                  className="min-h-12 appearance-none rounded-full bg-white py-2 pr-10 pl-4 font-bold shadow-[inset_0_0_0_1.5px_var(--color-line-strong)] focus:outline-none focus-visible:shadow-[inset_0_0_0_2.5px_var(--color-cocoa)]"
                >
                  {product.sizes.map((s) => (
                    <option key={s.id} value={s.id}>
                      Size {s.id}
                    </option>
                  ))}
                </select>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="pointer-events-none absolute right-3.5 size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </label>
              <QuantityStepper
                compact
                value={line.quantity}
                min={1}
                max={product.maxQuantityPerSize}
                label={`Quantity, size ${line.size}`}
                onChange={(q) => setQuantity(line.size, q)}
              />
            </div>
            <button
              type="button"
              onClick={() => remove(line.size)}
              className="-ml-1 inline-flex min-h-11 w-fit items-center px-1 text-base font-bold text-ink-soft underline decoration-line-strong decoration-2 underline-offset-4 hover:text-ink hover:decoration-current"
            >
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** "Add 1 more and save 15%" — shown while a better bundle is in reach. */
export function BundleNudge({ onAdd }: { onAdd?: () => void }) {
  const { lines, totals, add } = useCart();
  const next = nextBundleFor(totals.quantity);
  if (!next || totals.quantity === 0) return null;
  const needed = next.quantity - totals.quantity;
  const lastSize = lines[lines.length - 1]?.size;

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-fawn-soft p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="leading-snug">
        <strong>
          Add {needed} more and save <Ph>{next.percentOff}%</Ph>
        </strong>
        {totals.shipping > 0 && shippingFor(next.quantity) === 0 ? " plus free shipping." : "."}
        <span className="block text-base text-ink-soft">Great for a second dog or a gift.</span>
      </p>
      {lastSize ? (
        <button
          type="button"
          onClick={() => {
            add(lastSize, needed);
            onAdd?.();
          }}
          className="btn btn-secondary min-h-12 shrink-0 px-5 text-base"
        >
          Add {needed} · size {lastSize}
        </button>
      ) : null}
    </div>
  );
}

export function CartSummary() {
  const { totals } = useCart();
  return (
    <dl className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 text-[1.0625rem]">
      <dt>Subtotal ({totals.quantity} {totals.quantity === 1 ? "costume" : "costumes"})</dt>
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
      <dd className="text-right tabular-nums">{totals.shipping === 0 ? <strong>Free</strong> : <Ph>{formatMoney(totals.shipping)}</Ph>}</dd>
      <dt className="mt-2 border-t border-line pt-3 text-xl font-bold">Total</dt>
      <dd className="mt-2 border-t border-line pt-3 text-right text-xl font-bold tabular-nums">
        <Ph>{formatMoney(totals.total)}</Ph>
      </dd>
    </dl>
  );
}

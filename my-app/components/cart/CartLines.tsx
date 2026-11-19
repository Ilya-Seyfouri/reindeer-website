"use client";

import { useCart } from "@/components/cart/CartProvider";
import { GiftIcon, PlusIcon } from "@/components/ui/icons";
import { Ph, Placeholder } from "@/components/ui/Placeholder";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { bundles, product, treat } from "@/config/product";
import { track } from "@/lib/analytics";
import { formatMoney } from "@/lib/pricing";

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

/** The treats in the cart, once the shopper has added them from the upsell. */
export function TreatLine() {
  const { treats, setTreats } = useCart();
  if (treats === 0) return null;

  return (
    <div className="flex gap-4 border-t border-line py-5">
      <div className="grid w-[5.5rem] shrink-0 place-items-center rounded-xl bg-fawn-soft text-evergreen aspect-square sm:w-24">
        <GiftIcon size={36} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-bold leading-snug">{treat.name}</p>
            <p className="text-base text-ink-soft">Gift add-on</p>
          </div>
          <p className="shrink-0 font-bold tabular-nums">
            <Ph>{formatMoney(treat.price * treats)}</Ph>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <QuantityStepper
            compact
            value={treats}
            min={1}
            max={treat.maxQuantity}
            label="Treat quantity"
            onChange={setTreats}
          />
          <button
            type="button"
            onClick={() => setTreats(0)}
            className="inline-flex min-h-11 items-center px-1 text-base font-bold text-ink-soft underline decoration-line-strong decoration-2 underline-offset-4 hover:text-ink hover:decoration-current"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

/** "Gift for a furry friend?" — offers the treat add-on until it's in the cart. Not shown once a 2-pack brings free treats. */
export function TreatUpsell() {
  const { quantity, treats, setTreats, totals } = useCart();
  if (quantity === 0 || treats > 0 || totals.freeTreats > 0) return null;

  return (
    <div className="flex items-center gap-4 rounded-2xl border-2 border-dashed border-evergreen/40 bg-white p-4">
      <span className="grid size-14 shrink-0 place-items-center rounded-full bg-fawn-soft text-evergreen">
        <GiftIcon size={28} />
      </span>
      <p className="min-w-0 flex-1 leading-snug">
        <strong className="block">Gift for a furry friend?</strong>
        <span className="text-base text-ink-soft">
          Add {treat.name.toLowerCase()} for <Ph>{formatMoney(treat.price)}</Ph>
        </span>
      </p>
      <button
        type="button"
        onClick={() => {
          setTreats(1);
          track("treat_added", { price: treat.price });
        }}
        className="btn btn-primary btn-cart font-apple min-h-12 shrink-0 px-5 text-base"
      >
        <PlusIcon size={18} />
        Add
      </button>
    </div>
  );
}

const pair = bundles.find((b) => b.quantity === 2)!;

/** "Add 1 more for just $10 and get free treats" — shown when an odd costume could make a 2-pack. */
export function BundleNudge() {
  const { totals, add } = useCart();
  if (totals.quantity % 2 === 0) return null;
  const extra = pair.price - product.price;

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-fawn-soft p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="leading-snug">
        <strong>
          Add 1 more for just <Ph>{formatMoney(extra)}</Ph>
        </strong>{" "}
        and get free {treat.name.toLowerCase()}.
        <span className="block text-base text-ink-soft">Great for a second dog or a gift.</span>
      </p>
      <button type="button" onClick={() => add(1)} className="btn btn-secondary min-h-12 shrink-0 px-5 text-base">
        Add 1 more
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
          <dt className="font-bold text-success">2-pack saving</dt>
          <dd className="text-right font-bold text-success tabular-nums">−{formatMoney(totals.discount)}</dd>
        </>
      ) : null}
      {totals.freeTreats > 0 ? (
        <>
          <dt className="font-bold text-success">
            {treat.name} (×{totals.freeTreats}), free with your 2-pack
          </dt>
          <dd className="text-right font-bold text-success">Free</dd>
        </>
      ) : null}
      <dt>Shipping</dt>
      <dd className="text-right tabular-nums">
        {totals.shipping === 0 ? <strong>Free</strong> : <Ph>{formatMoney(totals.shipping)}</Ph>}
      </dd>
      {totals.treats > 0 ? (
        <>
          <dt>
            {treat.name} (×{totals.treats})
          </dt>
          <dd className="text-right tabular-nums">
            <Ph>{formatMoney(totals.treatsTotal)}</Ph>
          </dd>
        </>
      ) : null}
      <dt className="mt-2 border-t border-line pt-3 text-xl font-bold">Total</dt>
      <dd className="mt-2 border-t border-line pt-3 text-right text-xl font-bold tabular-nums">
        <Ph>{formatMoney(totals.total)}</Ph>
      </dd>
    </dl>
  );
}

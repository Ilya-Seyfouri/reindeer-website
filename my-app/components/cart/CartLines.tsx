"use client";

import Image from "next/image";
import { useCart } from "@/components/cart/CartProvider";
import { PlusIcon } from "@/components/ui/icons";
import { TreatArt } from "@/components/ui/TreatArt";
import { Ph, Placeholder } from "@/components/ui/Placeholder";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { bundles, product, treat } from "@/config/product";
import { getOtherProduct } from "@/config/products";
import { track } from "@/lib/analytics";
import { itemKey } from "@/lib/cart-items";
import { formatMoney, itemPrice } from "@/lib/pricing";

export function CartLines() {
  const { quantity, setQuantity, clear } = useCart();
  if (quantity === 0) return null;

  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-3 py-5 sm:gap-x-4">
      <div className="w-[4.25rem] shrink-0 self-start overflow-hidden rounded-xl sm:w-24">
        <Placeholder label="CART THUMBNAIL" ratio="1:1" compact />
      </div>
      <div className="flex min-w-0 flex-col gap-3">
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
          <div>
            <p className="text-[0.9375rem] leading-snug font-bold sm:text-[1.0625rem]">{product.name}</p>
            <p className="text-[0.875rem] text-ink-soft sm:text-base">One size · adjustable fit</p>
          </div>
          <p className="shrink-0 text-[0.9375rem] font-bold tabular-nums sm:text-[1.0625rem]">
            <Ph>{formatMoney(product.price * quantity)}</Ph>
          </p>
        </div>
      </div>
      <div className="col-span-2 flex items-center gap-x-4 sm:col-span-1 sm:col-start-2">
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
  );
}

/** Products with options (e.g. the personalised sweater): one line per colour + size + name. */
export function ItemLines() {
  const { items, setItemQuantity, quantity } = useCart();
  return (
    <>
      {items.map((item, i) => {
        const p = getOtherProduct(item.slug);
        const o = p?.options;
        if (!p || !o) return null;
        const color = o.colors.find((c) => c.id === item.color);
        const size = o.sizes.find((z) => z.id === item.size);
        const photo = p.images?.[color?.image ?? 0];
        const key = itemKey(item);
        return (
          <div
            key={key}
            className={`grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-3 py-5 sm:gap-x-4 ${quantity > 0 || i > 0 ? "border-t border-line" : ""}`}
          >
            <div className="w-[4.25rem] shrink-0 self-start overflow-hidden rounded-xl sm:w-24">
              {photo ? (
                <Image src={photo.src} alt="" sizes="96px" className="aspect-square w-full object-cover" />
              ) : (
                <Placeholder label={p.name} ratio="1:1" compact />
              )}
            </div>
            <div className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
              <div className="min-w-0">
                <p className="text-[0.9375rem] leading-snug font-bold sm:text-[1.0625rem]">{p.name}</p>
                {color || size ? (
                  <p className="text-[0.875rem] text-ink-soft sm:text-base">
                    {[color?.name, size ? `Size ${size.name}` : null].filter(Boolean).join(" · ")}
                  </p>
                ) : null}
                {item.name ? (
                  <p className="text-[0.875rem] break-words text-ink-soft sm:text-base">
                    Name: <strong className="text-ink">{item.name}</strong>
                  </p>
                ) : null}
              </div>
              <p className="shrink-0 text-[0.9375rem] font-bold tabular-nums sm:text-[1.0625rem]">
                <Ph>{formatMoney(itemPrice(item))}</Ph>
              </p>
            </div>
            <div className="col-span-2 flex items-center gap-x-4 sm:col-span-1 sm:col-start-2">
              <QuantityStepper
                compact
                value={item.quantity}
                min={1}
                max={o.maxQuantity}
                label={item.name ? `Quantity of ${p.name} for ${item.name}` : `Quantity of ${p.name}`}
                onChange={(n) => setItemQuantity(key, n)}
              />
              <button
                type="button"
                onClick={() => setItemQuantity(key, 0)}
                className="inline-flex min-h-11 items-center px-1 text-base font-bold text-ink-soft underline decoration-line-strong decoration-2 underline-offset-4 hover:text-ink hover:decoration-current"
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

/** The treats in the cart, once the shopper has added them from the upsell. */
export function TreatLine() {
  const { treats, setTreats, totals } = useCart();
  if (treats === 0 && totals.freeTreats === 0) return null;

  return (
    <>
      {totals.freeTreats > 0 ? <FreeTreatLine count={totals.freeTreats} /> : null}
      {treats > 0 ? <PaidTreatLine treats={treats} setTreats={setTreats} /> : null}
    </>
  );
}

function TreatTile() {
  return (
    <div className="grid w-[4.25rem] shrink-0 self-start place-items-center rounded-xl bg-fawn-soft text-caramel aspect-square sm:w-24">
      <TreatArt className="treat-wiggle size-12 sm:size-[4.5rem]" />
    </div>
  );
}

/** The treat(s) that come free: one with each 2-pack. */
function FreeTreatLine({ count }: { count: number }) {
  return (
    <div className="flex gap-3 border-t border-line py-5 sm:gap-4">
      <TreatTile />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <div>
          <p className="text-[0.9375rem] leading-snug font-bold sm:text-[1.0625rem]">{treat.name}</p>
          <p className="text-[0.875rem] text-ink-soft sm:text-base">
            Free with your 2-pack{count > 1 ? ` (×${count})` : ""}
          </p>
        </div>
        <p className="shrink-0 font-bold text-success">Free</p>
      </div>
    </div>
  );
}

function PaidTreatLine({ treats, setTreats }: { treats: number; setTreats: (n: number) => void }) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-3 border-t border-line py-5 sm:gap-x-4">
      <TreatTile />
      <div className="flex min-w-0 flex-col gap-3">
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
          <div>
            <p className="text-[0.9375rem] leading-snug font-bold sm:text-[1.0625rem]">{treat.name}</p>
            <p className="text-[0.875rem] text-ink-soft sm:text-base">Gift add-on</p>
          </div>
          <p className="shrink-0 font-bold tabular-nums">
            <Ph>{formatMoney(treat.price * treats)}</Ph>
          </p>
        </div>
      </div>
      <div className="col-span-2 flex items-center gap-x-4 sm:col-span-1 sm:col-start-2">
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
  );
}

/** "Gift for a furry friend?" — offers the treat add-on until it's in the cart. Not shown once a 2-pack brings free treats. */
export function TreatUpsell() {
  const { quantity, treats, setTreats, totals } = useCart();
  if (quantity === 0 || treats > 0 || totals.freeTreats > 0) return null;

  return (
    <div className="flex items-center gap-4 rounded-2xl border-2 border-dashed border-evergreen/40 bg-white p-4">
      <span className="grid size-16 shrink-0 place-items-center rounded-full bg-fawn-soft text-caramel">
        <TreatArt className="treat-wiggle size-12" />
      </span>
      <p className="min-w-0 flex-1 leading-snug">
        <strong className="block">Gift for a furry friend?</strong>
        <span className="text-base text-ink-soft">
          Add a {treat.name.toLowerCase()} for <Ph>{formatMoney(treat.price)}</Ph>
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

/** "Add 1 more for just $13 and get a free treat" — shown when an odd costume could make a 2-pack. */
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
        and get a free {treat.name.toLowerCase()}.
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
    <dl className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-2 text-[0.9375rem] sm:gap-x-4 sm:text-[1.0625rem]">
      {totals.quantity > 0 ? (
        <>
          <dt>
            Subtotal ({totals.quantity} {totals.quantity === 1 ? "costume" : "costumes"})
          </dt>
          <dd className="text-right tabular-nums">
            <Ph>{formatMoney(totals.subtotal)}</Ph>
          </dd>
        </>
      ) : null}
      {totals.itemsTotal > 0 ? (
        <>
          <dt>
            {totals.quantity > 0 ? "Other items" : "Subtotal"} ({totals.count - totals.quantity}{" "}
            {totals.count - totals.quantity === 1 ? "item" : "items"})
          </dt>
          <dd className="text-right tabular-nums">
            <Ph>{formatMoney(totals.itemsTotal)}</Ph>
          </dd>
        </>
      ) : null}
      {totals.discount > 0 ? (
        <>
          <dt className="font-bold text-success">2-pack saving</dt>
          <dd className="text-right font-bold text-success tabular-nums">−{formatMoney(totals.discount)}</dd>
        </>
      ) : null}
      {totals.freeTreats > 0 ? (
        <>
          <dt className="font-bold text-success">
            {treat.name}
            {totals.freeTreats > 1 ? ` (×${totals.freeTreats})` : ""}
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

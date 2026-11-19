"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { BagIcon, CheckIcon, ChevronDownIcon, RulerIcon } from "@/components/ui/icons";
import { Ph } from "@/components/ui/Placeholder";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { cleanPetName, type OtherProduct, type ProductOptions } from "@/config/products";
import { track } from "@/lib/analytics";
import { formatMoney } from "@/lib/pricing";

type Props = {
  product: Omit<OtherProduct, "options"> & { options: ProductOptions };
  /** Title, tagline and highlights, rendered on the server */
  intro: React.ReactNode;
  /** Trust line, description and details, rendered on the server */
  outro: React.ReactNode;
};

/**
 * The top of a product page for something that can be bought with options:
 * photos on the left (they follow the colour you pick), then colour, size,
 * pet name, quantity and Add to cart.
 */
export function ProductPurchase({ product, intro, outro }: Props) {
  const { options: o } = product;
  const images = product.images ?? [];
  const { addItem, openCart } = useCart();
  const id = useId();

  const [color, setColor] = useState(o.colors[0]!.id);
  const [photo, setPhoto] = useState(o.colors[0]!.image ?? 0);
  const [size, setSize] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [tried, setTried] = useState(false);

  const colorName = o.colors.find((c) => c.id === color)?.name;
  const trimmed = name.trim();
  const sizeMissing = tried && !size;
  const nameMissing = tried && !trimmed;
  const main = images[photo] ?? images[0];

  function pickColor(next: string) {
    setColor(next);
    const img = o.colors.find((c) => c.id === next)?.image;
    if (img !== undefined) setPhoto(img);
  }

  function add() {
    setTried(true);
    if (!size || !trimmed) {
      document.getElementById(!size ? `${id}-size` : `${id}-name`)?.focus();
      return;
    }
    addItem({ slug: product.slug, color, size, name: trimmed, quantity });
    track("item_added", { slug: product.slug, color, size, quantity });
    setTried(false);
    setName("");
    setQuantity(1);
    openCart();
  }

  return (
    <div className="mx-auto mt-3 grid max-w-[38rem] gap-7 md:gap-10 lg:max-w-none lg:grid-cols-[1.12fr_1fr] lg:gap-14 xl:gap-16">
      <div className="enter min-w-0 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
        {main ? (
          <Image
            src={main.src}
            alt={main.alt}
            priority
            sizes="(min-width: 1024px) 50vw, (min-width: 640px) 38rem, 100vw"
            className="aspect-square w-full rounded-3xl object-cover"
          />
        ) : null}
        {images.length > 1 ? (
          <ul aria-label="More photos" className="mt-3 grid grid-cols-4 gap-2.5 sm:gap-3">
            {images.map((img, i) => (
              <li key={img.alt}>
                <button
                  type="button"
                  onClick={() => setPhoto(i)}
                  aria-label={`Show photo ${i + 1}: ${img.alt}`}
                  aria-current={i === photo}
                  className={`block w-full overflow-hidden rounded-2xl transition-shadow ${
                    i === photo ? "shadow-[0_0_0_2.5px_var(--color-cocoa)]" : "opacity-80 hover:opacity-100"
                  }`}
                >
                  <Image src={img.src} alt="" sizes="160px" className="aspect-square w-full object-cover" />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="flex min-w-0 flex-col">
        {intro}

        {/* Colour */}
        <fieldset className="mt-8">
          <legend className="font-bold">
            Colour: <span className="font-normal text-ink-soft">{colorName}</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {o.colors.map((c) => {
              const on = c.id === color;
              return (
                <label
                  key={c.id}
                  className={`inline-flex min-h-12 cursor-pointer items-center gap-2.5 rounded-full bg-white py-2 pr-5 pl-2.5 font-bold transition-shadow has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cocoa ${
                    on ? "shadow-[inset_0_0_0_2px_var(--color-cocoa)]" : "shadow-[inset_0_0_0_1.5px_var(--color-line-strong)]"
                  }`}
                >
                  <input type="radio" name={`${id}-color`} value={c.id} checked={on} onChange={() => pickColor(c.id)} className="sr-only" />
                  <span aria-hidden="true" className="size-7 rounded-full ring-2 ring-white ring-inset" style={{ background: c.swatch }} />
                  {c.name}
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Size */}
        <fieldset className="mt-6" aria-describedby={sizeMissing ? `${id}-size-error` : undefined}>
          <legend className="font-bold">
            Size{size ? <span className="font-normal text-ink-soft">: {o.sizes.find((z) => z.id === size)?.name}</span> : null}
          </legend>
          <div className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(2.75rem,1fr))] gap-1.5 sm:gap-2">
            {o.sizes.map((z, i) => {
              const on = z.id === size;
              return (
                <label
                  key={z.id}
                  className={`grid min-h-12 cursor-pointer place-items-center rounded-xl font-bold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cocoa ${
                    on
                      ? "bg-cocoa text-white"
                      : `bg-white ${sizeMissing ? "shadow-[inset_0_0_0_1.5px_var(--color-danger)]" : "shadow-[inset_0_0_0_1.5px_var(--color-line-strong)]"} hover:bg-fawn-soft`
                  }`}
                >
                  <input
                    id={i === 0 ? `${id}-size` : undefined}
                    type="radio"
                    name={`${id}-size`}
                    value={z.id}
                    checked={on}
                    onChange={() => setSize(z.id)}
                    className="sr-only"
                  />
                  {z.name}
                </label>
              );
            })}
          </div>
          {sizeMissing ? (
            <p id={`${id}-size-error`} className="mt-2 font-bold text-danger">
              Please pick a size.
            </p>
          ) : null}
        </fieldset>

        {o.sizes.some((z) => z.chest) ? (
          <details className="group mt-3">
            <summary className="inline-flex min-h-11 cursor-pointer items-center gap-2 font-bold text-caramel-deep underline decoration-2 underline-offset-4 [&::-webkit-details-marker]:hidden">
              <RulerIcon size={20} />
              Size guide
              <ChevronDownIcon size={18} className="transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <div className="mt-2 overflow-hidden rounded-xl bg-white shadow-[inset_0_0_0_1.5px_var(--color-line)]">
              <table className="w-full text-left text-[0.875rem] tabular-nums sm:text-base">
                <thead className="bg-fawn-soft">
                  <tr>
                    <th scope="col" className="py-2.5 pl-3 font-bold">Size</th>
                    <th scope="col" className="py-2.5 font-bold">Chest</th>
                    <th scope="col" className="py-2.5 font-bold">Back</th>
                    <th scope="col" className="py-2.5 pr-3 font-bold">Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {o.sizes.map((z) => (
                    <tr key={z.id} className={`border-t border-line ${z.id === size ? "bg-fawn-soft/60 font-bold" : ""}`}>
                      <th scope="row" className="py-2.5 pl-3 font-bold">{z.name}</th>
                      <td className="py-2.5">{z.chest}</td>
                      <td className="py-2.5">{z.back}</td>
                      <td className="py-2.5 pr-3 whitespace-nowrap">{z.weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {o.sizeTips ? (
              <ul className="mt-3 flex list-disc flex-col gap-1 pl-5 text-base text-ink-soft">
                {o.sizeTips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            ) : null}
          </details>
        ) : null}

        {/* Pet name */}
        <div className="mt-6">
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor={`${id}-name`} className="font-bold">
              {o.personalise.label}
            </label>
            <span className="text-[0.875rem] text-ink-soft tabular-nums" aria-hidden="true">
              {name.length}/{o.personalise.maxLength}
            </span>
          </div>
          <input
            id={`${id}-name`}
            type="text"
            value={name}
            onChange={(e) => setName(cleanPetName(e.target.value, o.personalise.maxLength))}
            maxLength={o.personalise.maxLength}
            autoComplete="off"
            autoCapitalize="words"
            enterKeyHint="done"
            placeholder="e.g. Teddy"
            aria-invalid={nameMissing}
            aria-describedby={`${id}-name-hint${nameMissing ? ` ${id}-name-error` : ""}`}
            className={`mt-2 min-h-14 w-full rounded-xl bg-white px-4 text-[1.125rem] font-bold outline-none placeholder:font-normal placeholder:text-ink-soft/70 focus:shadow-[inset_0_0_0_2px_var(--color-cocoa)] ${
              nameMissing ? "shadow-[inset_0_0_0_2px_var(--color-danger)]" : "shadow-[inset_0_0_0_1.5px_var(--color-line-strong)]"
            }`}
          />
          <p id={`${id}-name-hint`} className="mt-2 text-base text-ink-soft">
            {o.personalise.hint}
          </p>
          {nameMissing ? (
            <p id={`${id}-name-error`} className="mt-1 font-bold text-danger">
              Please enter your pet&rsquo;s name.
            </p>
          ) : null}
        </div>

        {/* Price + quantity */}
        <div className="mt-7 flex items-center justify-between gap-4 rounded-xl border-2 border-cocoa bg-fawn-soft px-4 py-4 sm:px-6">
          <span className="min-w-0">
            <span className="block text-[1.125rem] leading-tight font-bold sm:text-[1.25rem]">
              <Ph>{formatMoney(product.price * quantity)}</Ph>
            </span>
            <span className="mt-1 block truncate text-base text-ink-soft">
              {colorName}
              {size ? ` · ${o.sizes.find((z) => z.id === size)?.name}` : ""}
              {trimmed ? ` · “${trimmed}”` : ""}
            </span>
          </span>
          <QuantityStepper compact value={quantity} min={1} max={o.maxQuantity} label="Quantity" onChange={setQuantity} />
        </div>

        <button type="button" onClick={add} className="btn btn-primary btn-lg btn-cart mt-4 w-full gap-3 text-[1.125rem] tracking-[0.04em] uppercase">
          <BagIcon size={22} />
          Add to cart
        </button>
        <p className="mt-3 flex items-center justify-center gap-2 text-center text-base text-ink-soft">
          <CheckIcon size={18} className="text-success" />
          Made to order with your pet&rsquo;s name
        </p>

        {outro}
      </div>
    </div>
  );
}

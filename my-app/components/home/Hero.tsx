"use client";

import { useState } from "react";
import { Gallery } from "@/components/home/Gallery";
import { useSelection } from "@/components/home/ProductSelection";
import {
  ChevronDownIcon,
  ClockIcon,
  FeatherIcon,
  LockIcon,
  PackageIcon,
  ReturnIcon,
  RulerIcon,
  ShieldIcon,
  TruckIcon,
  WashIcon,
} from "@/components/ui/icons";
import { Ph } from "@/components/ui/Placeholder";
import { Stars } from "@/components/ui/Stars";
import { bundles, guarantee, product, productFaqs, reviews, type Bundle } from "@/config/product";
import { formatMoney, priceFor } from "@/lib/pricing";

const icons = {
  feather: FeatherIcon,
  clock: ClockIcon,
  ruler: RulerIcon,
  wash: WashIcon,
  shield: ShieldIcon,
  package: PackageIcon,
  truck: TruckIcon,
} as const;

export function Hero() {
  const { quantity, buy } = useSelection();

  return (
    <section id="buy" aria-labelledby="product-title" className="wrap pt-0 pb-16 sm:pt-8 md:pb-24 lg:pt-12">
      <div className="mx-auto grid max-w-[38rem] gap-7 md:gap-10 lg:max-w-none lg:grid-cols-[1.12fr_1fr] lg:gap-14 xl:gap-16">
        <div className="enter min-w-0 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
          <Gallery />
        </div>

        <div className="flex min-w-0 flex-col">
          <a
            href="#reviews"
            className="enter inline-flex w-fit flex-wrap items-center gap-x-2.5 gap-y-1 rounded-md py-1"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            <Stars rating={product.rating} />
            <span>
              <strong>
                <Ph>{product.rating}</Ph>/5
              </strong>{" "}
              <span className="text-ink-soft">
                from <Ph>{product.reviewCount.toLocaleString("en-US")}</Ph>+ happy customers
              </span>
            </span>
          </a>

          <h1 id="product-title" className="enter mt-3 text-[clamp(2.25rem,1.7rem+1.8vw,3.25rem)]" style={{ "--i": 2 } as React.CSSProperties}>
            {product.name}
          </h1>
          <p className="enter lead mt-3 text-ink-soft" style={{ "--i": 3 } as React.CSSProperties}>
            {product.tagline}
          </p>

          <ul className="enter mt-6 flex flex-col gap-3.5" style={{ "--i": 4 } as React.CSSProperties}>
            {product.highlights.map((item) => {
              const Icon = icons[item.icon];
              return (
                <li key={item.strong} className="flex items-center gap-3.5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-fawn-soft text-caramel-deep">
                    <Icon size={20} />
                  </span>
                  <span>
                    <strong>{item.strong}</strong> <span className="text-ink-soft">· {item.light}</span>
                  </span>
                </li>
              );
            })}
          </ul>

          <PurchaseOptions />

          <button
            id="hero-buy"
            type="button"
            onClick={() => buy()}
            className="enter btn btn-primary btn-lg mt-4 w-full text-[1.25rem]"
            style={{ "--i": 6 } as React.CSSProperties}
          >
            <span>
              Add to cart · <Ph>{formatMoney(priceFor(quantity))}</Ph>
            </span>
          </button>
          <p className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-base text-ink-soft">
            <span className="inline-flex items-center gap-1.5">
              <LockIcon size={18} /> Secure checkout
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ReturnIcon size={18} />
              <span>
                <Ph>{guarantee.days}</Ph>-day money-back guarantee
              </span>
            </span>
          </p>

          <MiniReviews />
          <ProductFaq />
        </div>
      </div>
    </section>
  );
}

function PurchaseOptions() {
  const { quantity, setQuantity } = useSelection();

  return (
    <fieldset id="purchase-options" className="enter mt-8 scroll-mt-32" style={{ "--i": 5 } as React.CSSProperties}>
      <legend className="mb-4 flex w-full items-center gap-4 text-base font-bold text-ink">
        <span aria-hidden="true" className="h-px flex-1 bg-line-strong" />
        Buy more, save more
        <span aria-hidden="true" className="h-px flex-1 bg-line-strong" />
      </legend>
      <div className="flex flex-col gap-3.5">
        {bundles.map((bundle) => (
          <Option
            key={bundle.quantity}
            bundle={bundle}
            selected={quantity === bundle.quantity}
            onSelect={() => setQuantity(bundle.quantity)}
          />
        ))}
      </div>
    </fieldset>
  );
}

function Option({ bundle, selected, onSelect }: { bundle: Bundle; selected: boolean; onSelect: () => void }) {
  const total = priceFor(bundle.quantity);
  const was = product.compareAtPrice
    ? product.compareAtPrice * bundle.quantity
    : bundle.percentOff > 0
      ? product.price * bundle.quantity
      : null;

  return (
    <div className="relative">
      {bundle.popular ? (
        <span className="absolute -top-3 right-4 z-(--z-base) rounded-full bg-cocoa px-3 py-0.5 text-[0.875rem] font-bold text-white">
          Most popular
        </span>
      ) : null}
      <label
        className={`block cursor-pointer overflow-hidden rounded-2xl border-2 transition-[background-color,border-color,box-shadow] duration-250 ease-(--ease-out-quart) has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-caramel-deep ${
          selected
            ? "border-cocoa bg-fawn-soft shadow-[0_12px_28px_-20px_oklch(0.3_0.05_50/0.6)]"
            : "border-line-strong bg-white hover:border-caramel"
        }`}
      >
        <input
          type="radio"
          name="bundle"
          value={bundle.quantity}
          checked={selected}
          onChange={onSelect}
          className="sr-only"
        />
        <span className="flex items-center gap-3.5 px-4 py-4 sm:px-5">
          <span
            aria-hidden="true"
            className={`grid size-6 shrink-0 place-items-center rounded-full border-2 transition-colors duration-200 ${
              selected ? "border-cocoa" : "border-line-strong bg-white"
            }`}
          >
            <span
              className={`size-3 rounded-full bg-cocoa transition-[transform,opacity] duration-250 ease-(--ease-out-quart) ${
                selected ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
            />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[1.1875rem] leading-snug font-bold">{bundle.title}</span>
            <span className="block text-base text-ink-soft">{bundle.note}</span>
          </span>
          <span className="shrink-0 text-right tabular-nums">
            <span className="block text-[1.1875rem] font-bold">
              <Ph>{formatMoney(total)}</Ph>
            </span>
            {was && was > total ? (
              <s className="block text-base text-ink-soft">
                <span className="sr-only">Was </span>
                {formatMoney(was)}
              </s>
            ) : null}
          </span>
        </span>
        {bundle.perk ? (
          <span
            className={`flex items-center justify-center gap-2 px-4 py-2 text-center text-base font-bold ${
              bundle.popular ? "bg-cocoa text-white" : "bg-fawn text-ink"
            }`}
          >
            <TruckIcon size={18} className="shrink-0" />
            {bundle.perk}
          </span>
        ) : null}
      </label>
    </div>
  );
}

function MiniReviews() {
  const picks = reviews.slice(0, 3);
  const [index, setIndex] = useState(0);
  // Only animate after the shopper switches reviews, never on first paint.
  const [touched, setTouched] = useState(false);
  const review = picks[index];
  const initials = review.name
    .split(/\s+/)
    .map((part) => part[0])
    .filter((c) => /[A-Za-z]/.test(c))
    .slice(0, 2)
    .join("");

  return (
    <figure aria-label="What customers say" className="mt-8 border-t border-line pt-6">
      <div key={index} className="flex gap-4" style={touched ? { animation: "fade-in 400ms var(--ease-out-quart)" } : undefined}>
        <span
          aria-hidden="true"
          className="grid size-14 shrink-0 place-items-center rounded-full bg-fawn font-display text-xl text-cocoa"
        >
          {initials}
        </span>
        <div>
          <blockquote>
            <p>&ldquo;{review.body}&rdquo;</p>
          </blockquote>
          <figcaption className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-base">
            <span className="text-ink-soft">
              <strong className="text-ink">{review.name}</strong>, {review.dog}
            </span>
            <Stars rating={review.rating} size={16} />
          </figcaption>
        </div>
      </div>
      <div className="mt-2 flex justify-center">
        {picks.map((r, i) => (
          <button
            key={r.name}
            type="button"
            onClick={() => {
              setIndex(i);
              setTouched(true);
            }}
            aria-label={`Show review ${i + 1} of ${picks.length}`}
            aria-current={i === index}
            className="grid size-9 place-items-center"
          >
            <span
              className={`block size-2.5 rounded-full transition-[transform,background-color] duration-300 ${
                i === index ? "scale-125 bg-cocoa" : "bg-line-strong"
              }`}
            />
          </button>
        ))}
      </div>
    </figure>
  );
}

function ProductFaq() {
  return (
    <div className="mt-4 border-t border-line">
      {productFaqs.map((faq) => {
        const Icon = icons[faq.icon];
        return (
          <details key={faq.q} className="group border-b border-line">
            <summary className="flex min-h-16 cursor-pointer items-center gap-3.5 py-3 font-bold transition-colors hover:text-caramel-deep">
              <Icon size={22} className="shrink-0 text-caramel-deep" />
              <span className="flex-1 leading-snug">{faq.q}</span>
              <ChevronDownIcon
                size={22}
                className="shrink-0 text-ink-soft transition-transform duration-300 ease-(--ease-out-quart) group-open:rotate-180"
              />
            </summary>
            <div className="faq-answer pb-5 pl-[2.3rem] text-ink-soft">
              <p>{faq.a}</p>
            </div>
          </details>
        );
      })}
    </div>
  );
}

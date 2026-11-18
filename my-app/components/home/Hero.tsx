"use client";

import Link from "next/link";
import { Gallery } from "@/components/home/Gallery";
import { useSelection } from "@/components/home/ProductSelection";
import { LockIcon, ReturnIcon, TruckIcon } from "@/components/ui/icons";
import { Ph } from "@/components/ui/Placeholder";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Stars } from "@/components/ui/Stars";
import { bundles, guarantee, product, shipping } from "@/config/product";
import { formatMoney } from "@/lib/pricing";

export function Hero() {
  const { size, setSize, quantity, setQuantity, sizeError, buy } = useSelection();
  const selected = product.sizes.find((s) => s.id === size);
  const saving = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;
  const popularBundle = bundles.find((b) => b.popular);

  return (
    <section id="buy" aria-labelledby="product-title" className="wrap pt-0 pb-16 sm:pt-8 md:pb-24 lg:pt-12">
      <div className="grid gap-7 md:grid-cols-[1.05fr_1fr] md:gap-10 lg:gap-16">
        <div className="enter min-w-0 md:sticky md:top-[calc(var(--header-h)+1.5rem)] md:self-start">
          <Gallery />
        </div>

        <div className="flex min-w-0 flex-col">
          <a
            href="#reviews"
            className="enter inline-flex w-fit flex-wrap items-center gap-x-2.5 gap-y-1 rounded-md py-1"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            <Stars rating={product.rating} />
            <span className="font-bold">
              <Ph>{product.rating}</Ph>
            </span>
            <span className="text-ink-soft underline decoration-line-strong underline-offset-4">
              <Ph>{product.reviewCount.toLocaleString("en-US")}</Ph> reviews
            </span>
          </a>

          <h1 id="product-title" className="enter h-display mt-3" style={{ "--i": 2 } as React.CSSProperties}>
            {product.name}
          </h1>
          <p className="enter lead mt-4 text-ink-soft" style={{ "--i": 3 } as React.CSSProperties}>
            {product.tagline}
          </p>

          <div className="enter mt-6 flex flex-wrap items-center gap-x-3 gap-y-2" style={{ "--i": 4 } as React.CSSProperties}>
            <p className="text-[2rem] leading-none font-bold tabular-nums">
              <span className="sr-only">Price: </span>
              <Ph>{formatMoney(product.price)}</Ph>
            </p>
            {product.compareAtPrice ? (
              <>
                <p className="text-xl text-ink-soft tabular-nums">
                  <span className="sr-only">Was </span>
                  <s>
                    <Ph>{formatMoney(product.compareAtPrice)}</Ph>
                  </s>
                </p>
                <p className="rounded-full bg-fawn px-3 py-1 text-base font-bold">Save {saving}%</p>
              </>
            ) : null}
          </div>
          <p className="enter mt-3 flex items-center gap-2 text-ink-soft" style={{ "--i": 4 } as React.CSSProperties}>
            <span aria-hidden="true" className="size-2.5 rounded-full bg-success" />
            In stock. Loved by <Ph>{product.happyDogs}</Ph> happy dogs.
          </p>

          {/* Size */}
          <fieldset
            id="size-picker"
            className="enter mt-8 scroll-mt-32"
            style={{ "--i": 5 } as React.CSSProperties}
            aria-describedby={sizeError ? "size-error" : "size-hint"}
          >
            <div className="flex items-baseline justify-between gap-4">
              <legend className="float-left text-xl font-bold">
                Size{selected ? <span className="font-normal text-ink-soft">: {selected.id}</span> : null}
              </legend>
              <a href="#size-guide" className="link text-base">
                Which size fits?
              </a>
            </div>
            <div className="clear-both mt-3 grid grid-cols-5 gap-2 sm:gap-2.5">
              {product.sizes.map((s) => (
                <label key={s.id} className="relative">
                  <input
                    type="radio"
                    name="size"
                    value={s.id}
                    checked={size === s.id}
                    onChange={() => setSize(s.id)}
                    className="peer sr-only"
                  />
                  <span
                    className={`flex min-h-14 cursor-pointer items-center justify-center rounded-2xl text-lg font-bold transition-[background-color,color,box-shadow] duration-200 select-none peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-caramel-deep ${
                      size === s.id
                        ? "bg-cocoa text-white shadow-[0_6px_16px_-8px_oklch(0.3_0.05_50/0.6)]"
                        : sizeError
                          ? "bg-white shadow-[inset_0_0_0_2px_var(--color-danger)] hover:bg-fawn-soft"
                          : "bg-white shadow-[inset_0_0_0_1.5px_var(--color-line-strong)] hover:bg-fawn-soft"
                    }`}
                  >
                    {s.id}
                  </span>
                </label>
              ))}
            </div>
            <div className="mt-3 min-h-[3.25rem]">
              {sizeError ? (
                <p id="size-error" role="alert" className="font-bold text-danger">
                  Please choose a size first. Not sure? Check the size guide below.
                </p>
              ) : selected ? (
                <p id="size-hint" className="text-ink-soft">
                  Chest {selected.chest[0]}–{selected.chest[1]} in. Usually fits {selected.breeds}.
                </p>
              ) : (
                <p id="size-hint" className="text-ink-soft">
                  Measure around your dog&rsquo;s chest. Between sizes? Go one size up.
                </p>
              )}
            </div>
          </fieldset>

          {/* Quantity + buy */}
          <div className="enter mt-4 flex flex-col gap-3" style={{ "--i": 6 } as React.CSSProperties}>
            <div className="flex gap-3">
              <QuantityStepper value={quantity} onChange={setQuantity} max={product.maxQuantityPerSize} />
              <button
                id="hero-buy"
                type="button"
                onClick={() => buy()}
                className="btn btn-primary btn-lg flex-1 px-4"
              >
                Add to cart
              </button>
            </div>
            <button type="button" onClick={() => buy({ then: "checkout" })} className="btn btn-secondary btn-lg w-full">
              Buy it now
            </button>
          </div>

          {popularBundle ? (
            <a
              href="#bundle"
              className="enter mt-5 flex items-center justify-between gap-4 rounded-2xl bg-fawn-soft px-5 py-4 transition-colors hover:bg-fawn/60"
              style={{ "--i": 7 } as React.CSSProperties}
            >
              <span>
                <strong>Two dogs, or a gift?</strong> Buy 2 and save <Ph>{popularBundle.percentOff}%</Ph> with free
                shipping.
              </span>
              <span aria-hidden="true" className="text-2xl leading-none">
                →
              </span>
            </a>
          ) : null}

          <ul className="enter mt-7 grid gap-4 border-t border-line pt-7" style={{ "--i": 8 } as React.CSSProperties}>
            <li className="flex items-start gap-3.5">
              <TruckIcon className="mt-0.5 shrink-0 text-caramel-deep" />
              <span>
                <strong>Ships in <Ph>{shipping.processing}</Ph>.</strong> Free on 2 or more.
              </span>
            </li>
            <li className="flex items-start gap-3.5">
              <ReturnIcon className="mt-0.5 shrink-0 text-caramel-deep" />
              <span>
                <strong>
                  <Ph>{guarantee.days}</Ph>-day money-back guarantee.
                </strong>{" "}
                Free size swaps.
              </span>
            </li>
            <li className="flex items-start gap-3.5">
              <LockIcon className="mt-0.5 shrink-0 text-caramel-deep" />
              <span>
                <strong>Secure checkout</strong> with card, Apple Pay or Google Pay.{" "}
                <Link href="/refund-policy" className="link font-normal">
                  Refund policy
                </Link>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

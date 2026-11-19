"use client";

import { Gallery } from "@/components/home/Gallery";
import { useSelection } from "@/components/home/ProductSelection";
import { track } from "@/lib/analytics";
import { SoldOutPanel } from "@/components/home/SoldOutPanel";
import {
  ChevronDownIcon,
  ClockIcon,
  FeatherIcon,
  LeafIcon,
  PackageIcon,
  PawIcon,
  ReturnIcon,
  RulerIcon,
  ShieldIcon,
  TruckIcon,
  WashIcon,
} from "@/components/ui/icons";
import { Ph } from "@/components/ui/Placeholder";
import { Stars } from "@/components/ui/Stars";
import { bundles, guarantee, product, productFaqs, type Bundle } from "@/config/product";
import { SoldCounter } from "@/components/home/SoldCounter";
import { formatMoney, priceFor } from "@/lib/pricing";

const icons = {
  feather: FeatherIcon,
  clock: ClockIcon,
  ruler: RulerIcon,
  paw: PawIcon,
  wash: WashIcon,
  shield: ShieldIcon,
  package: PackageIcon,
  truck: TruckIcon,
  leaf: LeafIcon,
} as const;

export function Hero() {
  return (
    <section id="buy" data-section="product" aria-labelledby="product-title" className="wrap pt-0 pb-16 sm:pt-8 md:pb-24 lg:pt-12">
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

          <AddToCartButton />
          <p className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-base text-ink-soft">
            <span className="inline-flex items-center gap-1.5">
              <ReturnIcon size={18} />
              <span>
                Free shipping · <Ph>{guarantee.days}</Ph>-day returns
              </span>
            </span>
            <span aria-hidden="true" className="text-line-strong">
              ·
            </span>
            <SoldCounter />
          </p>

          {/* Trust strip: the fabric certification (details in "Materials and safety" below) */}
          <p
            className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-fawn-soft px-4 py-3 text-[0.9375rem] font-bold tracking-[0.06em] text-success uppercase"
            title={`${product.certification.name}, ${product.certification.detail}`}
          >
            {/* Leaf for the material, paw for pet-friendly */}
            <span aria-hidden="true" className="flex items-center gap-1">
              <LeafIcon size={18} />
              <PawIcon size={18} />
            </span>
            {product.certification.short}
          </p>

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
      <legend className="sr-only">Choose how many costumes</legend>
      <div className="flex flex-col gap-3">
        {bundles.map((bundle) => (
          <Option
            key={bundle.quantity}
            bundle={bundle}
            selected={quantity === bundle.quantity}
            onSelect={() => {
              setQuantity(bundle.quantity);
              track("bundle_selected", { quantity: bundle.quantity, free: bundle.free });
            }}
          />
        ))}
      </div>
    </fieldset>
  );
}

/** Price per costume, the "was" price per costume, and the saving against it. */
function unitPricing(quantity: number) {
  const each = priceFor(quantity) / quantity;
  const was = product.compareAtPrice ?? product.price;
  const save = Math.round((1 - each / was) * 100);
  // Shown in whole dollars, as before cents were supported for the treat add-on
  return { each: Math.round(each / 100) * 100, was, save };
}

function Option({ bundle, selected, onSelect }: { bundle: Bundle; selected: boolean; onSelect: () => void }) {
  const { each, was, save } = unitPricing(bundle.quantity);
  const suffix = bundle.quantity > 1 ? " each" : "";

  return (
    <label
      className={`relative flex cursor-pointer items-center gap-3.5 rounded-xl font-apple border-2 px-4 py-5 transition-[background-color,border-color] duration-250 ease-(--ease-out-quart) has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-caramel-deep sm:gap-5 sm:px-6 sm:py-6 ${
        selected ? "border-cocoa bg-fawn-soft" : "border-line bg-white hover:border-line-strong"
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
      <span
        aria-hidden="true"
        className={`grid size-6 shrink-0 place-items-center rounded-full border-2 bg-white transition-colors duration-200 ${
          selected ? "border-cocoa" : "border-ink-soft/60"
        }`}
      >
        <span
          className={`size-3 rounded-full bg-cocoa transition-[transform,opacity] duration-250 ease-(--ease-out-quart) ${
            selected ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <span className="text-[1.125rem] leading-tight font-bold whitespace-nowrap sm:text-[1.25rem]">{bundle.title}</span>
          {bundle.popular ? (
            <span className="absolute -top-3 right-3 rounded-full bg-cocoa px-2.5 py-0.5 text-[0.75rem] leading-5 font-bold tracking-wide text-white uppercase sm:static">
              Most popular
            </span>
          ) : null}
        </span>
        <span className="mt-1 block text-base text-ink-soft">{bundle.note}</span>
      </span>

      <span className="shrink-0 text-right leading-snug tabular-nums">
        {save > 0 ? (
          <s className="block text-[0.875rem] font-bold text-danger decoration-2 sm:text-[0.9375rem]">
            <span className="sr-only">Was </span>
            {formatMoney(was)}
            {suffix}
          </s>
        ) : null}
        <span className="block text-[1.0625rem] font-bold whitespace-nowrap sm:text-[1.125rem]">
          <Ph>{formatMoney(each)}</Ph>
          {suffix}
        </span>
        {save > 0 ? <span className="block text-[0.9375rem] font-bold whitespace-nowrap text-success sm:text-[1rem]">You Save {save}%</span> : null}
      </span>
    </label>
  );
}

function AddToCartButton() {
  const { quantity, buy, soldOutOpen, setSoldOutOpen, settings } = useSelection();
  const total = priceFor(quantity);
  const was = (product.compareAtPrice ?? product.price) * quantity;

  return (
    <>
      <button
        id="hero-buy"
        type="button"
        onClick={() => (soldOutOpen ? setSoldOutOpen(false) : buy())}
        aria-expanded={settings.soldOut ? soldOutOpen : undefined}
        aria-controls={settings.soldOut ? "sold-out-panel" : undefined}
        className="enter btn btn-primary btn-cart btn-lg font-apple mt-4 w-full gap-3 px-5 text-[1.125rem] tracking-[0.04em] whitespace-nowrap uppercase sm:px-14 sm:text-[1.3125rem]"
        style={{ "--i": 6 } as React.CSSProperties}
      >
        {soldOutOpen ? (
          <span key="sold-out" className="inline-flex items-center gap-3" style={{ animation: "fade-in 300ms var(--ease-out-quart)" }}>
            Sold out
            <span className="font-normal tracking-normal text-on-cocoa-soft normal-case">· next drop soon</span>
          </span>
        ) : (
          <span key="add" className="inline-flex items-center gap-3">
            <span>Add to cart</span>
            <span className="tabular-nums tracking-normal normal-case">
              {was > total ? (
                <s className="mr-2 font-normal text-on-cocoa-soft/80 decoration-2">
                  <span className="sr-only">Was </span>
                  {formatMoney(was)}
                </s>
              ) : null}
              <Ph>{formatMoney(total)}</Ph>
            </span>
          </span>
        )}
        {/* Upright paw; it turns toes-down when the sold-out dropdown is open */}
        <PawIcon
          size={32}
          className={`absolute right-6 hidden transition-transform duration-400 ease-(--ease-out-quart) sm:block ${
            soldOutOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {settings.soldOut ? <SoldOutPanel open={soldOutOpen} nextDropAt={settings.nextDropAt} /> : null}
    </>
  );
}

function ProductFaq() {
  return (
    <div className="mt-8 border-t border-line">
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

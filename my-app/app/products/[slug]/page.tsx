import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExploreProducts } from "@/components/home/ExploreProducts";
import { ProductPurchase } from "@/components/products/ProductPurchase";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  ClockIcon,
  FeatherIcon,
  LeafIcon,
  PackageIcon,
  PawIcon,
  ReturnIcon,
  RulerIcon,
  ShieldIcon,
  SnowflakeIcon,
  TruckIcon,
  WashIcon,
} from "@/components/ui/icons";
import { Ph, Placeholder } from "@/components/ui/Placeholder";
import { guarantee } from "@/config/product";
import {
  getOtherProduct,
  otherProducts,
  type HighlightIcon,
} from "@/config/products";
import { formatMoney } from "@/lib/pricing";

const icons: Record<HighlightIcon, typeof ClockIcon> = {
  clock: ClockIcon,
  paw: PawIcon,
  wash: WashIcon,
  feather: FeatherIcon,
  ruler: RulerIcon,
  shield: ShieldIcon,
  package: PackageIcon,
  truck: TruckIcon,
  leaf: LeafIcon,
  snowflake: SnowflakeIcon,
};

export function generateStaticParams() {
  return otherProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getOtherProduct(slug);
  if (!product) return {};
  return { title: product.name, description: product.tagline };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getOtherProduct(slug);
  if (!product) notFound();

  const intro = (
    <>
      <h1
        id="product-title"
        className="enter text-[clamp(2.25rem,1.7rem+1.8vw,3.25rem)]"
        style={{ "--i": 1 } as React.CSSProperties}
      >
        {product.name}
      </h1>
      <p
        className="enter lead mt-3 text-ink-soft"
        style={{ "--i": 2 } as React.CSSProperties}
      >
        {product.tagline}
      </p>

      <ul
        className="enter mt-6 flex flex-col gap-3.5"
        style={{ "--i": 3 } as React.CSSProperties}
      >
        {product.highlights.map((item) => {
          const Icon = icons[item.icon];
          return (
            <li key={item.strong} className="flex items-center gap-3.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-fawn-soft text-caramel-deep">
                <Icon size={20} />
              </span>
              <span>
                <strong>{item.strong}</strong>{" "}
                <span className="text-ink-soft">· {item.light}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );

  const outro = (
    <>
      <p className="mt-2 flex items-center justify-center gap-x-1.5 text-[0.8125rem] whitespace-nowrap text-ink-soft min-[400px]:text-[0.875rem] sm:gap-x-3 sm:text-base [&_svg]:size-[15px] sm:[&_svg]:size-[18px]">
        <span className="inline-flex items-center gap-1.5">
          <TruckIcon size={18} />
          <span>Free shipping</span>
        </span>
        <span aria-hidden="true" className="text-line-strong">
          ·
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ReturnIcon size={18} />
          <span>
            <Ph>{guarantee.days}</Ph>-day returns
          </span>
        </span>
      </p>

      <p className="mt-8">{product.description}</p>

      {/* Details, in the same accordion style as the Rudy product */}
      <div className="mt-6 border-t border-line">
        {product.details.map((d) => {
          const Icon = icons[d.icon];
          return (
            <details key={d.q} className="group border-b border-line">
              <summary className="flex min-h-16 cursor-pointer items-center gap-3.5 py-3 font-bold transition-colors hover:text-caramel-deep">
                <Icon size={22} className="shrink-0 text-caramel-deep" />
                <span className="flex-1 leading-snug">{d.q}</span>
                <ChevronDownIcon
                  size={22}
                  className="shrink-0 text-ink-soft transition-transform duration-300 ease-(--ease-out-quart) group-open:rotate-180"
                />
              </summary>
              <div className="faq-answer pb-5 pl-[2.3rem] text-ink-soft">
                <p>{d.a}</p>
              </div>
            </details>
          );
        })}
      </div>
    </>
  );

  const save = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;
  const [main, ...rest] = product.photos;

  return (
    <>
      {/* Same layout as the Rudy product section: photos first on phones, side by side on big screens */}
      <section
        aria-labelledby="product-title"
        className="wrap pt-6 pb-16 sm:pt-8 md:pb-24 lg:pt-12"
      >
        <Link
          href="/#explore-title"
          className="enter inline-flex min-h-11 items-center gap-1.5 text-base font-bold text-ink-soft hover:text-ink"
        >
          <ArrowRightIcon size={18} className="rotate-180" />
          All products
        </Link>

        {product.status === "available" && product.options ? (
          <ProductPurchase
            product={{ ...product, options: product.options }}
            intro={intro}
            outro={outro}
          />
        ) : (
          <div className="mx-auto mt-3 grid max-w-[38rem] gap-7 md:gap-10 lg:max-w-none lg:grid-cols-[1.12fr_1fr] lg:gap-14 xl:gap-16">
            <div className="enter min-w-0 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
              <div className="relative">
                <Placeholder
                  label={main ?? product.name}
                  ratio="1:1"
                  className="rounded-3xl"
                />
                <span className="absolute top-4 left-4 rounded-full bg-cocoa px-3.5 py-1.5 text-[0.875rem] font-bold tracking-wide text-white uppercase">
                  Coming soon
                </span>
              </div>
              {rest.length > 0 ? (
                <ul
                  aria-label="More photos"
                  className="mt-3 grid grid-cols-3 gap-3"
                >
                  {rest.map((label) => (
                    <li key={label}>
                      <Placeholder
                        label={label}
                        ratio="1:1"
                        compact
                        className="rounded-2xl"
                      />
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="flex min-w-0 flex-col">
              {intro}

              {/* Price, styled like the bundle cards */}
              <div
                className="enter mt-8 flex items-center justify-between gap-4 rounded-xl border-2 border-cocoa bg-fawn-soft px-4 py-5 sm:px-6"
                style={{ "--i": 4 } as React.CSSProperties}
              >
                <span>
                  <span className="block text-[1.125rem] leading-tight font-bold sm:text-[1.25rem]">
                    {product.name}
                  </span>
                  <span className="mt-1 block text-base text-ink-soft">
                    Coming soon
                  </span>
                </span>
                <span className="shrink-0 text-right leading-snug tabular-nums">
                  {product.compareAtPrice ? (
                    <s className="block text-[0.9375rem] font-bold text-danger decoration-2">
                      <span className="sr-only">Was </span>
                      {formatMoney(product.compareAtPrice)}
                    </s>
                  ) : null}
                  <span className="block text-[1.125rem] font-bold whitespace-nowrap">
                    <Ph>{formatMoney(product.price)}</Ph>
                  </span>
                  {save > 0 ? (
                    <span className="block text-[0.9375rem] font-bold text-success">
                      You Save {save}%
                    </span>
                  ) : null}
                </span>
              </div>

              <Link
                href="/waiting-list"
                className="enter btn btn-primary btn-lg mt-4 w-full gap-3 text-[1.125rem] tracking-[0.04em] uppercase"
                style={{ "--i": 5 } as React.CSSProperties}
              >
                Join the waiting list
                <ArrowRightIcon size={22} />
              </Link>
              <p className="mt-3 text-center text-base text-ink-soft">
                We&rsquo;ll email you the moment it&rsquo;s in stock.
              </p>

              {outro}
            </div>
          </div>
        )}
      </section>

      <ExploreProducts
        products={otherProducts.filter((p) => p.slug !== product.slug)}
        title="You might also like"
        intro="More cosy outfits from Rudy & Co."
      />
    </>
  );
}

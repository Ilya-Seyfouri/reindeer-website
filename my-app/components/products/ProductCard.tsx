import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Ph, Placeholder } from "@/components/ui/Placeholder";
import type { OtherProduct } from "@/config/products";
import { formatMoney } from "@/lib/pricing";

/** A product tile: photo, name, price and a "Coming soon" tag, linking to its page. */
export function ProductCard({ product }: { product: OtherProduct }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col rounded-3xl bg-white p-3 shadow-[0_14px_30px_-22px_oklch(0.3_0.05_50/0.55)] ring-1 ring-line transition-transform duration-300 ease-(--ease-out-quart) hover:-translate-y-1"
    >
      <div className="relative overflow-hidden rounded-2xl">
        <Placeholder label={product.photos[0] ?? product.name} ratio="4:5" className="rounded-2xl" />
        {product.status === "coming-soon" ? (
          <span className="absolute top-3 left-3 rounded-full bg-cocoa px-3 py-1 text-[0.8125rem] font-bold tracking-wide text-white uppercase">
            Coming soon
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
        <h3 className="h-card leading-tight">{product.name}</h3>
        <p className="mt-1.5 text-base leading-snug text-ink-soft">{product.tagline}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <p className="leading-none tabular-nums">
            {product.compareAtPrice ? (
              <s className="mr-2 text-[0.9375rem] font-bold text-danger decoration-2">
                <span className="sr-only">Was </span>
                {formatMoney(product.compareAtPrice)}
              </s>
            ) : null}
            <strong className="text-[1.125rem]">
              <Ph>{formatMoney(product.price)}</Ph>
            </strong>
          </p>
          <span className="inline-flex items-center gap-1 text-base font-bold text-caramel-deep">
            View
            <ArrowRightIcon size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

import { ProductCard } from "@/components/products/ProductCard";
import { otherProducts, type OtherProduct } from "@/config/products";

/** "Explore other products": the rest of the range, each linking to its own page. */
export function ExploreProducts({
  products = otherProducts,
  title = "Explore other products",
  intro = "More cosy outfits for your furry little friend.",
}: {
  products?: OtherProduct[];
  title?: string;
  intro?: string;
}) {
  if (products.length === 0) return null;

  return (
    <section data-section="explore_products" aria-labelledby="explore-title" className="section bg-fawn-soft">
      <div className="wrap">
        <div className="mx-auto max-w-[40rem] text-center">
          <h2 id="explore-title" className="reveal h-section">
            {title}
          </h2>
          <p className="reveal lead mx-auto mt-4 max-w-[36ch] text-ink-soft">{intro}</p>
        </div>

        {/* Phones: swipe through, with the next card peeking in. Tablet and up: side by side. */}
        <ul
          aria-label={title}
          className="-mx-(--safe-left) mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-(--safe-left) pt-1 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:gap-7 [&::-webkit-scrollbar]:hidden"
          style={{ scrollPaddingInline: "var(--safe-left)" }}
        >
          {products.map((product, i) => (
            <li key={product.slug} className="reveal w-[78%] shrink-0 snap-start md:w-auto" style={{ "--i": i } as React.CSSProperties}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

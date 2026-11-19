import Image from "next/image";
import { Stars } from "@/components/ui/Stars";
import type { OtherProduct } from "@/config/products";

const dateFormat = new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/** Customer reviews for a product page, with any photos the customer shared. */
export function ProductReviews({ product }: { product: OtherProduct }) {
  const reviews = product.reviews ?? [];
  if (reviews.length === 0) return null;
  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <section aria-labelledby="reviews-title" className="wrap pb-16 md:pb-24">
      <div className="mx-auto -mt-6 max-w-[38rem] md:-mt-10 lg:max-w-[52rem]">
        <h2 id="reviews-title" className="h-section text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)]">
          Customer reviews
        </h2>
        <p className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <Stars rating={average} size={22} />
          <strong className="tabular-nums">{average.toFixed(1)} out of 5</strong>
          <span className="text-ink-soft">
            · {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
          </span>
        </p>
        {product.reviewsNote ? <p className="mt-2 text-base text-ink-soft">{product.reviewsNote}</p> : null}

        <ul className="mt-6 flex flex-col gap-4">
          {reviews.map((r) => (
            <li key={`${r.author}-${r.date}`}>
              <figure className="rounded-2xl bg-white p-4 shadow-[inset_0_0_0_1.5px_var(--color-line)] sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <Stars rating={r.rating} size={18} />
                  <time dateTime={r.date} className="text-[0.875rem] text-ink-soft">
                    {dateFormat.format(new Date(r.date))}
                  </time>
                </div>
                <p className="mt-2 flex flex-wrap justify-between gap-x-3 text-[0.875rem] text-ink-soft">
                  <span>{r.variant}</span>
                  <span className="font-bold text-ink">{r.author}</span>
                </p>
                <blockquote className="mt-3 leading-relaxed">
                  <p>{r.text}</p>
                </blockquote>
                {r.photos.length > 0 ? (
                  <ul aria-label="Customer photos" className="mt-4 flex flex-wrap gap-2">
                    {r.photos.map((photo, i) => (
                      <li key={i}>
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          sizes="80px"
                          className="size-20 rounded-xl object-cover"
                        />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

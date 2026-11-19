import Image from "next/image";
import { CheckIcon } from "@/components/ui/icons";
import { Ph } from "@/components/ui/Placeholder";
import { Stars } from "@/components/ui/Stars";
import { product, reviews, type Review } from "@/config/product";

/** The customer's profile picture, or their initials when there isn't one. */
function Avatar({ review }: { review: Review }) {
  if (review.avatar) {
    return (
      <Image
        src={review.avatar}
        alt=""
        sizes="48px"
        className="size-12 shrink-0 rounded-full bg-fawn-soft object-cover ring-2 ring-white"
      />
    );
  }
  const initials = review.name
    .replace(/\./g, "")
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span
      aria-hidden="true"
      className="grid size-12 shrink-0 place-items-center rounded-full bg-fawn-soft text-[1.0625rem] font-bold text-cocoa"
    >
      {initials}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col rounded-3xl bg-white p-3 shadow-[0_14px_34px_-24px_oklch(0.3_0.05_50/0.45)]">
      <div className="overflow-hidden rounded-2xl">
        <Image
          src={review.photo}
          alt={`${review.dog.split(",")[0]} wearing the costume, from ${review.name}`}
          placeholder="blur"
          sizes="(min-width: 768px) 30vw, 84vw"
          className="aspect-[4/5] w-full bg-fawn-soft object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col px-3 pt-5 pb-3">
        <p className="text-[1.375rem] leading-snug font-bold">{review.title}</p>
        <Stars rating={review.rating} className="mt-1.5" />
        <blockquote className="mt-3">
          <p>&ldquo;{review.body}&rdquo;</p>
        </blockquote>
        <figcaption className="mt-auto flex items-center gap-3.5 pt-5">
          <Avatar review={review} />
          <span className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1">
          <span>
            <strong>{review.name}</strong>
            <span className="text-ink-soft"> | {review.dog}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 font-bold text-success">
            <span className="grid size-5 place-items-center rounded-full bg-success text-white">
              <CheckIcon size={13} strokeWidth={3} />
            </span>
            Verified buyer
          </span>
          </span>
        </figcaption>
      </div>
    </figure>
  );
}

export function Reviews() {
  return (
    <section id="reviews" data-section="reviews" aria-labelledby="reviews-title" className="section print-toys print-toys-lg bg-fawn">
      <div className="wrap">
        <div className="mx-auto max-w-[48rem] text-center">
          <h2 id="reviews-title" className="reveal h-section">
            Dog owners love it. Their dogs do too.
          </h2>
          <p className="reveal lead mx-auto mt-4 max-w-[44ch]">
            Don&rsquo;t just take our word for it. Hear from some of the <Ph>{product.happyDogs}</Ph> owners whose
            pups are already wearing Rudy.
          </p>
          <p className="reveal mt-5 inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
            <Stars rating={product.rating} size={22} />
            <span>
              <strong>
                <Ph>{product.rating}</Ph>/5
              </strong>{" "}
              <span className="text-ink-soft">
                from <Ph>{product.reviewCount.toLocaleString("en-US")}</Ph> reviews
              </span>
            </span>
          </p>
        </div>

        {/* Phones: swipe through, with the next card peeking in. Tablet and up: three across. */}
        <ul
          aria-label="Customer reviews"
          className="-mx-(--safe-left) mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-(--safe-left) pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:gap-7 [&::-webkit-scrollbar]:hidden"
          style={{ scrollPaddingInline: "var(--safe-left)" }}
        >
          {reviews.map((review, i) => (
            <li
              key={review.name}
              className="reveal w-[84%] shrink-0 snap-start md:w-auto"
              style={{ "--i": i } as React.CSSProperties}
            >
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

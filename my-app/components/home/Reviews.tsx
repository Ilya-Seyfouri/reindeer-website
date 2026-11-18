"use client";

import { useState } from "react";
import { BuyButton } from "@/components/home/BuyButton";
import { CheckIcon } from "@/components/ui/icons";
import { Ph, Placeholder } from "@/components/ui/Placeholder";
import { Stars } from "@/components/ui/Stars";
import { product, reviews } from "@/config/product";

const INITIAL = 3;

export function Reviews() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="section">
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="reviews-title" className="reveal h-section max-w-[18ch]">
              Dog owners love it. Their dogs do too.
            </h2>
          </div>
          <div className="reveal flex items-center gap-4">
            <p className="font-display text-[3.25rem] leading-none">
              <Ph>{product.rating}</Ph>
            </p>
            <div>
              <Stars rating={product.rating} size={22} />
              <p className="mt-1 text-ink-soft">
                From <Ph>{product.reviewCount.toLocaleString("en-US")}</Ph> reviews
              </p>
            </div>
          </div>
        </div>

        <ul className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => {
            const hidden = !showAll && i >= INITIAL;
            return (
              <li
                key={review.name}
                className={`reveal flex-col ${hidden ? "hidden md:flex" : "flex"} ${!showAll && i >= 6 ? "md:hidden" : ""}`}
              >
                <figure className="flex flex-col">
                  <div className="overflow-hidden rounded-3xl">
                    <Placeholder label="REVIEW PHOTO" detail={review.dog} ratio="4:3" />
                  </div>
                  <Stars rating={review.rating} className="mt-5" />
                  <blockquote className="mt-3">
                    <p className="text-xl font-bold leading-snug">{review.title}</p>
                    <p className="mt-2">&ldquo;{review.body}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-4 text-base text-ink-soft">
                    <span className="font-bold text-ink">{review.name}</span>, {review.location}
                    <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span>
                        {review.dog} · Size {review.size}
                      </span>
                      <span className="inline-flex items-center gap-1 font-bold text-success">
                        <CheckIcon size={18} /> Verified buyer
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>

        {!showAll && reviews.length > INITIAL ? (
          <div className="mt-10 md:hidden">
            <button type="button" onClick={() => setShowAll(true)} className="btn btn-secondary w-full">
              Show {reviews.length - INITIAL} more reviews
            </button>
          </div>
        ) : null}

        <div className="mt-14 flex justify-center border-t border-line pt-12">
          <BuyButton className="items-center text-center" note="Join the happy dogs. Ships fast, returns are easy." />
        </div>
      </div>
    </section>
  );
}

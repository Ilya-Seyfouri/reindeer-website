"use client";

import Link from "next/link";
import posthog from "posthog-js";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { BundleNudge, CartLines, CartSummary } from "@/components/cart/CartLines";
import { PaymentIcons } from "@/components/layout/PaymentIcons";
import { ArrowRightIcon, LockIcon, ReturnIcon, TruckIcon } from "@/components/ui/icons";
import { Ph } from "@/components/ui/Placeholder";
import { guarantee, shipping, site } from "@/config/product";

type Status = { kind: "idle" } | { kind: "loading" } | { kind: "error"; message: string };

export function CheckoutView() {
  const { quantity } = useCart();
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const empty = quantity === 0;

  async function startCheckout() {
    posthog.capture("checkout_requested", { quantity });
    setStatus({ kind: "loading" });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      const data: { url?: string; error?: string } = await res.json().catch(() => ({}));
      if (res.ok && data.url) {
        // Stripe Checkout (or your provider) takes it from here.
        window.location.assign(data.url);
        return;
      }
      setStatus({
        kind: "error",
        message: data.error ?? "We couldn't start checkout. Please try again in a moment.",
      });
    } catch {
      setStatus({
        kind: "error",
        message: "We couldn't reach the payment page. Check your internet connection and try again.",
      });
    }
  }

  return (
    <div className="wrap pt-10 pb-20 md:pt-16 md:pb-28">
      <h1 className="enter h-display">Your order</h1>

      {empty ? (
        <div className="enter mt-10 flex max-w-[34rem] flex-col items-start gap-5" style={{ "--i": 1 } as React.CSSProperties}>
          <p className="lead text-ink-soft">
            Your cart is empty. Choose a bundle and we&rsquo;ll have your pup dressed up in no time.
          </p>
          <Link href="/#buy" className="btn btn-primary btn-lg">
            Shop the costume
            <ArrowRightIcon size={20} />
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <section aria-labelledby="items-title" className="enter" style={{ "--i": 1 } as React.CSSProperties}>
            <h2 id="items-title" className="sr-only">
              Items in your order
            </h2>
            <div className="border-y border-line">
              <CartLines />
            </div>
            <div className="mt-5">
              <BundleNudge />
            </div>
            <p className="mt-6 text-ink-soft">
              Not the right fit? No problem. Full refund within <Ph>{guarantee.days}</Ph> days.
            </p>
          </section>

          <section
            aria-labelledby="summary-title"
            className="enter self-start rounded-3xl bg-fawn-soft p-6 sm:p-8 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            <h2 id="summary-title" className="font-display text-[1.75rem]">
              Order summary
            </h2>
            <div className="mt-5">
              <CartSummary />
            </div>

            <button
              type="button"
              onClick={startCheckout}
              disabled={status.kind === "loading"}
              aria-busy={status.kind === "loading"}
              className="btn btn-primary btn-lg mt-7 w-full"
            >
              <LockIcon size={20} />
              {status.kind === "loading" ? "Opening secure checkout…" : "Continue to secure payment"}
            </button>

            <div aria-live="polite">
              {status.kind === "error" ? (
                <p role="alert" className="mt-4 rounded-2xl bg-white p-4 font-bold text-danger">
                  {status.message} If it keeps happening, email us at{" "}
                  <a href={`mailto:${site.contact.email}`} className="underline">
                    {site.contact.email}
                  </a>
                  .
                </p>
              ) : null}
            </div>

            <p className="mt-4 text-center text-base text-ink-soft">
              You&rsquo;ll enter your address and payment on the next page. Taxes are calculated there.
            </p>

            <ul className="mt-6 grid gap-3 border-t border-line-strong/50 pt-6">
              <li className="flex items-start gap-3">
                <TruckIcon className="mt-0.5 shrink-0 text-caramel-deep" />
                <span>
                  Ships in <Ph>{shipping.processing}</Ph>, arrives in <Ph>{shipping.delivery}</Ph>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ReturnIcon className="mt-0.5 shrink-0 text-caramel-deep" />
                <span>
                  <Ph>{guarantee.days}</Ph>-day money-back guarantee.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <LockIcon className="mt-0.5 shrink-0 text-caramel-deep" />
                <span>Payments handled securely by Stripe. We never see your card details.</span>
              </li>
            </ul>
            <div className="mt-6">
              <PaymentIcons />
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

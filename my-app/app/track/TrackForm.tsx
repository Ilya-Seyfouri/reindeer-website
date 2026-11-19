"use client";

import Link from "next/link";
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { CheckIcon, MailIcon } from "@/components/ui/icons";
import { Ph } from "@/components/ui/Placeholder";
import { shipping } from "@/config/product";

export type TrackingResult = {
  orderNumber: string;
  status: "processing" | "shipped" | "out_for_delivery" | "delivered";
  carrier?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  estimatedDelivery?: string;
  /**
   * Roughly where it's going, so the sleigh flies to the right part of the map.
   * A city-level point is plenty: never send a street address to the browser.
   */
  destination?: { label: string; lat: number; lng: number };
};

const STEPS: { key: TrackingResult["status"]; label: string; detail: string }[] = [
  { key: "processing", label: "Order received", detail: "Being packed at Rudy HQ" },
  { key: "shipped", label: "Shipped", detail: "On its way to you" },
  { key: "out_for_delivery", label: "Out for delivery", detail: "Arriving today" },
  { key: "delivered", label: "Delivered", detail: "Time to dress up!" },
];


type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "not_found"; orderNumber: string }
  | { kind: "found"; result: TrackingResult };

export function TrackForm() {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [errors, setErrors] = useState<{ order?: string; email?: string }>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const orderNumber = String(form.get("orderNumber") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();

    const nextErrors: typeof errors = {};
    if (!orderNumber) nextErrors.order = "Please enter your order number.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setState({ kind: "loading" });
    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber, email }),
      });
      const data: { result?: TrackingResult; error?: string } = await res.json().catch(() => ({}));
      if (res.ok && data.result) setState({ kind: "found", result: data.result });
      else if (res.status === 404) setState({ kind: "not_found", orderNumber });
      else setState({ kind: "error", message: data.error ?? "We couldn't look that up right now. Please try again." });
    } catch {
      setState({ kind: "error", message: "We couldn't connect. Check your internet connection and try again." });
    }
  }

  const found = state.kind === "found" ? state.result : null;

  return (
    <>
      {/* Same light page header and form styling as Contact and Returns */}
      <PageHeader
        title="Track your order"
        intro={
          <>
            Enter the order number from your confirmation email and the email address you used. Orders ship in{" "}
            <Ph>{shipping.processing}</Ph>.
          </>
        }
      />
      <div className="wrap">
        <div className="enter flex max-w-[36rem] flex-col" style={{ "--i": 2 } as React.CSSProperties}>
          <div>
            <form noValidate onSubmit={onSubmit} className="flex flex-col gap-6">
              <div>
                <label htmlFor="orderNumber" className="text-lg font-bold">
                  Order number
                </label>
                <input
                  id="orderNumber"
                  name="orderNumber"
                  className="field mt-2"
                  placeholder="e.g. RC-10423"
                  autoComplete="off"
                  autoCapitalize="characters"
                  aria-invalid={Boolean(errors.order)}
                  aria-describedby={errors.order ? "order-error" : undefined}
                />
                {errors.order ? (
                  <p id="order-error" className="mt-2 font-bold text-danger">
                    {errors.order}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor="email" className="text-lg font-bold">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  className="field mt-2"
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email ? (
                  <p id="email-error" className="mt-2 font-bold text-danger">
                    {errors.email}
                  </p>
                ) : null}
              </div>
              <button type="submit" disabled={state.kind === "loading"} className="btn btn-primary btn-lg w-full sm:w-fit">
                {state.kind === "loading" ? "Looking it up…" : "Track my order"}
              </button>
            </form>

            <div aria-live="polite">
              {state.kind === "error" ? (
                <p role="alert" className="mt-5 rounded-2xl bg-fawn-soft p-4 font-bold text-danger">
                  {state.message}
                </p>
              ) : null}
              {state.kind === "not_found" ? <NotFound orderNumber={state.orderNumber} /> : null}
              {found ? <Result result={found} /> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function NotFound({ orderNumber }: { orderNumber: string }) {
  return (
    <div role="alert" className="mt-5 flex flex-col items-start gap-3 rounded-2xl bg-fawn-soft p-5" style={{ animation: "soft-drop 320ms var(--ease-out-quart)" }}>
      <span className="grid size-11 place-items-center rounded-full bg-cocoa text-white">
        <MailIcon size={22} />
      </span>
      <p className="font-display text-[1.5rem] leading-tight">Hmm, that isn&rsquo;t an order we recognise</p>
      <p>
        We couldn&rsquo;t find an order matching <strong className="break-all">{orderNumber}</strong>. Get in touch and
        we&rsquo;ll look it up for you.
      </p>
      <Link href="/contact" className="btn btn-primary">
        Contact us
      </Link>
    </div>
  );
}

function Result({ result }: { result: TrackingResult }) {
  const current = STEPS.findIndex((s) => s.key === result.status);
  return (
    <div className="mt-6 border-t border-line pt-6" style={{ animation: "soft-drop 320ms var(--ease-out-quart)" }}>
      <p className="text-ink-soft">Order {result.orderNumber}</p>
      <p className="mt-1 font-display text-[1.75rem] leading-tight">{STEPS[current]?.label}</p>
      {result.estimatedDelivery ? <p className="mt-1">Estimated delivery: {result.estimatedDelivery}</p> : null}
      <ol className="mt-5 flex flex-col">
        {STEPS.map((step, i) => (
          <li key={step.key} className="relative flex gap-3.5 pb-5 last:pb-0">
            {i < STEPS.length - 1 ? (
              <span aria-hidden="true" className={`absolute top-8 left-4 h-[calc(100%-2rem)] w-0.5 -translate-x-1/2 ${i < current ? "bg-cocoa" : "bg-line"}`} />
            ) : null}
            <span
              className={`relative grid size-8 shrink-0 place-items-center rounded-full ${
                i <= current ? "bg-cocoa text-white" : "bg-white shadow-[inset_0_0_0_2px_var(--color-line-strong)]"
              }`}
            >
              {i <= current ? <CheckIcon size={18} strokeWidth={2.5} /> : null}
            </span>
            <span>
              <span className={`block ${i <= current ? "font-bold" : "text-ink-soft"}`}>{step.label}</span>
              <span className="block text-base text-ink-soft">{step.detail}</span>
            </span>
          </li>
        ))}
      </ol>
      {result.trackingUrl ? (
        <a href={result.trackingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary mt-6">
          See {result.carrier ?? "carrier"} tracking
        </a>
      ) : null}
    </div>
  );
}

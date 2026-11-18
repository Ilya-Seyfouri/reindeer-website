"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckIcon, MailIcon } from "@/components/ui/icons";

export type TrackingResult = {
  orderNumber: string;
  status: "processing" | "shipped" | "out_for_delivery" | "delivered";
  carrier?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  estimatedDelivery?: string;
};

const STEPS: { key: TrackingResult["status"]; label: string }[] = [
  { key: "processing", label: "Order received" },
  { key: "shipped", label: "Shipped" },
  { key: "out_for_delivery", label: "Out for delivery" },
  { key: "delivered", label: "Delivered" },
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

  return (
    <div className="enter flex flex-col gap-10" style={{ "--i": 1 } as React.CSSProperties}>
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
          <p role="alert" className="rounded-2xl bg-fawn-soft p-5 font-bold text-danger">
            {state.message}
          </p>
        ) : null}
        {state.kind === "not_found" ? <NotFound orderNumber={state.orderNumber} /> : null}
        {state.kind === "found" ? <Result result={state.result} /> : null}
      </div>
    </div>
  );
}

function NotFound({ orderNumber }: { orderNumber: string }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-4 rounded-3xl bg-fawn-soft p-6 sm:p-8"
      style={{ animation: "soft-drop 320ms var(--ease-out-quart)" }}
    >
      <span className="grid size-12 place-items-center rounded-full bg-cocoa text-white">
        <MailIcon size={24} />
      </span>
      <h2 className="font-display text-[1.75rem] leading-tight">Hmm, that isn&rsquo;t an order we recognise</h2>
      <p>
        We couldn&rsquo;t find an order matching <strong className="break-all">{orderNumber}</strong>. Get in touch
        and we&rsquo;ll look it up for you.
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
    <div className="rounded-3xl p-6 shadow-[inset_0_0_0_1.5px_var(--color-line)] sm:p-8">
      <p className="text-ink-soft">Order {result.orderNumber}</p>
      <p className="mt-1 font-display text-[1.75rem]">{STEPS[current]?.label}</p>
      {result.estimatedDelivery ? <p className="mt-1">Estimated delivery: {result.estimatedDelivery}</p> : null}
      <ol className="mt-6 flex flex-col gap-4">
        {STEPS.map((step, i) => (
          <li key={step.key} className="flex items-center gap-3">
            <span
              className={`grid size-8 place-items-center rounded-full ${
                i <= current ? "bg-cocoa text-white" : "shadow-[inset_0_0_0_2px_var(--color-line-strong)]"
              }`}
            >
              {i <= current ? <CheckIcon size={18} strokeWidth={2.5} /> : null}
            </span>
            <span className={i <= current ? "font-bold" : "text-ink-soft"}>{step.label}</span>
          </li>
        ))}
      </ol>
      {result.trackingUrl ? (
        <a href={result.trackingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary mt-7">
          See {result.carrier ?? "carrier"} tracking
        </a>
      ) : null}
    </div>
  );
}

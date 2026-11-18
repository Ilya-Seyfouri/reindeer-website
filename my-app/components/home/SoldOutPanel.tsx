"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, MailIcon } from "@/components/ui/icons";
import { drop, site } from "@/config/product";

const STORAGE_KEY = "rudy-next-drop";

/** When the next drop goes live: the configured date, or 24h from the visitor's first look. */
function resolveNextDrop() {
  if (drop.nextDropAt) return new Date(drop.nextDropAt).getTime();
  const span = drop.fallbackHours * 60 * 60 * 1000;
  const now = Date.now();
  let target = 0;
  try {
    target = Number(window.localStorage.getItem(STORAGE_KEY)) || 0;
  } catch {
    // Storage blocked: fall through to a fresh countdown.
  }
  if (target <= now) {
    target = now + span;
    try {
      window.localStorage.setItem(STORAGE_KEY, String(target));
    } catch {
      // Countdown still works for this visit.
    }
  }
  return target;
}

function useCountdown(active: boolean) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (!active) return;
    const target = resolveNextDrop();
    const tick = () => setRemaining(Math.max(0, target - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [active]);

  if (remaining === null) return null;
  const total = Math.floor(remaining / 1000);
  return { hours: Math.floor(total / 3600), minutes: Math.floor((total % 3600) / 60), seconds: total % 60 };
}

const pad = (n: number) => String(n).padStart(2, "0");

type FormState = { kind: "idle" } | { kind: "sending" } | { kind: "joined"; email: string } | { kind: "error"; message: string };

/**
 * Drops down from "Add to cart" while the costume is sold out: a countdown to
 * the next drop and a one-field waiting-list sign-up.
 */
export function SoldOutPanel({ open }: { open: boolean }) {
  const time = useCountdown(open);
  const [state, setState] = useState<FormState>({ kind: "idle" });
  const [error, setError] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter your email address.");
      inputRef.current?.focus();
      return;
    }
    setError(undefined);
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "sold-out" }),
      });
      const body: { error?: string } = await res.json().catch(() => ({}));
      if (res.ok) setState({ kind: "joined", email });
      else setState({ kind: "error", message: body.error ?? "We couldn't add you to the list." });
    } catch {
      setState({ kind: "error", message: "We couldn't connect. Check your internet connection and try again." });
    }
  }

  const units = time
    ? [
        { value: time.hours, label: "Hours" },
        { value: time.minutes, label: "Minutes" },
        { value: time.seconds, label: "Seconds" },
      ]
    : null;

  return (
    <div
      id="sold-out-panel"
      inert={!open}
      className={`grid transition-[grid-template-rows] duration-500 ease-(--ease-out-expo) ${
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className="min-h-0 overflow-hidden">
        <div
          className={`pt-4 transition-[opacity,transform] duration-400 ease-(--ease-out-quart) ${
            open ? "translate-y-0 opacity-100 delay-100" : "-translate-y-3 opacity-0"
          }`}
        >
          <section
            aria-labelledby="sold-out-title"
            className="relative rounded-2xl border-2 border-cocoa bg-fawn-soft px-5 pt-6 pb-5 sm:px-7 sm:pt-7 sm:pb-6"
          >
            {/* Little notch pointing back up at the button */}
            <span
              aria-hidden="true"
              className="absolute -top-[9px] left-1/2 size-4 -translate-x-1/2 rotate-45 border-t-2 border-l-2 border-cocoa bg-fawn-soft"
            />

            <div className="text-center">
              <span className="inline-block rounded-full bg-cocoa px-3 py-0.5 text-[0.8125rem] leading-6 font-bold tracking-wide text-white uppercase">
                Sold out
              </span>
              <h3 id="sold-out-title" className="mt-3 font-display text-[1.75rem] leading-tight sm:text-[2rem]">
                This drop has sold out
              </h3>
              <p className="mt-1.5 text-ink-soft">The next drop goes live in</p>
            </div>

            <div
              role="timer"
              aria-live="off"
              aria-label={
                time ? `Next drop in ${time.hours} hours and ${time.minutes} minutes` : "Next drop countdown"
              }
              className="mt-4 flex items-start justify-center gap-2 sm:gap-3"
            >
              {(units ?? [{ label: "Hours" }, { label: "Minutes" }, { label: "Seconds" }]).map((unit, i) => (
                <div key={unit.label} className="flex items-start gap-2 sm:gap-3">
                  {i > 0 ? (
                    <span aria-hidden="true" className="pt-2.5 font-display text-[1.75rem] leading-none text-caramel-deep">
                      :
                    </span>
                  ) : null}
                  <div className="flex w-[4.5rem] flex-col items-center sm:w-20">
                    <span className="grid h-16 w-full place-items-center rounded-xl bg-white font-display text-[2.25rem] leading-none tabular-nums shadow-[inset_0_0_0_1.5px_var(--color-line)] sm:h-[4.5rem] sm:text-[2.5rem]">
                      {"value" in unit && unit.value !== undefined ? pad(unit.value) : "--"}
                    </span>
                    <span className="mt-1.5 text-[0.875rem] font-bold text-ink-soft">{unit.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-line-strong/50 pt-5">
              {state.kind === "joined" ? (
                <div role="status" className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-cocoa text-white">
                    <CheckIcon size={20} strokeWidth={2.5} />
                  </span>
                  <p>
                    <strong>You&rsquo;re on the list.</strong> We&rsquo;ll email <strong>{state.email}</strong> the moment
                    the next drop goes live.
                  </p>
                </div>
              ) : (
                <form noValidate onSubmit={onSubmit}>
                  <label htmlFor="sold-out-email" className="block text-center text-lg font-bold">
                    Join the waiting list to get first dibs
                  </label>
                  <div className="mt-3 flex flex-col gap-2.5 sm:flex-row">
                    <div className="relative flex-1">
                      <MailIcon
                        aria-hidden="true"
                        size={20}
                        className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink-soft"
                      />
                      <input
                        ref={inputRef}
                        id="sold-out-email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="Your email address"
                        className="field pl-12"
                        aria-invalid={Boolean(error)}
                        aria-describedby={error ? "sold-out-email-error" : "sold-out-note"}
                      />
                    </div>
                    <button type="submit" disabled={state.kind === "sending"} className="btn btn-primary shrink-0 px-6">
                      {state.kind === "sending" ? "Joining…" : "Join the list"}
                    </button>
                  </div>
                  {error ? (
                    <p id="sold-out-email-error" className="mt-2 font-bold text-danger">
                      {error}
                    </p>
                  ) : null}
                  <div aria-live="polite">
                    {state.kind === "error" ? (
                      <p role="alert" className="mt-3 font-bold text-danger">
                        {state.message} Email us at{" "}
                        <a href={`mailto:${site.contact.email}`} className="underline">
                          {site.contact.email}
                        </a>{" "}
                        and we&rsquo;ll add you.
                      </p>
                    ) : null}
                  </div>
                  <p id="sold-out-note" className="mt-2.5 text-center text-base text-ink-soft">
                    One email when it&rsquo;s live. No spam.
                  </p>
                </form>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

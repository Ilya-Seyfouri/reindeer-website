"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/ui/icons";
import { TextField } from "@/components/ui/TextField";

const REASONS = [
  { value: "changed-mind", label: "I changed my mind", hint: "No problem, it happens" },
  { value: "damaged", label: "It arrived damaged", hint: "We'll put it right" },
  { value: "faulty", label: "It's faulty", hint: "Something broke or doesn't work" },
  { value: "wrong-item", label: "I got the wrong item", hint: "Not what you ordered" },
] as const;

type Reason = (typeof REASONS)[number]["value"];
type State = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; reference: string; reason: Reason };

export function ReturnForm() {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [reason, setReason] = useState<Reason>("changed-mind");
  const [error, setError] = useState<string>();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setError(undefined);
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/returns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber: form.get("orderNumber"),
          email: form.get("email"),
          reason,
          sealCode: form.get("sealCode"),
          details: form.get("details"),
          confirmUnopened: form.get("confirmUnopened") === "on",
          company: form.get("company"),
        }),
      });
      const data: { reference?: string; error?: string } = await res.json().catch(() => ({}));
      if (res.ok && data.reference) {
        setState({ kind: "sent", reference: data.reference, reason });
        return;
      }
      setError(data.error ?? "We couldn't send your request. Please try again.");
    } catch {
      setError("We couldn't connect. Check your internet connection and try again.");
    }
    setState({ kind: "idle" });
  }

  if (state.kind === "sent") {
    const unopened = state.reason === "changed-mind";
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 self-start rounded-3xl bg-fawn-soft p-6 sm:p-8"
        style={{ animation: "soft-drop 320ms var(--ease-out-quart)" }}
      >
        <span className="grid size-12 place-items-center rounded-full bg-cocoa text-white">
          <CheckIcon size={26} strokeWidth={2.5} />
        </span>
        <h2 className="font-display text-[1.875rem] leading-tight">Request received</h2>
        <p>Your return reference is</p>
        <p className="rounded-xl bg-white px-4 py-2 font-mono text-2xl font-bold tracking-wider">{state.reference}</p>
        <ol className="flex list-decimal flex-col gap-2 pl-5">
          <li>We&rsquo;ll review your request and email you within 2 business days.</li>
          {unopened ? (
            <>
              <li>Once approved, write the reference clearly on the outside of the parcel.</li>
              <li>Send it within 7 days of approval, by tracked post, with the seal unbroken.</li>
            </>
          ) : (
            <li>Reply to that email with photos of the item and its packaging.</li>
          )}
        </ol>
        <p className="text-ink-soft">Keep this reference. You&rsquo;ll need it for every message about this return.</p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="enter flex flex-col gap-6" style={{ "--i": 1 } as React.CSSProperties}>
      <TextField name="orderNumber" label="Order number" placeholder="e.g. RC-10423" autoComplete="off" />
      <TextField name="email" label="Email used for the order" type="email" autoComplete="email" />

      <fieldset>
        <legend className="text-lg font-bold">Why are you returning it?</legend>
        <div className="mt-3 flex flex-col gap-2.5">
          {REASONS.map((r) => (
            <label
              key={r.value}
              className={`flex cursor-pointer items-center gap-3.5 rounded-2xl border-2 p-4 transition-colors ${
                reason === r.value ? "border-cocoa bg-fawn-soft" : "border-line bg-white"
              }`}
            >
              <input
                type="radio"
                name="reason"
                value={r.value}
                checked={reason === r.value}
                onChange={() => setReason(r.value)}
                className="size-5 shrink-0 accent-(--color-cocoa)"
              />
              <span>
                <span className="block font-bold">{r.label}</span>
                <span className="block text-base text-ink-soft">{r.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {reason === "changed-mind" ? (
        <>
          <TextField name="sealCode" label="Seal code" placeholder="e.g. 7KQ2-M9XD" autoComplete="off" />
          <p className="-mt-4 text-base text-ink-soft">
            The 8-character code printed on the seal across the packaging.
          </p>
          <label className="flex cursor-pointer items-start gap-3">
            <input type="checkbox" name="confirmUnopened" className="mt-1 size-5 shrink-0 accent-(--color-cocoa)" />
            <span>The costume is unopened, the seal is unbroken and it&rsquo;s in its original packaging.</span>
          </label>
        </>
      ) : (
        <div>
          <label htmlFor="details" className="text-lg font-bold">
            What&rsquo;s wrong?
          </label>
          <textarea id="details" name="details" rows={4} maxLength={2000} className="field mt-2 resize-y" />
        </div>
      )}

      {/* Left empty by people; bots fill it in and their request is dropped. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] size-px opacity-0"
      />

      <div aria-live="polite">
        {error ? (
          <p role="alert" className="rounded-2xl bg-fawn-soft p-5 font-bold text-danger">
            {error}
          </p>
        ) : null}
      </div>

      <button type="submit" disabled={state.kind === "sending"} className="btn btn-primary btn-lg w-full sm:w-fit">
        {state.kind === "sending" ? "Sending…" : "Request a return"}
      </button>
    </form>
  );
}

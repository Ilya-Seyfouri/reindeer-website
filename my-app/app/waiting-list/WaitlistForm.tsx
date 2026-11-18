"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckIcon } from "@/components/ui/icons";
import { TextField } from "@/components/ui/TextField";
import { site } from "@/config/product";
import { track } from "@/lib/analytics";

type State = { kind: "idle" } | { kind: "sending" } | { kind: "joined"; email: string } | { kind: "error"; message: string };

export function WaitlistForm() {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [emailError, setEmailError] = useState<string>();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    const data = {
      email: String(form.get("email") ?? "").trim(),
      source: "waiting-list",
      company: form.get("company"),
    };

    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      setEmailError("Please enter your email address so we can let you know.");
      formEl.querySelector<HTMLElement>('[name="email"]')?.focus();
      return;
    }
    setEmailError(undefined);

    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body: { error?: string } = await res.json().catch(() => ({}));
      if (res.ok) {
        setState({ kind: "joined", email: data.email });
        track("waitlist_joined", { source: "waiting-list" });
      }
      else setState({ kind: "error", message: body.error ?? "We couldn't add you to the list." });
    } catch {
      setState({ kind: "error", message: "We couldn't connect. Check your internet connection and try again." });
    }
  }

  if (state.kind === "joined") {
    return (
      <div role="status" className="enter flex flex-col items-start gap-4 self-start rounded-3xl bg-fawn-soft p-6 sm:p-8">
        <span className="grid size-12 place-items-center rounded-full bg-cocoa text-white">
          <CheckIcon size={26} strokeWidth={2.5} />
        </span>
        <h2 className="font-display text-[1.875rem]">You&rsquo;re on the list</h2>
        <p>
          We&rsquo;ll email <strong>{state.email}</strong> the moment the next drop goes live.
        </p>
        <Link href="/" className="btn btn-primary">
          Back to the shop
        </Link>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="enter flex flex-col gap-6" style={{ "--i": 1 } as React.CSSProperties}>
      <TextField name="email" label="Email address" type="email" autoComplete="email" error={emailError} />
      {/* Left empty by people; bots fill it in and their sign-up is dropped. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] size-px opacity-0"
      />
      <div aria-live="polite">
        {state.kind === "error" ? (
          <p role="alert" className="rounded-2xl bg-fawn-soft p-5 font-bold text-danger">
            {state.message} You can also email us at{" "}
            <a href={`mailto:${site.contact.email}`} className="underline">
              {site.contact.email}
            </a>{" "}
            and we&rsquo;ll add you.
          </p>
        ) : null}
      </div>
      <button type="submit" disabled={state.kind === "sending"} className="btn btn-primary btn-lg w-full sm:w-fit">
        {state.kind === "sending" ? "Joining…" : "Join the waiting list"}
      </button>
    </form>
  );
}

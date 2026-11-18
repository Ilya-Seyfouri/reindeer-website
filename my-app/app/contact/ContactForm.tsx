"use client";

import posthog from "posthog-js";
import { useState } from "react";
import { CheckIcon } from "@/components/ui/icons";
import { TextField } from "@/components/ui/TextField";
import { site } from "@/config/product";

type State = { kind: "idle" } | { kind: "sending" } | { kind: "sent" };

export function ContactForm() {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [emailError, setEmailError] = useState<string>();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    const data = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      orderNumber: String(form.get("orderNumber") ?? "").trim(),
      message: String(form.get("message") ?? "").trim(),
    };

    // Only check there's an email to reply to.
    if (!data.email.includes("@")) {
      setEmailError("Please enter your email address so we can reply.");
      formEl.querySelector<HTMLElement>('[name="email"]')?.focus();
      return;
    }
    setEmailError(undefined);

    setState({ kind: "sending" });
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // The shopper still sees the confirmation; see app/api/contact/route.ts.
    }
    posthog.capture("contact_message_submitted", { has_order_number: Boolean(data.orderNumber) });
    setState({ kind: "sent" });
    formEl.reset();
  }

  if (state.kind === "sent") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 self-start rounded-3xl bg-fawn-soft p-6 sm:p-8"
        style={{ animation: "soft-drop 320ms var(--ease-out-quart)" }}
      >
        <span className="grid size-12 place-items-center rounded-full bg-cocoa text-white">
          <CheckIcon size={26} strokeWidth={2.5} />
        </span>
        <h2 className="font-display text-[1.875rem]">We got your message</h2>
        <p>Thanks for getting in touch. We&rsquo;ll reply by email {site.contact.replyTime}.</p>
        <button type="button" onClick={() => setState({ kind: "idle" })} className="link">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="enter flex flex-col gap-6" style={{ "--i": 1 } as React.CSSProperties}>
      <TextField name="name" label="Your name" autoComplete="name" />
      <TextField name="email" label="Email address" type="email" autoComplete="email" error={emailError} />
      <TextField name="orderNumber" label="Order number" optional placeholder="e.g. RC-10423" />
      <div>
        <label htmlFor="message" className="text-lg font-bold">
          How can we help?
        </label>
        <textarea id="message" name="message" rows={6} className="field mt-2 resize-y" />
      </div>
      <button type="submit" disabled={state.kind === "sending"} className="btn btn-primary btn-lg w-full sm:w-fit">
        {state.kind === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

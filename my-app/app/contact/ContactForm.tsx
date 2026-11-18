"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/ui/icons";
import { site } from "@/config/product";

type Field = "name" | "email" | "message";
type State = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

export function ContactForm() {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});

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

    const next: typeof errors = {};
    if (!data.name) next.name = "Please tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(data.email)) next.email = "Please enter an email address so we can reply.";
    if (data.message.length < 5) next.message = "Please write a short message.";
    setErrors(next);
    if (Object.keys(next).length) {
      formEl.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body: { error?: string } = await res.json().catch(() => ({}));
      if (res.ok) {
        setState({ kind: "sent" });
        formEl.reset();
      } else {
        setState({ kind: "error", message: body.error ?? "Your message didn't send." });
      }
    } catch {
      setState({ kind: "error", message: "We couldn't connect. Check your internet connection and try again." });
    }
  }

  if (state.kind === "sent") {
    return (
      <div role="status" className="enter flex flex-col items-start gap-4 rounded-3xl bg-fawn-soft p-6 sm:p-8">
        <span className="grid size-12 place-items-center rounded-full bg-cocoa text-white">
          <CheckIcon size={26} strokeWidth={2.5} />
        </span>
        <h2 className="font-display text-[1.875rem]">Thanks, your message is on its way</h2>
        <p>We&rsquo;ll reply to you by email {site.contact.replyTime}.</p>
        <button type="button" onClick={() => setState({ kind: "idle" })} className="link">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="enter flex flex-col gap-6" style={{ "--i": 1 } as React.CSSProperties}>
      <TextField name="name" label="Your name" autoComplete="name" error={errors.name} />
      <TextField name="email" label="Email address" type="email" autoComplete="email" error={errors.email} />
      <TextField name="orderNumber" label="Order number" optional placeholder="e.g. RC-10423" />
      <div>
        <label htmlFor="message" className="text-lg font-bold">
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className="field mt-2 resize-y"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message ? (
          <p id="message-error" className="mt-2 font-bold text-danger">
            {errors.message}
          </p>
        ) : null}
      </div>
      <div aria-live="polite">
        {state.kind === "error" ? (
          <p role="alert" className="rounded-2xl bg-fawn-soft p-5 font-bold text-danger">
            {state.message} You can also email us at{" "}
            <a href={`mailto:${site.contact.email}`} className="underline">
              {site.contact.email}
            </a>
            .
          </p>
        ) : null}
      </div>
      <button type="submit" disabled={state.kind === "sending"} className="btn btn-primary btn-lg w-full sm:w-fit">
        {state.kind === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function TextField({
  name,
  label,
  type = "text",
  autoComplete,
  placeholder,
  optional,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  optional?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-lg font-bold">
        {label}
        {optional ? <span className="font-normal text-ink-soft"> (optional)</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        inputMode={type === "email" ? "email" : undefined}
        className="field mt-2"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error ? (
        <p id={`${name}-error`} className="mt-2 font-bold text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

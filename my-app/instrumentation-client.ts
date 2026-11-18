import posthog from "posthog-js";

/**
 * PostHog analytics, started once in the browser before the app loads.
 *
 * Cookieless: `persistence: "memory"` keeps nothing on the visitor's device
 * (no cookies, no local storage), so no cookie banner is needed. A visitor who
 * comes back another day counts as a new visitor.
 *
 * Events go through /ingest on our own domain (see next.config.ts) so ad
 * blockers don't hide them. Typed fields are masked in session recordings.
 */
const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com";

if (key) {
  posthog.init(key, {
    api_host: "/ingest",
    ui_host: host.replace(".i.posthog.com", ".posthog.com"),
    defaults: "2026-08-30",
    persistence: "memory",
    person_profiles: "identified_only",
    session_recording: { maskAllInputs: true },
  });
}

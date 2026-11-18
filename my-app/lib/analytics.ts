import posthog from "posthog-js";

/**
 * The shopping moments we track in PostHog, on top of page views, clicks and
 * recordings. Build funnels from these in PostHog (Product analytics → New insight → Funnel).
 * Never put an email address or other personal details in the properties.
 */
type Events = {
  /** Picked an offer in the purchase options */
  bundle_selected: { quantity: number; free: number };
  /** Pressed Add to cart (or Buy in the sticky bar) */
  add_to_cart_clicked: { quantity: number; sold_out: boolean };
  /** Saw the sold-out dropdown */
  sold_out_viewed: { restocking: boolean };
  /** Joined the waiting list */
  waitlist_joined: { source: "sold-out" | "waiting-list" };
  /** Pressed the pay button on the checkout page */
  checkout_started: { quantity: number };
};

export function track<E extends keyof Events>(event: E, properties: Events[E]) {
  // Not started when NEXT_PUBLIC_POSTHOG_KEY isn't set (e.g. a fresh local copy).
  if (posthog.__loaded) posthog.capture(event, properties);
}

/**
 * A homepage section came into view, sent as its own event (e.g.
 * "section_fits_every_dog") so each one is a single pick in a funnel. Comes
 * from the data-section attribute on each <section>; keep those names stable
 * even if sections move, so past data still lines up.
 */
export function trackSection(name: string, position: number) {
  if (posthog.__loaded) posthog.capture(`section_${name}`, { position });
}

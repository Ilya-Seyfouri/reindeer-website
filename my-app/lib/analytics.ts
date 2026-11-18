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

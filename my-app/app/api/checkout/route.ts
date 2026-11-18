import { NextResponse } from "next/server";
import { product, type SizeId } from "@/config/product";
import { cartTotals, type CartLine } from "@/lib/pricing";

/**
 * POST /api/checkout
 * Body: { lines: [{ size: "M", quantity: 2 }, ...] }
 * Returns: { url: string } — the page to send the shopper to.
 *
 * TODO: connect Stripe.
 *   1. npm install stripe
 *   2. Add STRIPE_SECRET_KEY to .env.local (and your host's env settings)
 *   3. Replace the "not connected" response below with something like:
 *
 *   import Stripe from "stripe";
 *   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
 *   const session = await stripe.checkout.sessions.create({
 *     mode: "payment",
 *     line_items: lines.map((l) => ({
 *       quantity: l.quantity,
 *       price_data: {
 *         currency: "usd",
 *         unit_amount: product.price,
 *         product_data: { name: `${product.name} (Size ${l.size})` },
 *       },
 *     })),
 *     discounts: totals.discount > 0 ? [{ coupon: "BUNDLE_" + totals.percentOff }] : undefined, // create these coupons in Stripe
 *     shipping_address_collection: { allowed_countries: ["US"] },
 *     shipping_options: [{ shipping_rate_data: {
 *       type: "fixed_amount", display_name: "Standard shipping",
 *       fixed_amount: { amount: totals.shipping, currency: "usd" },
 *     } }],
 *     automatic_tax: { enabled: true },
 *     success_url: `${origin}/track?order={CHECKOUT_SESSION_ID}`,
 *     cancel_url: `${origin}/checkout`,
 *   });
 *   return NextResponse.json({ url: session.url });
 *
 * Prices are always recalculated here from config/product.ts, never trusted
 * from the browser.
 */

const SIZE_IDS = new Set<string>(product.sizes.map((s) => s.id));

function parseLines(body: unknown): CartLine[] | null {
  if (typeof body !== "object" || body === null || !("lines" in body) || !Array.isArray(body.lines)) return null;
  const lines: CartLine[] = [];
  for (const raw of body.lines as unknown[]) {
    if (typeof raw !== "object" || raw === null) return null;
    const { size, quantity } = raw as { size?: unknown; quantity?: unknown };
    if (typeof size !== "string" || !SIZE_IDS.has(size)) return null;
    if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 1 || quantity > product.maxQuantityPerSize)
      return null;
    lines.push({ size: size as SizeId, quantity });
  }
  return lines.length > 0 ? lines : null;
}

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const lines = parseLines(body);
  if (!lines) {
    return NextResponse.json({ error: "Your cart looks empty or out of date. Please refresh the page." }, { status: 400 });
  }

  const totals = cartTotals(lines);
  void totals; // used once Stripe is connected (see TODO above)

  return NextResponse.json(
    { error: "Online payment isn't switched on yet. The store owner needs to connect Stripe." },
    { status: 501 },
  );
}

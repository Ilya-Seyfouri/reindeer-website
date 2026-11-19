import { NextResponse } from "next/server";
import { product, treat } from "@/config/product";
import { cleanItems } from "@/lib/cart-items";
import { cartTotals } from "@/lib/pricing";

/**
 * POST /api/checkout
 * Body: { quantity: number, treats?: number, items?: { slug, color, size, name, quantity }[] }
 *   items are personalised products like the sweater. Add one Stripe line per
 *   item and put the colour, size and pet name in its product_data.description
 *   (and metadata) so they show on the order.
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
 *     line_items: [
 *       {
 *         quantity,
 *         price_data: { currency: "usd", unit_amount: product.price, product_data: { name: product.name } },
 *       },
 *       // The "Gift for a furry friend?" treat add-on, when the shopper took it:
 *       ...(treats > 0
 *         ? [{ quantity: treats, price_data: { currency: "usd", unit_amount: treat.price, product_data: { name: treat.name } } }]
 *         : []),
 *     ],
 *     // The 2-pack saving ($32.99 per pair instead of 2 x $19.99), as a one-off amount off.
 *     // Also add totals.freeTreats bags of treats to the order for packing (no charge):
 *     discounts: totals.discount > 0
 *       ? [{ coupon: (await stripe.coupons.create({ amount_off: totals.discount, currency: "usd", duration: "once" })).id }]
 *       : undefined,
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
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { quantity?: unknown; treats?: unknown; items?: unknown } | null;
  const quantity = body?.quantity ?? 0;
  const treats = body?.treats ?? 0;
  // Re-checked against the catalogue: unknown products, colours or sizes are dropped
  const items = cleanItems(body?.items);
  if (
    typeof quantity !== "number" ||
    !Number.isInteger(quantity) ||
    quantity < 0 ||
    quantity + items.length === 0 ||
    quantity > product.maxQuantity ||
    typeof treats !== "number" ||
    !Number.isInteger(treats) ||
    treats < 0 ||
    treats > treat.maxQuantity
  ) {
    return NextResponse.json({ error: "Your cart looks empty or out of date. Please refresh the page." }, { status: 400 });
  }

  const totals = cartTotals(quantity, treats, items);
  void totals; // used once Stripe is connected (see TODO above)

  return NextResponse.json(
    { error: "Online payment isn't switched on yet. The store owner needs to connect Stripe." },
    { status: 501 },
  );
}

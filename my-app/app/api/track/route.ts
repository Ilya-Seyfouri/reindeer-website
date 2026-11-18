import { NextResponse } from "next/server";

/**
 * POST /api/track
 * Body: { orderNumber: string, email: string }
 * Returns: { result: TrackingResult } (see app/track/TrackForm.tsx) or { error: string }
 *
 * TODO: connect your order data. Look the order up (Stripe, your database or
 * your shipping/fulfilment app), check the email matches, then return e.g.:
 *
 *   return NextResponse.json({
 *     result: {
 *       orderNumber: "RC-10423",
 *       status: "shipped",            // processing | shipped | out_for_delivery | delivered
 *       carrier: "USPS",
 *       trackingNumber: "9400...",
 *       trackingUrl: "https://tools.usps.com/go/TrackConfirmAction?tLabels=9400...",
 *       estimatedDelivery: "Tuesday, December 2",
 *     },
 *   });
 *
 * Return a 404 with a friendly { error } when nothing matches.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { orderNumber?: unknown; email?: unknown } | null;
  if (!body || typeof body.orderNumber !== "string" || typeof body.email !== "string") {
    return NextResponse.json({ error: "Please enter your order number and email." }, { status: 400 });
  }

  return NextResponse.json(
    {
      error:
        "Order tracking isn't connected yet. Please check the tracking link in your shipping email, or contact us and we'll help.",
    },
    { status: 501 },
  );
}

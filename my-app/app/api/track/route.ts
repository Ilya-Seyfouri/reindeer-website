import { after, NextResponse } from "next/server";
import { posthogLog, loggerProvider, SeverityNumber } from "@/instrumentation";

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
  if (!body || typeof body.orderNumber !== "string" || !body.orderNumber.trim()) {
    return NextResponse.json({ error: "Please enter your order number." }, { status: 400 });
  }

  // Until order lookup is connected, every search is treated as "not found",
  // and the page points the shopper to the contact form.
  posthogLog.emit({
    body: "Order tracking lookup unavailable",
    severityNumber: SeverityNumber.INFO,
    attributes: { endpoint: "/api/track", response_status: 404 },
  });
  after(() => loggerProvider.forceFlush().catch(() => undefined));
  return NextResponse.json({ error: "Order not found." }, { status: 404 });
}

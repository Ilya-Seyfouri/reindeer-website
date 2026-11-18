import { NextResponse } from "next/server";

/**
 * POST /api/waitlist
 * Body: { email, firstName?, dogName?, source? }  (source is "sold-out" from the product dropdown)
 *
 * TODO: save the sign-up. Common options:
 *   - Klaviyo, Mailchimp or Shopify Email: add the address to a "Waiting list" list
 *   - Your own database or a Google Sheet
 * Return 200 once it's saved. Until then this returns 501 and the form
 * tells the shopper to email you instead.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please check your email address and try again." }, { status: 400 });
  }

  return NextResponse.json({ error: "The waiting list isn't connected yet." }, { status: 501 });
}

import { NextResponse } from "next/server";

/**
 * POST /api/contact
 * Body: { name, email, orderNumber?, message }
 *
 * TODO: deliver the message. Common options:
 *   - Resend / Postmark / SendGrid: send it to site.contact.email
 *   - A helpdesk (Gorgias, Zendesk, Help Scout) via its API
 * Until then this returns 501 and the form tells the shopper to email you.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !/^\S+@\S+\.\S+$/.test(email) || message.length < 5 || message.length > 5000) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  return NextResponse.json({ error: "Our contact form isn't connected yet." }, { status: 501 });
}

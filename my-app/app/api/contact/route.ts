import { NextResponse } from "next/server";

/**
 * POST /api/contact
 * Body: { name, email, orderNumber?, message }
 *
 * TODO: deliver the message. Common options:
 *   - Resend / Postmark / SendGrid: send it to site.contact.email
 *   - A helpdesk (Gorgias, Zendesk, Help Scout) via its API
 *
 * Until then messages are only written to the server log, but the shopper
 * always sees "We got your message", so connect this before launch.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!email.includes("@")) {
    return NextResponse.json({ error: "Please enter your email address." }, { status: 400 });
  }

  console.info("[contact] new message", {
    name: body?.name,
    email,
    orderNumber: body?.orderNumber,
    message: typeof body?.message === "string" ? body.message.slice(0, 5000) : "",
  });

  return NextResponse.json({ ok: true });
}

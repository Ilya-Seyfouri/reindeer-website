import { NextResponse } from "next/server";
import { supabase, supabaseConfigured } from "@/lib/supabase";

const REASONS = ["changed-mind", "damaged", "faulty", "wrong-item"] as const;
type Reason = (typeof REASONS)[number];

/** Unguessable return reference, e.g. RR-7KQ2M9XD. No 0/O or 1/I so it's easy to copy onto a parcel. */
function makeReference() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return `RR-${Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("")}`;
}

const fail = (error: string, status = 400) => NextResponse.json({ error }, { status });

/**
 * POST /api/returns
 * Body: { orderNumber, email, reason, sealCode?, details?, confirmUnopened?, company? }
 *
 * Checks, in order:
 *   - a bot trap field (company) that people never fill in
 *   - order number and email in the right format
 *   - change of mind: the seal code from the unopened packaging, plus a ticked confirmation
 *   - damaged, faulty or wrong item: a written description
 *   - one request per order (unique order_number in the database)
 *
 * Requests are saved as "pending_review" in Supabase (refund_requests, see
 * supabase/schema.sql). Nothing is approved or refunded automatically.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const text = (key: string) => (typeof body?.[key] === "string" ? (body[key] as string).trim() : "");

  // Looks like a success to the bot, so it moves on; nothing is saved.
  if (text("company")) return NextResponse.json({ reference: makeReference() });

  const orderNumber = text("orderNumber").toUpperCase();
  const email = text("email").toLowerCase();
  const reason = REASONS.find((r) => r === body?.reason) as Reason | undefined;
  const sealCode = text("sealCode").toUpperCase();
  const details = text("details").slice(0, 2000);

  if (!/^RC-\d{5}$/.test(orderNumber)) return fail("Enter your order number exactly as it appears on your confirmation email, e.g. RC-10423.");
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 254) return fail("Enter the email address you used to order.");
  if (!reason) return fail("Choose a reason for the return.");

  if (reason === "changed-mind") {
    if (!/^[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(sealCode)) {
      return fail("Enter the 8-character code printed on the seal of the packaging, e.g. 7KQ2-M9XD.");
    }
    if (body?.confirmUnopened !== true) return fail("Please confirm the costume is unopened and in its original packaging.");
  } else if (details.length < 20) {
    return fail("Tell us what's wrong in a sentence or two so we can sort it quickly.");
  }

  if (!supabaseConfigured) return fail("Returns can't be requested online right now.", 501);

  const reference = makeReference();
  const res = await supabase("refund_requests", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      reference,
      order_number: orderNumber,
      email,
      reason,
      seal_code: reason === "changed-mind" ? sealCode : null,
      details: details || null,
    }),
  }).catch(() => null);

  if (res?.status === 409) {
    return fail("A return has already been requested for this order. Check your email for the reference we sent.", 409);
  }
  if (!res?.ok) {
    console.error("[returns] could not save request", res?.status, await res?.text().catch(() => ""));
    return fail("We couldn't send your request just now. Please try again in a few minutes.", 502);
  }

  console.info("[returns] new request", { reference, orderNumber, reason });
  return NextResponse.json({ reference });
}

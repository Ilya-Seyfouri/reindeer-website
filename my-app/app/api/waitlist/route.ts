import { NextResponse } from "next/server";
import { supabase, supabaseConfigured } from "@/lib/supabase";

const SOURCES = ["sold-out", "waiting-list"] as const;

/**
 * POST /api/waitlist
 * Body: { email, source, company? }
 *   source   "sold-out" (the dropdown under Add to cart) or "waiting-list" (the page)
 *   company  hidden from people; bots fill it in, so those sign-ups are dropped
 *
 * Saves the email to the `waitlist` table in Supabase (see supabase/schema.sql).
 * Signing up twice keeps the first row, so each email is counted once.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const source = SOURCES.find((s) => s === body?.source) ?? "waiting-list";

  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please check your email address and try again." }, { status: 400 });
  }

  // Looks like a person to the bot, so it moves on; nothing is saved.
  if (typeof body?.company === "string" && body.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  if (!supabaseConfigured) {
    return NextResponse.json({ error: "The waiting list isn't connected yet." }, { status: 501 });
  }

  const res = await supabase("waitlist?on_conflict=email", {
    method: "POST",
    headers: { Prefer: "resolution=ignore-duplicates,return=minimal" },
    body: JSON.stringify({ email, source }),
  }).catch(() => null);

  if (!res?.ok) {
    console.error("[waitlist] could not save sign-up", res?.status, await res?.text().catch(() => ""));
    return NextResponse.json({ error: "We couldn't add you to the list just now." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

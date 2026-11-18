/**
 * Talks to the Supabase database over its REST API.
 *
 * Server only: it uses SUPABASE_SECRET_KEY, which can read and write every
 * table. Only import this from route handlers and server code, never from a
 * "use client" file. Set the two variables in .env.local and on Railway:
 *   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
 *   SUPABASE_SECRET_KEY=sb_secret_...
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const key = process.env.SUPABASE_SECRET_KEY;

export const supabaseConfigured = Boolean(url && key);

/** Calls `/rest/v1/{path}`, e.g. supabase("waitlist", { method: "POST", ... }). */
export async function supabase(path: string, init: RequestInit = {}) {
  if (!url || !key) throw new Error("Supabase is not configured: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY.");
  return fetch(`${url}/rest/v1/${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      apikey: key,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
}

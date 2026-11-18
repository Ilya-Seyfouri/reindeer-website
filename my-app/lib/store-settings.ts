import { cacheLife } from "next/cache";
import { drop } from "@/config/product";
import { supabase, supabaseConfigured } from "@/lib/supabase";

export type StoreSettings = {
  /** True shows the sold-out dropdown instead of adding to the cart. */
  soldOut: boolean;
  /** When the next drop goes live (ISO date). Everyone counts down to the same moment. */
  nextDropAt: string | null;
};

/**
 * The store's live settings, from the `store_settings` row in Supabase.
 * Edit that row in the Supabase dashboard and the site picks it up within
 * about a minute, no redeploy needed. Falls back to `drop` in config/product.ts
 * if the database isn't connected or can't be reached.
 */
export async function getStoreSettings(): Promise<StoreSettings> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 300 });

  const fallback = { soldOut: drop.soldOut, nextDropAt: drop.nextDropAt };
  if (!supabaseConfigured) return fallback;

  try {
    const res = await supabase("store_settings?id=eq.1&select=sold_out,next_drop_at");
    if (!res.ok) throw new Error(`status ${res.status}`);
    const [row] = (await res.json()) as { sold_out: boolean; next_drop_at: string | null }[];
    return row ? { soldOut: row.sold_out, nextDropAt: row.next_drop_at } : fallback;
  } catch (error) {
    console.error("[store-settings] could not load, using config/product.ts", error);
    return fallback;
  }
}

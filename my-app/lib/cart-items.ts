import { cleanPetName, getOtherProduct } from "@/config/products";

/** Shared by the cart (browser) and /api/checkout (server), so keep it free of browser-only code. */

function clamp(value: unknown, max: number) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(max, Math.round(n)));
}

/** A product with options, e.g. a green XL sweater with "Teddy" on it */
export type CartItem = { slug: string; color: string; size: string; name: string; quantity: number };

/** Same product, colour, size and name: one line with a bigger quantity */
export function itemKey(item: Pick<CartItem, "slug" | "color" | "size" | "name">) {
  return [item.slug, item.color, item.size, item.name.toLowerCase()].join("|");
}

/** Drops anything that no longer matches the catalogue (old saved carts, edited storage). */
export function cleanItems(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];
  const out: CartItem[] = [];
  for (const raw of value) {
    const p = getOtherProduct(String(raw?.slug));
    const o = p?.status === "available" ? p.options : undefined;
    if (!p || !o) continue;
    const color = String(raw?.color);
    const size = String(raw?.size);
    const name = o.personalise ? cleanPetName(String(raw?.name ?? ""), o.personalise.maxLength).trim() : "";
    const quantity = clamp(raw?.quantity, o.maxQuantity);
    if (!o.colors.some((c) => c.id === color) || !o.sizes.some((z) => z.id === size) || (o.personalise && !name) || quantity === 0) continue;
    const item = { slug: p.slug, color, size, name, quantity };
    const same = out.find((x) => itemKey(x) === itemKey(item));
    if (same) same.quantity = Math.min(o.maxQuantity, same.quantity + quantity);
    else out.push(item);
  }
  return out;
}

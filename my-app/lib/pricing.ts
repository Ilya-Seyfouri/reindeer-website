import { bundles, product, shipping, site, treat } from "@/config/product";
import { getOtherProduct } from "@/config/products";

const wholeDollars = new Intl.NumberFormat(site.locale, {
  style: "currency",
  currency: site.currency,
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
const withCents = new Intl.NumberFormat(site.locale, {
  style: "currency",
  currency: site.currency,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Price for display: whole dollars when there are no cents, e.g. 3500 → "$35", 999 → "$9.99". */
export function formatMoney(cents: number) {
  const rounded = Math.round(cents);
  return rounded % 100 === 0 ? wholeDollars.format(rounded / 100) : withCents.format(rounded / 100);
}

const pair = bundles.find((b) => b.quantity === 2)!;

/** Costume pairs in the cart: every pair gets the 2-pack price. */
export function pairsFor(quantity: number) {
  return Math.floor(quantity / 2);
}

/** Treats included free: one with every 2-pack. */
export function freeTreatsFor(quantity: number) {
  return pairsFor(quantity) * pair.freeTreats;
}

/** What the shopper pays for this many costumes: $32.99 per pair, $19.99 for an odd one out. */
export function priceFor(quantity: number) {
  return pairsFor(quantity) * pair.price + (quantity % 2) * product.price;
}

export function shippingFor(quantity: number) {
  if (quantity === 0) return 0;
  return quantity >= shipping.freeFromQuantity ? 0 : shipping.flatRate;
}

/** Price of one cart line for a product with options (e.g. the sweater). */
export function itemPrice(item: { slug: string; quantity: number }) {
  return (getOtherProduct(item.slug)?.price ?? 0) * item.quantity;
}

/**
 * Totals for a cart of costumes, treat add-ons and other items. Treats and
 * other items don't affect the costume deals. Shipping is free on everything.
 */
export function cartTotals(quantity: number, treats = 0, items: { slug: string; quantity: number }[] = []) {
  const subtotal = product.price * quantity;
  const discount = subtotal - priceFor(quantity);
  const freeTreats = freeTreatsFor(quantity);
  const shippingCost = shippingFor(quantity);
  const treatsTotal = treat.price * treats;
  const itemsTotal = items.reduce((sum, item) => sum + itemPrice(item), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return {
    quantity,
    treats,
    subtotal,
    freeTreats,
    discount,
    treatsTotal,
    shipping: shippingCost,
    itemsTotal,
    /** Everything in the cart that counts as a product (not treats), for the bag badge */
    count: quantity + itemCount,
    total: subtotal - discount + treatsTotal + itemsTotal + shippingCost,
  };
}

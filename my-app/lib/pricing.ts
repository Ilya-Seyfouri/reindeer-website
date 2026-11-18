import { bundles, product, shipping, site } from "@/config/product";

const formatter = new Intl.NumberFormat(site.locale, {
  style: "currency",
  currency: site.currency,
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** Whole-dollar price, e.g. 3500 → "$35". */
export function formatMoney(cents: number) {
  return formatter.format(Math.round(cents / 100));
}

const largestFirst = [...bundles].sort((a, b) => b.quantity - a.quantity);
const smallestFirst = [...bundles].sort((a, b) => a.quantity - b.quantity);

/** Free costumes earned by a cart of this size, using the biggest deals first. */
export function freeCostumesFor(quantity: number) {
  let free = 0;
  let left = quantity;
  for (const bundle of largestFirst) {
    if (bundle.free === 0) continue;
    free += Math.floor(left / bundle.quantity) * bundle.free;
    left %= bundle.quantity;
  }
  return free;
}

/** The next deal the shopper could reach, for "add 2 more and get 1 free" nudges. */
export function nextBundleFor(quantity: number) {
  const current = freeCostumesFor(quantity);
  return smallestFirst.find((b) => b.quantity > quantity && freeCostumesFor(b.quantity) > current);
}

/** Price of N costumes after free ones are taken off (no shipping). */
export function priceFor(quantity: number) {
  return (quantity - freeCostumesFor(quantity)) * product.price;
}

export function shippingFor(quantity: number) {
  if (quantity === 0) return 0;
  return quantity >= shipping.freeFromQuantity ? 0 : shipping.flatRate;
}

export function cartTotals(quantity: number) {
  const subtotal = product.price * quantity;
  const free = freeCostumesFor(quantity);
  const discount = free * product.price;
  const shippingCost = shippingFor(quantity);
  return {
    quantity,
    subtotal,
    free,
    discount,
    shipping: shippingCost,
    total: subtotal - discount + shippingCost,
  };
}

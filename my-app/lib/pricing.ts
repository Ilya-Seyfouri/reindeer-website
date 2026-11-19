import { bundles, product, shipping, site, treat } from "@/config/product";

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

/** Totals for a cart of costumes plus treat add-ons. Treats don't affect the deals or shipping. */
export function cartTotals(quantity: number, treats = 0) {
  const subtotal = product.price * quantity;
  const free = freeCostumesFor(quantity);
  const discount = free * product.price;
  const shippingCost = shippingFor(quantity);
  const treatsTotal = treat.price * treats;
  return {
    quantity,
    treats,
    subtotal,
    free,
    discount,
    treatsTotal,
    shipping: shippingCost,
    total: subtotal - discount + treatsTotal + shippingCost,
  };
}

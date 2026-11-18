import { bundles, product, shipping, site } from "@/config/product";

const formatter = new Intl.NumberFormat(site.locale, {
  style: "currency",
  currency: site.currency,
});

export function formatMoney(cents: number) {
  return formatter.format(cents / 100);
}

/** Percent off the whole order for a given number of costumes. */
export function discountPercentFor(quantity: number) {
  let best = 0;
  for (const bundle of bundles) {
    if (quantity >= bundle.quantity) best = Math.max(best, bundle.percentOff);
  }
  return best;
}

/** The next bundle tier the shopper could reach, for "add one more" nudges. */
export function nextBundleFor(quantity: number) {
  return bundles.find((b) => b.quantity > quantity && b.percentOff > discountPercentFor(quantity));
}

/** Price of N costumes after the bundle discount (no shipping). */
export function priceFor(quantity: number) {
  const subtotal = product.price * quantity;
  return subtotal - Math.round((subtotal * discountPercentFor(quantity)) / 100);
}

export function shippingFor(quantity: number) {
  if (quantity === 0) return 0;
  return quantity >= shipping.freeFromQuantity ? 0 : shipping.flatRate;
}

export function cartTotals(quantity: number) {
  const subtotal = product.price * quantity;
  const percentOff = discountPercentFor(quantity);
  const discount = Math.round((subtotal * percentOff) / 100);
  const shippingCost = shippingFor(quantity);
  return {
    quantity,
    subtotal,
    percentOff,
    discount,
    shipping: shippingCost,
    total: subtotal - discount + shippingCost,
  };
}

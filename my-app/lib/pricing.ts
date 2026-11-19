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

const pair = bundles.find((b) => b.quantity === 2)!;

/** Costume pairs in the cart: every pair gets the 2-pack price. */
export function pairsFor(quantity: number) {
  return Math.floor(quantity / 2);
}

/** Bags of treats included free: one with every 2-pack. */
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

/** Totals for a cart of costumes plus treat add-ons. Treats don't affect the deals or shipping. */
export function cartTotals(quantity: number, treats = 0) {
  const subtotal = product.price * quantity;
  const discount = subtotal - priceFor(quantity);
  const freeTreats = freeTreatsFor(quantity);
  const shippingCost = shippingFor(quantity);
  const treatsTotal = treat.price * treats;
  return {
    quantity,
    treats,
    subtotal,
    freeTreats,
    discount,
    treatsTotal,
    shipping: shippingCost,
    total: subtotal - discount + treatsTotal + shippingCost,
  };
}

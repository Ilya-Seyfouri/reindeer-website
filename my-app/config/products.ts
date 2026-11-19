/**
 * Other products, shown in "Explore other products" on the homepage and each
 * given its own page at /products/{slug}.
 *
 * Everything here is [PLACEHOLDER] content: swap in your real names, prices,
 * photos and copy. They aren't for sale yet (the cart only sells the Rudy
 * costume), so each page shows "Coming soon" and points to the waiting list.
 *
 * Money is in cents, like config/product.ts (1999 = $19.99).
 */

export type HighlightIcon = "clock" | "paw" | "wash" | "feather" | "ruler" | "shield" | "package" | "truck" | "leaf";

export type OtherProduct = {
  /** The page address: /products/{slug} */
  slug: string;
  name: string;
  /** One line under the name */
  tagline: string;
  price: number;
  /** Struck-through price; null hides it */
  compareAtPrice: number | null;
  /** Shown on the card and the page while it can't be bought yet */
  status: "coming-soon";
  /** Labels for the photo placeholders, first one is the main photo */
  photos: string[];
  highlights: { icon: HighlightIcon; strong: string; light: string }[];
  description: string;
  details: { icon: HighlightIcon; q: string; a: string }[];
};

export const otherProducts: OtherProduct[] = [
  {
    slug: "elf-costume",
    name: "The Jingle Elf Costume", // [PLACEHOLDER]
    tagline: "A cheeky little elf suit for your dog's festive photos.", // [PLACEHOLDER]
    price: 2199, // [PLACEHOLDER] $21.99
    compareAtPrice: 2999, // [PLACEHOLDER]
    status: "coming-soon",
    photos: ["Front view", "Side view", "Hat and bells", "On a small dog"],
    highlights: [
      { icon: "clock", strong: "On in seconds", light: "slips over the head" },
      { icon: "paw", strong: "One size fits all", light: "adjustable strap" },
      { icon: "wash", strong: "Machine washable", light: "cool wash, air dry" },
    ],
    description:
      "A soft green elf suit with a striped collar and a floppy hat with a jingle bell. Same easy fit as Rudy, so it's on in seconds and stays put.", // [PLACEHOLDER]
    details: [
      { icon: "package", q: "What's in the box?", a: "One elf costume with an attached hat and an adjustable tummy strap." }, // [PLACEHOLDER]
      { icon: "ruler", q: "Will it fit my dog?", a: "One adjustable size for all small, medium and large dogs." }, // [PLACEHOLDER]
      { icon: "truck", q: "Shipping", a: "Free shipping on every order, like everything in our shop." },
    ],
  },
  {
    slug: "santa-paws-costume",
    name: "The Santa Paws Suit", // [PLACEHOLDER]
    tagline: "Red velvet, white trim and a hat that stays on.", // [PLACEHOLDER]
    price: 2199, // [PLACEHOLDER] $21.99
    compareAtPrice: 2999, // [PLACEHOLDER]
    status: "coming-soon",
    photos: ["Front view", "Side view", "Hat close-up", "On a large dog"],
    highlights: [
      { icon: "feather", strong: "Soft velvet", light: "cosy and light" },
      { icon: "paw", strong: "One size fits all", light: "adjustable strap" },
      { icon: "wash", strong: "Machine washable", light: "cool wash, air dry" },
    ],
    description:
      "A classic Santa suit in soft red velvet with fluffy white trim and a matching hat on a gentle chin strap. Made for Christmas cards and family photos.", // [PLACEHOLDER]
    details: [
      { icon: "package", q: "What's in the box?", a: "One Santa suit and a matching hat with a soft chin strap." }, // [PLACEHOLDER]
      { icon: "ruler", q: "Will it fit my dog?", a: "One adjustable size for all small, medium and large dogs." }, // [PLACEHOLDER]
      { icon: "truck", q: "Shipping", a: "Free shipping on every order, like everything in our shop." },
    ],
  },
  {
    slug: "snowflake-scarf",
    name: "The Snowflake Scarf", // [PLACEHOLDER]
    tagline: "A knitted winter scarf for chilly walks.", // [PLACEHOLDER]
    price: 1499, // [PLACEHOLDER] $14.99
    compareAtPrice: null,
    status: "coming-soon",
    photos: ["Front view", "Snowflake pattern", "On a walk", "Folded"],
    highlights: [
      { icon: "leaf", strong: "Soft knit", light: "warm, not itchy" },
      { icon: "clock", strong: "On in seconds", light: "simple tie" },
      { icon: "wash", strong: "Machine washable", light: "cool wash, air dry" },
    ],
    description:
      "A soft knitted scarf with a white snowflake pattern and a simple tie, sized to sit comfortably without getting in the way of a collar or harness.", // [PLACEHOLDER]
    details: [
      { icon: "package", q: "What's in the box?", a: "One knitted scarf." }, // [PLACEHOLDER]
      { icon: "ruler", q: "Will it fit my dog?", a: "The tie adjusts for most neck sizes." }, // [PLACEHOLDER]
      { icon: "truck", q: "Shipping", a: "Free shipping on every order, like everything in our shop." },
    ],
  },
];

export function getOtherProduct(slug: string) {
  return otherProducts.find((p) => p.slug === slug);
}

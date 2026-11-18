/**
 * Rudy & Co. — single source of truth for the store.
 *
 * Everything a shopper reads about the product lives here: prices, sizes,
 * bundles, shipping, reviews, FAQs and contact details.
 *
 * Anything marked [PLACEHOLDER] is sample content. Replace it before launch.
 * Search this file for "[PLACEHOLDER]" to find every one.
 *
 * Money is stored in cents (3499 = $34.99) to avoid rounding errors.
 */

export type SizeId = "XS" | "S" | "M" | "L" | "XL";

export type Size = {
  id: SizeId;
  /** Chest girth in inches [min, max] */
  chest: readonly [number, number];
  /** Neck girth in inches [min, max] */
  neck: readonly [number, number];
  /** Back length in inches [min, max] */
  back: readonly [number, number];
  /** Breeds that usually fit, shown as a hint */
  breeds: string;
};

export type Review = {
  name: string;
  location: string;
  dog: string;
  size: SizeId;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  /** Label shown on the photo placeholder until you add a real photo */
  photo: string;
};

export type Bundle = {
  quantity: number;
  /** Percent off the whole order when the cart has at least this many costumes */
  percentOff: number;
  label: string;
  note: string;
  popular?: boolean;
};

export const site = {
  name: "Rudy & Co.",
  shortName: "Rudy & Co",
  url: "https://rudyandco.com", // [PLACEHOLDER] your live domain
  description:
    "The soft reindeer costume for dogs. Goes on in seconds, machine washable, sizes XS to XL.",
  currency: "USD",
  locale: "en-US",
  /**
   * Shows a dotted underline under placeholder values on the page so you can
   * spot them. Set to false before launch.
   */
  showPlaceholderMarkers: true,
  announcement: [
    "Free US shipping on 2 or more", // [PLACEHOLDER]
    "Order today, ships in 1–2 business days", // [PLACEHOLDER]
  ],
  contact: {
    email: "hello@rudyandco.com", // [PLACEHOLDER]
    hours: "Monday to Friday, 9am – 5pm ET", // [PLACEHOLDER]
    replyTime: "within 1 business day", // [PLACEHOLDER]
  },
  legal: {
    businessName: "Rudy & Co. LLC", // [PLACEHOLDER]
    address: "123 Example Street, Anytown, ST 00000, USA", // [PLACEHOLDER]
    governingLaw: "the State of [PLACEHOLDER]", // [PLACEHOLDER]
    lastUpdated: "November 18, 2026",
    copyrightYear: 2026,
  },
} as const;

export const product = {
  name: "The Rudy Reindeer Costume",
  shortName: "Reindeer Costume",
  tagline: "The cosy reindeer outfit your dog won't mind wearing.",
  description:
    "A soft fleece reindeer suit with a snug hood and plush antlers that stand up on their own. It slips over the head and fastens under the tummy, so it's on in seconds and stays put through walks, zoomies and photo shoots.",
  price: 3499, // [PLACEHOLDER] $34.99
  compareAtPrice: 4999, // [PLACEHOLDER] $49.99 — set to null to hide the struck-through price
  rating: 4.9, // [PLACEHOLDER]
  reviewCount: 1248, // [PLACEHOLDER]
  happyDogs: "1,000+", // [PLACEHOLDER]
  maxQuantityPerSize: 10,
  sizes: [
    // [PLACEHOLDER] all measurements and breed hints — use your supplier's chart
    { id: "XS", chest: [12, 15], neck: [8, 10], back: [8, 10], breeds: "Chihuahua, Yorkie, Toy Poodle" },
    { id: "S", chest: [15, 19], neck: [10, 13], back: [10, 13], breeds: "Shih Tzu, Mini Dachshund, Jack Russell" },
    { id: "M", chest: [19, 24], neck: [13, 16], back: [13, 17], breeds: "Beagle, French Bulldog, Cocker Spaniel" },
    { id: "L", chest: [24, 29], neck: [16, 20], back: [17, 21], breeds: "Border Collie, Boxer, Staffie" },
    { id: "XL", chest: [29, 35], neck: [20, 24], back: [21, 25], breeds: "Labrador, Golden Retriever, Husky" },
  ] satisfies Size[],
  images: [
    { label: "HERO PHOTO", detail: "Dog wearing the costume, front view", ratio: "4:5" },
    { label: "PHOTO 2", detail: "Side view showing the hood and antlers", ratio: "4:5" },
    { label: "PHOTO 3", detail: "Close-up of the soft fleece and tummy fastening", ratio: "4:5" },
    { label: "PHOTO 4", detail: "Two dogs wearing it together", ratio: "4:5" },
  ],
} as const;

export const bundles: Bundle[] = [
  { quantity: 1, percentOff: 0, label: "1 costume", note: "Perfect for one pup" },
  { quantity: 2, percentOff: 15, label: "2 costumes", note: "Save 15% + free shipping", popular: true }, // [PLACEHOLDER] discount
  { quantity: 3, percentOff: 20, label: "3 costumes", note: "Save 20% + free shipping" }, // [PLACEHOLDER] discount
];

export const shipping = {
  flatRate: 499, // [PLACEHOLDER] $4.99 for a single costume
  freeFromQuantity: 2, // [PLACEHOLDER] free shipping on 2+
  processing: "1–2 business days", // [PLACEHOLDER]
  delivery: "5–8 business days", // [PLACEHOLDER]
  regions: "all 50 US states", // [PLACEHOLDER]
};

export const guarantee = {
  days: 30, // [PLACEHOLDER]
  name: "Happy Dog Guarantee",
};

export const benefits = [
  {
    icon: "feather",
    title: "Soft enough to forget it's on",
    body: "Lightweight brushed fleece that's gentle on fur. No scratchy seams, and nothing tight around the neck.",
  },
  {
    icon: "clock",
    title: "On in about 10 seconds",
    body: "Slip it over the head, press the soft fastening closed under the tummy, done. No wrestling, no buckles.",
  },
  {
    icon: "wash",
    title: "Machine washable",
    body: "Muddy walk or sticky treats? Pop it in the wash on cool and let it air dry. The antlers bounce right back.",
  },
  {
    icon: "camera",
    title: "Made for photos",
    body: "Plush antlers stand up on their own, so your Christmas card photo and family video look as good as the ad.",
  },
] as const;

/**
 * [PLACEHOLDER] SAMPLE REVIEWS ONLY.
 * Replace every review with real customer reviews before launch. Publishing
 * invented reviews is illegal in the US (FTC rule on fake reviews).
 */
export const reviews: Review[] = [
  {
    name: "Linda M.",
    location: "Ohio",
    dog: "Biscuit, Beagle",
    size: "M",
    rating: 5,
    title: "Fit like it was made for him",
    body: "I measured his chest like the guide said and ordered a Medium. Perfect fit, and he didn't fuss one bit. The grandkids loved it.",
    photo: "REVIEW PHOTO – Beagle in costume, 1:1",
  },
  {
    name: "Robert K.",
    location: "Florida",
    dog: "Daisy, Golden Retriever",
    size: "XL",
    rating: 5,
    title: "Soft and well made",
    body: "Better quality than I expected for the price. Daisy wore it all afternoon at our family get-together and kept it on.",
    photo: "REVIEW PHOTO – Golden Retriever, 1:1",
  },
  {
    name: "Patricia H.",
    location: "Texas",
    dog: "Peanut, Chihuahua",
    size: "XS",
    rating: 5,
    title: "Easiest outfit we own",
    body: "My hands aren't what they used to be, and this one is so easy. Over the head, press the tab, done.",
    photo: "REVIEW PHOTO – Chihuahua, 1:1",
  },
  {
    name: "Gary & Sue T.",
    location: "Arizona",
    dog: "Max & Molly, Shih Tzus",
    size: "S",
    rating: 5,
    title: "Bought two, glad we did",
    body: "Got the two-pack for our pair. The discount was a nice bonus and they arrived in five days.",
    photo: "REVIEW PHOTO – two small dogs together, 1:1",
  },
  {
    name: "Karen D.",
    location: "Pennsylvania",
    dog: "Bear, Labrador",
    size: "XL",
    rating: 4,
    title: "Great photos, size up if unsure",
    body: "Bear is a big boy so we went XL. Fits well with a little room. The antlers really do stay up for pictures.",
    photo: "REVIEW PHOTO – Labrador, 1:1",
  },
  {
    name: "Margaret W.",
    location: "North Carolina",
    dog: "Rosie, French Bulldog",
    size: "M",
    rating: 5,
    title: "Washed beautifully",
    body: "Rosie rolled in the garden on day one. Into the washing machine it went and it came out looking brand new.",
    photo: "REVIEW PHOTO – French Bulldog, 1:1",
  },
];

export const faqs = [
  {
    q: "What size should I get?",
    a: "Measure around the widest part of your dog's chest, just behind the front legs. Match that number to the size guide above. If your dog is between two sizes, choose the bigger one. And if it doesn't fit, we'll swap it for free.", // [PLACEHOLDER] free swap policy
  },
  {
    q: "Will my dog actually keep it on?",
    a: "Most dogs settle in within a minute or two because it's light and nothing presses on the face. Give a treat while you put it on the first time and keep the first wear short.",
  },
  {
    q: "How long does shipping take?",
    a: `We pack orders within ${shipping.processing}. Delivery in the US usually takes ${shipping.delivery} after that. You'll get a tracking link by email as soon as it ships.`,
  },
  {
    q: "How much is shipping?",
    a: `Shipping is free when you order 2 or more costumes. For a single costume it's a flat $${(shipping.flatRate / 100).toFixed(2)}.`,
  },
  {
    q: "How do I wash it?",
    a: "Machine wash on a cool, gentle cycle and let it air dry. Please don't tumble dry or iron the antlers.",
  },
  {
    q: "What if it doesn't fit or my dog doesn't like it?",
    a: `You're covered by our ${guarantee.days}-day ${guarantee.name}. Send it back for a free size swap or a full refund. No awkward questions.`,
  },
  {
    q: "Is it safe to pay on this site?",
    a: "Yes. Payments are handled by Stripe, the same secure payment company used by millions of shops. We never see or store your card details.",
  },
];

export const paymentMethods = ["Visa", "Mastercard", "Amex", "Discover", "Apple Pay", "Google Pay"] as const;

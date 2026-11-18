/**
 * Rudy & Co. — single source of truth for the store.
 *
 * Everything a shopper reads about the product lives here: prices, bundles,
 * shipping, reviews, FAQs and contact details.
 *
 * Anything marked [PLACEHOLDER] is sample content. Replace it before launch.
 * Search this file for "[PLACEHOLDER]" to find every one.
 *
 * Money is stored in cents (3500 = $35) to avoid rounding errors. Prices are
 * shown in whole dollars, so keep them to round amounts.
 */

export type Review = {
  name: string;
  location: string;
  dog: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  /** Label shown on the photo placeholder until you add a real photo */
  photo: string;
};

export type Bundle = {
  /** Costumes in the bundle, free ones included */
  quantity: number;
  /** How many of those costumes are free */
  free: number;
  /** Shown as the option title, e.g. "Buy 2, Get 1 FREE" */
  title: string;
  /** Short line under the title */
  note: string;
  popular?: boolean;
};

export const site = {
  name: "Rudy & Co.",
  shortName: "Rudy & Co",
  url: "https://rudyandco.com", // [PLACEHOLDER] your live domain
  description:
    "The soft reindeer costume for dogs. One size with an adjustable fit, goes on in seconds, machine washable.",
  currency: "USD",
  locale: "en-US",
  /**
   * Shows a dotted underline under placeholder values on the page so you can
   * spot them. Set to false before launch.
   */
  showPlaceholderMarkers: true,
  /** The bar under the header: a bold lead-in, then the offer. [PLACEHOLDER] */
  announcement: { lead: "SALE:", text: "Up to 63% Off & FREE Shipping" },
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
  /** One size for every dog. Describe the fit range here. */
  fit: "One size with an adjustable tummy strap. Fits most dogs from [PLACEHOLDER] to [PLACEHOLDER] lbs.", // [PLACEHOLDER]
  price: 3500, // [PLACEHOLDER] $35
  compareAtPrice: 5000, // [PLACEHOLDER] $50 — set to null to hide the struck-through prices
  rating: 4.9, // [PLACEHOLDER]
  reviewCount: 1248, // [PLACEHOLDER]
  happyDogs: "1,000+", // [PLACEHOLDER]
  maxQuantity: 20,
  /** The quick lines under the product title */
  highlights: [
    { icon: "feather", strong: "Soft brushed fleece", light: "gentle on fur" },
    { icon: "clock", strong: "On in 10 seconds", light: "no wrestling" },
    { icon: "ruler", strong: "One size fits most", light: "adjustable strap" }, // [PLACEHOLDER] match your fit range
    { icon: "wash", strong: "Machine washable", light: "cool wash, air dry" },
  ],
  images: [
    { label: "HERO PHOTO", detail: "Dog wearing the costume, front view", ratio: "1:1" },
    { label: "PHOTO 2", detail: "Side view showing the hood and antlers", ratio: "1:1" },
    { label: "PHOTO 3", detail: "Close-up of the soft fleece and tummy strap", ratio: "1:1" },
    { label: "PHOTO 4", detail: "Two dogs wearing it together", ratio: "1:1" },
    { label: "PHOTO 5", detail: "Close-up of the plush antlers", ratio: "1:1" },
  ],
} as const;

/**
 * Purchase options, shown biggest first on the product section.
 * The same deals apply in the cart, e.g. 7 costumes = Buy 3, Get 3 FREE + 1 paid.
 * [PLACEHOLDER] offers
 */
export const bundles: Bundle[] = [
  { quantity: 6, free: 3, title: "Buy 3, Get 3 FREE", note: "6 Rudy Costumes", popular: true },
  { quantity: 3, free: 1, title: "Buy 2, Get 1 FREE", note: "3 Rudy Costumes" },
  { quantity: 1, free: 0, title: "Buy Once", note: "1 Rudy Costume" },
];

export const shipping = {
  flatRate: 500, // [PLACEHOLDER] $5 for a single costume
  freeFromQuantity: 2, // [PLACEHOLDER] free shipping on 2+
  processing: "1–2 business days", // [PLACEHOLDER]
  delivery: "5–8 business days", // [PLACEHOLDER]
  regions: "all 50 US states", // [PLACEHOLDER]
};

export const guarantee = {
  days: 30, // [PLACEHOLDER]
  name: "Happy Dog Guarantee",
};

/** The short accordion under "Add to cart" on the product section. */
export const productFaqs = [
  {
    icon: "shield",
    q: `${guarantee.days}-day money-back guarantee`,
    a: `Try it at home for ${guarantee.days} days. If your dog isn't happy in it, send it back for a full refund. No awkward questions.`,
  },
  {
    icon: "package",
    q: "What's in the box?",
    a: "One reindeer costume per pack: a soft fleece suit with a hood and plush antlers, and an adjustable tummy strap. It arrives ready to wear.", // [PLACEHOLDER] packaging details
  },
  {
    icon: "ruler",
    q: "Will it fit my dog?",
    a: product.fit,
  },
  {
    icon: "clock",
    q: "How do I put it on?",
    a: "Slip the hood over your dog's head, bring the suit along the back, then press the soft strap closed under the tummy. A treat helps the first time.",
  },
  {
    icon: "truck",
    q: "Shipping information",
    a: `Orders are packed within ${shipping.processing} and arrive in ${shipping.delivery} anywhere in the US. Shipping is free on 2 or more costumes, otherwise $${Math.round(shipping.flatRate / 100)}.`,
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
    rating: 5,
    title: "Fit him perfectly",
    body: "I worried one size wouldn't work, but the strap made it easy to get just right. He didn't fuss one bit and the grandkids loved it.",
    photo: "REVIEW PHOTO – Beagle in costume, 1:1",
  },
  {
    name: "Robert K.",
    location: "Florida",
    dog: "Daisy, Golden Retriever",
    rating: 5,
    title: "Soft and well made",
    body: "Better quality than I expected for the price. Daisy wore it all afternoon at our family get-together and kept it on.",
    photo: "REVIEW PHOTO – Golden Retriever, 1:1",
  },
  {
    name: "Patricia H.",
    location: "Texas",
    dog: "Peanut, Chihuahua",
    rating: 5,
    title: "Easiest outfit we own",
    body: "My hands aren't what they used to be, and this one is so easy. Over the head, press the tab, done.",
    photo: "REVIEW PHOTO – Chihuahua, 1:1",
  },
];

export const faqs = [
  {
    q: "Will it fit my dog?",
    a: `${product.fit} If it doesn't work out, you're covered by our ${guarantee.days}-day money-back guarantee.`,
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
    a: `Shipping is free when you order 2 or more costumes. For a single costume it's a flat $${Math.round(shipping.flatRate / 100)}.`,
  },
  {
    q: "How do I wash it?",
    a: "Machine wash on a cool, gentle cycle and let it air dry. Please don't tumble dry or iron the antlers.",
  },
  {
    q: "What if my dog doesn't like it?",
    a: `You're covered by our ${guarantee.days}-day ${guarantee.name}. Send it back for a full refund. No awkward questions.`,
  },
  {
    q: "Is it safe to pay on this site?",
    a: "Yes. Payments are handled by Stripe, the same secure payment company used by millions of shops. We never see or store your card details.",
  },
];

/** "Fits every dog": three photos of the costume on dogs of different sizes. */
export const fitShowcase = {
  title: "Fits every dog",
  intro: "Tiny, medium or big and fluffy. One adjustable size wraps to fit, so there's no chart to puzzle over.",
  dogs: [
    { size: "Small", name: "Peanut", breed: "Chihuahua", weight: "6 lbs" }, // [PLACEHOLDER]
    { size: "Medium", name: "Biscuit", breed: "Beagle", weight: "24 lbs" }, // [PLACEHOLDER]
    { size: "Large", name: "Bear", breed: "Labrador", weight: "70 lbs" }, // [PLACEHOLDER]
  ],
};

/**
 * The blueprint: one design-outline image with numbered pins.
 * x / y are percentages across / down the image. Move them to line up with
 * your real drawing once you add it. [PLACEHOLDER] positions
 */
export const blueprint = {
  title: "Designed around your dog",
  intro: "Every part has a job: stay on, stay comfy, and come off in seconds.",
  image: { label: "BLUEPRINT", detail: "Design outline of the costume showing each part", ratio: "16:9" },
  parts: [
    { x: 50, y: 14, title: "Plush antlers", body: "Firmly stuffed so they stand up on their own and never flop over." },
    { x: 34, y: 34, title: "Soft, loose hood", body: "Ears stay free and nothing covers the eyes or presses on the face." },
    { x: 55, y: 70, title: "Adjustable tummy strap", body: "Soft hook-and-loop closes under the belly and stretches from small to large." },
    { x: 80, y: 52, title: "Open legs and tail", body: "Nothing on the paws or tail, so walking, sitting and potty breaks are normal." },
  ],
};

/**
 * "Rudy vs other costumes". Only claim what is true for your product and
 * keep proof (test reports, certificates) on file. [PLACEHOLDER] all rows
 */
export const comparison = {
  title: "Rudy vs. other costumes",
  intro: "Most dog costumes are made to be cheap. Ours is made to be worn.",
  photo: { label: "PHOTO", detail: "Happy dog in the costume, close-up" },
  rows: [
    { icon: "leaf", feature: "Non-toxic, pet-safe fabric and dyes", others: "Often unknown" },
    { icon: "ruler", feature: "One adjustable size fits every dog", others: "Guess the size" },
    { icon: "clock", feature: "On in about 10 seconds", others: "Buckles and zips" },
    { icon: "wash", feature: "Machine washable", others: "Hand wash only" },
    { icon: "antlers", feature: "Antlers that stay upright", others: "Droop and flop" },
    { icon: "shield", feature: `${guarantee.days}-day money-back guarantee`, others: "Final sale" },
  ],
} as const;

/**
 * Sold-out mode. While `soldOut` is true, "Add to cart" opens a dropdown with
 * a countdown to the next drop and a waiting-list sign-up instead of the cart.
 *
 * Set `nextDropAt` to the real restock time (ISO date, e.g.
 * "2026-11-20T17:00:00-05:00"). While it's null, each visitor sees a 24-hour
 * countdown from their first click, which starts again when it runs out.
 * [PLACEHOLDER] use a real date before launch so the countdown is honest.
 */
export const drop = {
  soldOut: true,
  nextDropAt: null as string | null,
  fallbackHours: 24,
};

/** The waiting list page. [PLACEHOLDER] copy and perks */
export const waitlist = {
  title: "Join the waiting list",
  intro:
    "Our costumes sell out quickly before the holidays. Join the list and we'll email you the moment new stock or a new design arrives.",
  perks: [
    "First to know when we restock",
    "Early access to new designs before anyone else",
    "A waiting-list-only discount on your next order", // [PLACEHOLDER] only promise what you'll honour
  ],
};

export const paymentMethods = ["Visa", "Mastercard", "Amex", "Discover", "Apple Pay", "Google Pay"] as const;

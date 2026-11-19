/**
 * Rudy & Co. — single source of truth for the store.
 *
 * Everything a shopper reads about the product lives here: prices, bundles,
 * shipping, reviews, FAQs and contact details.
 *
 * Anything marked [PLACEHOLDER] is sample content. Replace it before launch.
 * Search this file for "[PLACEHOLDER]" to find every one.
 *
 * Money is stored in cents (1999 = $19.99) to avoid rounding errors. Whole-dollar
 * amounts show without cents ($25), anything else with them ($19.99).
 *
 * Photos live in app/images/. Swap a file there (same name) to change a photo.
 */

import type { StaticImageData } from "next/image";
import blueprintImage from "@/app/images/blueprint.png";
import hero1 from "@/app/images/hero.png";
import hero2 from "@/app/images/hero2.png";
import hero3 from "@/app/images/hero3.png";
import hero4 from "@/app/images/hero4.png";
import hero5 from "@/app/images/hero5.png";
import rudyVsImage from "@/app/images/rudyvs.png";
import size1 from "@/app/images/size1.png";
import size2 from "@/app/images/size2.png";
import size3 from "@/app/images/size3.png";
import review1 from "@/app/images/test1.png";
import review2 from "@/app/images/test2.png";
import review3 from "@/app/images/test3.png";

export type Review = {
  name: string;
  location: string;
  dog: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  /** The customer's photo of their dog (4:5) */
  photo: StaticImageData;
  /**
   * The customer's profile picture (square), shown beside their name. Only use
   * a photo the customer sent you and agreed to share. Without one, their
   * initials show instead.
   */
  avatar?: StaticImageData;
};

export type Bundle = {
  /** Costumes in the bundle, free ones included */
  quantity: number;
  /** Price for the whole bundle, in cents */
  price: number;
  /** Gourmet dog treats included free */
  freeTreats: number;
  /** Shown as the option title, e.g. "Buy 2 + FREE Dog Treat" */
  title: string;
  /** Short line under the title */
  note: string;
  popular?: boolean;
};

export const site = {
  name: "Rudy & Co.",
  shortName: "Rudy & Co",
  url: "https://rudyco.uk",
  description:
    "The soft reindeer costume for dogs. One size with an adjustable fit, goes on in seconds, machine washable.",
  currency: "USD",
  locale: "en-US",
  /**
   * Shows a dotted underline under placeholder values on the page so you can
   * spot them. Set to false before launch.
   */
  showPlaceholderMarkers: false,
  /** The bar under the header: a bold lead-in, then the offer. [PLACEHOLDER] */
  announcement: { lead: "SALE:", text: "Up to 43% Off & FREE Shipping" },
  contact: {
    email: "rudycocostumes@gmail.com",
    hours: "Monday to Friday, 9am – 5pm ET", // [PLACEHOLDER]
    replyTime: "within 1 business day", // [PLACEHOLDER]
  },
  legal: {
    businessName: "Rudy & Co.",
    location: "the United Kingdom",
    governingLaw: "England and Wales",
    lastUpdated: "November 19, 2026",
    copyrightYear: 2026,
  },
} as const;

export const product = {
  name: "The Rudy Reindeer Costume",
  shortName: "Reindeer Costume",
  tagline: "The cosy reindeer outfit your dog won't mind wearing.",
  description:
    "A soft fleece reindeer suit with a snug hood and plush antlers that stand up on their own. It slips over the head and fastens under the tummy, so it's on in seconds and stays put through walks, zoomies and photo shoots.",
  /** Colours the costume comes in. */
  colours: [
    { name: "Classic brown", swatch: "oklch(0.5 0.08 50)" },
    { name: "Christmas red", swatch: "oklch(0.42 0.15 22)" },
  ],
  /**
   * Fabric certification shown as a trust badge. Only claim what your supplier's
   * certificate covers, and keep the certificate (and its number) on file.
   */
  certification: {
    name: "OEKO-TEX® Standard 100",
    short: "Skin safe certified materials",
    detail: "tested for harmful substances",
  },
  /** What it's made of, from the spec sheet. */
  materials: [
    "Soft sherpa fleece outer, warm and comfortable",
    "Breathable lining for comfort and easy movement",
    "Plush antlers and ears, soft and lightweight",
    "Glow-in-the-dark nose (photoluminescent, no batteries)",
    "Adjustable strap that holds it securely in place",
  ],
  /** One size for every dog. Describe the fit range here. */
  fit: "One size with a roomy hood and an adjustable tummy strap that closes anywhere along its length, so it fits most small, medium and large dogs, from little pugs to big huskies.",
  // Set from the UK prices at about $1.32 to the pound (Nov 2026), rounded to shop prices:
  // £14.99 → $19.99 for one, £24.99 → $32.99 for two, £21.99 was-price → $28.99
  price: 1999, // $19.99 for one costume
  compareAtPrice: 2899, // $28.99 per costume, struck through. Set to null to hide it
  rating: 4.9, // [PLACEHOLDER]
  reviewCount: 1248, // [PLACEHOLDER]
  happyDogs: "1,000+", // [PLACEHOLDER]
  /** Costumes sold, shown under Add to cart. Must be your real number. [PLACEHOLDER] */
  soldCount: 7116,
  maxQuantity: 20,
  /** The quick lines under the product title */
  highlights: [
    { icon: "clock", strong: "On in 5 seconds", light: "no wrestling" },
    { icon: "paw", strong: "One size fits all", light: "adjustable strap" },
    { icon: "wash", strong: "Machine washable", light: "cool wash, air dry" },
  ],
  /** Product gallery, in order. The first one is the big photo shoppers see first. */
  images: [
    { src: hero1, label: "Front view", alt: "Golden retriever sitting in the Rudy reindeer costume" },
    { src: hero2, label: "Side view", alt: "Golden retriever on a leash wearing the costume, seen from the side" },
    { src: hero3, label: "Small and large dogs", alt: "A chihuahua and a husky side by side, both wearing the costume" },
    { src: hero4, label: "Hood and antlers", alt: "Close-up of a German shepherd in the hood with plush antlers" },
    { src: hero5, label: "Tummy strap", alt: "Hands fastening the soft tummy strap under a dog's belly" },
  ],
} as const;

/** "$32.99" for FAQ copy. */
const dollars = (cents: number) => `$${(cents / 100).toFixed(2)}`;

/**
 * Purchase options, shown biggest first on the product section.
 * The same deal applies in the cart: every pair is $32.99 with free treats, any
 * odd one out is $19.99, e.g. 3 costumes = $52.98 with one free treat.
 */
export const bundles: Bundle[] = [
  { quantity: 2, price: 3299, freeTreats: 1, title: "Buy 2 + FREE Dog Treat", note: "2 Rudy Costumes + 1 free gourmet dog treat", popular: true },
  { quantity: 1, price: 1999, freeTreats: 0, title: "Buy Once", note: "1 Rudy Costume" },
];

export const shipping = {
  flatRate: 0, // shipping is free on every order
  freeFromQuantity: 1,
  processing: "1–2 business days", // [PLACEHOLDER]
  delivery: "5–8 business days", // [PLACEHOLDER]
  regions: "all 50 US states", // [PLACEHOLDER]
};

export const guarantee = {
  days: 30, // [PLACEHOLDER]
  name: "Happy Dog Guarantee",
};

/** The short accordion under "Add to cart" on the product section. */
/**
 * The add-on offered in the cart: "Gift for a furry friend?"
 * Not part of the costume deals and doesn't count towards free shipping.
 */
export const treat = {
  name: "Gourmet Dog Treat",
  blurb: "A gourmet dog treat, ready to gift.", // [PLACEHOLDER] describe the treat
  price: 999, // $9.99
  maxQuantity: 10,
};

export const productFaqs = [
  {
    icon: "shield",
    q: `${guarantee.days}-day returns`,
    a: `Every order comes with ${guarantee.days}-day returns. Start a return on our returns page in about a minute, and if anything arrives damaged we'll put it right.`,
  },
  {
    icon: "package",
    q: "What's in the box?",
    a: "One reindeer costume per pack: a soft fleece suit with a hood and plush antlers, and an adjustable tummy strap. It arrives ready to wear.", // [PLACEHOLDER] packaging details
  },
  {
    icon: "leaf",
    q: "Materials and safety",
    a: `${product.materials.join(". ")}. The fabric is ${product.certification.name} certified, meaning it's ${product.certification.detail}, so it's gentle against your dog's fur and skin. Comes in ${product.colours.map((c) => c.name.toLowerCase()).join(" and ")}.`,
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
    a: `Shipping is free on every order. Orders are packed within ${shipping.processing} and arrive in ${shipping.delivery} anywhere in the US, with a tracking link by email.`,
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
    dog: "Biscuit, Pit Bull mix",
    rating: 5,
    title: "Fit him perfectly",
    body: "I worried one size wouldn't work, but the strap made it easy to get just right. He didn't fuss one bit and the grandkids loved it.",
    photo: review1,
  },
  {
    name: "Robert K.",
    location: "Florida",
    dog: "Daisy, Golden Retriever",
    rating: 5,
    title: "Soft and well made",
    body: "Better quality than I expected for the price. Daisy wore it all afternoon at our family get-together and kept it on.",
    photo: review2,
  },
  {
    name: "Patricia H.",
    location: "Texas",
    dog: "Honey, Pug",
    rating: 5,
    title: "Easiest outfit we own",
    body: "My hands aren't what they used to be, and this one is so easy. Over the head, press the tab, done.",
    photo: review3,
  },
];

export const faqs = [
  {
    q: "Will it fit my dog?",
    a: `${product.fit} The strap takes a few seconds to adjust, so there's no measuring or size chart. Still not sure? Email us your dog's breed and weight before you order and we'll tell you honestly.`,
  },
  {
    q: "Will my dog actually keep it on?",
    a: "Most dogs settle in within a minute or two because it's light and nothing presses on the face. Give a treat while you put it on the first time and keep the first wear short.",
  },
  {
    q: "What is it made of? Is it safe for my dog?",
    a: `The outside is soft sherpa fleece with a breathable lining, and the ears and antlers are plush and lightweight. The fabric is ${product.certification.name} certified, which means it's ${product.certification.detail}, so it's gentle on fur and skin. As with any outfit, stay with your dog while they wear it.`,
  },
  {
    q: "Does the nose really glow?",
    a: "Yes. The nose is photoluminescent: it soaks up light and then glows in the dark, with no batteries or wires. Leave it under a lamp or in daylight for a few minutes before an evening walk for the brightest glow.",
  },
  {
    q: "What colours does it come in?",
    a: `${product.colours.map((c) => c.name).join(" and ")}. Both have the same cream sherpa trim, plush antlers and glowing nose.`,
  },
  {
    q: "How do the bundle deals work?",
    a: `Buy 2 costumes for ${dollars(bundles[0].price)} instead of ${dollars(product.price * 2)}, and we'll add a free ${treat.name.toLowerCase()} for your furry little friend. The deal applies automatically in your cart. It's perfect for multi-dog homes or as a gift, and every order ships free.`,
  },
  {
    q: "Can I add a treat for my dog?",
    a: `Yes. Buy 2 costumes and a ${treat.name.toLowerCase()} comes free. With a single costume you can add one in your cart for $${(treat.price / 100).toFixed(2)}, which is a nice touch if the costume is a gift.`,
  },
  {
    q: "How long does shipping take?",
    a: `We pack orders within ${shipping.processing}. Delivery in the US usually takes ${shipping.delivery} after that. You'll get a tracking link by email as soon as it ships.`,
  },
  {
    q: "How much is shipping?",
    a: "Nothing. Shipping is free on every order, whether you buy one costume or six.",
  },
  {
    q: "It says sold out. When is the next restock?",
    a: "Each drop is made in a limited batch. When we're sold out, the Add to cart button counts down to the next restock. Join the waiting list and we'll email you the moment it goes live, so you get first dibs.",
  },
  {
    q: "How do I wash it?",
    a: "Machine wash on a cool, gentle cycle and let it air dry. Please don't tumble dry or iron the antlers.",
  },
  {
    q: "What if my dog doesn't like it?",
    a: `Every order comes with our ${guarantee.days}-day returns. Just start a return on our returns page and we'll take it from there.`,
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
    { size: "Small", name: "Peanut", breed: "Pug", weight: "16 lbs", photo: size1 }, // [PLACEHOLDER] name, weight
    { size: "Medium", name: "Biscuit", breed: "Golden Retriever", weight: "60 lbs", photo: size2 }, // [PLACEHOLDER] name, weight
    { size: "Large", name: "Bear", breed: "Husky", weight: "65 lbs", photo: size3 }, // [PLACEHOLDER] name, weight
  ],
};

/**
 * The blueprint: one design-outline image with numbered callouts.
 * x / y is the point on the drawing the callout points at, and pinY is where
 * its numbered pin sits (straight above or below, in the clear space). All are
 * percentages across / down the image. If you change the drawing, move them.
 */
export const blueprint = {
  title: "Designed around your dog",
  intro: "Every part has a job: stay on, stay comfy, and come off in seconds.",
  image: {
    src: blueprintImage,
    alt: "Line drawing of the costume from the front, side and back, plus the hood and tummy strap on their own",
  },
  parts: [
    { x: 14.6, y: 19.4, pinY: 8, title: "Plush antlers", body: "Firmly stuffed so they stand up on their own and never flop over." },
    { x: 33.8, y: 27.6, pinY: 8, title: "Soft, loose hood", body: "Ears stay free and nothing covers the eyes or presses on the face." },
    { x: 59.3, y: 69.6, pinY: 91, title: "Open legs and tail", body: "Nothing on the paws or tail, so walking, sitting and potty breaks are normal." },
    { x: 80.4, y: 80.4, pinY: 91, title: "Adjustable tummy strap", body: "Soft hook-and-loop closes under the belly and stretches from small to large." },
  ],
};

/**
 * "Rudy vs other costumes". Only claim what is true for your product and
 * keep proof (test reports, certificates) on file. [PLACEHOLDER] all rows
 */
export const comparison = {
  title: "Rudy vs. other costumes",
  intro: "Most dog costumes are made to be cheap. Ours is made to be worn.",
  photo: { src: rudyVsImage, alt: "Smiling corgi in the reindeer hood" },
  rows: [
    { icon: "leaf", feature: "Non-toxic, pet-safe fabric and dyes", others: "Often unknown" },
    { icon: "ruler", feature: "One adjustable size fits every dog", others: "Guess the size" },
    { icon: "clock", feature: "On in about 5 seconds", others: "Buckles and zips" },
    { icon: "wash", feature: "Machine washable", others: "Hand wash only" },
    { icon: "antlers", feature: "Antlers that stay upright", others: "Droop and flop" },
    { icon: "shield", feature: `${guarantee.days}-day returns`, others: "Final sale" },
  ],
} as const;

/**
 * Sold-out mode. While `soldOut` is true, "Add to cart" opens a dropdown with
 * a countdown to the next drop and a waiting-list sign-up instead of the cart.
 *
 * The live values come from the `store_settings` table in Supabase, so you
 * can change them from the dashboard without a redeploy (see
 * lib/store-settings.ts). These are only used if the database can't be reached.
 * When the countdown reaches zero it shows "Restocking now" until you set a new
 * date or turn sold out off. It never restarts by itself.
 */
export const drop = {
  soldOut: true,
  nextDropAt: null as string | null,
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

export const paymentMethods = ["Visa", "Mastercard", "Discover", "Apple Pay", "Google Pay"] as const;

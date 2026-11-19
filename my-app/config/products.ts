/**
 * Other products, shown in "Explore other products" on the homepage and each
 * given its own page at /products/{slug}.
 *
 * Products marked "available" can be bought: their page shows the options
 * (colour, size, pet name) and an Add to cart button. "coming-soon" products
 * are [PLACEHOLDER] content that points to the waiting list instead.
 *
 * Money is in cents, like config/product.ts (1999 = $19.99).
 */

import type { StaticImageData } from "next/image";
import sweaterBack from "@/app/images/sweater-back.webp";
import sweaterGreen from "@/app/images/sweater-green.webp";
import sweaterPair from "@/app/images/sweater-pair.webp";
import sweaterRed from "@/app/images/sweater-red.webp";

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
  /** "available" can be added to the cart; "coming-soon" points to the waiting list */
  status: "available" | "coming-soon";
  /** Labels for the photo placeholders, first one is the main photo. Used when there are no images. */
  photos: string[];
  /** Real photos, first one is the main photo */
  images?: { src: StaticImageData; alt: string }[];
  /** Choices the shopper makes before adding to the cart */
  options?: ProductOptions;
  highlights: { icon: HighlightIcon; strong: string; light: string }[];
  description: string;
  details: { icon: HighlightIcon; q: string; a: string }[];
};

export type ProductOptions = {
  /** Each colour can point at the photo to show when it's picked (index into images) */
  colors: { id: string; name: string; swatch: string; image?: number }[];
  sizes: { id: string; name: string }[];
  /** A free-text box, e.g. the pet's name stitched on the front */
  personalise: { label: string; hint: string; maxLength: number };
  maxQuantity: number;
};

export const otherProducts: OtherProduct[] = [
  {
    slug: "custom-christmas-sweater",
    name: "Custom Christmas Dog Sweater",
    tagline: "A cosy knit Christmas jumper with your pet's name stitched on the back.",
    price: 2999, // [PLACEHOLDER] $29.99
    compareAtPrice: null, // [PLACEHOLDER] add a was-price if you want one
    status: "available",
    photos: [],
    images: [
      { src: sweaterGreen, alt: "Poodle wearing the green Christmas sweater with Teddy stitched on the back" },
      { src: sweaterRed, alt: "French bulldog wearing the red Christmas sweater with Charlie stitched on the back" },
      { src: sweaterPair, alt: "Two dogs by the fire in the green and red sweaters" },
      { src: sweaterBack, alt: "Doodle in the snow wearing the red sweater with Coco stitched on the back" },
    ],
    options: {
      colors: [
        { id: "green", name: "Green", swatch: "oklch(0.45 0.11 155)", image: 0 },
        { id: "red", name: "Red", swatch: "oklch(0.55 0.2 25)", image: 1 },
      ],
      sizes: [
        { id: "s", name: "S" },
        { id: "m", name: "M" },
        { id: "l", name: "L" },
        { id: "xl", name: "XL" },
        { id: "xxl", name: "XXL" },
      ],
      personalise: { label: "Your pet's name", hint: "Stitched on the back in chunky yarn. Up to 12 letters.", maxLength: 12 },
      maxQuantity: 10,
    },
    highlights: [
      { icon: "feather", strong: "Personalised", light: "your pet's name, hand stitched" },
      { icon: "leaf", strong: "Soft cable knit", light: "warm, not itchy" },
      { icon: "ruler", strong: "Sizes S to XXL", light: "for small to large dogs" },
    ],
    description:
      "A classic Christmas jumper for your dog, with a festive fair isle pattern and your pet's name stitched in chunky yarn on the back. Pick green or red, choose a size, and tell us the name.", // [PLACEHOLDER] check the copy
    details: [
      { icon: "package", q: "What's in the box?", a: "One knitted sweater, personalised with the name you enter." }, // [PLACEHOLDER]
      { icon: "ruler", q: "Which size should I pick?", a: "Measure around the widest part of your dog's chest and pick the size that matches. If they're between sizes, go up one." }, // [PLACEHOLDER] add the size chart
      { icon: "clock", q: "When will it arrive?", a: "Each sweater is personalised to order, so allow a little extra time before it ships." }, // [PLACEHOLDER] add the real making time
      { icon: "truck", q: "Shipping", a: "Free shipping on every order, like everything in our shop." },
    ],
  },
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

/** Tidies a typed pet name: trims, squashes spaces, keeps letters, numbers, spaces, - . ' & */
export function cleanPetName(value: string, maxLength: number) {
  return value
    .replace(/[^\p{L}\p{N} '&.-]/gu, "")
    .replace(/\s+/g, " ")
    .trimStart()
    .slice(0, maxLength);
}

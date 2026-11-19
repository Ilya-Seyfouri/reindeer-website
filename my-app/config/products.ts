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
  /** Measurements are shown in the size guide under the size buttons */
  sizes: { id: string; name: string; chest?: string; back?: string; weight?: string }[];
  /** Tips shown under the size guide table */
  sizeTips?: string[];
  /** A free-text box, e.g. the pet's name stitched on the front */
  personalise: { label: string; hint: string; maxLength: number };
  maxQuantity: number;
};

export const otherProducts: OtherProduct[] = [
  {
    slug: "custom-christmas-sweater",
    name: "Custom Christmas Dog Sweater",
    tagline: "A cosy cable-knit Christmas sweater with your pet's name chain-stitched on.",
    price: 2999, // $29.99
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
        { id: "xs", name: "XS", chest: "12.6 in", back: "7.9 in", weight: "1–3 lb" },
        { id: "s", name: "S", chest: "14.6 in", back: "9.8 in", weight: "3–5 lb" },
        { id: "m", name: "M", chest: "16.5 in", back: "11.8 in", weight: "5–8 lb" },
        { id: "l", name: "L", chest: "18.5 in", back: "13.8 in", weight: "8–11 lb" },
        { id: "xl", name: "XL", chest: "20.5 in", back: "15.7 in", weight: "11–15 lb" },
        { id: "xxl", name: "XXL", chest: "22.4 in", back: "17.7 in", weight: "15–20 lb" },
      ],
      sizeTips: [
        "Chest: measure around the widest part of your pet's chest.",
        "Back length: measure from the base of the neck to the base of the tail.",
        "Weight is a guide only, as every pet is a different shape.",
        "Between sizes? Pick the larger one for a comfier fit.",
      ],
      personalise: {
        label: "Your pet's name",
        hint: "Chain-stitched onto the sweater. Please double-check the spelling.",
        maxLength: 12,
      },
      maxQuantity: 10,
    },
    highlights: [
      { icon: "feather", strong: "Personalised", light: "chain-stitched name" },
      { icon: "leaf", strong: "Cosy cable knit", light: "warm for winter walks" },
      { icon: "paw", strong: "For dogs & cats", light: "sizes XS to XXL" },
    ],
    description:
      "Make your furry friend's Christmas extra special. This cosy cable-knit sweater has festive holiday details and your pet's name in textured chain-stitch embroidery, so it's an outfit that's truly their own. Perfect for Christmas photos, family gatherings, winter walks and cosy nights in.",
    details: [
      {
        icon: "feather",
        q: "Personalisation",
        a: "Your pet's name is chain-stitched onto the sweater for a handcrafted, textured look. Please enter the name carefully and double-check the spelling before checkout.",
      },
      {
        icon: "leaf",
        q: "Materials and design",
        a: "Comfortable knitted fabric with a cable-knit texture and festive Christmas details, made to keep your pet warm in the cooler months.",
      },
      {
        icon: "ruler",
        q: "Which size should I pick?",
        a: "Measure your pet's chest at the widest part and their back from the base of the neck to the base of the tail, then check the size guide above. Weight is a guide only. If your pet is between sizes, pick the larger one. Measurements may vary slightly as they're taken by hand.",
      },
      {
        icon: "package",
        q: "A perfect Christmas gift",
        a: "A thoughtful present for dog moms, cat moms, pet lovers and Christmas-loving families, and lovely for festive family photos.",
      },
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

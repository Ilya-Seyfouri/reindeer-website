/**
 * Other products, shown in "Explore other products" on the homepage and each
 * given its own page at /products/{slug}.
 *
 * Products marked "available" can be bought: their page shows the options
 * (colour, size, pet name) and an Add to cart button. "coming-soon" products
 * show a Coming soon tag and point to the waiting list instead.
 *
 * Money is in cents, like config/product.ts (1999 = $19.99).
 */

import type { StaticImageData } from "next/image";
import collarBoth from "@/app/images/collar-both.webp";
import collarChristmas from "@/app/images/collar-christmas.webp";
import collarGreen from "@/app/images/collar-green.webp";
import collarRed from "@/app/images/collar-red.webp";
import collarSizes from "@/app/images/collar-sizes.webp";
import hat from "@/app/images/hat.webp";
import hatCollie from "@/app/images/hat-collie.webp";
import hatDogCat from "@/app/images/hat-dog-cat.webp";
import hatSize from "@/app/images/hat-size.webp";
import knitCat from "@/app/images/knit-cat.webp";
import knitFrenchie from "@/app/images/knit-frenchie.webp";
import knitRange from "@/app/images/knit-range.webp";
import knitSizes from "@/app/images/knit-sizes.webp";
import knitYorkie1 from "@/app/images/reviews/knit-yorkie-1.webp";
import knitYorkie2 from "@/app/images/reviews/knit-yorkie-2.webp";
import knitYorkie3 from "@/app/images/reviews/knit-yorkie-3.webp";
import knitYorkie4 from "@/app/images/reviews/knit-yorkie-4.webp";
import knitYorkie5 from "@/app/images/reviews/knit-yorkie-5.webp";
import ropeToy from "@/app/images/rope-toy.webp";
import ropeToyGift from "@/app/images/rope-toy-gift.webp";
import ropeToyPuppy from "@/app/images/rope-toy-puppy.webp";
import sweaterBack from "@/app/images/sweater-back.webp";
import sweaterGreen from "@/app/images/sweater-green.webp";
import sweaterPair from "@/app/images/sweater-pair.webp";
import sweaterRed from "@/app/images/sweater-red.webp";

export type HighlightIcon = "clock" | "paw" | "wash" | "feather" | "ruler" | "shield" | "package" | "truck" | "leaf" | "snowflake";

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
  /** Customer reviews shown under the product */
  reviews?: ProductReview[];
  /** A short line under the reviews heading, e.g. where the reviews come from */
  reviewsNote?: string;
};

export type ProductReview = {
  rating: number;
  /** ISO date, e.g. "2026-01-20" */
  date: string;
  author: string;
  /** e.g. "Colour: Red · Size: M" */
  variant: string;
  text: string;
  photos: { src: StaticImageData; alt: string }[];
};

export type ProductOptions = {
  /** Each colour can point at the photo to show when it's picked (index into images). Empty: no colour choice. */
  colors: { id: string; name: string; swatch: string; image?: number }[];
  /** measures line up with sizeGuide.columns. Empty: one size, no choice. */
  sizes: { id: string; name: string; measures?: string[] }[];
  /** A table under the size buttons, plus measuring tips */
  sizeGuide?: { columns: string[]; tips?: string[] };
  /** A free-text box, e.g. the pet's name stitched on. Leave out for products without one. */
  personalise?: { label: string; hint: string; maxLength: number };
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
        { id: "xs", name: "XS", measures: ["12.6 in", "7.9 in", "1–3 lb"] },
        { id: "s", name: "S", measures: ["14.6 in", "9.8 in", "3–5 lb"] },
        { id: "m", name: "M", measures: ["16.5 in", "11.8 in", "5–8 lb"] },
        { id: "l", name: "L", measures: ["18.5 in", "13.8 in", "8–11 lb"] },
        { id: "xl", name: "XL", measures: ["20.5 in", "15.7 in", "11–15 lb"] },
        { id: "xxl", name: "XXL", measures: ["22.4 in", "17.7 in", "15–20 lb"] },
      ],
      sizeGuide: {
        columns: ["Chest", "Back", "Weight"],
        tips: [
          "Chest: measure around the widest part of your pet's chest.",
          "Back length: measure from the base of the neck to the base of the tail.",
          "Weight is a guide only, as every pet is a different shape.",
          "Between sizes? Pick the larger one for a comfier fit.",
        ],
      },
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
    slug: "plaid-bow-tie-collar",
    name: "Snowflake Plaid Bow Tie Collar",
    tagline: "A festive plaid collar with a snowflake bow tie, for dogs and cats.",
    price: 1499, // $14.99
    compareAtPrice: null,
    status: "available",
    photos: [],
    images: [
      { src: collarChristmas, alt: "Chocolate Labrador in the red plaid bow tie collar by the Christmas tree and dinner table" },
      { src: collarBoth, alt: "Chocolate Labrador in the red plaid bow tie collar, next to the red and green collars" },
      { src: collarRed, alt: "Yellow Labrador on the grass wearing the red plaid bow tie collar" },
      { src: collarGreen, alt: "Labrador puppy wearing a green snowflake bow tie collar" },
      { src: collarSizes, alt: "Size chart: S 1.5 cm wide fits 25 to 35 cm, M 2 cm fits 30 to 40 cm, L 2.5 cm fits 40 to 50 cm, XL 3 cm fits 50 to 60 cm" },
    ],
    options: {
      colors: [
        { id: "red", name: "Red", swatch: "oklch(0.55 0.2 25)", image: 0 },
        { id: "green", name: "Green", swatch: "oklch(0.45 0.11 155)", image: 3 },
      ],
      sizes: [
        { id: "s", name: "S", measures: ["1.5 cm", "25–35 cm (10–14 in)"] },
        { id: "m", name: "M", measures: ["2 cm", "30–40 cm (12–16 in)"] },
        { id: "l", name: "L", measures: ["2.5 cm", "40–50 cm (16–20 in)"] },
        { id: "xl", name: "XL", measures: ["3 cm", "50–60 cm (20–24 in)"] },
      ],
      sizeGuide: {
        columns: ["Width", "Fits neck"],
        tips: [
          "Measure around your pet's neck where the collar sits, then add two fingers' width for comfort.",
          "Between sizes? Pick the larger one: the buckle adjusts down.",
        ],
      },
      maxQuantity: 10,
    },
    highlights: [
      { icon: "snowflake", strong: "Festive plaid", light: "snowflake bow tie" },
      { icon: "clock", strong: "Quick-release buckle", light: "on and off in seconds" },
      { icon: "paw", strong: "Sizes S to XL", light: "for small to large dogs and cats" },
    ],
    description:
      "Dress your pet up for the holidays with this Christmas plaid collar and matching bow tie, printed with little white snowflakes. Strong nylon webbing, an adjustable quick-release buckle and a metal D-ring for the lead make it as practical as it is cute. Perfect for Christmas photos, parties and festive walks.",
    details: [
      {
        icon: "leaf",
        q: "Materials and design",
        a: "Nylon webbing with a plaid fabric cover and a matching bow tie, an adjustable quick-release buckle and a metal D-ring for attaching a lead or ID tag.",
      },
      {
        icon: "ruler",
        q: "Which size should I pick?",
        a: "Measure around your pet's neck where the collar sits and check the size guide above. Each size adjusts across a 10 cm range, so pick the one your measurement falls inside.",
      },
      {
        icon: "package",
        q: "A perfect Christmas gift",
        a: "A cheerful stocking filler for dog and cat lovers, and lovely for festive family photos.",
      },
      { icon: "truck", q: "Shipping", a: "Free shipping on every order, like everything in our shop." },
    ],
  },
  {
    slug: "candy-cane-rope-toy",
    name: "Hand-Braided Candy Cane Rope Toy",
    tagline: "A tightly braided cotton rope toy for festive tug, fetch and chewing.",
    price: 1199, // $11.99
    compareAtPrice: null,
    status: "available",
    photos: [],
    images: [
      { src: ropeToyPuppy, alt: "Corgi puppy carrying the red and green candy cane rope toy" },
      { src: ropeToy, alt: "The candy cane rope toy on a dark green background" },
      { src: ropeToyGift, alt: "The candy cane rope toy on a cosy blanket next to a Christmas gift" },
    ],
    options: { colors: [], sizes: [], maxQuantity: 10 },
    highlights: [
      { icon: "leaf", strong: "Natural cotton rope", light: "hand-braided" },
      { icon: "shield", strong: "Bite-resistant", light: "made for chewing" },
      { icon: "paw", strong: "Small & medium dogs", light: "tug, fetch and chew" },
    ],
    description:
      "Our festive candy cane, hand-braided from thick red and green cotton rope. The tight weave stands up to chewing, and the knotted texture helps clean teeth and soothe gums as your dog plays. Made for tug-of-war, fetch and quiet chews by the tree, it's the perfect stocking filler for small and medium dogs.",
    details: [
      {
        icon: "leaf",
        q: "Materials",
        a: "Thick cotton rope, tightly braided into a candy cane shape in festive red and green.",
      },
      {
        icon: "shield",
        q: "Good for teeth",
        a: "The braided texture helps clean teeth and massage gums while your dog chews, and gives teething puppies something safe to bite.",
      },
      {
        icon: "paw",
        q: "Which dogs is it for?",
        a: "Sized for small and medium dogs. Like any toy, supervise play and take it away if it becomes worn or frayed.",
      },
      { icon: "truck", q: "Shipping", a: "Free shipping on every order, like everything in our shop." },
    ],
  },
  {
    slug: "plush-santa-hat",
    name: "Plush Santa Hat for Dogs & Cats",
    tagline: "The cutest finishing touch for Christmas photos, parties and cosy nights in.",
    price: 999, // $9.99
    compareAtPrice: null,
    status: "available",
    photos: [],
    images: [
      { src: hatCollie, alt: "Border collie wearing the red plush Santa hat" },
      { src: hatDogCat, alt: "French bulldog and grey kitten both wearing the Santa hat" },
      { src: hat, alt: "The red plush Santa hat with a white trim and pom-pom" },
      { src: hatSize, alt: "The Santa hat measures 20 cm (7.87 in) tall and 14 cm (5.51 in) wide" },
    ],
    options: { colors: [], sizes: [], maxQuantity: 10 },
    highlights: [
      { icon: "feather", strong: "Ultra-soft plush", light: "comfy for long wear" },
      { icon: "paw", strong: "Fits most dogs & cats", light: "flexible shape" },
      { icon: "shield", strong: "Pet-safe material", light: "no harmful chemicals" },
    ],
    description:
      "Turn every Christmas photo into a favourite. This classic Santa hat is made from ultra-soft red plush with a fluffy white trim and pom-pom, so it looks festive and feels cosy. The flexible shape sits snugly on most dogs and cats, making it perfect for holiday parties, family photos and Christmas morning.",
    details: [
      {
        icon: "ruler",
        q: "Size and fit",
        a: "20 cm (7.87 in) tall and 14 cm (5.51 in) wide at the base. The soft, flexible shape adapts to different head shapes and fits most dogs and cats.",
      },
      {
        icon: "shield",
        q: "Materials and safety",
        a: "Ultra-soft plush fabric made without high-concern chemicals, gentle enough for sensitive pets. Supervise your pet while they wear it.",
      },
      { icon: "package", q: "What's in the box?", a: "One Santa hat." },
      { icon: "truck", q: "Shipping", a: "Free shipping on every order, like everything in our shop." },
    ],
  },
  {
    slug: "fair-isle-knit-sweater",
    name: "Fair Isle Christmas Knit Sweater",
    tagline: "A cosy reindeer and snowflake turtleneck for small dogs and cats.",
    price: 1499, // $14.99
    compareAtPrice: null,
    status: "available",
    photos: [],
    images: [
      { src: knitFrenchie, alt: "French bulldog by the fire wearing the red fair isle Christmas sweater" },
      { src: knitCat, alt: "White cat wearing the red fair isle Christmas sweater" },
      { src: knitRange, alt: "The blue and red knit sweaters side by side" },
      {
        src: knitSizes,
        alt: "Size chart: S 22 cm back, M 26 cm, L 32 cm, XL 35 cm, XXL 40 cm, with neck, leg spacing and weight for each",
      },
    ],
    options: {
      colors: [
        { id: "red", name: "Red", swatch: "oklch(0.5 0.18 25)", image: 0 },
        { id: "blue", name: "Blue", swatch: "oklch(0.32 0.08 260)", image: 2 },
      ],
      sizes: [
        { id: "s", name: "S", measures: ["8.7 in", "3.5 in", "1–2 lb"] },
        { id: "m", name: "M", measures: ["10.2 in", "3.7 in", "2–3 lb"] },
        { id: "l", name: "L", measures: ["12.6 in", "4.3 in", "3–5.5 lb"] },
        { id: "xl", name: "XL", measures: ["13.8 in", "4.3 in", "5.5–9 lb"] },
        { id: "xxl", name: "XXL", measures: ["15.7 in", "4.7 in", "8–14 lb"] },
      ],
      sizeGuide: {
        columns: ["Back", "Neck", "Weight"],
        tips: [
          "Back length: measure from the base of the neck to the base of the tail.",
          "Neck: measure around where a collar would sit.",
          "Weight is a guide only. Between sizes? Pick the larger one.",
        ],
      },
      maxQuantity: 10,
    },
    highlights: [
      { icon: "leaf", strong: "Soft knitted wool", light: "warm and stretchy" },
      { icon: "snowflake", strong: "Classic fair isle", light: "reindeer and snowflakes" },
      { icon: "paw", strong: "For small dogs & cats", light: "sizes S to XXL" },
    ],
    description:
      "A timeless Christmas jumper for your furry friend, knitted with reindeer, snowflakes and a cosy ribbed turtleneck. The soft, stretchy knit slips on easily and keeps small dogs and cats warm on chilly days, from Bichons and Frenchies to Corgi puppies and house cats. Perfect for Christmas photos, family gatherings and winter walks.",
    details: [
      {
        icon: "ruler",
        q: "Which size should I pick?",
        a: "Check your pet's back length and neck against the size guide above. These sweaters run small, made for pets up to about 14 lb, so if your pet is between sizes, pick the larger one.",
      },
      {
        icon: "leaf",
        q: "Materials",
        a: "Soft, stretchy knitted wool with ribbed cuffs and a cosy turtleneck collar.",
      },
      { icon: "package", q: "What's in the box?", a: "One knitted sweater in the colour and size you choose." },
      { icon: "truck", q: "Shipping", a: "Free shipping on every order, like everything in our shop." },
    ],
    reviewsNote: "From shoppers who bought this same sweater from another retailer.",
    reviews: [
      {
        rating: 5,
        date: "2026-01-20",
        author: "Shopper",
        variant: "Colour: Red · Size: M",
        text: "Good day! The sweater matches the sizes on the website. The size for a 2.6 kg Yorkie is just right. A cool feature that I haven't seen before is the straps on the back legs, so the sweater doesn't slip and doesn't get wrinkled.",
        photos: [
          { src: knitYorkie1, alt: "Yorkie wearing the red sweater on a bed" },
          { src: knitYorkie2, alt: "Yorkie in the red sweater looking up" },
          { src: knitYorkie3, alt: "Yorkie in the red sweater sitting on a bed" },
          { src: knitYorkie4, alt: "Back view of the red sweater on a Yorkie" },
          { src: knitYorkie5, alt: "Yorkie in the red sweater lying down" },
        ],
      },
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

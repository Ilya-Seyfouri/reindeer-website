# Rudy & Co. — reindeer costume store

A single-product store built with Next.js (App Router), TypeScript and Tailwind CSS.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Where to edit things

| What | Where |
| --- | --- |
| Prices, sizes, bundles, shipping, reviews, FAQs, contact details | `config/product.ts` |
| Colours, fonts, spacing, motion | `app/globals.css` (`@theme` block at the top) |
| Landing page sections | `components/home/*` |
| Refund policy / Terms | `app/refund-policy/page.tsx`, `app/terms/page.tsx` |

Search the project for `[PLACEHOLDER]` to find every value you need to replace. While
`site.showPlaceholderMarkers` is `true` in `config/product.ts`, placeholder numbers on the page
get a dotted underline. Set it to `false` before launch.

**Reviews in `config/product.ts` are samples.** Replace them with real customer reviews before
going live; publishing made-up reviews breaks the FTC's fake-review rule.

## Photos and video

Every image is a labelled `<Placeholder>` (e.g. "HERO PHOTO · 4:5"). Put your files in
`public/photos/` and swap each placeholder for `next/image`:

```tsx
<Image src="/photos/hero.jpg" alt="Beagle wearing the reindeer costume" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
```

The ad clip goes in `components/home/VideoSection.tsx` (there's a ready-made `<video>` snippet in
the comment there).

## Still to connect

- **Payments:** `app/api/checkout/route.ts` has step-by-step Stripe Checkout instructions. The cart
  and order page already send `{ lines: [{ size, quantity }] }` and redirect to the returned `url`.
- **Order tracking:** `app/api/track/route.ts` — return the documented `result` shape and the
  tracking page renders the status timeline.
- **Contact form:** `app/api/contact/route.ts` — send the message with your email provider.

Until connected, each endpoint returns a friendly "not connected yet" message.

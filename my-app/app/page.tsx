import { Blueprint } from "@/components/home/Blueprint";
import { Comparison } from "@/components/home/Comparison";
import { Faq } from "@/components/home/Faq";
import { FitsEveryDog } from "@/components/home/FitsEveryDog";
import { Guarantee } from "@/components/home/Guarantee";
import { Hero } from "@/components/home/Hero";
import { ProductSelectionProvider } from "@/components/home/ProductSelection";
import { Reviews } from "@/components/home/Reviews";
import { SectionTracker } from "@/components/home/SectionTracker";
import { StickyBuyBar } from "@/components/home/StickyBuyBar";
import { faqs, product, site } from "@/config/product";
import { getStoreSettings } from "@/lib/store-settings";

const jsonLd = (soldOut: boolean) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      name: product.name,
      description: product.description,
      brand: { "@type": "Brand", name: site.name },
      offers: {
        "@type": "Offer",
        price: (product.price / 100).toFixed(2),
        priceCurrency: site.currency,
        availability: soldOut ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
        url: site.url,
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
});

export default async function Home() {
  const settings = await getStoreSettings();
  return (
    <ProductSelectionProvider settings={settings}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(settings.soldOut)) }} />
      <Hero />
      <FitsEveryDog />
      <Comparison />
      <Reviews />
      <Blueprint />
      <Faq />
      <Guarantee />
      <StickyBuyBar />
      <SectionTracker />
    </ProductSelectionProvider>
  );
}

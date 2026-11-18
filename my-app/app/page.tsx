import { Benefits } from "@/components/home/Benefits";
import { Blueprint } from "@/components/home/Blueprint";
import { Comparison } from "@/components/home/Comparison";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";
import { FitsEveryDog } from "@/components/home/FitsEveryDog";
import { Guarantee } from "@/components/home/Guarantee";
import { Hero } from "@/components/home/Hero";
import { ProductSelectionProvider } from "@/components/home/ProductSelection";
import { Reviews } from "@/components/home/Reviews";
import { StickyBuyBar } from "@/components/home/StickyBuyBar";
import { VideoSection } from "@/components/home/VideoSection";
import { faqs, product, site } from "@/config/product";

const jsonLd = {
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
        availability: "https://schema.org/InStock",
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
};

export default function Home() {
  return (
    <ProductSelectionProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <FitsEveryDog />
      <Blueprint />
      <Comparison />
      <VideoSection />
      <Benefits />
      <Reviews />
      <Faq />
      <Guarantee />
      <FinalCta />
      <StickyBuyBar />
    </ProductSelectionProvider>
  );
}

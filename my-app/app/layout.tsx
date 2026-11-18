import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next, Young_Serif } from "next/font/google";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/components/cart/CartProvider";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar, Header } from "@/components/layout/Header";
import { Snowfall } from "@/components/layout/Snowfall";
import { product, site } from "@/config/product";
import "./globals.css";

const display = Young_Serif({
  variable: "--font-young-serif",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const body = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin"],
  display: "swap",
  // Next has no metric overrides for this family yet; Arial is the closest system match.
  adjustFontFallback: false,
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${product.name} | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${product.name} | ${site.name}`,
    description: site.description,
    siteName: site.name,
    type: "website",
  },
  // The share picture itself is app/opengraph-image.jpg (and twitter-image.jpg).
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-(--z-toast) rounded-full bg-cocoa px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <CartProvider>
          <Header />
          <AnnouncementBar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <Snowfall />
        </CartProvider>
      </body>
    </html>
  );
}

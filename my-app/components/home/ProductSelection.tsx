"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { bundles } from "@/config/product";
import { track } from "@/lib/analytics";
import type { StoreSettings } from "@/lib/store-settings";

/**
 * Which bundle (1, 2 or 3 costumes) the shopper has picked on the landing
 * page. Shared so every buy button on the page acts on the same choice.
 */
type SelectionContextValue = {
  quantity: number;
  setQuantity: (quantity: number) => void;
  /**
   * Adds the chosen bundle to the cart, then opens the cart or goes to checkout.
   * While sold out, it opens the sold-out dropdown under "Add to cart" instead.
   */
  buy: (then?: "drawer" | "checkout") => void;
  /** Whether the sold-out dropdown is showing. */
  soldOutOpen: boolean;
  setSoldOutOpen: (open: boolean) => void;
  /** Scrolls back up to the purchase options. */
  goToOptions: () => void;
  /** Live store settings from the database: sold out, and when the next drop is. */
  settings: StoreSettings;
};

const SelectionContext = createContext<SelectionContextValue | null>(null);

const DEFAULT_QUANTITY = bundles.find((b) => b.popular)?.quantity ?? 1;

export function ProductSelectionProvider({
  settings,
  children,
}: {
  settings: StoreSettings;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { add, openCart } = useCart();
  const [quantity, setQuantity] = useState(DEFAULT_QUANTITY);
  const [soldOutOpen, setSoldOutOpen] = useState(false);

  const goToOptions = useCallback(() => {
    const options = document.getElementById("purchase-options");
    if (!options) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    options.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    // Focus after the scroll so the screen doesn't jump twice.
    window.setTimeout(
      () => options.querySelector<HTMLInputElement>("input:checked")?.focus({ preventScroll: true }),
      reduce ? 0 : 450,
    );
  }, []);

  const buy = useCallback<SelectionContextValue["buy"]>(
    (then = "drawer") => {
      track("add_to_cart_clicked", { quantity, sold_out: settings.soldOut });
      if (settings.soldOut) {
        setSoldOutOpen(true);
        const button = document.getElementById("hero-buy");
        const rect = button?.getBoundingClientRect();
        // From the sticky bar the button is off screen: bring it (and the dropdown) into view.
        if (button && rect && (rect.top < 0 || rect.bottom > window.innerHeight * 0.6)) {
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          window.scrollTo({
            top: window.scrollY + rect.top - window.innerHeight * 0.18,
            behavior: reduce ? "auto" : "smooth",
          });
        }
        return;
      }
      add(quantity);
      if (then === "checkout") router.push("/checkout");
      else openCart();
    },
    [quantity, add, openCart, router, settings.soldOut],
  );

  const value = useMemo(
    () => ({ quantity, setQuantity, buy, goToOptions, soldOutOpen, setSoldOutOpen, settings }),
    [quantity, buy, goToOptions, soldOutOpen, settings],
  );

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export function useSelection() {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error("useSelection must be used inside <ProductSelectionProvider>");
  return ctx;
}

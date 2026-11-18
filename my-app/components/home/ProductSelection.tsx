"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { bundles } from "@/config/product";

/**
 * Which bundle (1, 2 or 3 costumes) the shopper has picked on the landing
 * page. Shared so every buy button on the page acts on the same choice.
 */
type SelectionContextValue = {
  quantity: number;
  setQuantity: (quantity: number) => void;
  /** Adds the chosen bundle to the cart, then opens the cart or goes to checkout. */
  buy: (then?: "drawer" | "checkout") => void;
  /** Scrolls back up to the purchase options. */
  goToOptions: () => void;
};

const SelectionContext = createContext<SelectionContextValue | null>(null);

const DEFAULT_QUANTITY = bundles.find((b) => b.popular)?.quantity ?? 1;

export function ProductSelectionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { add, openCart } = useCart();
  const [quantity, setQuantity] = useState(DEFAULT_QUANTITY);

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
      add(quantity);
      if (then === "checkout") router.push("/checkout");
      else openCart();
    },
    [quantity, add, openCart, router],
  );

  const value = useMemo(() => ({ quantity, setQuantity, buy, goToOptions }), [quantity, buy, goToOptions]);

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export function useSelection() {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error("useSelection must be used inside <ProductSelectionProvider>");
  return ctx;
}

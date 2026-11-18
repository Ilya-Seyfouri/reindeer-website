"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import type { SizeId } from "@/config/product";

/**
 * The size and quantity the shopper has picked on the landing page.
 * Shared so every "Buy" button on the page (hero, sticky bar, bundle,
 * final CTA) acts on the same choice.
 */
type SelectionContextValue = {
  size: SizeId | null;
  quantity: number;
  sizeError: boolean;
  setSize: (size: SizeId) => void;
  setQuantity: (quantity: number) => void;
  /** Adds to cart. Without a size, scrolls to the size picker instead. */
  buy: (options?: { quantity?: number; then?: "drawer" | "checkout" }) => void;
  goToSizePicker: () => void;
};

const SelectionContext = createContext<SelectionContextValue | null>(null);

export function ProductSelectionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { add, openCart } = useCart();
  const [size, setSizeState] = useState<SizeId | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  const setSize = useCallback((next: SizeId) => {
    setSizeState(next);
    setSizeError(false);
  }, []);

  const goToSizePicker = useCallback(() => {
    const picker = document.getElementById("size-picker");
    if (!picker) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    picker.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    // Focus after the scroll so the screen doesn't jump twice.
    window.setTimeout(
      () => picker.querySelector<HTMLInputElement>("input:checked, input")?.focus({ preventScroll: true }),
      reduce ? 0 : 450,
    );
  }, []);

  const buy = useCallback<SelectionContextValue["buy"]>(
    (options = {}) => {
      if (!size) {
        setSizeError(true);
        goToSizePicker();
        return;
      }
      add(size, options.quantity ?? quantity);
      if (options.then === "checkout") router.push("/checkout");
      else openCart();
    },
    [size, quantity, add, openCart, router, goToSizePicker],
  );

  const value = useMemo(
    () => ({ size, quantity, sizeError, setSize, setQuantity, buy, goToSizePicker }),
    [size, quantity, sizeError, setSize, buy, goToSizePicker],
  );

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export function useSelection() {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error("useSelection must be used inside <ProductSelectionProvider>");
  return ctx;
}

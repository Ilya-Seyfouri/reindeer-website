"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore } from "react";
import type { SizeId } from "@/config/product";
import { cartStore } from "@/lib/cart-store";
import { cartTotals, type CartLine } from "@/lib/pricing";

type CartContextValue = {
  lines: readonly CartLine[];
  totals: ReturnType<typeof cartTotals>;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (size: SizeId, quantity: number) => void;
  setQuantity: (size: SizeId, quantity: number) => void;
  changeSize: (from: SizeId, to: SizeId) => void;
  remove: (size: SizeId) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const lines = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      totals: cartTotals(lines),
      isOpen,
      openCart,
      closeCart,
      add: cartStore.add,
      setQuantity: cartStore.setQuantity,
      changeSize: cartStore.changeSize,
      remove: cartStore.remove,
      clear: cartStore.clear,
    }),
    [lines, isOpen, openCart, closeCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

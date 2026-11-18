"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore } from "react";
import { cartStore } from "@/lib/cart-store";
import { cartTotals } from "@/lib/pricing";

type CartContextValue = {
  quantity: number;
  totals: ReturnType<typeof cartTotals>;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (quantity: number) => void;
  setQuantity: (quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const quantity = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(
    () => ({
      quantity,
      totals: cartTotals(quantity),
      isOpen,
      openCart,
      closeCart,
      add: cartStore.add,
      setQuantity: cartStore.setQuantity,
      clear: cartStore.clear,
    }),
    [quantity, isOpen, openCart, closeCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

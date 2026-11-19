"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore } from "react";
import { cartStore } from "@/lib/cart-store";
import { cartTotals } from "@/lib/pricing";

type CartContextValue = {
  /** Costumes in the cart */
  quantity: number;
  /** Treat add-ons in the cart */
  treats: number;
  totals: ReturnType<typeof cartTotals>;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (quantity: number) => void;
  setQuantity: (quantity: number) => void;
  setTreats: (treats: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { quantity, treats } = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(
    () => ({
      quantity,
      treats,
      totals: cartTotals(quantity, treats),
      isOpen,
      openCart,
      closeCart,
      add: cartStore.add,
      setQuantity: cartStore.setQuantity,
      setTreats: cartStore.setTreats,
      clear: cartStore.clear,
    }),
    [quantity, treats, isOpen, openCart, closeCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

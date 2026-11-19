"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore } from "react";
import { cartStore, type CartItem } from "@/lib/cart-store";
import { cartTotals } from "@/lib/pricing";

type CartContextValue = {
  /** Costumes in the cart */
  quantity: number;
  /** Treat add-ons in the cart */
  treats: number;
  /** Other products with their options, e.g. personalised sweaters */
  items: CartItem[];
  totals: ReturnType<typeof cartTotals>;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (quantity: number) => void;
  setQuantity: (quantity: number) => void;
  setTreats: (treats: number) => void;
  clear: () => void;
  addItem: (item: CartItem) => void;
  setItemQuantity: (key: string, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { quantity, treats, items } = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(
    () => ({
      quantity,
      treats,
      items,
      totals: cartTotals(quantity, treats, items),
      isOpen,
      openCart,
      closeCart,
      add: cartStore.add,
      setQuantity: cartStore.setQuantity,
      setTreats: cartStore.setTreats,
      clear: cartStore.clear,
      addItem: cartStore.addItem,
      setItemQuantity: cartStore.setItemQuantity,
    }),
    [quantity, treats, items, isOpen, openCart, closeCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

"use client";

import { product, treat } from "@/config/product";
import { cleanItems, itemKey, type CartItem } from "@/lib/cart-items";

export { itemKey, type CartItem };

/**
 * A tiny external store for the cart, persisted to localStorage.
 * The Rudy costume and its treat add-on are two counts. Other products with
 * options (like the custom sweater) are lines: one per colour + size + name.
 * Read it with useSyncExternalStore so server HTML (empty cart) and the first client render always match, then the saved cart appears.
 */

const STORAGE_KEY = "rudy-cart-v2";

export type CartState = { quantity: number; treats: number; items: CartItem[] };

const EMPTY: CartState = { quantity: 0, treats: 0, items: [] };

let state: CartState = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function clamp(value: unknown, max: number) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(max, Math.round(n)));
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      const quantity = clamp(saved?.quantity, product.maxQuantity);
      state = { quantity, treats: quantity === 0 ? 0 : clamp(saved?.treats, treat.maxQuantity), items: cleanItems(saved?.items) };
    }
  } catch {
    // Private browsing or corrupt data: start with an empty cart.
  }
}

function commit(next: Partial<CartState>) {
  const quantity = clamp(next.quantity ?? state.quantity, product.maxQuantity);
  // Treats are an add-on: they leave the cart with the last costume.
  const treats = quantity === 0 ? 0 : clamp(next.treats ?? state.treats, treat.maxQuantity);
  const items = next.items ? cleanItems(next.items) : state.items;
  // A new object only when something changed, so useSyncExternalStore doesn't loop.
  if (quantity !== state.quantity || treats !== state.treats || items !== state.items) state = { quantity, treats, items };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage can be unavailable; the cart still works for this visit.
  }
  listeners.forEach((listener) => listener());
}

export const cartStore = {
  subscribe(listener: () => void) {
    load();
    listeners.add(listener);
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      loaded = false;
      state = EMPTY;
      load();
      listener();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  },
  getSnapshot(): CartState {
    load();
    return state;
  },
  getServerSnapshot(): CartState {
    return EMPTY;
  },
  add(amount: number) {
    load();
    commit({ quantity: state.quantity + amount });
  },
  setQuantity(next: number) {
    commit({ quantity: next });
  },
  setTreats(next: number) {
    load();
    commit({ treats: next });
  },
  /** Clears the Rudy costume (and its treats); other items stay. */
  clear() {
    commit({ quantity: 0, treats: 0 });
  },
  addItem(item: CartItem) {
    load();
    const existing = state.items.find((x) => itemKey(x) === itemKey(item));
    commit({
      items: existing
        ? state.items.map((x) => (x === existing ? { ...x, quantity: x.quantity + item.quantity } : x))
        : [...state.items, item],
    });
  },
  /** 0 removes the line */
  setItemQuantity(key: string, next: number) {
    load();
    commit({ items: state.items.map((x) => (itemKey(x) === key ? { ...x, quantity: next } : x)) });
  },
};

"use client";

import { product, treat } from "@/config/product";

/**
 * A tiny external store for the cart, persisted to localStorage.
 * The store sells one costume in one size plus a treat add-on, so the cart is
 * just two counts. Read it with useSyncExternalStore so server HTML (empty
 * cart) and the first client render always match, then the saved cart appears.
 */

const STORAGE_KEY = "rudy-cart-v2";

export type CartState = { quantity: number; treats: number };

const EMPTY: CartState = { quantity: 0, treats: 0 };

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
      state = { quantity: clamp(saved?.quantity, product.maxQuantity), treats: clamp(saved?.treats, treat.maxQuantity) };
    }
  } catch {
    // Private browsing or corrupt data: start with an empty cart.
  }
}

function commit(next: Partial<CartState>) {
  const quantity = clamp(next.quantity ?? state.quantity, product.maxQuantity);
  // Treats are an add-on: they leave the cart with the last costume.
  const treats = quantity === 0 ? 0 : clamp(next.treats ?? state.treats, treat.maxQuantity);
  // A new object only when something changed, so useSyncExternalStore doesn't loop.
  if (quantity !== state.quantity || treats !== state.treats) state = { quantity, treats };
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
  clear() {
    commit({ quantity: 0, treats: 0 });
  },
};

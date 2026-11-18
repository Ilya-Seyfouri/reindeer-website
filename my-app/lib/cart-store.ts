"use client";

import { product } from "@/config/product";

/**
 * A tiny external store for the cart, persisted to localStorage.
 * The store sells one product in one size, so the cart is just a quantity.
 * Read it with useSyncExternalStore so server HTML (empty cart) and the
 * first client render always match, then the saved cart appears.
 */

const STORAGE_KEY = "rudy-cart-v2";

let quantity = 0;
let loaded = false;
const listeners = new Set<() => void>();

function clamp(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(product.maxQuantity, Math.round(value)));
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) quantity = clamp(Number(JSON.parse(raw)?.quantity));
  } catch {
    // Private browsing or corrupt data: start with an empty cart.
  }
}

function commit(next: number) {
  quantity = clamp(next);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ quantity }));
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
      quantity = 0;
      load();
      listener();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  },
  getSnapshot() {
    load();
    return quantity;
  },
  getServerSnapshot() {
    return 0;
  },
  add(amount: number) {
    load();
    commit(quantity + amount);
  },
  setQuantity(next: number) {
    commit(next);
  },
  clear() {
    commit(0);
  },
};

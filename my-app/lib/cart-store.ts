"use client";

import { product, type SizeId } from "@/config/product";
import type { CartLine } from "@/lib/pricing";

/**
 * A tiny external store for the cart, persisted to localStorage.
 * Read it with useSyncExternalStore so server HTML (empty cart) and the
 * first client render always match, then the saved cart appears.
 */

const STORAGE_KEY = "rudy-cart-v1";
const EMPTY: CartLine[] = [];
const SIZE_IDS = new Set<string>(product.sizes.map((s) => s.id));

let lines: CartLine[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function clamp(quantity: number) {
  return Math.max(0, Math.min(product.maxQuantityPerSize, Math.round(quantity)));
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return;
    lines = parsed
      .filter(
        (l): l is CartLine =>
          typeof l === "object" && l !== null && SIZE_IDS.has(l.size) && typeof l.quantity === "number",
      )
      .map((l) => ({ size: l.size, quantity: clamp(l.quantity) }))
      .filter((l) => l.quantity > 0);
  } catch {
    // Private browsing or corrupt data: start with an empty cart.
  }
}

function commit(next: CartLine[]) {
  lines = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
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
      lines = EMPTY;
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
    return lines;
  },
  getServerSnapshot() {
    return EMPTY;
  },
  add(size: SizeId, quantity: number) {
    load();
    const existing = lines.find((l) => l.size === size);
    if (existing) {
      commit(lines.map((l) => (l.size === size ? { ...l, quantity: clamp(l.quantity + quantity) } : l)));
    } else {
      commit([...lines, { size, quantity: clamp(quantity) }]);
    }
  },
  setQuantity(size: SizeId, quantity: number) {
    const q = clamp(quantity);
    commit(q === 0 ? lines.filter((l) => l.size !== size) : lines.map((l) => (l.size === size ? { ...l, quantity: q } : l)));
  },
  changeSize(from: SizeId, to: SizeId) {
    if (from === to) return;
    const moving = lines.find((l) => l.size === from);
    if (!moving) return;
    const target = lines.find((l) => l.size === to);
    const rest = lines.filter((l) => l.size !== from && l.size !== to);
    const merged = { size: to, quantity: clamp(moving.quantity + (target?.quantity ?? 0)) };
    // Keep the line where it was so the list doesn't jump around.
    const index = lines.findIndex((l) => l.size === from);
    rest.splice(Math.min(index, rest.length), 0, merged);
    commit(rest);
  },
  remove(size: SizeId) {
    commit(lines.filter((l) => l.size !== size));
  },
  clear() {
    commit(EMPTY);
  },
};

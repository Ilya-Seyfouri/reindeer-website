"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { BundleNudge, CartLines, CartSummary } from "@/components/cart/CartLines";
import { Drawer } from "@/components/ui/Drawer";
import { ArrowRightIcon, LockIcon, ReturnIcon } from "@/components/ui/icons";
import { guarantee } from "@/config/product";

export function CartDrawer() {
  const { isOpen, closeCart, quantity } = useCart();
  const empty = quantity === 0;

  return (
    <Drawer
      open={isOpen}
      onClose={closeCart}
      title="Your cart"
      footer={
        empty ? null : (
          <div className="flex flex-col gap-4">
            <CartSummary />
            <Link href="/checkout" onClick={closeCart} className="btn btn-primary btn-lg w-full">
              <LockIcon size={20} />
              Go to checkout
            </Link>
            <p className="flex items-center justify-center gap-2 text-center text-base text-ink-soft">
              <ReturnIcon size={18} />
              {guarantee.days}-day money-back guarantee
            </p>
          </div>
        )
      }
    >
      {empty ? (
        <div className="flex h-full flex-col items-center justify-center gap-5 py-16 text-center">
          <p className="font-display text-[1.75rem] leading-tight">Your cart is empty</p>
          <p className="max-w-[28ch] text-ink-soft">Choose a bundle and we&rsquo;ll get your pup dressed up.</p>
          <Link href="/#buy" onClick={closeCart} className="btn btn-primary">
            Shop the costume
            <ArrowRightIcon size={20} />
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-2 pb-5">
          <CartLines />
          <BundleNudge />
        </div>
      )}
    </Drawer>
  );
}

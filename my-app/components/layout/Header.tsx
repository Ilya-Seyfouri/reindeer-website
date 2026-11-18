"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { Logo } from "@/components/layout/Logo";
import { Drawer } from "@/components/ui/Drawer";
import { ArrowRightIcon, BagIcon, MenuIcon } from "@/components/ui/icons";
import { site } from "@/config/product";

const nav = [
  { href: "/", label: "Shop" },
  { href: "/contact", label: "Contact Us" },
  { href: "/track", label: "Track Order" },
  { href: "/waiting-list", label: "Waiting List" },
];

const menuExtra = [{ href: "/refund-policy", label: "Refund policy" }];

export function AnnouncementBar() {
  return (
    <div className="on-dark bg-cocoa text-white">
      <p className="wrap py-2.5 text-center text-[1.0625rem] leading-snug sm:text-lg">
        <strong>{site.announcement.lead}</strong> {site.announcement.text}
      </p>
    </div>
  );
}

export function Header() {
  const { totals, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const count = totals.quantity;

  return (
    <header className="sticky top-0 z-(--z-header) border-b border-line bg-white">
      <div className="wrap flex h-(--header-h) items-center justify-between gap-3">
        <div className="flex items-center gap-1 lg:gap-14">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="-ml-2.5 grid size-12 place-items-center rounded-full transition-colors hover:bg-fawn-soft lg:hidden"
            aria-label="Open menu"
          >
            <MenuIcon size={26} />
          </button>
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-2">
              {nav.map((item) => (
                <li key={item.href}>
                  {/* The hidden bold copy reserves width, so the bold current page doesn't nudge its neighbours. */}
                  <Link
                    href={item.href}
                    data-label={item.label}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="inline-flex min-h-12 flex-col items-center justify-center px-3 text-ink-soft transition-colors duration-200 after:invisible after:h-0 after:overflow-hidden after:font-bold after:content-[attr(data-label)] hover:text-ink aria-[current=page]:font-bold aria-[current=page]:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <button
          type="button"
          onClick={openCart}
          className="-mr-2.5 inline-flex min-h-12 items-center gap-2 rounded-full lg:gap-3.5 px-3 font-bold transition-colors hover:bg-fawn-soft lg:mr-0 lg:shadow-[inset_0_0_0_1.5px_var(--color-line-strong)] lg:px-5"
          aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
        >
          <span className="relative">
            <BagIcon size={26} />
            <span
              aria-hidden="true"
              className={`absolute -top-1.5 -right-2 grid h-5 min-w-5 place-items-center rounded-full bg-cocoa px-1 text-[0.8125rem] leading-none font-bold text-white tabular-nums transition-[opacity,transform] duration-300 ease-(--ease-out-quart) ${
                count > 0 ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            >
              {count}
            </span>
          </span>
          <span className="hidden lg:inline">Cart</span>
        </button>
      </div>

      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} side="left" title="Menu">
        <nav aria-label="Mobile">
          <ul className="flex flex-col py-3">
            {[...nav, ...menuExtra].map((item) => (
              <li key={item.href} className="border-b border-line last:border-0">
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="flex min-h-16 items-center justify-between text-[1.375rem] text-ink-soft aria-[current=page]:font-bold aria-[current=page]:text-ink"
                >
                  {item.label}
                  <ArrowRightIcon size={22} className="text-caramel-deep" />
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/#buy" onClick={() => setMenuOpen(false)} className="btn btn-primary btn-lg mt-4 mb-8 w-full">
            Shop the costume
          </Link>
        </nav>
      </Drawer>
    </header>
  );
}

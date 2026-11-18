import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { PaymentIcons } from "@/components/layout/PaymentIcons";
import { site } from "@/config/product";

const groups = [
  {
    title: "Help",
    links: [
      { href: "/track", label: "Track your order" },
      { href: "/contact", label: "Contact us" },
      { href: "/waiting-list", label: "Waiting list" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    title: "Policies",
    links: [
      { href: "/refund-policy", label: "Refund policy" },
      { href: "/terms", label: "Terms of service" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="on-dark bg-cocoa-deep text-white">
      <div className="wrap grid gap-12 pt-16 pb-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-10 md:pt-20">
        <div className="flex flex-col gap-4">
          <Logo tone="light" className="-ml-0.5 w-fit" />
          <p className="max-w-[34ch] text-on-cocoa-soft">
            Cosy reindeer costumes for dogs, in one easy adjustable size. Questions? We&rsquo;re real people and we reply{" "}
            {site.contact.replyTime}.
          </p>
          <a href={`mailto:${site.contact.email}`} className="link w-fit text-white decoration-fawn">
            {site.contact.email}
          </a>
        </div>
        {groups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="font-sans text-lg font-bold text-fawn">{group.title}</h2>
            <ul className="mt-3 flex flex-col">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-12 items-center text-white underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-fawn"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="wrap">
        <div
          className="flex flex-col gap-6 border-t border-white/15 pt-8 md:flex-row md:items-center md:justify-between"
          style={{ paddingBottom: "max(2rem, calc(var(--safe-bottom) + 1rem))" }}
        >
          <PaymentIcons tone="dark" />
          <p className="text-base text-on-cocoa-soft">
            © {site.legal.copyrightYear} {site.legal.businessName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

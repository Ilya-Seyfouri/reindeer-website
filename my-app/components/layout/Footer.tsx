import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { PaymentIcons } from "@/components/layout/PaymentIcons";
import { ClockIcon, FeatherIcon, MailIcon, ReturnIcon, ShieldIcon, TruckIcon } from "@/components/ui/icons";
import { ForestSkyline } from "@/components/ui/Prints";
import { site } from "@/config/product";

const groups = [
  {
    title: "Help",
    links: [
      { href: "/track", label: "Track your order", Icon: TruckIcon },
      { href: "/contact", label: "Contact us", Icon: MailIcon },
      { href: "/waiting-list", label: "Waiting list", Icon: ClockIcon },
      { href: "/#faq", label: "FAQ", Icon: FeatherIcon },
    ],
  },
  {
    title: "Policies",
    links: [
      { href: "/refund-policy", label: "Refund policy", Icon: ReturnIcon },
      { href: "/terms", label: "Terms of service", Icon: ShieldIcon },
    ],
  },
];

export function Footer() {
  return (
    <>
    <ForestSkyline className="-mb-px" />
    <footer className="on-dark bg-chocolate-deep text-white">
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
                    className="inline-flex min-h-12 items-center gap-2.5 text-white underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-fawn"
                  >
                    <link.Icon size={18} className="shrink-0 text-fawn" aria-hidden="true" />
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
    </>
  );
}

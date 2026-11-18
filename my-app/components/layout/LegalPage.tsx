import Link from "next/link";
import { site } from "@/config/product";

/**
 * Shared layout for policy pages.
 * The wording is a plain-English starting point, not legal advice.
 * Have it reviewed before launch.
 */
export function LegalPage({ title, summary, children }: { title: string; summary: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="wrap pt-10 pb-20 md:pt-16 md:pb-28">
      <h1 className="enter h-display max-w-[18ch]">{title}</h1>
      <p className="enter mt-3 text-ink-soft" style={{ "--i": 1 } as React.CSSProperties}>
        Last updated {site.legal.lastUpdated}
      </p>
      <div
        className="enter mt-8 max-w-[68ch] rounded-3xl bg-fawn-soft p-6 sm:p-8"
        style={{ "--i": 2 } as React.CSSProperties}
      >
        <p className="text-lg font-bold">The short version</p>
        <div className="lead mt-2">{summary}</div>
      </div>
      <div className="prose-legal mt-4">{children}</div>
      <p className="mt-14 max-w-[68ch] border-t border-line pt-8">
        Questions about this policy?{" "}
        <Link href="/contact" className="link">
          Contact us
        </Link>{" "}
        or email{" "}
        <a href={`mailto:${site.contact.email}`} className="link">
          {site.contact.email}
        </a>
        .
      </p>
    </div>
  );
}

import Link from "next/link";
import { BuyButton } from "@/components/home/BuyButton";
import { PlusIcon } from "@/components/ui/icons";
import { faqs, site } from "@/config/product";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section">
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)] lg:self-start">
          <h2 id="faq-title" className="reveal h-section max-w-[14ch]">
            Questions, answered
          </h2>
          <p className="reveal lead mt-5 max-w-[34ch] text-ink-soft">
            Can&rsquo;t find what you need? Email us at{" "}
            <a href={`mailto:${site.contact.email}`} className="link text-ink">
              {site.contact.email}
            </a>{" "}
            or use our{" "}
            <Link href="/contact" className="link text-ink">
              contact form
            </Link>
            .
          </p>
          <BuyButton className="reveal mt-8 hidden lg:flex" />
        </div>

        <div>
          <div className="reveal border-t border-line">
            {faqs.map((faq) => (
              <details key={faq.q} className="group border-b border-line">
                <summary className="flex min-h-18 cursor-pointer items-center justify-between gap-5 py-5 text-[1.25rem] leading-snug font-bold transition-colors hover:text-caramel-deep">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="faq-icon grid size-10 shrink-0 place-items-center rounded-full bg-fawn-soft text-cocoa group-open:bg-cocoa group-open:text-white"
                  >
                    <PlusIcon size={22} />
                  </span>
                </summary>
                <div className="faq-answer max-w-[60ch] pb-6 sm:pr-14 text-ink-soft">
                  <p>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
          <BuyButton className="reveal mt-10 lg:hidden" />
        </div>
      </div>
    </section>
  );
}

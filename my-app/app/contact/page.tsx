import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/app/contact/ContactForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { ClockIcon, MailIcon, PackageIcon } from "@/components/ui/icons";
import { site } from "@/config/product";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Get in touch with the Rudy & Co. team.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="We're happy to help"
        intro={<>Questions about fit, your order or a return? Send us a note. A real person will reply {site.contact.replyTime}.</>}
      />
      <div className="wrap grid gap-12 pb-20 md:pb-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <ContactForm />
        <aside className="enter flex flex-col gap-6 self-start" style={{ "--i": 2 } as React.CSSProperties}>
          <div className="rounded-3xl bg-fawn-soft p-6 sm:p-8">
            <ul className="flex flex-col gap-6">
              <li className="flex gap-4">
                <MailIcon className="mt-0.5 shrink-0 text-caramel-deep" />
                <div>
                  <p className="font-bold">Email</p>
                  <a href={`mailto:${site.contact.email}`} className="link font-normal">
                    {site.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <ClockIcon className="mt-0.5 shrink-0 text-caramel-deep" />
                <div>
                  <p className="font-bold">Hours</p>
                  <p>{site.contact.hours}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <PackageIcon className="mt-0.5 shrink-0 text-caramel-deep" />
                <div>
                  <p className="font-bold">Where&rsquo;s my order?</p>
                  <p>
                    The quickest answer is on our{" "}
                    <Link href="/track" className="link font-normal">
                      order tracking page
                    </Link>
                    .
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <p className="px-1 text-ink-soft">
            Wondering about fit, washing or delivery? Our{" "}
            <Link href="/#faq" className="link text-ink">
              FAQ
            </Link>{" "}
            answers most questions.
          </p>
        </aside>
      </div>
    </>
  );
}

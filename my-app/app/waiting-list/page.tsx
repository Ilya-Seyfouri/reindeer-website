import type { Metadata } from "next";
import Image from "next/image";
import { WaitlistForm } from "@/app/waiting-list/WaitlistForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { CheckIcon } from "@/components/ui/icons";
import { comparison, waitlist } from "@/config/product";

export const metadata: Metadata = {
  title: "Waiting list",
  description: "Be first to hear about Rudy & Co. restocks and new designs.",
};

export default function WaitingListPage() {
  return (
    <>
      <PageHeader compact title={waitlist.title} intro={waitlist.intro} />
      <div className="wrap grid gap-8 pb-14 md:gap-12 md:pb-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <WaitlistForm />
        <aside
          className="enter flex flex-col gap-4 self-start rounded-3xl bg-fawn-soft p-5 sm:gap-6 sm:p-8"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="size-14 shrink-0 overflow-hidden rounded-full shadow-[0_0_0_4px_var(--color-fawn)] sm:size-20 sm:shadow-[0_0_0_5px_var(--color-fawn)]">
              <Image
                src={comparison.photo.src}
                alt={comparison.photo.alt}
                placeholder="blur"
                sizes="80px"
                className="size-full object-cover"
              />
            </div>
            <h2 className="font-display text-[1.375rem] leading-tight sm:text-[1.625rem]">What you&rsquo;ll get</h2>
          </div>
          <ul className="flex flex-col gap-3 sm:gap-4">
            {waitlist.perks.map((perk) => (
              <li key={perk} className="flex items-start gap-3 sm:gap-3.5">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-cocoa text-white sm:size-7">
                  <CheckIcon size={16} strokeWidth={2.5} />
                </span>
                <span className="leading-snug sm:text-lg">{perk}</span>
              </li>
            ))}
          </ul>
          <p className="border-t border-line-strong/50 pt-4 text-[0.9375rem] leading-snug text-ink-soft sm:pt-5 sm:text-base">
            No spam. Just the emails you signed up for, and you can unsubscribe with one click.
          </p>
        </aside>
      </div>
    </>
  );
}

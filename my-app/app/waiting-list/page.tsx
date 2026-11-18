import type { Metadata } from "next";
import { WaitlistForm } from "@/app/waiting-list/WaitlistForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { CheckIcon } from "@/components/ui/icons";
import { Placeholder } from "@/components/ui/Placeholder";
import { waitlist } from "@/config/product";

export const metadata: Metadata = {
  title: "Waiting list",
  description: "Be first to hear about Rudy & Co. restocks and new designs.",
};

export default function WaitingListPage() {
  return (
    <>
      <PageHeader title={waitlist.title} intro={waitlist.intro} />
      <div className="wrap grid gap-12 pb-20 md:pb-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <WaitlistForm />
        <aside
          className="enter flex flex-col gap-6 self-start rounded-3xl bg-fawn-soft p-6 sm:p-8"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          <div className="flex items-center gap-5">
            <div className="size-20 shrink-0 overflow-hidden rounded-full shadow-[0_0_0_5px_var(--color-fawn)]">
              <Placeholder label="PHOTO" ratio="1:1" compact className="rounded-full" />
            </div>
            <h2 className="font-display text-[1.625rem] leading-tight">What you&rsquo;ll get</h2>
          </div>
          <ul className="flex flex-col gap-4">
            {waitlist.perks.map((perk) => (
              <li key={perk} className="flex items-start gap-3.5">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-cocoa text-white">
                  <CheckIcon size={16} strokeWidth={2.5} />
                </span>
                <span className="text-lg">{perk}</span>
              </li>
            ))}
          </ul>
          <p className="border-t border-line-strong/50 pt-5 text-ink-soft">
            No spam. Just the emails you signed up for, and you can unsubscribe with one click.
          </p>
        </aside>
      </div>
    </>
  );
}

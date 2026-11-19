import type { Metadata } from "next";
import { TrackForm } from "@/app/track/TrackForm";
import { MailIcon, PackageIcon, TruckIcon } from "@/components/ui/icons";
import { Ph } from "@/components/ui/Placeholder";
import { shipping, site } from "@/config/product";

export const metadata: Metadata = {
  title: "Track your order",
  description: "Check where your Rudy & Co. order is.",
};

export default function TrackPage() {
  return (
    <>
      <TrackForm />
      <section aria-label="Help with tracking" className="wrap grid gap-5 pt-12 pb-20 sm:grid-cols-3 md:pt-16 md:pb-28">
        <div className="rounded-3xl bg-fawn-soft p-6 sm:p-7">
          <h2 className="flex items-center gap-3 font-display text-[1.5rem] leading-tight">
            <PackageIcon className="shrink-0 text-caramel-deep" />
            Can&rsquo;t find your order number?
          </h2>
          <p className="mt-2">
            It starts with <strong>RC-</strong> and is in the subject line of your order confirmation email. Check your
            spam or promotions folder too.
          </p>
        </div>
        <div className="rounded-3xl bg-fawn-soft p-6 sm:p-7">
          <h2 className="flex items-center gap-3 font-display text-[1.5rem] leading-tight">
            <TruckIcon className="shrink-0 text-caramel-deep" />
            When will it arrive?
          </h2>
          <p className="mt-2">
            We pack orders in <Ph>{shipping.processing}</Ph>, then delivery takes <Ph>{shipping.delivery}</Ph> to{" "}
            <Ph>{shipping.regions}</Ph>.
          </p>
        </div>
        <div className="rounded-3xl bg-fawn-soft p-6 sm:p-7">
          <h2 className="flex items-center gap-3 font-display text-[1.5rem] leading-tight">
            <MailIcon className="shrink-0 text-caramel-deep" />
            Still stuck?
          </h2>
          <p className="mt-2">
            Email{" "}
            <a href={`mailto:${site.contact.email}`} className="link">
              {site.contact.email}
            </a>{" "}
            and we&rsquo;ll look it up for you, usually {site.contact.replyTime}.
          </p>
        </div>
      </section>
    </>
  );
}

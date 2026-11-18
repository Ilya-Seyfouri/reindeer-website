import type { Metadata } from "next";
import { TrackForm } from "@/app/track/TrackForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Ph } from "@/components/ui/Placeholder";
import { shipping, site } from "@/config/product";

export const metadata: Metadata = {
  title: "Track your order",
  description: "Check where your Rudy & Co. order is.",
};

export default function TrackPage() {
  return (
    <>
      <PageHeader
        title="Track your order"
        intro={
          <>
            Enter the order number from your confirmation email and the email address you used. Orders ship in{" "}
            <Ph>{shipping.processing}</Ph>.
          </>
        }
      />
      <div className="wrap grid gap-12 pb-20 md:pb-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <TrackForm />
        <aside className="enter self-start rounded-3xl bg-fawn-soft p-6 sm:p-8" style={{ "--i": 2 } as React.CSSProperties}>
          <h2 className="font-display text-[1.625rem]">Can&rsquo;t find your order number?</h2>
          <p className="mt-3">
            It starts with <strong>RC-</strong> and is in the subject line of your order confirmation email. Check your
            spam or promotions folder too.
          </p>
          <p className="mt-4">
            Still stuck? Email{" "}
            <a href={`mailto:${site.contact.email}`} className="link">
              {site.contact.email}
            </a>{" "}
            and we&rsquo;ll look it up for you, usually {site.contact.replyTime}.
          </p>
        </aside>
      </div>
    </>
  );
}

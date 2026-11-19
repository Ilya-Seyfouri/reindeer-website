import type { Metadata } from "next";
import Link from "next/link";
import { ReturnForm } from "@/app/returns/ReturnForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { guarantee } from "@/config/product";

export const metadata: Metadata = {
  title: "Start a return",
  description: "Request a return for your Rudy & Co. order.",
};

const RULES = [
  "Have your order number and the email you ordered with to hand.",
  "We review every request, usually within 2 business days.",
  "You'll get a return reference by email to put on the parcel.",
  `Every order comes with ${guarantee.days}-day returns.`,
];

export default function ReturnsPage() {
  return (
    <>
      <PageHeader
        title="Start a return"
        intro="Tell us about your order and we'll take it from there. You'll get a reference to put on the parcel."
      />
      <div className="wrap grid gap-12 pb-20 md:pb-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <ReturnForm />
        <aside
          className="enter flex flex-col gap-5 self-start rounded-3xl bg-fawn-soft p-6 sm:p-8"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          <h2 className="font-display text-[1.625rem] leading-tight">How it works</h2>
          <ul className="flex list-disc flex-col gap-3 pl-5">
            {RULES.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
          <p className="border-t border-line-strong/50 pt-5 text-ink-soft">
            Returns are subject to our{" "}
            <Link href="/refund-policy" className="link text-ink">
              refund policy
            </Link>
            .
          </p>
        </aside>
      </div>
    </>
  );
}

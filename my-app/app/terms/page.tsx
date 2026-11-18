import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { Ph } from "@/components/ui/Placeholder";
import { shipping, site } from "@/config/product";

export const metadata: Metadata = {
  title: "Terms of service",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of service"
      summary={
        <>
          These terms cover buying from {site.name}. In short: we describe our products honestly, charge what we show
          at checkout, ship as promised, and stand behind our refund policy.
        </>
      }
    >
      <h2>1. Who we are</h2>
      <p>
        This website is run by <Ph>{site.legal.businessName}</Ph>, <Ph>{site.legal.address}</Ph> (&ldquo;we&rdquo;,
        &ldquo;us&rdquo;). By using this site or placing an order, you agree to these terms.
      </p>

      <h2>2. Orders</h2>
      <p>
        When you place an order you&rsquo;ll receive an email confirming we&rsquo;ve received it. Your order is accepted
        when we ship it. We may cancel an order and refund you in full if an item is out of stock or there is an error
        in its price or description.
      </p>

      <h2>3. Prices and payment</h2>
      <p>
        Prices are shown in US dollars. Applicable sales tax is calculated at checkout. Payments are processed securely
        by Stripe; we never see or store your full card details. Bundle discounts are applied automatically and cannot be
        combined with other offers unless we say so.
      </p>

      <h2>4. Shipping</h2>
      <p>
        We ship to <Ph>{shipping.regions}</Ph>. Orders are usually packed within <Ph>{shipping.processing}</Ph> and
        delivered in <Ph>{shipping.delivery}</Ph>. Delivery times are estimates and can be affected by carriers and
        holidays. Risk of loss passes to you on delivery.
      </p>

      <h2>5. Returns and refunds</h2>
      <p>
        Returns are covered by our <Link href="/refund-policy">refund policy</Link>.
      </p>

      <h2>6. Using the costume safely</h2>
      <ul>
        <li>Always supervise your dog while it wears the costume.</li>
        <li>Don&rsquo;t leave the costume on an unattended dog or let your dog chew it.</li>
        <li>Remove it if your dog seems uncomfortable, overheated or distressed.</li>
      </ul>

      <h2>7. Product information</h2>
      <p>
        We do our best to show colours and details accurately. Your screen and your dog&rsquo;s shape may make the
        costume look slightly different in person.
      </p>

      <h2>8. Our liability</h2>
      <p>
        Nothing in these terms limits rights you have under consumer protection law. To the extent the law allows, our
        total liability for any order is limited to the amount you paid for it.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These terms are governed by the laws of <Ph>{site.legal.governingLaw}</Ph>, without regard to its conflict of
        law rules.
      </p>

      <h2>10. Changes</h2>
      <p>
        We may update these terms from time to time. The version on this page when you place your order is the one that
        applies to it.
      </p>
    </LegalPage>
  );
}

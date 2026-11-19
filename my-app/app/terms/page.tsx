import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { Ph } from "@/components/ui/Placeholder";
import { guarantee, shipping, site } from "@/config/product";

export const metadata: Metadata = {
  title: "Terms of service",
};

export default function TermsPage() {
  const { legal } = site;
  return (
    <LegalPage
      title="Terms of service"
      summary={
        <>
          These terms cover using this site and buying from {site.name}. In short: we describe our costumes honestly,
          charge what we show at checkout, ship for free, and offer {guarantee.days}-day returns.
        </>
      }
    >
      <h2>1. Who we are</h2>
      <p>
        This website is run by {legal.businessName}, based in {legal.location} (&ldquo;we&rdquo;, &ldquo;us&rdquo;). By using this site or placing an order, you agree to
        these terms. If you don&rsquo;t agree, please don&rsquo;t use the site.
      </p>

      <h2>2. Orders</h2>
      <p>
        When you place an order you&rsquo;ll receive an email confirming we&rsquo;ve received it. Your order is accepted
        when we ship it. We may cancel an order and refund you in full if an item is out of stock, if there is an error
        in its price or description, or if we suspect fraud. You must be 18 or over to place an order.
      </p>

      <h2>3. Prices and payment</h2>
      <p>
        Prices are shown in US dollars. Any sales tax or import charges that apply are shown at checkout. Payments are
        processed securely by Stripe; we never see or store your full card details. Bundle deals are applied
        automatically and can&rsquo;t be combined with other offers unless we say so. We may change prices at any time,
        but the price shown when you order is the one you pay.
      </p>

      <h2>4. Shipping</h2>
      <p>
        Shipping is free on every order. We ship to <Ph>{shipping.regions}</Ph>. Orders are usually packed within{" "}
        <Ph>{shipping.processing}</Ph> and delivered in <Ph>{shipping.delivery}</Ph>. Delivery times are estimates and
        can be affected by carriers and holidays. The costume is your responsibility once it has been delivered.
      </p>

      <h2>5. Returns and refunds</h2>
      <p>
        Returns and refunds are handled under our <Link href="/refund-policy">refund policy</Link>, which forms part
        of these terms. None of this affects your statutory rights.
      </p>

      <h2>6. Using the costume safely</h2>
      <ul>
        <li>Always supervise your dog while it wears the costume.</li>
        <li>Don&rsquo;t leave the costume on an unattended dog or let your dog chew or swallow any part of it.</li>
        <li>Remove it if your dog seems uncomfortable, overheated or distressed.</li>
        <li>The costume is for dress-up and photos, not a toy, a coat for extreme weather or a safety harness.</li>
      </ul>

      <h2>7. Product information</h2>
      <p>
        We do our best to show colours and details accurately. Your screen and your dog&rsquo;s shape may make the
        costume look slightly different in person. Photos of dogs on this site show how the costume can look; every dog
        is different.
      </p>

      <h2>8. Using this site</h2>
      <p>
        Please don&rsquo;t misuse the site: no attempts to break in, overload it, scrape it in bulk or interfere with how
        it works. We may suspend access or cancel orders where we reasonably suspect misuse or fraud.
      </p>

      <h2>9. Our content</h2>
      <p>
        The {site.name} name, logo, photos, designs, drawings and text on this site belong to us or the people who
        licensed them to us. You can share links to the site, but please don&rsquo;t copy or reuse our content without
        asking first.
      </p>

      <h2>10. Availability</h2>
      <p>
        We work to keep the site running smoothly but can&rsquo;t promise it will always be available or error-free.
        Costumes are released in limited drops and may sell out; joining the waiting list doesn&rsquo;t reserve one for
        you.
      </p>

      <h2>11. Our liability</h2>
      <p>
        Nothing in these terms limits our liability for death or personal injury caused by our negligence, for fraud, or
        for anything else that can&rsquo;t be limited by law, and nothing affects your rights under consumer protection
        law. Otherwise, to the extent the law allows, we aren&rsquo;t responsible for indirect or unforeseeable losses,
        and our total liability for any order is limited to the amount you paid for it.
      </p>

      <h2>12. Changes to these terms</h2>
      <p>
        We may update these terms from time to time; the date at the top of this page shows the latest change. The
        version on this page when you place your order is the one that applies to it.
      </p>

      <h2>13. Governing law</h2>
      <p>
        These terms are governed by the laws of {legal.governingLaw}, and the courts of {legal.governingLaw} have
        jurisdiction. If you live elsewhere, you keep the protection of any mandatory consumer laws where you live and
        can bring a claim in your local courts.
      </p>

      <h2>14. Contact</h2>
      <p>
        Questions about these terms? Email <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> or use our{" "}
        <Link href="/contact">contact form</Link>.
      </p>
    </LegalPage>
  );
}

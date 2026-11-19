import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/config/product";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${site.name} collects, uses and protects your information.`,
};

export default function PrivacyPage() {
  const { legal } = site;
  const email = <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>;
  return (
    <LegalPage
      title="Privacy policy"
      summary={
        <>
          We collect only what we need to send your order, answer your questions and run the shop. We never sell your
          information, we don&rsquo;t run ads, and our analytics don&rsquo;t use cookies.
        </>
      }
    >
      <h2>1. Who we are</h2>
      <p>
        This website is run by {legal.businessName}, based in {legal.location}. We are the &ldquo;controller&rdquo; of the personal information described here. You can
        reach us about anything in this policy at {email}.
      </p>

      <h2>2. What we collect</h2>
      <p>
        <strong>When you order:</strong> your name, email address, shipping address, phone number if you give one, what
        you bought and your order number. Payment details go straight to Stripe; we never see or store your full card
        number.
      </p>
      <p>
        <strong>When you join the waiting list:</strong> your email address, when you joined and where on the site you
        signed up.
      </p>
      <p>
        <strong>When you contact us:</strong> your name, email, order number if you add one, and your message.
      </p>
      <p>
        <strong>When you browse:</strong> pages viewed, buttons tapped, how far you scroll, the link or ad that brought
        you here, your browser and device type, and an approximate location (country or city) worked out from your IP
        address. We may also record anonymised replays of visits to see where the site is confusing; anything you type
        is hidden in these replays.
      </p>
      <p>
        We don&rsquo;t collect sensitive information, and we don&rsquo;t buy information about you from anyone else.
      </p>

      <h2>3. Cookies and storage</h2>
      <p>
        We don&rsquo;t use advertising or tracking cookies, and our analytics run without cookies or storing anything on
        your device. The only thing the site keeps in your browser is your shopping cart, so it&rsquo;s still there
        when you come back. That&rsquo;s needed for the shop to work, so it doesn&rsquo;t need your consent.
      </p>

      <h2>4. How we use it, and why we&rsquo;re allowed to</h2>
      <ul>
        <li>
          <strong>To take, ship and support your order</strong>, including returns and refunds. This is needed to carry
          out our contract with you.
        </li>
        <li>
          <strong>To email you when a drop goes live</strong>, if you joined the waiting list. This is based on your
          consent, which you can withdraw at any time using the unsubscribe link in any email.
        </li>
        <li>
          <strong>To answer your messages.</strong> This is in our legitimate interest in helping our customers.
        </li>
        <li>
          <strong>To understand how the site is used and improve it</strong>, and to prevent fraud and misuse. This is
          in our legitimate interest in running a working, safe shop.
        </li>
        <li>
          <strong>To meet legal duties</strong>, such as keeping tax and accounting records.
        </li>
      </ul>

      <h2>5. Who we share it with</h2>
      <p>
        We never sell or rent your information. We share it only with the companies that help us run the shop, and
        only what each one needs:
      </p>
      <ul>
        <li>
          <strong>Stripe</strong>: takes your payment.
        </li>
        <li>
          <strong>Supabase</strong>: stores the waiting list and shop settings.
        </li>
        <li>
          <strong>PostHog</strong> (EU hosting): site analytics and visit replays, without cookies.
        </li>
        <li>
          <strong>Railway</strong> and <strong>Cloudflare</strong>: host the site and run our domain.
        </li>
        <li>
          <strong>Delivery companies</strong>: get your name and address so they can deliver your order.
        </li>
        <li>
          <strong>Our email provider</strong>: sends order and waiting-list emails.
        </li>
      </ul>
      <p>
        We may also share information if the law requires it, or to protect our customers, our business or others from
        fraud or harm.
      </p>

      <h2>6. Information leaving the UK</h2>
      <p>
        Some of these companies, such as Stripe, Railway and Cloudflare, process information in the United States. When
        that happens we rely on approved safeguards: the UK International Data Transfer Addendum and the EU Standard
        Contractual Clauses.
      </p>

      <h2>7. How long we keep it</h2>
      <ul>
        <li>Order records: 6 years, because tax and accounting law requires it.</li>
        <li>Waiting list: until you unsubscribe or ask us to remove you.</li>
        <li>Messages to us: up to 2 years after we last hear from you.</li>
        <li>Analytics and visit replays: up to 1 year.</li>
      </ul>

      <h2>8. Your rights</h2>
      <p>
        You can ask us to give you a copy of your information, correct it, delete it, limit how we use it, object to
        how we use it, or send it to you in a portable format. You can withdraw consent at any time. Email {email} and
        we&rsquo;ll reply within one month.
      </p>
      <p>
        If you live in a US state with its own privacy law, such as California, you have similar rights to know about,
        correct and delete your information. We don&rsquo;t sell or share personal information for advertising, so
        there&rsquo;s nothing to opt out of. We won&rsquo;t treat you differently for using your rights.
      </p>
      <p>
        If you&rsquo;re unhappy with how we handle your information, please tell us first. You can also complain to
        the UK Information Commissioner&rsquo;s Office (ico.org.uk) or your local data protection authority.
      </p>

      <h2>9. Children</h2>
      <p>
        This shop isn&rsquo;t meant for children, and you must be 18 or over to place an order. We don&rsquo;t knowingly
        collect information from anyone under 13; if we learn we have, we&rsquo;ll delete it.
      </p>

      <h2>10. Keeping it safe</h2>
      <p>
        Information is encrypted in transit, access is limited to the people who need it, and our database is locked so
        the public can&rsquo;t read it. If a breach ever affects your rights, we&rsquo;ll tell you and the relevant
        authority as the law requires.
      </p>

      <h2>11. Changes to this policy</h2>
      <p>
        We may update this policy from time to time; the date at the top shows the latest change. If we make a
        significant change, we&rsquo;ll say so on the site. See also our <Link href="/terms">terms of service</Link> and{" "}
        <Link href="/refund-policy">refund policy</Link>.
      </p>
    </LegalPage>
  );
}

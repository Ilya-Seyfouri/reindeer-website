import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { Ph } from "@/components/ui/Placeholder";
import { guarantee, site } from "@/config/product";

export const metadata: Metadata = {
  title: "Refund policy",
  description: `Our ${guarantee.days}-day ${guarantee.name}: full refunds, no awkward questions.`,
};

export default function RefundPolicyPage() {
  const days = <Ph>{guarantee.days}</Ph>;
  return (
    <LegalPage
      title="Refund policy"
      summary={
        <>
          You have {days} days from delivery to return the costume for a full refund. Just email us first and
          we&rsquo;ll walk you through it.
        </>
      }
    >
      <h2>Our {guarantee.name}</h2>
      <p>
        We want you and your dog to love your costume. If you don&rsquo;t, you can return it within {days} days of
        delivery for a full refund of the item price.
      </p>

      <h2>Doesn&rsquo;t fit?</h2>
      <p>
        The costume is one size with an adjustable strap. If it still doesn&rsquo;t fit your dog, return it for a full
        refund. We&rsquo;ll email you a prepaid return label{" "}
        <Ph>[PLACEHOLDER: or ask you to ship it back at our cost]</Ph>.
      </p>

      <h2>How to start a return</h2>
      <ul>
        <li>
          Email <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> with your order number and a quick
          note on what went wrong.
        </li>
        <li>We&rsquo;ll reply {site.contact.replyTime} with return instructions and the return address.</li>
        <li>Pack the costume securely and send it back within 14 days of getting our instructions.</li>
      </ul>

      <h2>Condition of returns</h2>
      <p>
        We accept costumes that have been tried on or worn, as long as they are clean and undamaged. Please wash the
        costume before sending it back. <Ph>[PLACEHOLDER: adjust if you only accept unworn items]</Ph>
      </p>

      <h2>Refunds</h2>
      <p>
        Once we receive your return, we&rsquo;ll email you and refund your original payment method within{" "}
        <Ph>5 business days</Ph>. Your bank may take a few more days to show it. Original shipping costs are{" "}
        <Ph>[PLACEHOLDER: refunded / not refunded]</Ph>.
      </p>

      <h2>Damaged or wrong items</h2>
      <p>
        If your order arrives damaged or you received the wrong item, email us within 7 days with a photo and we&rsquo;ll
        send a replacement right away. You won&rsquo;t need to return the faulty item.
      </p>

      <h2>Bundle orders</h2>
      <p>
        You can return part of a bundle. The refund will be the price you paid for that costume after the bundle
        discount.
      </p>
    </LegalPage>
  );
}

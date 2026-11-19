import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { guarantee } from "@/config/product";

export const metadata: Metadata = {
  title: "Refund policy",
  description: `${guarantee.days}-day returns on Rudy & Co. costumes. Start a return online in a minute.`,
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund policy"
      summary={
        <>
          We want you and your dog to love your costume. You have {guarantee.days} days to return it, and starting a
          return takes about a minute on our <Link href="/returns">returns page</Link>.
        </>
      }
    >
      <h2>Our {guarantee.days}-day returns</h2>
      <p>
        Every order comes with {guarantee.days}-day returns. To keep things fair for everyone, returns are accepted on
        costumes that are in new, resaleable condition: unopened, in their original packaging and with the
        tamper-evident seal intact. The {guarantee.days} days are counted from the date your order was placed, and your
        return must reach us within that time.
      </p>

      <h2>Starting a return</h2>
      <p>
        Returns are requested on our <Link href="/returns">returns page</Link>; requests made by email or social media
        can&rsquo;t be processed. Return requests must be submitted within 14 days of delivery, and each order can have
        one request. Once your request is reviewed (usually within 2 business days), you&rsquo;ll receive a return
        reference by email.
      </p>

      <h2>Sending it back</h2>
      <p>
        Approved returns are processed at our returns facility in the United Kingdom. Please send your parcel by a
        tracked and insured service within 7 days of approval, with your return reference on the outside. Return
        postage, insurance and any customs or import charges are the customer&rsquo;s responsibility. Parcels without a
        valid reference, sent after 7 days, or arriving after the return period can&rsquo;t be accepted and will be
        returned to sender at the customer&rsquo;s cost.
      </p>

      <h2>Inspection</h2>
      <p>
        All returns are inspected on arrival. Costumes with a broken or missing seal, signs of handling, or packaging
        that isn&rsquo;t the original can&rsquo;t be refunded under this policy. Because our costumes are worn against
        your pet&rsquo;s fur, we&rsquo;re unable to accept items that have been tried on.
      </p>

      <h2>How you&rsquo;re refunded</h2>
      <p>
        Accepted returns are refunded as Rudy &amp; Co. store credit, which is usually the quickest option and can be
        used on any future drop. If you&rsquo;d prefer a refund to your original payment method, reply to your approval
        email within 7 days to let us know. A $6 inspection and restocking fee is deducted from each change-of-mind
        return. Store credit is valid for 12 months from the date it&rsquo;s issued.
      </p>

      <h2>Bundles and offers</h2>
      <p>
        Bundle offers such as &ldquo;Buy 3, Get 3 FREE&rdquo; apply to the order as a whole. If part of a bundle is
        returned, the offer no longer applies to the order: the costumes you keep are re-priced at the single-costume
        price, and the difference is deducted from your refund. This can mean that no refund is due.
      </p>

      <h2>Damaged, faulty or incorrect items</h2>
      <p>
        If something&rsquo;s wrong with your order, we&rsquo;ll put it right. Let us know through the returns page within
        48 hours of delivery, including photos of the outer box and the sealed packaging as they arrived, taken before
        opening. Claims without photos of the unopened delivery can&rsquo;t be assessed. Eligible items are replaced,
        subject to availability, or refunded as store credit.
      </p>

      <h2>Other information</h2>
      <p>
        Sale items, items bought during a drop, and items bought with store credit are covered by the same terms as
        every other order. We reserve the right to decline returns where we see unusual or repeated return activity on
        an account, address or payment method. Nothing in this policy affects your statutory rights. If you are a
        consumer in the United Kingdom or European Union, you may also have a statutory right to cancel your contract
        within 14 days of receiving your goods by giving us a clear statement of your decision, in which case you must
        return the goods within 14 days at your own cost, we will refund you using the original method of payment
        within 14 days of receiving them, and we may reduce the refund to reflect any diminished value of the goods
        resulting from handling beyond what is necessary to establish their nature, characteristics and functioning,
        which may be up to the full value of the goods.
      </p>
    </LegalPage>
  );
}

import Link from "next/link";
import { BuyButton } from "@/components/home/BuyButton";
import { GuaranteeSeal } from "@/components/ui/GuaranteeSeal";
import { Ph } from "@/components/ui/Placeholder";
import { guarantee } from "@/config/product";

export function Guarantee() {
  return (
    <section aria-labelledby="guarantee-title" className="section bg-fawn">
      <div className="wrap flex flex-col items-start gap-10 md:flex-row md:items-center md:gap-16 lg:gap-24">
        <div className="reveal">
          <GuaranteeSeal className="size-44 sm:size-52" />
        </div>
        <div className="max-w-[40rem]">
          <h2 id="guarantee-title" className="reveal h-section">
            Love it, or get your money back
          </h2>
          <p className="reveal lead mt-5">
            Try it at home for <Ph>{guarantee.days}</Ph> days. If it doesn&rsquo;t fit right or your dog just isn&rsquo;t
            a fan, send it back for a full refund. No forms to fight with, no awkward questions.
          </p>
          <p className="reveal mt-4">
            <Link href="/refund-policy" className="link">
              Read our refund policy
            </Link>
          </p>
          <BuyButton className="reveal mt-9" />
        </div>
      </div>
    </section>
  );
}

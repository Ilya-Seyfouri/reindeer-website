import Link from "next/link";
import { BuyButton } from "@/components/home/BuyButton";
import { GuaranteeSeal } from "@/components/ui/GuaranteeSeal";
import { Ph } from "@/components/ui/Placeholder";
import { guarantee } from "@/config/product";

export function Guarantee() {
  return (
    <section data-section="guarantee" aria-labelledby="guarantee-title" className="section bg-fawn">
      {/* Centred, phone-first; bigger screens get the same block with more room. */}
      <div className="wrap flex flex-col items-center gap-8 text-center">
        <div className="reveal">
          <GuaranteeSeal className="size-40 sm:size-48" />
        </div>
        <div className="flex max-w-[34rem] flex-col items-center">
          <h2 id="guarantee-title" className="reveal h-section">
            {guarantee.days} days to change your mind
          </h2>
          <p className="reveal lead mt-4">
            Every order comes with <Ph>{guarantee.days}</Ph>-day returns, and starting one takes about a minute online.
            If anything ever arrives damaged, we&rsquo;ll put it right.
          </p>
          <p className="reveal mt-4">
            <Link href="/refund-policy" className="link">
              How returns work
            </Link>
          </p>
          <BuyButton className="reveal mt-8 items-center" />
        </div>
      </div>
    </section>
  );
}

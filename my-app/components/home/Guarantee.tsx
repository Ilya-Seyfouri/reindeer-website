import Image from "next/image";
import Link from "next/link";
import guaranteePhoto from "@/app/images/hero4.png";
import { BuyButton } from "@/components/home/BuyButton";
import { GuaranteeSeal } from "@/components/ui/GuaranteeSeal";
import { Ph } from "@/components/ui/Placeholder";
import { guarantee } from "@/config/product";

export function Guarantee() {
  return (
    <section data-section="guarantee" aria-labelledby="guarantee-title" className="section bg-fawn">
      {/* Centred, phone-first; bigger screens get the same block with more room. */}
      <div className="wrap flex flex-col items-center gap-8 text-center">
        <div className="reveal relative w-full max-w-[22rem] pb-10 pl-10 sm:max-w-[26rem]">
          <Image
            src={guaranteePhoto}
            alt="A German shepherd in the reindeer hood with plush antlers"
            placeholder="blur"
            sizes="(min-width: 640px) 26rem, 22rem"
            className="aspect-[4/5] w-full rounded-3xl bg-fawn-soft object-cover shadow-[0_18px_40px_-24px_oklch(0.3_0.05_50/0.55)]"
          />
          <GuaranteeSeal className="absolute bottom-0 left-0 size-32 drop-shadow-[0_8px_16px_oklch(0.22_0.035_50/0.35)] sm:size-40" />
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

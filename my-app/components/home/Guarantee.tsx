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
      <div className="wrap flex flex-col items-start gap-10 md:flex-row md:items-center md:gap-16 lg:gap-24">
        <div className="reveal relative w-full max-w-[22rem] shrink-0 pb-10 pl-10 sm:max-w-[26rem]">
          <Image
            src={guaranteePhoto}
            alt="A German shepherd in the reindeer hood with plush antlers"
            placeholder="blur"
            sizes="(min-width: 640px) 26rem, 22rem"
            className="aspect-[4/5] w-full rounded-3xl bg-fawn-soft object-cover shadow-[0_18px_40px_-24px_oklch(0.3_0.05_50/0.55)]"
          />
          <GuaranteeSeal className="absolute bottom-0 left-0 size-32 drop-shadow-[0_8px_16px_oklch(0.22_0.035_50/0.35)] sm:size-40" />
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

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
      {/* Photo on the left. Phones pair it with the heading and run the rest full width
          underneath; bigger screens keep everything in the right-hand column. */}
      <div className="wrap grid max-w-[62rem] grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-x-5 gap-y-6 sm:gap-x-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-x-16 md:gap-y-0">
        <div className="reveal relative pb-6 pl-6 sm:pb-10 sm:pl-10 md:row-span-2">
          <Image
            src={guaranteePhoto}
            alt="A German shepherd in the reindeer hood with plush antlers"
            placeholder="blur"
            sizes="(min-width: 768px) 26rem, 40vw"
            className="aspect-[4/5] w-full rounded-3xl bg-fawn-soft object-cover shadow-[0_18px_40px_-24px_oklch(0.3_0.05_50/0.55)]"
          />
          <GuaranteeSeal className="absolute bottom-0 left-0 size-20 drop-shadow-[0_8px_16px_oklch(0.22_0.035_50/0.35)] sm:size-32 md:size-40" />
        </div>
        <h2 id="guarantee-title" className="reveal h-section text-[1.875rem] leading-[1.05] sm:text-[clamp(2rem,1.55rem+2.2vw,3.25rem)] md:self-end">
          {guarantee.days} days to change your mind
        </h2>
        <div className="col-span-2 flex flex-col items-start md:col-span-1 md:col-start-2 md:mt-5 md:self-start">
          <p className="reveal lead">
            Every order comes with <Ph>{guarantee.days}</Ph>-day returns, and starting one takes about a minute online.
            If anything ever arrives damaged, we&rsquo;ll put it right.
          </p>
          <p className="reveal mt-4">
            <Link href="/refund-policy" className="link">
              How returns work
            </Link>
          </p>
          <BuyButton className="reveal mt-8 w-full sm:w-auto" />
        </div>
      </div>
    </section>
  );
}

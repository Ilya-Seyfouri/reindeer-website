import { BuyButton } from "@/components/home/BuyButton";
import { LockIcon, ReturnIcon, TruckIcon } from "@/components/ui/icons";
import { Ph, Placeholder } from "@/components/ui/Placeholder";
import { guarantee, product, shipping } from "@/config/product";

export function FinalCta() {
  return (
    <section id="final-cta" aria-labelledby="final-title" className="on-dark section bg-cocoa text-white">
      <div className="wrap grid items-center gap-10 md:grid-cols-[1fr_0.8fr] md:gap-14 lg:gap-24">
        <div>
          <h2 id="final-title" className="reveal h-display max-w-[14ch]">
            Your dog, in the cosiest costume around
          </h2>
          <p className="reveal lead mt-5 max-w-[38ch] text-on-cocoa-soft">
            Pick a size, add to cart, and it&rsquo;s on its way in <Ph>{shipping.processing}</Ph>. Loved by{" "}
            <Ph>{product.happyDogs}</Ph> happy dogs and their people.
          </p>
          <BuyButton tone="light" className="reveal mt-9" />
          <ul className="reveal mt-9 flex flex-col gap-3 text-lg sm:flex-row sm:flex-wrap sm:gap-x-7">
            <li className="flex items-center gap-2.5">
              <TruckIcon className="text-fawn" /> Free shipping on 2+
            </li>
            <li className="flex items-center gap-2.5">
              <ReturnIcon className="text-fawn" /> <Ph>{guarantee.days}</Ph>-day guarantee
            </li>
            <li className="flex items-center gap-2.5">
              <LockIcon className="text-fawn" /> Secure checkout
            </li>
          </ul>
        </div>
        <div className="reveal mx-auto w-full max-w-[24rem] md:max-w-none">
          <Placeholder
            label="CLOSING PHOTO"
            detail="Happy dog in the costume looking at the camera"
            ratio="4:5"
            tone="deep"
            className="rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
}

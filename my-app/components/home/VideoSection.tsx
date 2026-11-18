import { BuyButton } from "@/components/home/BuyButton";
import { Placeholder } from "@/components/ui/Placeholder";
import { guarantee } from "@/config/product";

export function VideoSection() {
  return (
    <section aria-labelledby="video-title" className="on-dark section bg-cocoa text-white">
      <div className="wrap grid items-center gap-10 md:grid-cols-[minmax(0,0.85fr)_1fr] md:gap-14 lg:gap-24">
        <div className="reveal mx-auto w-full max-w-[26rem] md:order-2 md:max-w-none">
          {/*
            Swap in your ad clip:
            <video src="/video/ad.mp4" poster="/video/ad-poster.jpg" controls playsInline preload="metadata"
              className="aspect-[4/5] w-full rounded-3xl object-cover" />
          */}
          <Placeholder
            kind="video"
            label="VIDEO"
            detail="15–30 second clip from the ad they clicked. Vertical works best."
            ratio="4:5"
            tone="deep"
            className="rounded-3xl"
          />
        </div>
        <div className="md:order-1">
          <h2 id="video-title" className="reveal h-section max-w-[16ch]">
            Yes, it&rsquo;s the one from the video
          </h2>
          <p className="reveal lead mt-5 max-w-[38ch] text-on-cocoa-soft">
            Same soft suit, same perky antlers. Watch how quickly it goes on, and how happy the pups look wearing it.
          </p>
          <ul className="reveal-stagger mt-8 flex flex-col gap-4 text-lg">
            {[
              "Over the head, fasten under the tummy",
              "Antlers stand up on their own",
              "Dogs relax in it within a minute or two",
            ].map((line, i) => (
              <li key={line} className="flex items-center gap-3.5" style={{ "--i": i } as React.CSSProperties}>
                <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-fawn" />
                {line}
              </li>
            ))}
          </ul>
          <BuyButton
            tone="light"
            className="reveal mt-10"
            note={`${guarantee.days}-day money-back guarantee. Free shipping on 2 or more.`}
          />
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { Snowfall } from "@/components/layout/Snowfall";
import { fitShowcase } from "@/config/product";

/**
 * Three dogs, small to large, all in the same costume. On wider screens a
 * measuring rule runs under the photos and carries the captions.
 */
export function FitsEveryDog() {
  const { dogs } = fitShowcase;

  return (
    <section data-section="fits_every_dog" aria-labelledby="fits-title" className="section relative bg-fawn">
      <div className="wrap">
        <div className="mx-auto max-w-[40rem] text-center">
          <h2 id="fits-title" className="reveal h-section">
            {fitShowcase.title}
          </h2>
          <p className="reveal lead mx-auto mt-5 max-w-[36ch]">{fitShowcase.intro}</p>
        </div>

        {/* Phones: swipe through, with the next photo peeking in */}
        <ul
          aria-label="The costume on small, medium and large dogs"
          className="-mx-(--safe-left) mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-(--safe-left) pb-2 [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden"
          style={{ scrollPaddingInline: "var(--safe-left)" }}
        >
          {dogs.map((dog) => (
            <li key={dog.size} className="w-[74%] shrink-0 snap-start">
              <Image
                src={dog.photo}
                alt={`${dog.name} the ${dog.breed} wearing the costume`}
                placeholder="blur"
                sizes="74vw"
                className="aspect-[4/5] w-full rounded-3xl bg-fawn-soft object-cover"
              />
              <p className="mt-4 font-display text-[1.625rem] leading-none">{dog.size}</p>
              <p className="mt-1.5 text-ink-soft">
                {dog.name}, {dog.breed} · {dog.weight}
              </p>
            </li>
          ))}
        </ul>

        {/* Tablet and up: three photos on a measuring rule */}
        <div className="mx-auto mt-14 hidden max-w-[66rem] sm:block">
          <ul className="reveal-stagger grid grid-cols-3 gap-5 lg:gap-8">
            {dogs.map((dog, i) => (
              <li key={dog.size} style={{ "--i": i } as React.CSSProperties}>
                <Image
                  src={dog.photo}
                  alt={`${dog.name} the ${dog.breed} wearing the costume`}
                  placeholder="blur"
                  sizes="(min-width: 1024px) 340px, 31vw"
                  className="aspect-[4/5] w-full rounded-3xl bg-fawn-soft object-cover"
                />
              </li>
            ))}
          </ul>

          <div aria-hidden="true" className="reveal-fade relative mt-8 h-3">
            <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-cocoa/60" />
            <div
              className="absolute inset-x-0 bottom-0 h-2"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, oklch(0.3 0.05 50 / 0.45) 0 1.5px, transparent 1.5px 18px)",
              }}
            />
          </div>
          <ul className="grid grid-cols-3 gap-5 lg:gap-8">
            {dogs.map((dog) => (
              <li key={dog.size} className="reveal relative flex flex-col items-center pt-5 text-center">
                <span aria-hidden="true" className="absolute -top-2 size-4 rounded-full bg-cocoa ring-4 ring-fawn" />
                <span className="font-display text-[1.75rem] leading-none">{dog.size}</span>
                <span className="mt-2 text-ink-soft">
                  {dog.name}, {dog.breed} · {dog.weight}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Snowfall />
    </section>
  );
}

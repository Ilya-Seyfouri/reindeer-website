import { BuyButton } from "@/components/home/BuyButton";
import { benefitIcons } from "@/components/ui/icons";
import { Placeholder } from "@/components/ui/Placeholder";
import { benefits } from "@/config/product";

export function Benefits() {
  return (
    <section aria-labelledby="benefits-title" className="section">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
        <div className="reveal lg:order-2">
          <Placeholder
            label="LIFESTYLE PHOTO"
            detail="Dog relaxing at home in the costume, owner nearby"
            ratio="4:5"
            className="rounded-3xl"
          />
        </div>

        <div className="lg:order-1">
          <h2 id="benefits-title" className="reveal h-section max-w-[14ch]">
            Comfy for them. Easy for you.
          </h2>
          <p className="reveal lead mt-5 max-w-[40ch] text-ink-soft">
            We made it for real dogs and real hands: soft, simple and sturdy enough to wear again next year.
          </p>

          <ul className="reveal-stagger mt-10 flex flex-col">
            {benefits.map((benefit, i) => {
              const Icon = benefitIcons[benefit.icon];
              return (
                <li
                  key={benefit.title}
                  className="flex gap-5 border-t border-line py-6 last:border-b"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-fawn text-cocoa">
                    <Icon size={24} />
                  </span>
                  <div>
                    <h3 className="h-card">{benefit.title}</h3>
                    <p className="mt-1.5 max-w-[46ch] text-ink-soft">{benefit.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <BuyButton className="reveal mt-10" />
        </div>
      </div>
    </section>
  );
}

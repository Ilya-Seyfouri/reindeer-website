import Image from "next/image";
import { BuyButton } from "@/components/home/BuyButton";
import {
  AntlersIcon,
  CheckIcon,
  ClockIcon,
  CloseIcon,
  LeafIcon,
  RulerIcon,
  ShieldIcon,
  WashIcon,
} from "@/components/ui/icons";
import { comparison, guarantee } from "@/config/product";

const icons = {
  leaf: LeafIcon,
  ruler: RulerIcon,
  clock: ClockIcon,
  wash: WashIcon,
  antlers: AntlersIcon,
  shield: ShieldIcon,
} as const;

/** Rudy & Co. against typical costumes, with our column raised as a fawn pillar. */
export function Comparison() {
  const last = comparison.rows.length - 1;

  return (
    <section data-section="comparison" aria-labelledby="compare-title" className="section">
      <div className="wrap">
        {/* One layout for every screen, designed for a phone and simply given more room on bigger ones. */}
        <div className="mx-auto flex max-w-[40rem] flex-col items-center text-center">
          <div className="reveal size-28 overflow-hidden rounded-full shadow-[0_0_0_6px_var(--color-fawn)]">
            <Image
              src={comparison.photo.src}
              alt={comparison.photo.alt}
              placeholder="blur"
              sizes="112px"
              className="size-full object-cover"
            />
          </div>
          <h2 id="compare-title" className="reveal h-section mt-7">
            {comparison.title}
          </h2>
          <p className="reveal lead mt-3 max-w-[30ch] text-ink-soft">{comparison.intro}</p>
        </div>

        <div className="reveal mx-auto mt-10 max-w-[40rem]">
          <table className="w-full border-separate border-spacing-0 text-left">
            <caption className="sr-only">How the Rudy costume compares with other dog costumes</caption>
            <thead>
              <tr>
                <th scope="col" className="pb-3 align-bottom">
                  <span className="sr-only">Feature</span>
                </th>
                <th scope="col" className="w-[3.75rem] rounded-t-2xl bg-fawn px-1 pt-4 pb-3 text-center align-bottom">
                  <span className="font-display text-[1.125rem] leading-none">Rudy</span>
                </th>
                <th scope="col" className="w-[3.5rem] px-1 pb-3 text-center align-bottom text-[0.9375rem] font-bold text-ink-soft">
                  Others
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row, i) => {
                const Icon = icons[row.icon];
                return (
                  <tr key={row.feature}>
                    <th scope="row" className={`border-t border-line py-4 pr-2 align-middle ${i === last ? "border-b" : ""}`}>
                      <span className="flex items-center gap-2.5">
                        <span
                          aria-hidden="true"
                          className="grid size-8 shrink-0 place-items-center rounded-full bg-success/12 text-success"
                        >
                          <Icon size={17} />
                        </span>
                        <span>
                          <span className="block text-[1.0625rem] leading-snug font-bold">{row.feature}</span>
                          <span className="mt-0.5 block text-[0.9375rem] leading-snug font-semibold text-danger">
                            Others: {row.others}
                          </span>
                        </span>
                      </span>
                    </th>
                    <td
                      className={`border-t border-fawn-deep/40 bg-fawn px-1 py-4 text-center align-middle ${i === last ? "rounded-b-2xl" : ""}`}
                    >
                      <span className="inline-grid size-8 place-items-center rounded-full bg-success text-white shadow-[0_4px_10px_-4px_var(--color-success)]">
                        <CheckIcon size={18} strokeWidth={2.75} />
                      </span>
                      <span className="sr-only">Yes</span>
                    </td>
                    <td className={`border-t border-line px-1 py-4 text-center align-middle ${i === last ? "border-b" : ""}`}>
                      <span className="inline-grid size-8 place-items-center rounded-full bg-danger/12 text-danger">
                        <CloseIcon size={16} strokeWidth={2.5} />
                      </span>
                      <span className="sr-only">No</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-12 flex justify-center">
          <BuyButton
            className="items-center text-center"
            note={`Free shipping on every order. ${guarantee.days}-day returns.`}
          />
        </div>
      </div>
    </section>
  );
}

import { BuyButton } from "@/components/home/BuyButton";
import { CheckIcon, CloseIcon } from "@/components/ui/icons";
import { comparison, guarantee } from "@/config/product";

/** Rudy & Co. against typical costumes, with our column raised as a fawn pillar. */
export function Comparison() {
  const last = comparison.rows.length - 1;

  return (
    <section aria-labelledby="compare-title" className="section">
      <div className="wrap">
        <div className="mx-auto max-w-[40rem] text-center">
          <h2 id="compare-title" className="reveal h-section">
            {comparison.title}
          </h2>
          <p className="reveal lead mx-auto mt-5 max-w-[34ch] text-ink-soft">{comparison.intro}</p>
        </div>

        <div className="reveal mx-auto mt-12 max-w-[54rem] sm:mt-14">
          <table className="w-full border-separate border-spacing-0 text-left">
            <caption className="sr-only">How the Rudy costume compares with other dog costumes</caption>
            <thead>
              <tr>
                <th scope="col" className="pb-4 align-bottom">
                  <span className="sr-only">Feature</span>
                </th>
                <th
                  scope="col"
                  className="w-[4.75rem] rounded-t-3xl bg-fawn px-1.5 pt-6 pb-4 text-center align-bottom sm:w-[11rem] sm:px-2"
                >
                  <span className="font-display text-[1.125rem] leading-tight sm:text-[1.625rem]">Rudy &amp; Co.</span>
                </th>
                <th
                  scope="col"
                  className="w-[4rem] px-1.5 pb-4 text-center align-bottom text-base font-bold text-ink-soft sm:w-[13rem] sm:pl-7 sm:text-left sm:text-lg"
                >
                  <span className="sm:hidden">Others</span>
                  <span className="hidden sm:inline">Other costumes</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row, i) => (
                <tr key={row.feature}>
                  <th
                    scope="row"
                    className={`border-t border-line py-5 pr-3 align-middle sm:pr-6 ${i === last ? "border-b" : ""}`}
                  >
                    <span className="block text-lg leading-snug font-bold sm:text-xl">{row.feature}</span>
                    <span className="mt-1 block text-base text-ink-soft sm:hidden">Others: {row.others}</span>
                  </th>
                  <td
                    className={`border-t border-fawn-deep/50 bg-fawn px-1.5 py-5 text-center align-middle ${i === last ? "rounded-b-3xl" : ""}`}
                  >
                    <span className="inline-grid size-9 place-items-center rounded-full bg-cocoa text-white">
                      <CheckIcon size={20} strokeWidth={2.5} />
                    </span>
                    <span className="sr-only">Yes</span>
                  </td>
                  <td
                    className={`border-t border-line px-1.5 py-5 text-center align-middle sm:pl-7 sm:text-left ${i === last ? "border-b" : ""}`}
                  >
                    <span className="inline-flex items-center gap-2 text-ink-soft">
                      <span className="inline-grid size-9 shrink-0 place-items-center rounded-full bg-fawn-soft text-ink-soft">
                        <CloseIcon size={18} strokeWidth={2.25} />
                      </span>
                      <span className="sr-only sm:not-sr-only">{row.others}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-14 flex justify-center">
          <BuyButton
            className="items-center text-center"
            note={`${guarantee.days}-day money-back guarantee. Free shipping on 2 or more.`}
          />
        </div>
      </div>
    </section>
  );
}

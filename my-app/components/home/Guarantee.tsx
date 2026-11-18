import Link from "next/link";
import { BuyButton } from "@/components/home/BuyButton";
import { Ph } from "@/components/ui/Placeholder";
import { guarantee } from "@/config/product";

function Seal() {
  const text = `${guarantee.days}-DAY ${guarantee.name.toUpperCase()} • `;
  return (
    <svg viewBox="0 0 200 200" className="size-44 shrink-0 text-cocoa sm:size-52" aria-hidden="true">
      <defs>
        <path id="seal-circle" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
      </defs>
      <circle cx="100" cy="100" r="98" fill="var(--color-cocoa)" />
      <circle cx="100" cy="100" r="88" fill="none" stroke="var(--color-fawn)" strokeWidth="1.5" strokeDasharray="2 5" />
      <text fill="var(--color-fawn)" fontSize="13.5" fontWeight="700" letterSpacing="2.4" fontFamily="var(--font-sans)">
        <textPath href="#seal-circle" textLength="470">
          {text}
          {text}
        </textPath>
      </text>
      <text x="100" y="104" textAnchor="middle" fill="white" fontSize="52" fontFamily="var(--font-display)">
        {guarantee.days}
      </text>
      <text x="100" y="130" textAnchor="middle" fill="var(--color-fawn)" fontSize="15" fontWeight="700" letterSpacing="1.5" fontFamily="var(--font-sans)">
        DAYS
      </text>
    </svg>
  );
}

export function Guarantee() {
  return (
    <section aria-labelledby="guarantee-title" className="section bg-fawn">
      <div className="wrap flex flex-col items-start gap-10 md:flex-row md:items-center md:gap-16 lg:gap-24">
        <div className="reveal">
          <Seal />
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

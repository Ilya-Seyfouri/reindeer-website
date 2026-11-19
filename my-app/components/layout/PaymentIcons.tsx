import { paymentMethods } from "@/config/product";

type Method = (typeof paymentMethods)[number];

/** Brand marks drawn inside a 38×24 card, in each brand's own colours. */
const marks: Record<Method, React.ReactNode> = {
  Visa: (
    <text
      x="19"
      y="16.2"
      textAnchor="middle"
      fontFamily="Arial, Helvetica, sans-serif"
      fontSize="11.5"
      fontWeight="900"
      fontStyle="italic"
      letterSpacing="-0.3"
      fill="#1434CB"
    >
      VISA
    </text>
  ),
  Mastercard: (
    <>
      <circle cx="15" cy="12" r="7" fill="#EB001B" />
      <circle cx="23" cy="12" r="7" fill="#F79E1B" />
      <path d="M19 6.27a7 7 0 0 1 0 11.46 7 7 0 0 1 0-11.46z" fill="#FF5F00" />
    </>
  ),
  Discover: (
    <>
      <path d="M14 23h22a1 1 0 0 0 1-1v-9c-6 5-14 8.5-23 10z" fill="#FF6000" />
      <text
        x="4"
        y="13.6"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="5.6"
        fontWeight="900"
        letterSpacing="-0.1"
        fill="#231F20"
      >
        DISC
      </text>
      <circle cx="21.4" cy="11.6" r="2.7" fill="#FF6000" />
      <text
        x="24.5"
        y="13.6"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="5.6"
        fontWeight="900"
        letterSpacing="-0.1"
        fill="#231F20"
      >
        VER
      </text>
    </>
  ),
  "Apple Pay": (
    <>
      <path
        transform="translate(6.2 4.6) scale(0.92)"
        fill="#000"
        d="M8.9 3.1c.5-.6.8-1.4.7-2.2-.7 0-1.5.5-2 1.1-.4.5-.8 1.3-.7 2.1.8.1 1.5-.4 2-1zm.7 1.1c-1.1-.1-2 .6-2.5.6s-1.3-.6-2.2-.6C3.8 4.2 2.7 4.9 2.1 6c-1.2 2.1-.3 5.1.8 6.8.6.8 1.2 1.7 2.1 1.7.8 0 1.2-.5 2.2-.5s1.3.5 2.2.5c.9 0 1.5-.8 2-1.7.6-.9.9-1.8.9-1.9 0 0-1.8-.7-1.8-2.7 0-1.7 1.4-2.5 1.4-2.5-.8-1.2-2-1.3-2.4-1.3z"
      />
      <text x="17.6" y="16" fontFamily="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif" fontSize="9" fontWeight="600" fill="#000">
        Pay
      </text>
    </>
  ),
  "Google Pay": (
    <>
      <g transform="translate(4.6 7.2) scale(0.53)">
        <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" />
        <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.83.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z" />
        <path fill="#FBBC05" d="M3.97 10.72A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.29-1.72V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.05l3.01-2.33z" />
        <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
      </g>
      <text x="15.4" y="15.6" fontFamily="Arial, Helvetica, sans-serif" fontSize="8.4" fontWeight="500" fill="#3C4043">
        Pay
      </text>
    </>
  ),
};

/**
 * The accepted payment methods as small card-style icons, the way most online
 * stores show them: a white rounded card per brand with its own mark.
 * For pixel-exact artwork, swap these for the official SVGs your payment
 * provider publishes (Stripe has a set).
 */
export function PaymentIcons({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <ul aria-label="Payment methods we accept" className="flex flex-wrap gap-2">
      {paymentMethods.map((method) => (
        <li key={method}>
          <svg
            viewBox="0 0 38 24"
            width="38"
            height="24"
            role="img"
            aria-label={method}
            className={`block h-7 w-auto rounded-[4px] ${tone === "dark" ? "" : "shadow-[0_0_0_1px_oklch(0_0_0/0.09)]"}`}
          >
            <rect width="38" height="24" rx="3" fill="#fff" />
            {marks[method]}
          </svg>
        </li>
      ))}
    </ul>
  );
}

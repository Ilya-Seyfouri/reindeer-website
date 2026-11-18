import { paymentMethods } from "@/config/product";

/**
 * Simple text badges for accepted payment methods.
 * Swap for the official card-brand SVGs from your payment provider
 * (Stripe publishes them) before launch.
 */
export function PaymentIcons({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <ul aria-label="Payment methods we accept" className="flex flex-wrap gap-2">
      {paymentMethods.map((method) => (
        <li
          key={method}
          className={`inline-flex h-9 items-center rounded-lg px-3 text-[0.9375rem] font-bold tracking-tight ${
            tone === "dark"
              ? "bg-white/10 text-white shadow-[inset_0_0_0_1px_oklch(1_0_0/0.18)]"
              : "bg-white text-ink shadow-[inset_0_0_0_1.5px_var(--color-line)]"
          }`}
        >
          {method}
        </li>
      ))}
    </ul>
  );
}

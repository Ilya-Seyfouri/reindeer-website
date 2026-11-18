import type { Metadata } from "next";
import { CheckoutView } from "@/app/checkout/CheckoutView";

export const metadata: Metadata = {
  title: "Your order",
  robots: { index: false },
};

export default function CheckoutPage() {
  return <CheckoutView />;
}

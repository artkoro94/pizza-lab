import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutForm } from "@/features/checkout/ui/checkout-form";
import { Container } from "@/shared/ui/container";

export const metadata: Metadata = {
  title: "Оформление заказа",
  description: "Оформите заказ в PIZZA LAB.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="border-b border-black/10 bg-ink py-5 text-white">
        <Container>
          <Link href="/" className="font-display text-xl font-black tracking-[-0.08em]">
            PIZZA<span className="text-accent">LAB</span>
          </Link>
        </Container>
      </header>
      <CheckoutForm />
    </main>
  );
}

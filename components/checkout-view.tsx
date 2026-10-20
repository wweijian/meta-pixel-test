"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useShop, cartTotal, placeOrder } from "@/lib/shop-store";
import { money } from "@/lib/products";
import { EmptyBag, OrderLines } from "./cart-view";
import { Icon } from "./icons";

export function CheckoutView() {
  const { items, hydrated } = useShop();
  const router = useRouter();
  const [placing, startTransition] = useTransition();
  function submit() {
    if (placing) return;
    startTransition(() => {
      const order = placeOrder();
      if (order) router.push("/order-confirmation");
    });
  }
  if (!hydrated) return <div className="page-width inner-page"><p className="loading-copy">Getting things ready…</p></div>;
  if (!items.length && !placing) return <EmptyBag />;
  return <div className="page-width inner-page"><Link href="/cart" className="back-link">← Back to your bag</Link><div className="page-heading"><div className="eyebrow">THE LAST LITTLE STEP</div><h1>Make it a great day<span>.</span></h1><p>A practice checkout for your next favorite pair.</p></div><div className="checkout-grid"><div><div className="checkout-card"><span className="step-number">01</span><div><h2>All set for a test run</h2><p>This is a demo order. You don’t need to enter an address or payment details, and nothing will be charged or shipped.</p></div></div><div className="checkout-card"><span className="step-number">02</span><div><h2>Standard delivery</h2><p>Free shipping on every pair. Even the imaginary ones.</p></div><span className="free-label">Free</span></div></div><aside className="order-summary checkout-summary"><h2>Your next favorites</h2><OrderLines items={items} /><div className="summary-row"><span>Shipping</span><span className="free-label">On us</span></div><div className="summary-row total"><span>Total</span><span>{money(cartTotal(items))} <small>USD</small></span></div><button onClick={submit} disabled={placing} className="button button-dark full-width">{placing ? "Creating your order…" : "Buy now"}<Icon name="arrow" /></button><p className="summary-note">Demo checkout. No payment required.</p></aside></div></div>;
}

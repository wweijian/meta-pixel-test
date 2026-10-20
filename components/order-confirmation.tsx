"use client";

import Link from "next/link";
import { useShop } from "@/lib/shop-store";
import { money } from "@/lib/products";
import { OrderLines } from "./cart-view";
import { Icon } from "./icons";

export function OrderConfirmation() {
  const { order, hydrated } = useShop();
  if (!hydrated) return <div className="page-width inner-page"><p className="loading-copy">Finding your demo order…</p></div>;
  if (!order) return <div className="empty-state"><h1>Let’s find your next pair.</h1><p>Your demo order will appear here after checkout.</p><Link href="/" className="button button-dark">Back to the shop <Icon name="arrow" /></Link></div>;
  return <div className="confirmation page-width"><div className="confirmation-icon"><Icon name="check" width="32" height="32" /></div><div className="eyebrow">THAT’S A WRAP</div><h1>Good choice.<br />Great test.</h1><p>Your demo order is in. Thanks for stopping by.</p><div className="confirmation-receipt"><div className="receipt-heading"><span>DEMO ORDER #{order.id.slice(0, 8).toUpperCase()}</span><span>{money(order.total)} USD</span></div><OrderLines items={order.items} /></div><div className="confirmation-actions"><Link href="/#collection" className="button button-dark">Keep exploring <Icon name="arrow" /></Link></div><small>Nothing was charged. Nothing will be shipped.</small></div>;
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { products, money } from "@/lib/products";
import { useShop, cartTotal, setQuantity, type CartItem } from "@/lib/shop-store";
import { Icon } from "./icons";

export function OrderLines({ items, editable = false }: { items: CartItem[]; editable?: boolean }) {
  return <div className="order-lines">{items.map((item) => {
    const product = products.find((product) => product.id === item.productId)!;
    return <div className="order-line" key={`${item.productId}-${item.size}`}><Link href={`/products/${product.id}`} className="line-image"><Image src={product.image} alt={product.name} width={120} height={120} /></Link><div className="line-info"><Link href={`/products/${product.id}`}><h3>{product.name}</h3></Link><p>{product.color}</p><p>US {item.size}{!editable && ` · Qty ${item.quantity}`}</p>{editable && <div className="quantity"><button aria-label={`Decrease quantity of ${product.name}, size ${item.size}`} onClick={() => setQuantity(product.id, item.size, item.quantity - 1)}><Icon name="minus" width="13" height="13" /></button><span aria-label="Quantity">{item.quantity}</span><button aria-label={`Increase quantity of ${product.name}, size ${item.size}`} disabled={item.quantity >= 99} onClick={() => setQuantity(product.id, item.size, item.quantity + 1)}><Icon name="plus" width="13" height="13" /></button></div>}</div><div className="line-end"><strong>{money(product.price * item.quantity)}</strong>{editable && <button className="remove-button" onClick={() => setQuantity(product.id, item.size, 0)}>Remove</button>}</div></div>;
  })}</div>;
}

export function EmptyBag() { return <div className="empty-state"><div className="empty-icon"><Icon name="bag" width="35" height="35" /></div><h1>Your next pair is waiting.</h1><p>There’s a little room in your bag for a great day.</p><Link href="/#collection" className="button button-dark">Explore the collection <Icon name="arrow" /></Link></div>; }

export function CartView() {
  const { items, hydrated } = useShop();
  if (!hydrated) return <div className="page-width inner-page"><p className="loading-copy">Opening your bag…</p></div>;
  if (!items.length) return <EmptyBag />;
  return <div className="page-width inner-page"><Link href="/#collection" className="back-link">← Back to the good stuff</Link><div className="page-heading"><div className="eyebrow">ONE STEP CLOSER</div><h1>Your bag<span>.</span></h1><p>{items.reduce((sum, item) => sum + item.quantity, 0)} pairs of possibility.</p></div><div className="checkout-grid"><OrderLines items={items} editable /><aside className="order-summary"><h2>The good details</h2><div className="summary-row"><span>Subtotal</span><span>{money(cartTotal(items))}</span></div><div className="summary-row"><span>Shipping</span><span className="free-label">On us</span></div><div className="summary-row total"><span>Total</span><span>{money(cartTotal(items))} <small>USD</small></span></div><Link href="/checkout" className="button button-dark full-width">Go to checkout <Icon name="arrow" /></Link><p className="summary-note">Demo checkout. No payment required.</p></aside></div></div>;
}

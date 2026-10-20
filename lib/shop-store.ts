"use client";

import { useSyncExternalStore } from "react";
import { products, productParameters, sizes } from "./products";
import { trackEvent } from "./meta-pixel";

export type CartItem = { productId: string; size: number; quantity: number };
export type Order = { id: string; items: CartItem[]; total: number };
type ShopSnapshot = { items: CartItem[]; order: Order | null; hydrated: boolean };
const empty: ShopSnapshot = { items: [], order: null, hydrated: false };
let snapshot = empty;
const listeners = new Set<() => void>();
const cartKey = "sole-supply-cart-v1";
const orderKey = "sole-supply-order-v1";

function validItems(value: unknown): value is CartItem[] {
  return Array.isArray(value) && value.length <= 100 && value.every((item) => item && products.some((product) => product.id === item.productId) && sizes.includes(item.size) && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 99);
}

function hydrate() {
  if (snapshot.hydrated || typeof window === "undefined") return;
  let items: CartItem[] = [];
  let order: Order | null = null;
  try {
    const storedItems: unknown = JSON.parse(localStorage.getItem(cartKey) ?? "[]");
    if (validItems(storedItems)) items = storedItems;
    const storedOrder = JSON.parse(sessionStorage.getItem(orderKey) ?? "null");
    if (storedOrder && typeof storedOrder.id === "string" && validItems(storedOrder.items)) order = { id: storedOrder.id, items: storedOrder.items, total: cartTotal(storedOrder.items) };
  } catch { /* Storage may be unavailable; the demo still works in memory. */ }
  snapshot = { items, order, hydrated: true };
}

function update(next: ShopSnapshot) {
  snapshot = next;
  try {
    localStorage.setItem(cartKey, JSON.stringify(next.items));
    sessionStorage.setItem(orderKey, JSON.stringify(next.order));
  } catch { /* Keep in-memory functionality when storage is restricted. */ }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  hydrate();
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

export function useShop() { return useSyncExternalStore(subscribe, () => snapshot, () => empty); }
export function cartTotal(items: CartItem[]) { return items.reduce((sum, item) => sum + products.find((product) => product.id === item.productId)!.price * item.quantity, 0); }
export function cartParameters(items: CartItem[]) {
  return { content_ids: [...new Set(items.map((item) => item.productId))], content_type: "product", contents: items.map((item) => ({ id: item.productId, quantity: item.quantity, item_price: products.find((product) => product.id === item.productId)!.price })), num_items: items.reduce((sum, item) => sum + item.quantity, 0), value: cartTotal(items), currency: "USD" };
}

export function addToCart(productId: string, size: number) {
  hydrate();
  const product = products.find((product) => product.id === productId);
  if (!product || !sizes.includes(size)) return false;
  const existing = snapshot.items.find((item) => item.productId === productId && item.size === size);
  if (existing && existing.quantity >= 99) return false;
  const items = existing ? snapshot.items.map((item) => item === existing ? { ...item, quantity: item.quantity + 1 } : item) : [...snapshot.items, { productId, size, quantity: 1 }];
  update({ ...snapshot, items });
  trackEvent("AddToCart", { ...productParameters(product), contents: [{ id: product.id, quantity: 1, item_price: product.price }] });
  return true;
}

export function setQuantity(productId: string, size: number, quantity: number) {
  hydrate();
  if (!Number.isInteger(quantity) || quantity < 0 || quantity > 99) return;
  const existing = snapshot.items.find((item) => item.productId === productId && item.size === size);
  if (!existing) return;
  const items = snapshot.items.map((item) => item === existing ? { ...item, quantity } : item).filter((item) => item.quantity > 0);
  update({ ...snapshot, items });
  if (quantity > existing.quantity) {
    const product = products.find((product) => product.id === productId)!;
    const added = quantity - existing.quantity;
    trackEvent("AddToCart", { ...productParameters(product), value: product.price * added, contents: [{ id: product.id, quantity: added, item_price: product.price }] });
  }
}

export function placeOrder() {
  hydrate();
  if (!snapshot.items.length) return null;
  const order = { id: crypto.randomUUID(), items: snapshot.items, total: cartTotal(snapshot.items) };
  update({ items: [], order, hydrated: true });
  // Purchase belongs to successful order creation, never confirmation rendering.
  trackEvent("Purchase", { ...cartParameters(order.items), order_id: order.id }, order.id);
  return order;
}

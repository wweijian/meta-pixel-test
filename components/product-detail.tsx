"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Product, sizes, money } from "@/lib/products";
import { addToCart } from "@/lib/shop-store";
import { Icon } from "./icons";

export function ProductDetail({ product }: { product: Product }) {
  const [size, setSize] = useState(9);
  const [message, setMessage] = useState("");
  const [added, setAdded] = useState(false);
  const [buying, startTransition] = useTransition();
  const router = useRouter();
  function add() {
    const success = addToCart(product.id, size);
    setAdded(success);
    setMessage(success ? `${product.name}, US ${size}, added to your cart.` : "You’ve reached the limit of 99 pairs in this size.");
    return success;
  }
  function buy() {
    if (buying || !add()) return;
    startTransition(() => router.push("/checkout"));
  }
  return <div className="page-width inner-page"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/#collection">Sneakers</Link><span>/</span><span>{product.name}</span></nav><div className="product-detail"><div className="detail-image" style={{ backgroundColor: product.background }}><Image src={product.image} alt={`${product.name}, ${product.color}`} fill sizes="(max-width: 700px) 100vw, 55vw" preload />{product.badge && <span className="product-badge">{product.badge}</span>}</div><div className="detail-copy"><div className="eyebrow">YOUR NEXT {product.category.toUpperCase()} ESSENTIAL</div><h1>{product.name}<span>.</span></h1><div className="detail-price">{money(product.price)} <span>USD · Free shipping</span></div><p className="description">{product.description}</p><p className="color-label">Color <strong>{product.color}</strong></p><fieldset className="size-picker"><legend>Select your size <span>US sizing · Unisex</span></legend><div>{sizes.map((value) => <button type="button" key={value} aria-pressed={size === value} onClick={() => { setSize(value); setMessage(""); setAdded(false); }} className={size === value ? "active" : ""}>{value}</button>)}</div></fieldset><div className="purchase-actions"><button type="button" className="button button-outline" onClick={add} disabled={buying}>Add to cart<Icon name="bag" /></button><button type="button" className="button button-dark" onClick={buy} disabled={buying}>{buying ? "Opening checkout…" : "Buy now"}<Icon name="arrow" /></button></div><div className="add-feedback" role="status">{message}{added && <> <Link href="/cart">View cart <span aria-hidden="true">→</span></Link></>}</div><div className="detail-benefits"><span><Icon name="box" /> Shipping is on us</span><span><Icon name="return" /> 30-day easy returns</span></div></div></div></div>;
}

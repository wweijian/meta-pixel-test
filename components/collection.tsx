"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { products, money } from "@/lib/products";
import { Icon } from "./icons";

const categories = ["All sneakers", "Everyday", "Running", "Court"];

export function Collection() {
  const search = useSearchParams();
  const requested = search.get("category");
  const category = categories.includes(requested ?? "") ? requested! : "All sneakers";
  const filtered = products.filter((product) => category === "All sneakers" || product.category === category);
  return <section id="collection" className="collection page-width"><div className="collection-heading"><div><div className="eyebrow">THE GOOD-TO-GO COLLECTION</div><h2>Find your everyday<span>.</span></h2></div><p>A few favorites. Zero wrong turns.</p></div><div className="collection-toolbar"><nav className="filters" aria-label="Filter sneakers">{categories.map((value) => <Link key={value} href={value === "All sneakers" ? "/#collection" : `/?category=${value}#collection`} scroll={false} className={`filter ${value === category ? "selected" : ""}`} aria-current={value === category ? "true" : undefined}>{value}</Link>)}</nav><span className="results-count">{filtered.length} styles</span></div><div className="product-grid">{filtered.map((product) => <article className="product-card" key={product.id}><Link href={`/products/${product.id}`} className="product-image" style={{ backgroundColor: product.background }}><Image src={product.image} alt={`${product.name} in ${product.color}`} fill sizes="(max-width: 550px) 90vw, (max-width: 900px) 45vw, 23vw" />{product.badge && <span className={`product-badge ${product.badge === "NEW ARRIVAL" ? "badge-new" : ""}`}>{product.badge}</span>}<span className="product-hover">Take a closer look <Icon name="arrow" width="16" height="16" /></span></Link><div className="product-meta"><div><Link href={`/products/${product.id}`}><h3>{product.name}</h3></Link><p>{product.color}</p></div><span className="product-price">{money(product.price)}</span></div><div className="product-category"><span className="color-swatch" style={{ background: product.id === "pace-runner" ? "#d0443b" : product.id === "retro-sport" ? "#aa753b" : product.id === "court-01" ? "#e87938" : "#e4e3dc" }} />{product.category} essential</div></article>)}</div></section>;
}

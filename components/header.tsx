"use client";

import Link from "next/link";
import { Suspense } from "react";
import { Icon } from "./icons";
import { MetaPixel } from "./meta-pixel";
import { useShop } from "@/lib/shop-store";

export function Header() {
  const { items } = useShop();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  return <>
    <div className="announcement">A little more sole in your everyday. <span>Free shipping on every pair.</span><Icon name="arrow" width="14" height="14" /></div>
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="wordmark" aria-label="Sole Supply home">sole<span className="wordmark-dot">.</span><span className="wordmark-small">SUPPLY</span></Link>
        <nav className="main-nav" aria-label="Main navigation"><Link href="/#collection">Shop all</Link><Link href="/?category=Running#collection">Running</Link><Link href="/?category=Everyday#collection">Everyday</Link></nav>
        <div className="header-actions"><Link href="/cart" className="bag-link" aria-label={`Shopping bag, ${count} items`}><Icon name="bag" /><span className="bag-label">Bag</span><span className="bag-count">{count}</span></Link></div>
      </div>
      {/* RootLayout shares this header, and therefore the Pixel, across routes. */}
      <Suspense fallback={null}><MetaPixel /></Suspense>
    </header>
  </>;
}

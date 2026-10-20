import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Collection } from "@/components/collection";
import { Icon } from "@/components/icons";

export default function Home() {
  return <>
    <section className="hero page-width">
      <div className="hero-copy"><div className="eyebrow"><span className="little-line" /> A FRESH PAIR OF POSSIBILITIES</div><h1>Good shoes.<br />Great days.</h1><p>Considered classics. Everyday comfort.<br />Find the pair that feels like you.</p><Link href="#collection" className="button button-dark">Find your next pair <Icon name="arrow" /></Link><div className="hero-note"><span className="tiny-star">✳</span> A small collection. A lot of places to go.</div></div>
      <div className="hero-image"><Image src="/sneakers/court-artwork.png" alt="Illustration of a fictional white and citrus-orange sneaker on a pale sage background" fill sizes="(max-width: 700px) 100vw, 55vw" preload /><div className="hero-stamp">EVERYDAY<br /><span>FAVORITES</span><span className="stamp-star">✳</span></div><Link href="/products/court-01" className="hero-caption"><span><small>MEET YOUR NEW EVERYDAY</small><strong>Court 01 <span>— White / Citrus</span></strong></span><span className="round-arrow"><Icon name="arrow" /></span></Link></div>
    </section>
    <div className="benefits page-width"><span><Icon name="box" /> Free shipping. Every pair.</span><span><Icon name="return" /> Easy 30-day returns.</span><span><Icon name="check" /> Good from the first step.</span></div>
    <Suspense fallback={<section className="collection page-width"><h2>Find your everyday.</h2><p>Loading the collection…</p></section>}><Collection /></Suspense>
  </>;
}

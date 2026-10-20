import Link from "next/link";

export async function Footer() {
  "use cache";
  return <footer className="footer"><div className="footer-top"><Link className="wordmark" href="/">sole<span className="wordmark-dot">.</span><span className="wordmark-small">SUPPLY</span></Link><p>For wherever the day takes you.</p></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Sole Supply. A demo storefront.</span><span>No real payments. Just good sneakers.</span></div></footer>;
}

import Link from "next/link";
export default function NotFound() { return <div className="empty-state"><div className="eyebrow">A STEP OFF THE PATH</div><h1>This pair got away.</h1><p>We couldn’t find that page. There are more good things in the collection.</p><Link href="/" className="button button-dark">Back to the shop <span aria-hidden="true">→</span></Link></div>; }

import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import { ProductDetail } from "@/components/product-detail";

export function generateStaticParams() { return products.map((product) => ({ slug: product.id })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: products.find((product) => product.id === slug)?.name ?? "Sneaker not found" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((product) => product.id === slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}

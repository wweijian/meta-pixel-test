"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initializePixel, pixelConfigured, trackEvent, trackPageView } from "@/lib/meta-pixel";
import { products, productParameters } from "@/lib/products";
import { cartParameters, useShop } from "@/lib/shop-store";

export function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { items, hydrated } = useShop();
  const search = searchParams.toString();

  useEffect(() => {
    if (!hydrated) return;
    initializePixel();
    const route = pathname + (search ? `?${search}` : "");
    if (!trackPageView(route)) return;
    const product = products.find((product) => pathname === `/products/${product.id}`);
    if (product) trackEvent("ViewContent", productParameters(product));
    if (pathname === "/checkout" && items.length) trackEvent("InitiateCheckout", cartParameters(items));
  }, [pathname, search, items, hydrated]);

  if (!pixelConfigured) return null;
  return <Script id="meta-pixel-sdk" src="https://connect.facebook.net/en_US/fbevents.js" strategy="afterInteractive" />;
}

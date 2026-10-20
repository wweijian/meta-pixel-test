"use client";

export type PixelEventName = "PageView" | "ViewContent" | "AddToCart" | "InitiateCheckout" | "Purchase";
export type EventParameters = Record<string, string | number | string[] | { id: string; quantity: number; item_price: number }[]>;
type Fbq = ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue: unknown[][]; push: Fbq; loaded: boolean; version: string };
declare global { interface Window { fbq?: Fbq; _fbq?: Fbq } }

export const pixelId = (process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "").trim();
export const pixelConfigured = /^\d+$/.test(pixelId);
let initialized = false;
let lastRoute = "";

export function initializePixel() {
  if (!pixelConfigured || typeof window === "undefined" || initialized) return;
  if (!window.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    } as Fbq;
    fbq.queue = [];
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    window.fbq = fbq;
    window._fbq ??= fbq;
  }
  window.fbq("init", pixelId);
  initialized = true;
}

export function trackEvent(name: PixelEventName, parameters: EventParameters = {}, eventId?: string) {
  if (!pixelConfigured || typeof window === "undefined") return;
  initializePixel();
  const id = eventId ?? crypto.randomUUID();
  window.fbq?.("track", name, parameters, { eventID: id });
}

// A persistent root header observes navigation. This also suppresses the
// development Strict Mode effect replay without suppressing return visits.
export function trackPageView(route: string) {
  if (lastRoute === route) return false;
  lastRoute = route;
  trackEvent("PageView");
  return true;
}


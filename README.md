# Sole Supply · Meta Pixel playground

A small Next.js sneaker shop for testing Meta Pixel through a complete shopping journey: four products, size selection, a persistent bag, and demo checkout. No backend, payments, or personal customer details are needed.

## Run locally

```sh
pnpm install
pnpm dev
```

Open [localhost:3000](http://localhost:3000). Your supplied Pixel ID is configured in the ignored `.env.local` file. For a fresh checkout, copy `.env.example` to `.env.local` and set:

```dotenv
NEXT_PUBLIC_META_PIXEL_ID=your_numeric_pixel_id
```

Restart the dev server after changing it. Next.js embeds this public browser ID at build time, so set it before `pnpm build` for deployment. An empty or invalid ID disables tracking and does not load Meta's SDK.

## Try the funnel

| Action | Standard event | Parameters |
| --- | --- | --- |
| Visit a page or navigate between routes/query strings | `PageView` | None |
| Open a product | `ViewContent` | Product ID, name, type, value, currency |
| Add a selected size or increase its quantity | `AddToCart` | Product details and quantity/value added |
| Open checkout with a nonempty bag | `InitiateCheckout` | Product IDs, contents, item count, total, currency |
| Place a demo order | `Purchase` | Cart details, total, currency, order ID |

All prices use USD. Removing items does not emit `AddToCart`. Visiting or refreshing the confirmation page does not emit `Purchase`. Order creation clears the bag synchronously to prevent repeat purchases. The order ID is also Meta's `eventID`, ready for future browser/server deduplication.

For real delivery verification, open [Meta Events Manager](https://business.facebook.com/events_manager2), select the matching data source, and use **Test events** while browsing. Meta Pixel Helper and the browser Network panel can also help inspect calls. Ad blockers or network restrictions may prevent loading or delivery.

## Shared header and extension points

- `app/layout.tsx` renders `components/header.tsx` on every route.
- The header contains `components/meta-pixel.tsx`, which loads `fbevents.js` once through `next/script` and observes navigation. Suspense supports query-string hooks.
- `lib/meta-pixel.ts` initializes the standard `fbq` queue before events and exposes the tracking helper. Route deduplication handles development Strict Mode effect replays while allowing return visits.
- `lib/shop-store.ts` owns commerce actions. The bag uses local storage; the last demo order uses session storage. Unavailable storage falls back to memory.
- `lib/products.ts` holds the mock catalog. Fictional sneaker illustrations are bundled locally; the shop uses plain CSS and system fonts.

Future Meta integrations can use the tracking helper and stable product/order IDs. Conversions API is not implemented; it would need a server integration with a private access token and matching purchase event IDs.

## Checks

```sh
pnpm exec tsc --noEmit
pnpm build
```

## Sneaker artwork

All sneaker images are original AI-generated illustrations of fictional, unbranded products, created with the built-in image generation tool. The original branded photos have been removed. Artwork lives in `public/sneakers/`; the exact generation prompts are saved in [docs/sneaker-artwork.json](docs/sneaker-artwork.json). Product names and prices are fictional demo data.

export type Product = {
  id: string;
  name: string;
  category: "Everyday" | "Running" | "Court";
  color: string;
  price: number;
  image: string;
  badge?: string;
  background: string;
  description: string;
};

export const products: Product[] = [
  { id: "court-01", name: "Court 01", category: "Court", color: "White / Citrus", price: 120, image: "/sneakers/court-artwork.png", badge: "BESTSELLER", background: "#e9eeeb", description: "A fresh classic with an easygoing attitude. Soft leather, a cushioned footbed, and a little orange to keep things interesting." },
  { id: "pace-runner", name: "Pace Runner", category: "Running", color: "Coral Red", price: 145, image: "/sneakers/runner-artwork.png", badge: "NEW ARRIVAL", background: "#f6e8e5", description: "Light on your feet. Big on energy. A breathable knit upper and responsive cushioning take you from the morning run to the rest of your day." },
  { id: "daily-02", name: "Daily 02", category: "Everyday", color: "Cloud White", price: 110, image: "/sneakers/daily-artwork.png", background: "#f0ece5", description: "Your everyday, upgraded. An understated silhouette, a clean white finish, and all-day comfort. The pair you'll leave by the door." },
  { id: "retro-sport", name: "Retro Sport", category: "Everyday", color: "Sand / Gum", price: 130, image: "/sneakers/retro-artwork.png", background: "#ece9e2", description: "A little old school, a lot of good days ahead. Vintage-inspired panels and a durable gum sole make this a modern everyday essential." },
];

export const sizes = [6, 7, 8, 9, 10, 11, 12];
export const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
export const productParameters = (product: Product) => ({ content_ids: [product.id], content_name: product.name, content_type: "product", value: product.price, currency: "USD" });

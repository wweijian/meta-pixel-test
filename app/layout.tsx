import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Sole Supply — Good shoes. Great days.", template: "%s | Sole Supply" },
  description: "A small sneaker shop for exploring Meta Pixel events. Browse a pair, fill your bag, and try a demo checkout.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body><a href="#main" className="skip-link">Skip to content</a><Header /><main id="main">{children}</main><Footer /></body>
    </html>
  );
}

import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { CartContents } from "@/components/cart/CartContents";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your basket.",
};

/**
 * The basket lives in WooCommerce, read and written from the browser through
 * the Store API (see lib/store.ts). This page is only the frame — the contents
 * are per-visitor and must never be cached or prerendered.
 */
export default function CartPage() {
  return (
    <>
      <Header />
      <main>
        <CartContents />
      </main>
      <Footer />
    </>
  );
}

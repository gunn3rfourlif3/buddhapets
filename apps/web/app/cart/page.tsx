import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { Bag, Shield } from "@/components/ui/icons";
import { featuredProducts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your basket.",
};

/**
 * Cart placeholder.
 *
 * The real basket comes from WooCommerce's Store API once the keys are wired
 * (see "Spec - BuddhaPets Hybrid Build.md", section 1): Next builds the cart,
 * then hands off to a brand-styled Woo checkout for payment. Until then this
 * is an honest empty state rather than a fake basket.
 */
export default function CartPage() {
  return (
    <>
      <Header />
      <main>
        <section className="mx-auto flex max-w-[820px] flex-col items-center gap-6 px-6 py-24 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-mist">
            <Bag size={28} strokeWidth={1.6} className="text-violet" />
          </div>

          <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.15]">
            Your basket is <span className="accent">empty</span>
          </h1>

          <p className="max-w-[46ch] text-[15px] leading-[1.8] text-body">
            Nothing here yet. If you&rsquo;re not sure where to start, the Calm Quiz matches your pet
            to a ritual in about two minutes — it&rsquo;s a better starting point than a product
            list.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/quiz">Take the Calm Quiz</Button>
            <Button href="/shop" variant="outline">
              Browse the shop
            </Button>
          </div>

          <div className="mt-2 flex items-center gap-2.5 text-[13.5px] text-body">
            <Shield size={18} className="text-champagne" />
            Everything is covered by the 60-Day Happy Pet Guarantee.
          </div>
        </section>

        <section className="bg-mist px-6 py-section lg:px-gutter">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-10">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)]">
              Where most people <span className="accent">start</span>
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.slug} product={product} showStars={false} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

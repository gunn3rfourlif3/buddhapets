import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProductCard } from "@/components/ui/ProductCard";
import { Bag, Shield } from "@/components/ui/icons";
import { collections, products, productsInCollection } from "@/lib/content";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Every BuddhaPets product, grouped by ritual: comfort, enrichment, zen home, and sets for you and your pet together.",
};

export default function ShopPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-mist px-6 py-20 lg:px-gutter">
          <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 text-center">
            <Eyebrow icon={<Bag size={14} strokeWidth={2.4} />}>Zen Shop</Eyebrow>
            <h1 className="text-[clamp(2rem,4.5vw,3rem)] leading-[1.15]">
              Everything we&rsquo;d put in our <span className="accent">own</span> home
            </h1>
            <p className="max-w-[52ch] text-[15px] leading-[1.8] text-body">
              {products.length} hand-selected pieces. Nothing here is a novelty — each one earns its
              place in a ritual, and every listing shows an honest delivery estimate before you buy.
            </p>
            <div className="mt-3 flex items-center gap-2.5 text-[13.5px] text-body">
              <Shield size={18} className="text-champagne" />
              Covered by the 60-Day Happy Pet Guarantee.
            </div>
          </div>
        </section>

        {collections.map((collection) => {
          const items = productsInCollection(collection.slug);
          if (items.length === 0) return null;

          return (
            <section key={collection.slug} className="px-6 py-16 lg:px-gutter">
              <div className="mx-auto flex max-w-[1440px] flex-col gap-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-[clamp(1.5rem,3vw,2rem)]">{collection.name}</h2>
                    <p className="max-w-[54ch] text-[14.5px] leading-[1.7] text-muted">
                      {collection.blurb}
                    </p>
                  </div>
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="text-[13.5px] font-semibold text-violet transition-colors hover:text-violet-deep"
                  >
                    About this ritual →
                  </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((product) => (
                    <ProductCard key={product.slug} product={product} />
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        <section className="bg-mist px-6 py-16 lg:px-gutter">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-5 text-center">
            <h2 className="text-2xl">Not sure where to start?</h2>
            <p className="max-w-[46ch] text-[14.5px] leading-[1.75] text-body">
              Two minutes of questions about your pet&rsquo;s stress signals, and we&rsquo;ll match
              them to a ritual instead of a shopping list.
            </p>
            <Link
              href="/quiz"
              className="rounded-full bg-violet px-7 py-3 text-[13.5px] font-semibold text-white shadow-violet transition-all hover:bg-violet-deep"
            >
              Take the Calm Quiz
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

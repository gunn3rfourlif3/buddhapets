import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { Shield } from "@/components/ui/icons";
import {
  collectionBySlug,
  collections,
  productsInCollection,
  tileClass,
  type CollectionSlug,
} from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const collection = collectionBySlug(slug);
  if (!collection) return { title: "Collection" };

  return {
    title: collection.name,
    description: collection.intro,
    openGraph: { title: `${collection.name} · BuddhaPets`, description: collection.intro },
  };
}

export default async function CollectionPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const collection = collectionBySlug(slug);
  if (!collection) notFound();

  const items = productsInCollection(collection.slug as CollectionSlug);

  return (
    <>
      <Header />
      <main>
        <section className={`px-6 py-20 lg:px-gutter ${tileClass[collection.tile]}`}>
          <div className="mx-auto flex max-w-[820px] flex-col items-center gap-5 text-center">
            <span className="rounded-full bg-white/70 px-4 py-[7px] text-[12.5px] font-semibold">
              Collection
            </span>
            <h1 className="font-display text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.12] text-ink">
              {collection.name}
            </h1>
            <p className="text-[15.5px] leading-[1.8]">{collection.intro}</p>
          </div>
        </section>

        <section className="mx-auto flex max-w-[1440px] flex-col gap-10 px-6 py-section lg:px-gutter">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-[13.5px] text-muted">
              {items.length} {items.length === 1 ? "piece" : "pieces"} in this ritual
            </p>
            <div className="flex items-center gap-2.5 text-[13.5px] text-body">
              <Shield size={18} className="text-champagne" />
              60-Day Happy Pet Guarantee
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ))}
          </div>
        </section>

        <section className="bg-mist px-6 py-16 lg:px-gutter">
          <div className="mx-auto flex max-w-[820px] flex-col items-center gap-5 text-center">
            <h2 className="text-2xl">Make it a ritual</h2>
            <p className="max-w-[46ch] text-[14.5px] leading-[1.75] text-body">
              Pair a piece from here with an enrichment toy and a finishing touch, and the set price
              drops 15%.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href="/rituals/build">Build a ritual</Button>
              <Link
                href="/collections"
                className="rounded-full border-[1.5px] border-line-strong px-7 py-3 text-[13.5px] font-semibold text-violet transition-colors hover:border-violet"
              >
                All collections
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

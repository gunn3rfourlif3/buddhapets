import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { Figure } from "@/components/ui/Figure";
import { ProductCard } from "@/components/ui/ProductCard";
import { AddToCart } from "@/components/cart/AddToCart";
import { Price } from "@/components/ui/Price";
import { Stars } from "@/components/ui/Stars";
import { artByKey } from "@/components/ui/illustrations";
import { CheckDot, Shield } from "@/components/ui/icons";
import {
  collectionBySlug,
  productBySlug,
  products,
  productsInCollection,
} from "@/lib/content";
import { productPhotos } from "@/lib/images";

type Params = { slug: string };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return { title: "Product" };

  return {
    title: product.name,
    description: product.blurb,
    openGraph: { title: `${product.name} · BuddhaPets`, description: product.blurb },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const collection = collectionBySlug(product.collection);
  const related = productsInCollection(product.collection)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-[1440px] px-6 pt-8 lg:px-gutter">
          <nav aria-label="Breadcrumb" className="text-[13px] text-muted">
            <Link href="/shop" className="transition-colors hover:text-violet">
              Shop
            </Link>
            <span className="px-2">/</span>
            {collection && (
              <>
                <Link
                  href={`/collections/${collection.slug}`}
                  className="transition-colors hover:text-violet"
                >
                  {collection.name}
                </Link>
                <span className="px-2">/</span>
              </>
            )}
            <span className="text-ink">{product.name}</span>
          </nav>
        </div>

        {/* Product */}
        <section className="mx-auto grid max-w-[1440px] gap-12 px-6 py-12 lg:grid-cols-2 lg:gap-16 lg:px-gutter lg:py-16">
          <Figure
            tile={product.tile}
            photo={productPhotos[product.slug]}
            illustration={artByKey[product.art]}
            height="h-[420px] lg:h-[520px]"
            sizes="(max-width: 1024px) 100vw, 640px"
            priority
            className="rounded-card"
          />

          <div className="flex flex-col gap-5 lg:py-6">
            {collection && (
              <Link
                href={`/collections/${collection.slug}`}
                className="self-start rounded-full bg-blush px-4 py-[7px] text-[12.5px] font-semibold text-rose-deep transition-opacity hover:opacity-80"
              >
                {collection.name}
              </Link>
            )}

            <h1 className="text-[clamp(2rem,4vw,2.75rem)] leading-[1.15]">{product.name}</h1>

            <div className="flex items-center gap-3">
              <Stars size={14} />
              <span className="text-[13px] text-muted">[Reviews arrive after launch]</span>
            </div>

            <Price zar={product.price} className="font-display text-[2rem] text-violet" />

            <p className="max-w-[52ch] text-[15px] leading-[1.8] text-body">{product.description}</p>

            <div className="flex flex-wrap items-center gap-3">
              <AddToCart slug={product.slug} name={product.name} />
              <Button href="/rituals/build" variant="outline">
                Build it into a ritual
              </Button>
            </div>

            {/* Honest delivery estimate, before checkout — see the launch plan. */}
            <div className="mt-2 flex flex-col gap-3 rounded-card border border-line bg-white p-5 shadow-soft">
              <div className="flex items-center gap-2.5">
                <CheckDot size={18} />
                <span className="text-[13.5px] text-[#4d4468]">
                  <span className="font-semibold text-ink">Delivery:</span> {product.delivery}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Shield size={18} className="text-champagne" />
                <span className="text-[13.5px] text-[#4d4468]">
                  <span className="font-semibold text-ink">60 days</span> to decide — if they
                  don&rsquo;t settle, we make it right.
                </span>
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="bg-mist px-6 py-section lg:px-gutter">
            <div className="mx-auto flex max-w-[1440px] flex-col gap-10">
              <h2 className="text-[clamp(1.5rem,3vw,2rem)]">
                Pairs well with <span className="accent">this</span>
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <ProductCard
                    key={p.slug}
                    product={p}
                    sizes="(max-width: 640px) 100vw, 33vw"
                    showStars={false}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

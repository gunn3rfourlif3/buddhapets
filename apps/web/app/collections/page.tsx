import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Figure } from "@/components/ui/Figure";
import { collectionArt } from "@/components/ui/illustrations";
import { Paw } from "@/components/ui/icons";
import { collections, productsInCollection } from "@/lib/content";
import { collectionPhotos } from "@/lib/images";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Four paths to a calmer home: comfort, slow living, a zen home, and rituals you and your pet share.",
};

export default function CollectionsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-mist px-6 py-20 lg:px-gutter">
          <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 text-center">
            <Eyebrow icon={<Paw size={14} />}>Shop by ritual</Eyebrow>
            <h1 className="text-[clamp(2rem,4.5vw,3rem)] leading-[1.15]">
              Four paths to a <span className="accent">calmer</span> home
            </h1>
            <p className="max-w-[52ch] text-[15px] leading-[1.8] text-body">
              We group by what a product does in a routine, not by what shelf it would sit on in a
              pet shop.
            </p>
          </div>
        </section>

        <section className="mx-auto flex max-w-[1440px] flex-col gap-16 px-6 py-section lg:px-gutter">
          {collections.map((collection, i) => {
            const items = productsInCollection(collection.slug);
            return (
              <article
                key={collection.slug}
                className={`flex flex-col items-center gap-10 lg:gap-16 ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <Figure
                  tile={collection.tile}
                  photo={collectionPhotos[collection.slug]}
                  illustration={collectionArt[collection.slug]}
                  height="h-[300px] w-full lg:w-[480px]"
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="shrink-0 rounded-card"
                />

                <div className="flex flex-col gap-4">
                  <h2 className="text-[clamp(1.75rem,3.4vw,2.375rem)]">{collection.name}</h2>
                  <p className="max-w-[54ch] text-[15px] leading-[1.8] text-body">
                    {collection.intro}
                  </p>
                  <p className="text-[13.5px] text-muted">
                    {items.length} {items.length === 1 ? "piece" : "pieces"}
                  </p>
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="self-start rounded-full bg-violet px-7 py-3 text-[13.5px] font-semibold text-white shadow-violet transition-all hover:bg-violet-deep"
                  >
                    Browse {collection.name}
                  </Link>
                </div>
              </article>
            );
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Figure } from "@/components/ui/Figure";
import { Stars } from "@/components/ui/Stars";
import { Bag } from "@/components/ui/icons";
import { artByKey } from "@/components/ui/illustrations";
import { featuredProducts, formatPrice } from "@/lib/content";
import { productPhotos } from "@/lib/images";


export function Products() {
  return (
    <section className="bg-mist px-6 py-section lg:px-gutter">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-13">
        <SectionHeading eyebrow={<Eyebrow icon={<Bag size={14} strokeWidth={2.4} />}>Zen Shop</Eyebrow>}>
          Our <span className="accent">featured</span> products
        </SectionHeading>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((p) => (
            <Link
              key={p.slug}
              href={`/shop/${p.slug}`}
              className="group relative flex flex-col gap-4 rounded-card border border-line bg-white p-3.5 pb-6 shadow-soft transition-shadow duration-300 hover:shadow-lifted"
            >
              {p.badge && (
                <span className="absolute left-6 top-6 z-10 rounded-full bg-rose px-3 py-1 text-[10.5px] font-semibold text-white">
                  {p.badge}
                </span>
              )}
              <Figure
                tile={p.tile}
                photo={productPhotos[p.slug]}
                illustration={artByKey[p.art]}
              />
              <div className="flex flex-col items-center gap-[7px]">
                <h3 className="font-sans text-[14.5px] font-semibold transition-colors group-hover:text-violet">
                  {p.name}
                </h3>
                <p className="font-display text-xl text-violet">{formatPrice(p.price)}</p>
                <Stars />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="/shop">Browse the whole shop</Button>
        </div>
      </div>
    </section>
  );
}

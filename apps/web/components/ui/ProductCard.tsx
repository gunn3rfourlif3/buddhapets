import Link from "next/link";
import { Figure } from "@/components/ui/Figure";
import { artByKey } from "@/components/ui/illustrations";
import { Stars } from "@/components/ui/Stars";
import { Price } from "@/components/ui/Price";
import { type Product } from "@/lib/content";
import { productPhotos } from "@/lib/images";

/** The catalogue card. One definition, used by the shop, collections and plans. */
export function ProductCard({
  product,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
  showStars = true,
}: {
  product: Product;
  sizes?: string;
  showStars?: boolean;
}) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group relative flex flex-col gap-4 rounded-card border border-line bg-white p-3.5 pb-6 shadow-soft transition-shadow duration-300 hover:shadow-lifted"
    >
      {product.badge && (
        <span className="absolute left-6 top-6 z-10 rounded-full bg-rose px-3 py-1 text-[10.5px] font-semibold text-white">
          {product.badge}
        </span>
      )}
      <Figure
        tile={product.tile}
        photo={productPhotos[product.slug]}
        illustration={artByKey[product.art]}
        sizes={sizes}
      />
      <div className="flex flex-col items-center gap-[7px] px-2 text-center">
        <h3 className="font-sans text-[14.5px] font-semibold transition-colors group-hover:text-violet">
          {product.name}
        </h3>
        <Price zar={product.price} className="font-display text-xl text-violet" />
        {showStars && <Stars />}
      </div>
    </Link>
  );
}

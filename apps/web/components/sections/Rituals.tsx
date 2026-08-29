import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Figure } from "@/components/ui/Figure";
import { collectionArt } from "@/components/ui/illustrations";
import { Paw } from "@/components/ui/icons";
import { collections } from "@/lib/content";
import { collectionPhotos } from "@/lib/images";


export function Rituals() {
  return (
    <section className="bg-mist px-6 py-section lg:px-gutter">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-13">
        <SectionHeading eyebrow={<Eyebrow icon={<Paw size={14} />}>Shop by ritual</Eyebrow>}>
          Our pet <span className="accent">serenity</span> rituals
        </SectionHeading>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="group relative flex flex-col gap-[18px] rounded-card border border-line bg-white p-3.5 pb-6 shadow-soft transition-shadow duration-300 hover:shadow-lifted"
            >
              {c.badge && (
                <span className="absolute right-6 top-6 rounded-full bg-rose px-3 py-1 text-[10.5px] font-semibold text-white">
                  {c.badge}
                </span>
              )}
              <Figure
                tile={c.tile}
                photo={collectionPhotos[c.slug]}
                illustration={collectionArt[c.slug]}
                height="h-[172px]"
              />
              <div className="flex flex-col items-center gap-1.5">
                <h3 className="text-[21px] transition-colors group-hover:text-violet">{c.name}</h3>
                <p className="text-[12.5px] text-muted">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

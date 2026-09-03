import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { RitualBuilder } from "@/components/rituals/RitualBuilder";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Enso } from "@/components/ui/icons";
import { BUNDLE_DISCOUNT, productBySlug, productsForRole, type RitualRole } from "@/lib/content";

export const metadata: Metadata = {
  title: "Build a ritual",
  description:
    "Pick a comfort piece, an enrichment toy and a finishing touch. Complete the set and the price drops 15%.",
};

/**
 * Zen Plans link here with their matched products, e.g.
 * /rituals/build?comfort=cloud-nine-donut-bed&finishing=zenchews-calming-treats
 */
type Search = Partial<Record<RitualRole, string>>;

export default async function BuildRitualPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const params = await searchParams;

  const catalogue = {
    comfort: productsForRole("comfort"),
    enrichment: productsForRole("enrichment"),
    finishing: productsForRole("finishing"),
  };

  // Only honour a pre-selection that actually exists and fills that slot.
  const initial: Search = {};
  for (const role of ["comfort", "enrichment", "finishing"] as RitualRole[]) {
    const slug = params[role];
    if (slug && productBySlug(slug)?.role === role) initial[role] = slug;
  }

  return (
    <>
      <Header />
      <main>
        <section className="bg-mist px-6 py-20 lg:px-gutter">
          <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 text-center">
            <Eyebrow icon={<Enso size={14} />}>The Ritual Builder</Eyebrow>
            <h1 className="text-[clamp(2rem,4.5vw,3rem)] leading-[1.15]">
              Build their ritual, <span className="accent">save</span> as a set
            </h1>
            <p className="max-w-[54ch] text-[15px] leading-[1.8] text-body">
              Calm isn&rsquo;t one product — it&rsquo;s a routine. Pick one piece from each step and
              the set price drops {Math.round(BUNDLE_DISCOUNT * 100)}%. Every ritual ships with a
              printed evening-routine guide.
            </p>
          </div>
        </section>

        <RitualBuilder catalogue={catalogue} initial={initial} />
      </main>
      <Footer />
    </>
  );
}

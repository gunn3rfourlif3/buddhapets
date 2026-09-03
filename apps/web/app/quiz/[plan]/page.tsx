import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RitualDiary } from "@/components/rituals/RitualDiary";
import { Figure } from "@/components/ui/Figure";
import { artByKey } from "@/components/ui/illustrations";
import { Enso, Shield } from "@/components/ui/icons";
import { Price } from "@/components/ui/Price";
import { BUNDLE_DISCOUNT, formatPrice, productBySlug, tileClass } from "@/lib/content";
import { productPhotos } from "@/lib/images";
import { isPlanSlug, planList, plans, scoreBand } from "@/lib/quiz";

type Params = { plan: string };
type Search = { score?: string };

/** Every plan is a static, shareable page — the quiz just routes people to one. */
export function generateStaticParams() {
  return planList.map((p) => ({ plan: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { plan: slug } = await params;
  if (!isPlanSlug(slug)) return { title: "Zen Plan" };

  const plan = plans[slug];
  return {
    title: plan.name,
    description: plan.tagline,
    openGraph: { title: `${plan.name} · BuddhaPets`, description: plan.tagline },
  };
}

export default async function ZenPlanPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<Search>;
}) {
  const { plan: slug } = await params;
  if (!isPlanSlug(slug)) notFound();

  const plan = plans[slug];
  const { score: rawScore } = await searchParams;
  const score = rawScore ? Number.parseInt(rawScore, 10) : null;
  const band = score !== null && Number.isFinite(score) ? scoreBand(score) : null;

  const matched = plan.products
    .map(productBySlug)
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const bundleTotal = matched.reduce((sum, p) => sum + p.price, 0);
  const bundlePrice = formatPrice(bundleTotal * (1 - BUNDLE_DISCOUNT));

  // Carry this plan's products straight into the Ritual Builder.
  const builderHref = `/rituals/build?${new URLSearchParams(
    Object.fromEntries(matched.map((p) => [p.role, p.slug])),
  )}`;

  return (
    <>
      <Header />
      <main>
        {/* Plan header */}
        <section className={`px-6 py-20 lg:px-gutter ${tileClass[plan.tile]}`}>
          <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-5 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-[7px] text-[12.5px] font-semibold">
              <Enso size={14} />
              Your Zen Plan
            </span>
            <h1 className="font-display text-[clamp(2.25rem,5.5vw,3.5rem)] leading-[1.1] text-ink">
              {plan.name}
            </h1>
            <p className="max-w-[46ch] text-[15.5px] font-medium">{plan.tagline}</p>

            {band && (
              <div className="mt-2 flex items-center gap-3 rounded-full bg-white/70 px-5 py-2.5">
                <span className="text-[12.5px] font-semibold uppercase tracking-[1.2px]">
                  Calm score
                </span>
                <span className="font-display text-2xl tabular-nums text-ink">{score}</span>
                <span className="text-[13px]">· {band.label}</span>
              </div>
            )}
          </div>
        </section>

        {/* Why this plan */}
        <section className="mx-auto max-w-[720px] px-6 py-20 text-center">
          <p className="text-[17px] leading-[1.85] text-body">{plan.intro}</p>
          {band && <p className="mt-6 text-[15px] italic text-muted">{band.note}</p>}
        </section>

        {/* The ritual */}
        <section className="bg-mist px-6 py-section lg:px-gutter">
          <div className="mx-auto flex max-w-[900px] flex-col gap-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <Eyebrow>The ritual</Eyebrow>
              <h2 className="text-[clamp(1.75rem,3.6vw,2.5rem)]">
                Three steps, <span className="accent">repeated</span>
              </h2>
            </div>

            <ol className="flex flex-col gap-5">
              {plan.steps.map((step, i) => (
                <li
                  key={step.title}
                  className="flex gap-6 rounded-card border border-line bg-white p-7 shadow-soft"
                >
                  <span className="font-display text-3xl leading-none text-rose">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-sans text-[17px] font-semibold">{step.title}</h3>
                    <p className="text-[14.5px] leading-[1.75] text-body">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <RitualDiary planSlug={plan.slug} planName={plan.name} steps={plan.steps} />

        {/* What supports it */}
        <section className="mx-auto flex max-w-[1440px] flex-col gap-12 px-6 py-section lg:px-gutter">
          <div className="flex flex-col items-center gap-4 text-center">
            <Eyebrow>What supports it</Eyebrow>
            <h2 className="text-[clamp(1.75rem,3.6vw,2.5rem)]">
              Built for <span className="accent">this</span> ritual
            </h2>
            <p className="max-w-[48ch] text-[15px] leading-[1.8] text-body">
              Two pieces do most of the work here. Take them as a set and the price drops 15%.
            </p>
          </div>

          <div className="mx-auto grid w-full max-w-[760px] gap-6 sm:grid-cols-2">
            {matched.map((p) => (
              <Link
                key={p.slug}
                href={`/shop/${p.slug}`}
                className="group flex flex-col gap-4 rounded-card border border-line bg-white p-3.5 pb-6 shadow-soft transition-shadow hover:shadow-lifted"
              >
                <Figure
                  tile={p.tile}
                  photo={productPhotos[p.slug]}
                  illustration={artByKey[p.art]}
                  sizes="(max-width: 640px) 100vw, 380px"
                />
                <div className="flex flex-col items-center gap-1.5">
                  <h3 className="font-sans text-[14.5px] font-semibold transition-colors group-hover:text-violet">
                    {p.name}
                  </h3>
                  <Price zar={p.price} className="font-display text-xl text-violet" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mx-auto flex w-full max-w-[760px] flex-col items-center justify-between gap-5 rounded-band bg-midnight px-8 py-7 sm:flex-row">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-[#8b80ab]">{plan.name} ritual set</p>
              <p className="text-lg font-semibold text-[#f6f4fb]">
                {bundlePrice}{" "}
                <span className="text-[13px] font-medium text-champagne-light">save 15%</span>
              </p>
            </div>
            <Button href={builderHref} variant="rose" className="px-7 py-3.5">
              Add the ritual set
            </Button>
          </div>

          <div className="mx-auto flex items-center gap-2.5 text-[13.5px] text-body">
            <Shield size={18} className="text-champagne" />
            Covered by the 60-Day Happy Pet Guarantee.
          </div>
        </section>

        {/* Retake / explore */}
        <section className="bg-mist px-6 py-16 lg:px-gutter">
          <div className="mx-auto flex max-w-[900px] flex-col items-center gap-5 text-center">
            <h2 className="text-2xl">Not quite them?</h2>
            <p className="max-w-[44ch] text-[14.5px] leading-[1.75] text-body">
              Pets change, and so do their plans. Retake the quiz any time — or read the other
              rituals to see which one fits better.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href="/quiz" variant="outline">
                Retake the quiz
              </Button>
              <Button href="/shop">Browse the shop</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

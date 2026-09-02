import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Figure } from "@/components/ui/Figure";
import { SleepingCat, SleepingDog } from "@/components/ui/illustrations";
import { CheckDot, Enso, Heart, Shield } from "@/components/ui/icons";
import { aboutPhoto } from "@/lib/images";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "Why BuddhaPets exists: a calm pet is a happy pet, and a happy pet makes for a peaceful home.",
};

const pillars = [
  {
    title: "Sensory Comfort",
    body: "From deep-pressure beds to noise-softening dens, we shape the physical environment so an anxious body has somewhere it can finally rest.",
  },
  {
    title: "Cognitive Enrichment",
    body: "A busy brain is a quiet brain. Snuffle mats and slow feeders channel restless energy into something absorbing and, eventually, calming.",
  },
  {
    title: "Pure Ingredients",
    body: "Vet-approved, natural ingredients and nothing else. No sedatives, no mystery blends, and no claims we can't stand behind.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-mist px-6 py-20 lg:px-gutter">
          <div className="mx-auto flex max-w-[820px] flex-col items-center gap-5 text-center">
            <Eyebrow icon={<Heart size={14} />}>Our story</Eyebrow>
            <h1 className="text-[clamp(2rem,4.5vw,3rem)] leading-[1.15]">
              Bringing zen to <span className="accent">every den</span>
            </h1>
            <p className="max-w-[54ch] text-[16px] leading-[1.85] text-body">
              A calm pet is a happy pet, and a happy pet makes for a peaceful home. That sentence is
              the whole business — everything we stock has to earn its place against it.
            </p>
          </div>
        </section>

        {/* The why */}
        <section className="mx-auto flex max-w-[1440px] flex-col items-center gap-16 px-6 py-section lg:flex-row lg:gap-[5.625rem] lg:px-gutter">
          <div className="flex max-w-[600px] flex-col gap-5">
            <h2 className="text-[clamp(1.75rem,3.6vw,2.375rem)] leading-[1.2]">
              We&rsquo;ve all seen <span className="accent">that look</span>
            </h2>
            <p className="text-[15px] leading-[1.85] text-body">
              The frantic pacing when you pick up your keys. The trembling during a thunderstorm. The
              guilt-trip eyes as the front door closes behind you.
            </p>
            <p className="text-[15px] leading-[1.85] text-body">
              Our pets don&rsquo;t have &ldquo;behavioral issues&rdquo; — they have big emotions in a
              loud, busy world. Most of what gets sold to help is either a novelty that lasts a week
              or a supplement making promises nobody can keep.
            </p>
            <p className="text-[15px] leading-[1.85] text-body">
              We started BuddhaPets to sell the other thing: a small number of well-chosen pieces,
              and the routine that makes them work. Peace isn&rsquo;t a product you buy once.
              It&rsquo;s a practice you repeat — and we&rsquo;re here for it, one ritual at a time.
            </p>
          </div>

          <Figure
            tile="rose"
            photo={aboutPhoto}
            illustration={SleepingCat}
            height="h-[360px] w-full lg:w-[430px]"
            sizes="(max-width: 1024px) 100vw, 430px"
            className="shrink-0 rounded-card"
          />
        </section>

        {/* Pillars */}
        <section className="bg-mist px-6 py-section lg:px-gutter">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <Eyebrow icon={<Enso size={14} />}>What we look for</Eyebrow>
              <h2 className="text-[clamp(1.75rem,3.6vw,2.5rem)]">
                Three pillars of <span className="accent">pet serenity</span>
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {pillars.map((pillar, i) => (
                <article
                  key={pillar.title}
                  className="flex flex-col gap-4 rounded-card border border-line bg-white p-8 shadow-soft"
                >
                  <span className="font-display text-3xl text-rose">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-sans text-[18px] font-semibold">{pillar.title}</h3>
                  <p className="text-[14.5px] leading-[1.75] text-body">{pillar.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Promise */}
        <section className="mx-auto flex max-w-[1440px] flex-col items-center gap-16 px-6 py-section lg:flex-row-reverse lg:gap-[5.625rem] lg:px-gutter">
          <div className="flex max-w-[560px] flex-col gap-5">
            <Eyebrow icon={<Shield size={14} strokeWidth={2.4} />}>Our promise</Eyebrow>
            <h2 className="text-[clamp(1.75rem,3.6vw,2.375rem)] leading-[1.2]">
              The 60-Day Happy Pet <span className="accent">Guarantee</span>
            </h2>
            <p className="text-[15px] leading-[1.85] text-body">
              Try anything for sixty days. If your pet doesn&rsquo;t settle, tell us and we&rsquo;ll
              make it right — a replacement, a different ritual, or your money back. No photographs
              of a chewed bed required.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "Honest delivery estimates, shown before you buy",
                "No invented reviews — every one comes from a real customer",
                "Behavioural advice, not medical claims",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <CheckDot size={18} />
                  <span className="text-sm text-[#4d4468]">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex flex-wrap gap-3">
              <Button href="/quiz">Take the Calm Quiz</Button>
              <Button href="/shop" variant="outline">
                Browse the shop
              </Button>
            </div>
          </div>

          <Figure
            tile="lavender"
            illustration={SleepingDog}
            height="h-[360px] w-full lg:w-[430px]"
            sizes="(max-width: 1024px) 100vw, 430px"
            className="shrink-0 rounded-card"
          />
        </section>

        {/* Dedication. Carried over from the original theme file — kept quiet
            and given room, rather than dressed up. */}
        <section className="border-t border-line px-6 py-24">
          <div className="mx-auto flex max-w-[520px] flex-col items-center gap-6 text-center">
            <svg width="44" height="44" viewBox="0 0 72 72" fill="none" aria-hidden="true">
              <circle
                cx="36" cy="36" r="28"
                stroke="var(--color-champagne)" strokeWidth="3" strokeLinecap="round"
                strokeDasharray="150 26" transform="rotate(-50 36 36)"
              />
            </svg>
            <p className="font-display text-[1.5rem] italic leading-[1.4] text-ink">
              In memory of Chulo
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Figure } from "@/components/ui/Figure";
import { SleepingCat } from "@/components/ui/illustrations";
import { CheckDot, Heart, Shield } from "@/components/ui/icons";
import { promises } from "@/lib/content";
import { aboutPhoto } from "@/lib/images";

export function About() {
  return (
    <section className="mx-auto flex max-w-[1440px] flex-col items-center gap-16 px-6 py-section lg:flex-row lg:gap-[5.625rem] lg:px-gutter">
      <div className="flex max-w-[620px] flex-col gap-5">
        <Eyebrow icon={<Heart size={14} />}>Our passion is calm</Eyebrow>

        <h2 className="text-[clamp(2rem,4.2vw,2.875rem)] leading-[1.15]">
          We offer calm for <span className="accent">special</span> pets
        </h2>

        <p className="text-[15px] leading-[1.8] text-body">
          Our pets don&rsquo;t have &ldquo;behavioral issues&rdquo; — they have big emotions in a
          loud, busy world. Every product we stock is hand-selected for the science of pet serenity.
        </p>

        <ul className="grid gap-3 sm:grid-cols-2 sm:gap-x-6">
          {promises.map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <CheckDot size={18} />
              <span className="text-sm text-[#4d4468]">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-2 flex flex-wrap items-center gap-3.5">
          <Button href="/quiz">Take the Calm Quiz</Button>
          <Button href="/about" variant="outline">
            Read our story
          </Button>
        </div>
      </div>

      <div className="relative w-full max-w-[430px] shrink-0">
        <Figure
          tile="rose"
          photo={aboutPhoto}
          illustration={SleepingCat}
          height="h-[380px]"
          sizes="(max-width: 1024px) 100vw, 430px"
          className="rounded-card"
        />

        {/*
          This used to be a placeholder testimonial card with five filled stars.
          Until a customer has actually said something, it states a promise we
          can keep instead of borrowing words nobody has spoken.
        */}
        <div className="absolute -bottom-7 -right-4 w-[254px] rounded-[18px] border border-line bg-white p-5 shadow-lifted lg:-right-8">
          <div className="flex flex-col gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-blush text-rose-deep">
              <Shield size={16} />
            </span>
            <p className="text-[13px] leading-[1.65] text-[#4d4468]">
              No reviews yet, and none invented. The first one here will come from
              someone who bought it.
            </p>
            <Link
              href="/reviews"
              className="text-xs font-semibold text-violet transition-opacity hover:opacity-70"
            >
              How reviews work &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

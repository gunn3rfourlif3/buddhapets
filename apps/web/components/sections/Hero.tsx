import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Enso, Shield } from "@/components/ui/icons";
import { SleepingDog } from "@/components/ui/illustrations";
import { heroPhoto } from "@/lib/images";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-midnight">
      {heroPhoto ? (
        <Image
          src={heroPhoto.src}
          alt={heroPhoto.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(115deg, #191036 0%, #2e2153 42%, #5b4397 100%)" }}
        />
      )}

      {/* Scrim: keeps the headline readable over either ground. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(25,16,54,0.82) 0%, rgba(25,16,54,0.55) 45%, rgba(25,16,54,0.15) 100%)",
        }}
      />

      {/* Illustration stands in for the photo until one lands. Drawn above the
          scrim so it stays crisp; the headline sits on the shaded left side. */}
      {!heroPhoto && (
        <SleepingDog className="absolute right-[5%] top-1/2 hidden h-[72%] w-auto -translate-y-1/2 lg:block" />
      )}

      <div className="relative mx-auto max-w-[1440px] px-6 py-24 lg:px-gutter lg:py-[7.25rem]">
        <div className="flex max-w-[660px] flex-col gap-6">
          <span className="inline-flex items-center gap-2 self-start rounded-full border border-rose/40 bg-rose/15 px-[18px] py-[7px] text-[12.5px] font-medium tracking-[0.4px] text-rose-light">
            <Enso size={14} />
            The science of pet serenity
          </span>

          <h1 className="text-[clamp(2.75rem,6vw,4.125rem)] leading-[1.08] text-[#f6f4fb]">
            Calm pets.
            <br />
            <span className="accent-gold">Peaceful</span> homes.
          </h1>

          <p className="max-w-[46ch] text-base leading-[1.75] text-[#f6f4fb]/75">
            Hand-selected wellness for anxious dogs, restless cats, and the people who love them.
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-4">
            <Button href="/shop" variant="rose" className="px-8 py-3.5 text-[14.5px]">
              Shop the Zen Collection
            </Button>
            <Button href="/quiz" variant="outline-light" className="px-7 py-3 text-sm">
              Take the Calm Quiz
            </Button>
          </div>

          <div className="mt-1 flex items-center gap-2.5 text-[13px] text-[#f6f4fb]/70">
            <Shield size={17} className="text-champagne" />
            <span>
              <span className="font-medium text-champagne-light">60-Day Happy Pet Guarantee</span>{" "}
              on every order
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

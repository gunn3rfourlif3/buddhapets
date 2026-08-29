import { Button } from "@/components/ui/Button";

/** The Calm Quiz is the conversion engine — see the hybrid build spec, section 2. */
export function QuizBand() {
  return (
    <section className="px-6 pt-section lg:px-gutter">
      <div
        className="relative mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 overflow-hidden rounded-band px-8 py-12 lg:flex-row lg:items-center lg:px-16 lg:py-14"
        style={{
          background: "linear-gradient(115deg, #191036 0%, #2e2153 55%, #48347a 100%)",
        }}
      >
        <svg
          className="pointer-events-none absolute -right-8 -top-10 opacity-25"
          width="220" height="220" viewBox="0 0 220 220" fill="none" aria-hidden="true"
        >
          <circle
            cx="110" cy="110" r="86"
            stroke="var(--color-champagne)" strokeWidth="3" strokeLinecap="round"
            strokeDasharray="470 70" transform="rotate(-55 110 110)"
          />
        </svg>

        <div className="relative flex max-w-[660px] flex-col gap-3.5">
          <span className="self-start rounded-full border border-champagne-light/35 bg-champagne-light/15 px-4 py-1.5 text-xs font-medium text-champagne-light">
            Free · 2 minutes
          </span>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.2] text-[#f6f4fb]">
            How <span className="accent-gold">zen</span> is your pet?
          </h2>
          <p className="text-[14.5px] leading-[1.75] text-[#f6f4fb]/72">
            Answer a few questions about your pet&rsquo;s stress signals and get a personalized Zen
            Plan — a named ritual matched to their needs, not a generic product list.
          </p>
        </div>

        <Button href="/quiz" variant="rose" className="relative shrink-0 px-9 py-4 text-[15px]">
          Take the Calm Quiz
        </Button>
      </div>
    </section>
  );
}

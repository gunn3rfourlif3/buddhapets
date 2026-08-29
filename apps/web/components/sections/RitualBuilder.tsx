import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CheckDot, Enso } from "@/components/ui/icons";

/**
 * Static presentation of the Ritual Builder (the v1 bundle feature).
 * Interactivity lands when the Woo bundle products exist — see
 * "Spec - BuddhaPets Hybrid Build.md", section 3. Prices shown are the
 * designed example set, not live data.
 */
const steps = [
  {
    n: "1",
    label: "Choose their comfort",
    pick: "Cloud Nine Donut Bed",
    tile: "bg-tile-lavender",
    art: (
      <svg width="26" height="26" viewBox="0 0 120 120" fill="none" aria-hidden="true">
        <ellipse cx="60" cy="72" rx="42" ry="24" fill="var(--color-violet)" />
        <ellipse cx="60" cy="66" rx="28" ry="14" fill="#ffffff" />
        <circle cx="60" cy="62" r="11" fill="var(--color-tile-rose)" />
      </svg>
    ),
  },
  {
    n: "2",
    label: "Add their enrichment",
    pick: "Forage & Flow Snuffle Mat",
    tile: "bg-tile-lemon",
    art: (
      <svg width="26" height="26" viewBox="0 0 120 120" fill="none" aria-hidden="true">
        <rect x="24" y="36" width="72" height="48" rx="10" fill="#d0a92e" />
        <circle cx="42" cy="52" r="5.5" fill="var(--color-tile-lemon)" />
        <circle cx="60" cy="48" r="5.5" fill="var(--color-tile-lemon)" />
        <circle cx="78" cy="54" r="5.5" fill="var(--color-tile-lemon)" />
      </svg>
    ),
  },
];

export function RitualBuilder() {
  return (
    <section className="mx-auto flex max-w-[1440px] flex-col items-center gap-16 px-6 py-section lg:flex-row-reverse lg:gap-[5.625rem] lg:px-gutter">
      <div className="flex max-w-[560px] flex-col gap-5">
        <Eyebrow icon={<Enso size={14} />}>The Ritual Builder</Eyebrow>

        <h2 className="text-[clamp(2rem,4.2vw,2.875rem)] leading-[1.15]">
          Build their ritual, <span className="accent">save</span> as a set
        </h2>

        <p className="text-[15px] leading-[1.8] text-body">
          Calm isn&rsquo;t one product — it&rsquo;s a routine. Pick a comfort piece, an enrichment
          toy, and a finishing touch, and the set price drops 15%. Every ritual ships with a printed
          evening-routine guide.
        </p>

        <Button href="/rituals/build" variant="outline" className="self-start">
          Start building
        </Button>
      </div>

      <div className="flex w-full max-w-[460px] shrink-0 flex-col gap-3.5">
        {steps.map((s) => (
          <div
            key={s.n}
            className="flex items-center gap-4 rounded-[18px] border border-line bg-white p-4 px-5 shadow-soft"
          >
            <div className={`flex size-[54px] shrink-0 items-center justify-center rounded-xl ${s.tile}`}>
              {s.art}
            </div>
            <div className="flex grow flex-col gap-0.5">
              <p className="text-sm font-semibold">
                {s.n} · {s.label}
              </p>
              <p className="text-[12.5px] text-muted">{s.pick}</p>
            </div>
            <CheckDot size={18} />
          </div>
        ))}

        <div className="flex items-center gap-4 rounded-[18px] border-[1.5px] border-dashed border-line-strong p-4 px-5">
          <div className="flex size-[54px] shrink-0 items-center justify-center rounded-xl bg-mist">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-violet-soft)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M12 6v12M6 12h12" />
            </svg>
          </div>
          <div className="flex grow flex-col gap-0.5">
            <p className="text-sm font-semibold text-violet">3 · Complete the ritual</p>
            <p className="text-[12.5px] text-muted">ZenChews · calming spray · guide</p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-[18px] bg-midnight p-4 px-5">
          <div className="flex flex-col gap-0.5">
            <p className="text-xs text-[#8b80ab]">Your ritual</p>
            <p className="text-base font-semibold text-[#f6f4fb]">
              $78.00{" "}
              <span className="text-[12.5px] font-medium text-champagne-light">save 15%</span>
            </p>
          </div>
          <Button href="/rituals/build" variant="rose" className="px-5 py-2.5 text-[13px]">
            Add ritual to cart
          </Button>
        </div>
      </div>
    </section>
  );
}

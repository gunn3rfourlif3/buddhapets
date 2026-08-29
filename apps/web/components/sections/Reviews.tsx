import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stars } from "@/components/ui/Stars";
import { Heart } from "@/components/ui/icons";
import { reviewSlots, tileClass } from "@/lib/content";

/**
 * Review slots render as placeholders until genuine customer reviews exist.
 * Never populate these with invented testimonials.
 */
export function Reviews() {
  return (
    <section className="mx-auto flex max-w-[1440px] flex-col gap-13 px-6 py-section lg:px-gutter">
      <SectionHeading eyebrow={<Eyebrow icon={<Heart size={14} />}>Happy pet lovers</Eyebrow>}>
        Buddha<span className="italic text-rose">Pets</span> reviews
      </SectionHeading>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reviewSlots.map((slot, i) => (
          <article
            key={i}
            className="flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-soft"
          >
            <div className={`flex h-[104px] items-end justify-center ${tileClass[slot.tile]}`}>
              <div className="-mb-7 flex size-14 items-center justify-center rounded-full border-[3px] border-white bg-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-faint)" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <circle cx="12" cy="9" r="3.4" />
                  <path d="M5.5 19.5c1.2-3 3.6-4.5 6.5-4.5s5.3 1.5 6.5 4.5" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 px-5 pb-6 pt-10 text-center">
              <p className="text-[13px] font-semibold text-rose-deep">@[handle]</p>
              <Stars />
              <p className="text-[12.5px] italic leading-[1.65] text-body">
                [Real review — collect after first orders]
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

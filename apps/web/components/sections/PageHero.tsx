import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * The band at the top of every inner page.
 *
 * It used to be `bg-mist` (#f4f2f8) on an ivory page (#fcfbf9) — a 1% lightness
 * step, which is to say no step at all. A page header has to announce where you
 * are, so this one inverts: deep violet ground, ivory type, the accent word in
 * champagne. It also bookends the page against the midnight footer.
 *
 * Contrast on the lighter end of the gradient (#48347a), which is the worst
 * case: ivory 9.9:1, violet-mist 5.9:1, champagne-light 6.3:1 — all clear of
 * 4.5:1. Rose is NOT used for type here; it only reaches 2.8:1.
 */
export function PageHero({
  eyebrow,
  icon,
  title,
  children,
  footer,
  width = "max-w-[820px]",
  className = "px-6 py-24 lg:px-gutter",
}: {
  eyebrow?: ReactNode;
  icon?: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  /** Anything that sits under the subtitle — a guarantee line, buttons. */
  footer?: ReactNode;
  width?: string;
  /** Override padding only; the ground and type colours stay fixed. */
  className?: string;
}) {
  return (
    <section
      className={`relative isolate overflow-hidden bg-[linear-gradient(155deg,#48347a_0%,#3a2a63_52%,#2e2153_100%)] ${className}`}
    >
      {/* Two ensō, far off the reading area, at the edge of visibility. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="pointer-events-none absolute -right-16 -top-20 size-[420px] text-violet-mist/[0.07]"
      >
        <circle
          cx="100"
          cy="100"
          r="84"
          fill="none"
          stroke="currentColor"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray="452 76"
          transform="rotate(-50 100 100)"
        />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="pointer-events-none absolute -bottom-28 -left-24 size-[360px] text-violet-mist/[0.05]"
      >
        <circle
          cx="100"
          cy="100"
          r="84"
          fill="none"
          stroke="currentColor"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray="452 76"
          transform="rotate(120 100 100)"
        />
      </svg>

      <div className={`relative mx-auto flex ${width} flex-col items-center gap-4 text-center`}>
        {eyebrow && (
          <Eyebrow icon={icon} tone="gold">
            {eyebrow}
          </Eyebrow>
        )}
        <h1 className="text-[clamp(2.125rem,4.6vw,3.125rem)] leading-[1.12] text-ivory">{title}</h1>
        {children && (
          <p className="max-w-[52ch] text-[15.5px] leading-[1.85] text-violet-mist">{children}</p>
        )}
        {footer}
      </div>

      {/* A champagne hairline, brightest in the middle, to close the band. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(232,199,120,0.5),transparent)]"
      />
    </section>
  );
}

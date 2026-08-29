"use client";

import { useMemo, useState } from "react";
import { Figure } from "@/components/ui/Figure";
import { artByKey } from "@/components/ui/illustrations";
import { CheckDot, Shield } from "@/components/ui/icons";
import {
  BUNDLE_DISCOUNT,
  formatPrice,
  type Product,
  type RitualRole,
} from "@/lib/content";
import { productPhotos } from "@/lib/images";

const steps: { role: RitualRole; n: string; title: string; help: string }[] = [
  {
    role: "comfort",
    n: "1",
    title: "Choose their comfort",
    help: "Somewhere safe to land — the piece the whole routine ends on.",
  },
  {
    role: "enrichment",
    n: "2",
    title: "Add their enrichment",
    help: "A job for their nose or brain. A busy mind is a quiet mind.",
  },
  {
    role: "finishing",
    n: "3",
    title: "Complete the ritual",
    help: "The finishing touch that signals the day is over.",
  },
];

type Selection = Partial<Record<RitualRole, string>>;

export function RitualBuilder({
  catalogue,
  initial,
}: {
  /** Products grouped by the slot they fill. */
  catalogue: Record<RitualRole, Product[]>;
  /** Pre-selection, e.g. arriving from a Zen Plan. */
  initial?: Selection;
}) {
  const [selection, setSelection] = useState<Selection>(initial ?? {});

  const chosen = useMemo(
    () =>
      steps
        .map(({ role }) => catalogue[role].find((p) => p.slug === selection[role]))
        .filter((p): p is Product => Boolean(p)),
    [selection, catalogue],
  );

  const full = chosen.reduce((sum, p) => sum + p.price, 0);
  const complete = chosen.length === steps.length;
  // The discount only applies to a finished ritual — that's the whole offer.
  const total = complete ? full * (1 - BUNDLE_DISCOUNT) : full;
  const saving = full - total;

  function pick(role: RitualRole, slug: string) {
    setSelection((prev) => ({ ...prev, [role]: prev[role] === slug ? undefined : slug }));
  }

  return (
    <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-section lg:grid-cols-[1fr_380px] lg:gap-16 lg:px-gutter">
      {/* Steps */}
      <div className="flex flex-col gap-14">
        {steps.map((step) => (
          <section key={step.role} className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <span
                className={`flex size-11 shrink-0 items-center justify-center rounded-full border-[1.5px] font-display text-lg transition-colors ${
                  selection[step.role]
                    ? "border-violet bg-violet text-white"
                    : "border-line-strong text-violet"
                }`}
                aria-hidden="true"
              >
                {selection[step.role] ? "✓" : step.n}
              </span>
              <div className="flex flex-col gap-1">
                <h2 className="text-[clamp(1.375rem,2.6vw,1.75rem)]">{step.title}</h2>
                <p className="text-[14px] text-muted">{step.help}</p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {catalogue[step.role].map((product) => {
                const isChosen = selection[step.role] === product.slug;
                return (
                  <button
                    key={product.slug}
                    type="button"
                    aria-pressed={isChosen}
                    onClick={() => pick(step.role, product.slug)}
                    className={`flex flex-col gap-3 rounded-card border p-3 pb-5 text-left transition-all duration-200 ${
                      isChosen
                        ? "border-violet bg-violet/[0.05] shadow-soft"
                        : "border-line bg-white hover:border-line-strong hover:shadow-soft"
                    }`}
                  >
                    <div className="relative">
                      <Figure
                        tile={product.tile}
                        photo={productPhotos[product.slug]}
                        illustration={artByKey[product.art]}
                        height="h-[140px]"
                        sizes="(max-width: 640px) 100vw, 240px"
                      />
                      {isChosen && (
                        <span className="absolute right-2 top-2 rounded-full bg-violet px-2.5 py-1 text-[10.5px] font-semibold text-white">
                          Chosen
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 px-1.5">
                      <p className="text-[14px] font-semibold">{product.name}</p>
                      <p className="text-[12.5px] leading-[1.55] text-muted">{product.blurb}</p>
                      <p className="mt-1 font-display text-[17px] text-violet">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Summary */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="flex flex-col gap-5 rounded-card border border-line bg-white p-6 shadow-soft">
          <h2 className="font-sans text-[13px] font-semibold uppercase tracking-[1.5px] text-muted">
            Your ritual
          </h2>

          <ul className="flex flex-col gap-3">
            {steps.map((step) => {
              const product = catalogue[step.role].find((p) => p.slug === selection[step.role]);
              return (
                <li key={step.role} className="flex items-center gap-3">
                  {product ? (
                    <>
                      <CheckDot size={18} />
                      <span className="grow text-[13.5px] text-[#4d4468]">{product.name}</span>
                      <span className="text-[13.5px] tabular-nums text-muted">
                        {formatPrice(product.price)}
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        className="size-[18px] shrink-0 rounded-full border-[1.5px] border-dashed border-line-strong"
                        aria-hidden="true"
                      />
                      <span className="grow text-[13.5px] text-faint">{step.title}</span>
                    </>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="border-t border-line pt-4">
            {complete ? (
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-[13px] text-muted line-through tabular-nums">
                    {formatPrice(full)}
                  </span>
                  <span className="text-[12.5px] font-semibold text-rose-deep">
                    save {formatPrice(saving)}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-[13px] font-semibold uppercase tracking-[1.2px] text-muted">
                    Total
                  </span>
                  <span className="font-display text-[2rem] tabular-nums text-violet">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] font-semibold uppercase tracking-[1.2px] text-muted">
                  So far
                </span>
                <span className="font-display text-[2rem] tabular-nums text-violet">
                  {formatPrice(full)}
                </span>
              </div>
            )}
          </div>

          <button
            type="button"
            disabled={!complete}
            className="rounded-full bg-rose px-7 py-3.5 text-[14.5px] font-semibold text-white shadow-rose transition-all hover:brightness-105 disabled:pointer-events-none disabled:opacity-40"
          >
            {complete ? "Add ritual to cart" : `Choose ${steps.length - chosen.length} more`}
          </button>

          <p className="text-center text-[12.5px] leading-[1.6] text-muted">
            {complete
              ? "Ships with a printed evening-routine guide."
              : `Complete all three and the set price drops ${Math.round(BUNDLE_DISCOUNT * 100)}%.`}
          </p>

          <div className="flex items-center gap-2.5 border-t border-line pt-4 text-[12.5px] text-body">
            <Shield size={16} className="text-champagne" />
            60 days to decide, on every ritual.
          </div>
        </div>
      </aside>
    </div>
  );
}

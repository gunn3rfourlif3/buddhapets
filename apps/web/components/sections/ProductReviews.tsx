"use client";

import { useEffect, useState } from "react";
import { Stars } from "@/components/ui/Stars";
import { Button } from "@/components/ui/Button";
import { Heart } from "@/components/ui/icons";
import {
  productIdBySlug,
  productReviews,
  reviewFormUrl,
  type StoreReview,
} from "@/lib/store";

/**
 * Reviews for one product, straight from WooCommerce.
 *
 * Until a real review exists this renders the invitation below — which is the
 * honest state for a shop that opened in October 2026, and stops being rendered
 * by itself the moment Woo has something approved to show. There is no code
 * path here that can display a review we wrote.
 */
export function ProductReviews({ slug, name }: { slug: string; name: string }) {
  const [reviews, setReviews] = useState<StoreReview[] | null>(null);

  useEffect(() => {
    let live = true;
    (async () => {
      try {
        const id = await productIdBySlug(slug);
        const found = await productReviews(id);
        if (live) setReviews(found);
      } catch {
        // The shop being unreachable is not worth an error state on a review
        // block: fall through to the invitation, which is true either way.
        if (live) setReviews([]);
      }
    })();
    return () => {
      live = false;
    };
  }, [slug]);

  const count = reviews?.length ?? 0;
  const average =
    count > 0 ? reviews!.reduce((sum, r) => sum + r.rating, 0) / count : 0;

  return (
    <section id="reviews" className="scroll-mt-24 border-t border-line pt-14">
      <div className="flex flex-col gap-2">
        <h2 className="text-[clamp(1.375rem,2.8vw,1.75rem)]">
          What owners say about this one
        </h2>
        {count > 0 && (
          <div className="flex items-center gap-3">
            <Stars rating={average} size={16} />
            <span className="text-[13.5px] text-body">
              {average.toFixed(1)} out of 5 &middot; {count}{" "}
              {count === 1 ? "review" : "reviews"}
            </span>
          </div>
        )}
      </div>

      {count === 0 ? (
        <FirstReview slug={slug} name={name} />
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {reviews!.map((r) => (
            <article
              key={r.id}
              className="flex flex-col gap-3 rounded-card border border-line bg-white p-6 shadow-soft"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-[13.5px] font-semibold text-ink">{r.reviewer}</p>
                  <p className="text-[11.5px] text-muted">
                    {r.verified && (
                      <span className="font-semibold uppercase tracking-[0.1em] text-violet">
                        Verified buyer
                      </span>
                    )}
                    {r.verified && " · "}
                    {r.formatted_date_created}
                  </p>
                </div>
                <Stars rating={r.rating} size={13} />
              </div>
              <div
                className="prose-review text-[13.5px] leading-[1.75] text-body"
                dangerouslySetInnerHTML={{ __html: r.review }}
              />
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

/**
 * The empty state. It is an invitation, not an apology — and it says plainly
 * why there is nothing here, because "no reviews yet" with a reason reads as
 * honest where "no reviews yet" alone reads as broken.
 */
function FirstReview({ slug, name }: { slug: string; name: string }) {
  return (
    <div className="mt-8 overflow-hidden rounded-card border border-dashed border-line-strong bg-white">
      <div className="flex flex-col items-center gap-5 px-7 py-12 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-blush text-rose-deep">
          <Heart size={20} />
        </span>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-[1.5rem] leading-[1.25]">
            Be the first to review the{" "}
            <span className="italic text-violet">{name}</span>
          </h3>
          <p className="mx-auto max-w-[46ch] text-[14px] leading-[1.8] text-body">
            We opened in October 2026. Nobody has lived with this one long enough to
            tell you what they think &mdash; and we would rather show you an empty
            space than something we made up.
          </p>
          <p className="mx-auto max-w-[46ch] text-[14px] leading-[1.8] text-body">
            If you buy it, we&rsquo;ll ask you a week after it arrives. Whatever you
            write goes up here as you wrote it, three stars included.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <Button href={reviewFormUrl(slug)} variant="primary">
            Already own it? Write the first review
          </Button>
          <Button href="/reviews" variant="outline">
            How reviews work here
          </Button>
        </div>

        <p className="text-[12px] text-muted">
          Only customers who bought it can post a review.
        </p>
      </div>
    </div>
  );
}

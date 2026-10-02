/**
 * Five stars, filled to `rating`.
 *
 * This component used to default to five FILLED stars and was rendered on every
 * product card, which told every visitor the catalogue was rated 5/5 before a
 * single order had shipped. A rating is a factual claim: it now has to be
 * passed in, it comes from WooCommerce, and an unrated product draws outlines.
 */
export function Stars({
  rating = 0,
  size = 12,
  count = 5,
}: {
  /** 0–5. Halves are rounded to the nearest whole star. */
  rating?: number;
  size?: number;
  count?: number;
}) {
  const filled = Math.round(Math.min(Math.max(rating, 0), count));

  return (
    <div
      className="flex gap-[2px]"
      role="img"
      aria-label={rating > 0 ? `Rated ${rating} out of ${count}` : "Not yet rated"}
    >
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i < filled ? "var(--color-champagne)" : "none"}
          stroke="var(--color-line-strong)"
          strokeWidth={i < filled ? 0 : 1.6}
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m12 2.6 2.8 5.9 6.4.8-4.7 4.4 1.2 6.3L12 16.9 6.3 20l1.2-6.3L2.8 9.3l6.4-.8L12 2.6Z" />
        </svg>
      ))}
    </div>
  );
}

"use client";

import { useCurrency } from "@/components/currency/CurrencyProvider";
import { BASE, formatIn } from "@/lib/currency";
import { formatPrice } from "@/lib/content";

/**
 * A price in the reader's chosen currency.
 *
 * The server always renders rand, so the markup is identical for every visitor
 * and stays cacheable; the conversion is applied after hydration. Anything
 * other than rand is marked with a "≈" — the customer is charged the rand
 * figure, and the display should never pretend otherwise.
 */
export function Price({ zar, className }: { zar: number; className?: string }) {
  const { code, rates, ready } = useCurrency();

  if (!ready || code === BASE) {
    return <span className={className}>{formatPrice(zar)}</span>;
  }

  return (
    <span className={className} title={`Charged as ${formatPrice(zar)}`}>
      ≈ {formatIn(zar, code, rates)}
    </span>
  );
}

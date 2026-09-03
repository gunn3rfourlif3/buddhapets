"use client";

import { useCurrency } from "@/components/currency/CurrencyProvider";
import { BASE, currencyList, type CurrencyCode } from "@/lib/currency";

/**
 * Display-currency control. Deliberately plain: this is a reading aid, not a
 * checkout option, and dressing it up as one would mislead.
 */
export function CurrencySwitcher({ className = "" }: { className?: string }) {
  const { code, setCode } = useCurrency();

  return (
    <label className={`flex items-center gap-1.5 ${className}`}>
      <span className="sr-only">Display currency</span>
      <select
        value={code}
        onChange={(e) => setCode(e.target.value as CurrencyCode)}
        className="cursor-pointer rounded-full border border-line bg-white px-2.5 py-1 text-[12.5px] font-medium text-body outline-none transition-colors hover:border-line-strong focus-visible:border-violet"
      >
        {currencyList.map((c) => (
          <option key={c.code} value={c.code}>
            {c.code}
          </option>
        ))}
      </select>
    </label>
  );
}

/** The disclosure that has to accompany any converted price. */
export function CurrencyNote({ className = "" }: { className?: string }) {
  const { code, rateDate } = useCurrency();
  if (code === BASE) return null;

  return (
    <p className={`text-[12.5px] leading-[1.7] text-muted ${className}`}>
      Prices shown in {code} are an approximate conversion
      {rateDate ? ` at the mid-market rate of ${rateDate}` : ""}. You will be charged in South
      African rand (ZAR); your bank converts at its own rate and may add a fee.
    </p>
  );
}

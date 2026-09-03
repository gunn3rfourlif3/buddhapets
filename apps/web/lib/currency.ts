/**
 * Display currency conversion.
 *
 * ZAR is the base and the only real currency here: Paystack and Payfast both
 * settle in rand, so that is what the customer is charged no matter what the
 * switcher says. Every other currency is a courtesy conversion for reading,
 * and the UI must say so — quoting a customer $49 and taking R799 off their
 * card is how a store collects chargebacks.
 */

export type CurrencyCode = "ZAR" | "USD" | "EUR" | "GBP" | "AUD";

export type Currency = {
  code: CurrencyCode;
  symbol: string;
  label: string;
  /** Rand has no cents on this catalogue; foreign conversions read better with them. */
  decimals: number;
};

export const currencies: Record<CurrencyCode, Currency> = {
  ZAR: { code: "ZAR", symbol: "R", label: "South African rand", decimals: 0 },
  USD: { code: "USD", symbol: "$", label: "US dollar", decimals: 2 },
  EUR: { code: "EUR", symbol: "€", label: "Euro", decimals: 2 },
  GBP: { code: "GBP", symbol: "£", label: "Pound sterling", decimals: 2 },
  AUD: { code: "AUD", symbol: "A$", label: "Australian dollar", decimals: 2 },
};

export const currencyList = Object.values(currencies);

export const BASE: CurrencyCode = "ZAR";

export type Rates = Record<CurrencyCode, number>;

/**
 * Used when the rate service is unreachable. Deliberately a little stale-proof:
 * a wrong-by-a-few-percent conversion is fine for a "roughly this much" figure,
 * and it is better than the price disappearing. Captured 2026-09-02.
 */
export const FALLBACK_RATES: Rates = {
  ZAR: 1,
  USD: 0.0621,
  EUR: 0.0537,
  GBP: 0.0461,
  AUD: 0.0869,
};

export type RatePayload = {
  base: CurrencyCode;
  rates: Rates;
  /** ISO date the rates are from, or null when these are the built-in fallback. */
  date: string | null;
};

const SOURCE = "https://api.frankfurter.dev/v1/latest?from=ZAR&to=USD,EUR,GBP,AUD";

/** Server-side rate fetch. Never throws — a failure falls back to the table above. */
export async function fetchRates(): Promise<RatePayload> {
  try {
    const res = await fetch(SOURCE, {
      // Rates move slowly enough that six hours is plenty, and it keeps us
      // well clear of any rate limit on a free endpoint.
      next: { revalidate: 21600 },
    });
    if (!res.ok) throw new Error(`rate service returned ${res.status}`);

    const json = (await res.json()) as { date?: string; rates?: Record<string, number> };
    const r = json.rates ?? {};

    // Only trust a payload that has every currency we offer.
    const complete = (["USD", "EUR", "GBP", "AUD"] as const).every(
      (c) => typeof r[c] === "number" && r[c] > 0,
    );
    if (!complete) throw new Error("rate service returned an incomplete payload");

    return {
      base: BASE,
      date: json.date ?? null,
      rates: { ZAR: 1, USD: r.USD, EUR: r.EUR, GBP: r.GBP, AUD: r.AUD },
    };
  } catch (error) {
    console.warn("[currency] falling back to built-in rates:", error);
    return { base: BASE, rates: FALLBACK_RATES, date: null };
  }
}

/**
 * Groups thousands by hand instead of using toLocaleString.
 *
 * Intl output is NOT portable: Node's ICU renders en-ZA thousands with a
 * non-breaking space ("1 099") while Chromium renders a comma ("1,099"). Server
 * and client therefore disagreed on every price over a thousand, which React
 * reports as a hydration mismatch and repairs by re-rendering the whole tree.
 * Formatting explicitly keeps the two identical.
 */
function group(digits: string, separator: string): string {
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

export function convert(amountZar: number, code: CurrencyCode, rates: Rates): number {
  return amountZar * (rates[code] ?? 1);
}

/**
 * Formats a converted amount. Rand uses a narrow space as the thousands
 * separator (the SA convention) and drops the cents, because the catalogue is
 * priced in whole rand and "R799,00" is just noise.
 */
export function formatIn(amountZar: number, code: CurrencyCode, rates: Rates): string {
  const currency = currencies[code];
  const value = convert(amountZar, code, rates);

  if (code === BASE) {
    // South African convention: a thin space between thousands, no cents.
    return currency.symbol + group(String(Math.round(value)), "\u202f");
  }

  const [whole, fraction] = value.toFixed(currency.decimals).split(".");
  const grouped = group(whole, ",");
  return currency.symbol + (fraction ? grouped + "." + fraction : grouped);
}

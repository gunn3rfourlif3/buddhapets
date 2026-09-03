"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  BASE,
  FALLBACK_RATES,
  type CurrencyCode,
  type RatePayload,
  type Rates,
} from "@/lib/currency";

const STORAGE_KEY = "buddhapets.currency";

type CurrencyState = {
  code: CurrencyCode;
  rates: Rates;
  /** Date the rates are from; null while loading or when using the fallback table. */
  rateDate: string | null;
  /** False until the browser has hydrated and read the stored choice. */
  ready: boolean;
  setCode: (code: CurrencyCode) => void;
};

const Ctx = createContext<CurrencyState | null>(null);

function isCode(value: unknown): value is CurrencyCode {
  return value === "ZAR" || value === "USD" || value === "EUR" || value === "GBP" || value === "AUD";
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  // Always start on the base currency so the server and the first client render
  // agree. Switching to a stored preference happens after mount, below.
  const [code, setCodeState] = useState<CurrencyCode>(BASE);
  const [rates, setRates] = useState<Rates>(FALLBACK_RATES);
  const [rateDate, setRateDate] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isCode(stored)) setCodeState(stored);
    } catch {
      // Storage throws outright in some privacy modes. The default is fine.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/rates")
      .then((r) => (r.ok ? (r.json() as Promise<RatePayload>) : null))
      .then((payload) => {
        if (cancelled || !payload) return;
        setRates(payload.rates);
        setRateDate(payload.date);
      })
      .catch(() => {
        // Keep the fallback table — a stale conversion beats a missing price.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const setCode = useCallback((next: CurrencyCode) => {
    setCodeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Preference just won't survive a reload. Not worth surfacing.
    }
  }, []);

  const value = useMemo(
    () => ({ code, rates, rateDate, ready, setCode }),
    [code, rates, rateDate, ready, setCode],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCurrency(): CurrencyState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCurrency must be used inside <CurrencyProvider>");
  return ctx;
}

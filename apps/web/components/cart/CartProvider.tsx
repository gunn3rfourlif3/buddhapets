"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  addItem as apiAdd,
  applyCoupon as apiCoupon,
  getCart,
  productIdBySlug,
  removeItem as apiRemove,
  updateItem as apiUpdate,
  IS_CONFIGURED,
  StoreError,
  type Cart,
} from "@/lib/store";

type CartState = {
  cart: Cart | null;
  /** True until the first cart fetch settles, so the header can stay quiet. */
  loading: boolean;
  /** Keys currently mid-request, so individual rows can show their own spinner. */
  pending: Set<string>;
  error: string | null;
  configured: boolean;
  addBySlug: (slug: string, quantity?: number) => Promise<void>;
  addCoupon: (code: string) => Promise<void>;
  setQuantity: (key: string, quantity: number) => Promise<void>;
  remove: (key: string) => Promise<void>;
  clearError: () => void;
};

const Ctx = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!IS_CONFIGURED) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    getCart()
      .then((c) => {
        if (!cancelled) setCart(c);
      })
      .catch(() => {
        // A failed initial read is not worth an error banner — the customer
        // hasn't asked for anything yet. Writes report their own failures.
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const track = useCallback(async (key: string, work: () => Promise<Cart>) => {
    setPending((prev) => new Set(prev).add(key));
    setError(null);
    try {
      setCart(await work());
    } catch (e) {
      // Log the real thing. A customer gets a readable sentence; whoever is
      // debugging gets the actual error, which is the whole point of a console.
      console.error("[cart] operation failed:", key, e);
      setError(
        e instanceof StoreError
          ? e.message
          : `Something went wrong. Please try again. (${e instanceof Error ? e.message : String(e)})`,
      );
      throw e;
    } finally {
      setPending((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    }
  }, []);

  const addBySlug = useCallback(
    async (slug: string, quantity = 1) => {
      await track(slug, async () => apiAdd(await productIdBySlug(slug), quantity));
    },
    [track],
  );

  const addCoupon = useCallback(
    async (code: string) => {
      await track(`coupon:${code}`, () => apiCoupon(code));
    },
    [track],
  );

  const setQuantity = useCallback(
    async (key: string, quantity: number) => {
      if (quantity < 1) return;
      await track(key, () => apiUpdate(key, quantity));
    },
    [track],
  );

  const remove = useCallback(
    async (key: string) => {
      await track(key, () => apiRemove(key));
    },
    [track],
  );

  const value = useMemo(
    () => ({
      cart,
      loading,
      pending,
      error,
      configured: IS_CONFIGURED,
      addBySlug,
      addCoupon,
      setQuantity,
      remove,
      clearError: () => setError(null),
    }),
    [cart, loading, pending, error, addBySlug, addCoupon, setQuantity, remove],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart(): CartState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

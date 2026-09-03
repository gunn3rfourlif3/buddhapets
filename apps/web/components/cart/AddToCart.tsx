"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { Bag } from "@/components/ui/icons";

/**
 * The add-to-cart control on a product page.
 *
 * Success is stated plainly with a route to the basket rather than a redirect —
 * most people who add a second item resent being thrown out of the catalogue.
 */
export function AddToCart({ slug, name }: { slug: string; name: string }) {
  const { addBySlug, pending, error, configured, clearError } = useCart();
  const [added, setAdded] = useState(false);
  const busy = pending.has(slug);

  if (!configured) {
    return (
      <p className="rounded-card border border-line bg-mist px-5 py-4 text-[14px] leading-[1.7] text-body">
        Ordering isn&rsquo;t switched on yet. {name} will be available shortly.
      </p>
    );
  }

  async function handleAdd() {
    clearError();
    setAdded(false);
    try {
      await addBySlug(slug);
      setAdded(true);
    } catch {
      // The provider has already put a readable message in `error`.
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={handleAdd}
        disabled={busy}
        className="inline-flex items-center justify-center gap-2.5 rounded-full bg-rose px-8 py-3.5 text-[14.5px] font-semibold text-white shadow-rose transition-[transform,opacity] duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Bag size={18} strokeWidth={1.8} />
        {busy ? "Adding…" : "Add to cart"}
      </button>

      {added && !error && (
        <p aria-live="polite" className="text-[13.5px] text-body">
          Added to your basket.{" "}
          <Link href="/cart" className="font-semibold text-violet underline underline-offset-2">
            View basket
          </Link>
        </p>
      )}

      {error && (
        <p aria-live="polite" className="text-[13.5px] text-rose-deep">
          {error}
        </p>
      )}
    </div>
  );
}

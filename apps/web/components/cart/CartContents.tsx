"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { Price } from "@/components/ui/Price";
import { CurrencyNote } from "@/components/currency/CurrencySwitcher";
import { Button } from "@/components/ui/Button";
import { Bag, Shield } from "@/components/ui/icons";
import { CHECKOUT_URL, money } from "@/lib/store";

function EmptyBasket() {
  return (
    <section className="mx-auto flex max-w-[820px] flex-col items-center gap-6 px-6 py-24 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-mist">
        <Bag size={28} strokeWidth={1.6} className="text-violet" />
      </div>
      <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.15]">
        Your basket is <span className="accent">empty</span>
      </h1>
      <p className="max-w-[46ch] text-[15px] leading-[1.8] text-body">
        Nothing here yet. If you&rsquo;re not sure where to start, the Calm Quiz matches your pet to
        a ritual in about two minutes — it&rsquo;s a better starting point than a product list.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button href="/quiz">Take the Calm Quiz</Button>
        <Button href="/shop" variant="outline">
          Browse the shop
        </Button>
      </div>
      <div className="mt-2 flex items-center gap-2.5 text-[13.5px] text-body">
        <Shield size={18} className="text-champagne" />
        Everything is covered by the 60-Day Happy Pet Guarantee.
      </div>
    </section>
  );
}

export function CartContents() {
  const { cart, loading, pending, error, remove, setQuantity, configured } = useCart();

  if (!configured) {
    return (
      <section className="mx-auto max-w-[820px] px-6 py-24 text-center">
        <h1 className="mb-4 text-[clamp(1.75rem,4vw,2.5rem)]">
          Ordering opens <span className="accent">shortly</span>
        </h1>
        <p className="mx-auto max-w-[46ch] text-[15px] leading-[1.8] text-body">
          The shop isn&rsquo;t connected to checkout yet. Browse the catalogue in the meantime —
          everything you see is what will be on sale.
        </p>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="mx-auto max-w-[820px] px-6 py-24 text-center text-[14.5px] text-body">
        Loading your basket…
      </section>
    );
  }

  if (!cart || cart.items.length === 0) return <EmptyBasket />;

  const minor = cart.totals.currency_minor_unit;

  return (
    <section className="mx-auto flex max-w-[900px] flex-col gap-8 px-6 py-16">
      <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.15]">
        Your <span className="accent">basket</span>
      </h1>

      {error && (
        <p aria-live="polite" className="rounded-card bg-blush px-5 py-3.5 text-[14px] text-rose-deep">
          {error}
        </p>
      )}

      <ul className="flex flex-col gap-4">
        {cart.items.map((item) => {
          const busy = pending.has(item.key);
          const image = item.images?.[0];

          return (
            <li
              key={item.key}
              className="flex flex-wrap items-center gap-5 rounded-card border border-line bg-white p-4 shadow-soft"
            >
              <div className="size-20 shrink-0 overflow-hidden rounded-tile bg-mist">
                {image && (
                  <Image
                    src={image.thumbnail || image.src}
                    alt={image.alt || item.name}
                    width={80}
                    height={80}
                    className="size-full object-cover"
                  />
                )}
              </div>

              <div className="flex min-w-[160px] grow flex-col gap-1">
                <p className="text-[15px] font-semibold">{item.name}</p>
                <Price
                  zar={money(item.prices.price, item.prices.currency_minor_unit)}
                  className="text-[14px] text-body"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label={`Decrease quantity of ${item.name}`}
                  disabled={busy || item.quantity <= 1}
                  onClick={() => setQuantity(item.key, item.quantity - 1).catch(() => {})}
                  className="size-8 rounded-full border border-line text-[15px] leading-none transition-colors hover:border-line-strong disabled:opacity-40"
                >
                  −
                </button>
                <span className="w-7 text-center text-[14.5px] tabular-nums">{item.quantity}</span>
                <button
                  type="button"
                  aria-label={`Increase quantity of ${item.name}`}
                  disabled={busy}
                  onClick={() => setQuantity(item.key, item.quantity + 1).catch(() => {})}
                  className="size-8 rounded-full border border-line text-[15px] leading-none transition-colors hover:border-line-strong disabled:opacity-40"
                >
                  +
                </button>
              </div>

              <Price
                zar={money(item.totals.line_total, item.totals.currency_minor_unit)}
                className="w-24 text-right font-display text-lg text-violet"
              />

              <button
                type="button"
                disabled={busy}
                onClick={() => remove(item.key).catch(() => {})}
                className="text-[12.5px] text-muted underline underline-offset-2 transition-colors hover:text-rose-deep disabled:opacity-40"
              >
                {busy ? "…" : "Remove"}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col gap-4 rounded-card border border-line bg-mist p-6">
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-semibold">Subtotal</span>
          <Price
            zar={money(cart.totals.total_items, minor)}
            className="font-display text-2xl text-violet"
          />
        </div>

        <p className="text-[13px] leading-[1.7] text-body">
          Delivery is calculated at checkout — we don&rsquo;t know what it costs until we know where
          it&rsquo;s going.
        </p>

        <CurrencyNote />

        <a
          href={CHECKOUT_URL}
          className="inline-flex items-center justify-center rounded-full bg-rose px-8 py-3.5 text-[14.5px] font-semibold text-white shadow-rose transition-transform duration-200 hover:-translate-y-0.5"
        >
          Continue to checkout
        </a>

        <Link
          href="/shop"
          className="text-center text-[13.5px] text-body underline underline-offset-2"
        >
          Keep browsing
        </Link>
      </div>
    </section>
  );
}

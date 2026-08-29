/**
 * WooCommerce REST client — the commerce engine behind this frontend.
 *
 * Architecture (see "Spec - BuddhaPets Hybrid Build.md"):
 *   Next.js  = everything the customer sees
 *   Woo      = products, cart, orders, payments (Paystack / Payfast plugins)
 *
 * These helpers are SERVER-ONLY: the consumer key and secret must never reach
 * the browser. Cart operations use the public Store API instead (no keys).
 */

import "server-only";

const WOO_URL = process.env.WOO_URL;
const KEY = process.env.WOO_CONSUMER_KEY;
const SECRET = process.env.WOO_CONSUMER_SECRET;

export type WooImage = { id: number; src: string; alt: string };

export type WooProduct = {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;
  permalink: string;
  short_description: string;
  description: string;
  images: WooImage[];
  categories: { id: number; name: string; slug: string }[];
  stock_status: "instock" | "outofstock" | "onbackorder";
  meta_data?: { key: string; value: unknown }[];
};

function assertConfigured(): { url: string; key: string; secret: string } {
  if (!WOO_URL || !KEY || !SECRET) {
    throw new Error(
      "WooCommerce is not configured. Set WOO_URL, WOO_CONSUMER_KEY and WOO_CONSUMER_SECRET (see .env.example).",
    );
  }
  return { url: WOO_URL, key: KEY, secret: SECRET };
}

/**
 * Fetch from the Woo REST API (v3).
 * `revalidate` drives Next's ISR: catalogue pages stay static-fast and
 * refresh in the background, which is what keeps the VPS load flat.
 */
async function wooFetch<T>(
  path: string,
  { params = {}, revalidate = 300 }: { params?: Record<string, string | number>; revalidate?: number } = {},
): Promise<T> {
  const { url, key, secret } = assertConfigured();

  const endpoint = new URL(`/wp-json/wc/v3/${path.replace(/^\//, "")}`, url);
  for (const [k, v] of Object.entries(params)) {
    endpoint.searchParams.set(k, String(v));
  }

  const auth = Buffer.from(`${key}:${secret}`).toString("base64");

  const res = await fetch(endpoint, {
    headers: { Authorization: `Basic ${auth}` },
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`Woo ${res.status} on ${path}: ${await res.text().catch(() => res.statusText)}`);
  }

  return res.json() as Promise<T>;
}

export function listProducts(options: { perPage?: number; category?: string; featured?: boolean } = {}) {
  const params: Record<string, string | number> = {
    per_page: options.perPage ?? 12,
    status: "publish",
  };
  if (options.category) params.category = options.category;
  if (options.featured) params.featured = "true";

  return wooFetch<WooProduct[]>("products", { params });
}

export function getProductBySlug(slug: string) {
  return wooFetch<WooProduct[]>("products", { params: { slug } }).then((rows) => rows[0] ?? null);
}

export function listCategories() {
  return wooFetch<{ id: number; name: string; slug: string; count: number }[]>("products/categories", {
    params: { per_page: 50, hide_empty: 1 },
  });
}

/**
 * Tag a customer with their Zen Plan after the Calm Quiz.
 * Used by the quiz API route so email automation can segment on it.
 */
export function tagCustomerWithPlan(customerId: number, planSlug: string) {
  const { url, key, secret } = assertConfigured();
  const auth = Buffer.from(`${key}:${secret}`).toString("base64");

  return fetch(new URL(`/wp-json/wc/v3/customers/${customerId}`, url), {
    method: "PUT",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
    body: JSON.stringify({ meta_data: [{ key: "zen_plan", value: planSlug }] }),
  });
}

/**
 * Store API base for cart operations, called from the browser with cookies.
 * No credentials — this endpoint is public by design.
 */
export const STORE_API = `${WOO_URL ?? ""}/wp-json/wc/store/v1`;

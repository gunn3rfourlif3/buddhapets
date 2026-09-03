/**
 * WooCommerce Store API client — the real cart.
 *
 * This runs in the BROWSER and talks straight to WordPress. That works because
 * the storefront (buddhapets.co.za) and the CMS (cms.buddhapets.co.za) share a
 * registrable domain, so the requests are same-site: Woo's session cookie is
 * sent normally, no SameSite=None and no third-party-cookie problem. It also
 * means the cart is already Woo's own session, so sending a customer to the
 * Woo checkout page later carries the basket with them.
 *
 * The CMS must return CORS headers for this origin — see
 * infra/wp-mu-plugins/buddhapets-store-api-cors.php.
 *
 * No consumer keys are involved: the Store API is the public half of Woo.
 */

const CMS = process.env.NEXT_PUBLIC_CMS_URL ?? "";
const STORE = `${CMS}/wp-json/wc/store/v1`;

export type StoreImage = { id: number; src: string; thumbnail: string; alt: string };

export type CartItem = {
  key: string;
  id: number;
  name: string;
  quantity: number;
  /** Slug is how we match a Woo line back to our own catalogue entry. */
  short_description: string;
  images: StoreImage[];
  prices: { price: string; currency_minor_unit: number; currency_code: string };
  totals: { line_total: string; currency_minor_unit: number };
};

export type Cart = {
  items: CartItem[];
  items_count: number;
  totals: {
    total_price: string;
    total_items: string;
    currency_code: string;
    currency_minor_unit: number;
  };
};

export type StoreProduct = { id: number; slug: string; name: string; is_in_stock: boolean };

/** Woo returns money as an integer string in minor units. */
export function money(amount: string, minorUnit: number): number {
  const n = Number(amount);
  return Number.isFinite(n) ? n / 10 ** minorUnit : 0;
}

/**
 * The Store API issues a nonce (and a cart token) with every response and
 * requires them back on writes. They live in sessionStorage so a page
 * navigation doesn't cost an extra round trip to re-acquire them.
 */
const NONCE_KEY = "buddhapets.store.nonce";
const TOKEN_KEY = "buddhapets.store.cartToken";

function readStored(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStored(key: string, value: string) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Privacy mode. Every request just re-acquires the nonce; still correct.
  }
}

export class StoreError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!CMS) {
    throw new StoreError("The shop is not connected yet. Please try again shortly.", 0);
  }

  const nonce = readStored(NONCE_KEY);
  const cartToken = readStored(TOKEN_KEY);

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (nonce) headers["Nonce"] = nonce;
  if (cartToken) headers["Cart-Token"] = cartToken;

  let res: Response;
  try {
    res = await fetch(`${STORE}${path}`, { ...init, headers, credentials: "include" });
  } catch {
    // Network-level failure: offline, DNS, or CORS refused the request outright.
    throw new StoreError("We couldn't reach the shop. Check your connection and try again.", 0);
  }

  const freshNonce = res.headers.get("Nonce");
  if (freshNonce) writeStored(NONCE_KEY, freshNonce);
  const freshToken = res.headers.get("Cart-Token");
  if (freshToken) writeStored(TOKEN_KEY, freshToken);

  if (!res.ok) {
    let message = "Something went wrong adding that to your basket.";
    try {
      const body = (await res.json()) as { message?: string };
      // Woo's own messages are customer-readable ("…is out of stock"), so prefer them.
      if (body?.message) message = body.message;
    } catch {
      // Non-JSON error body; the default message stands.
    }
    throw new StoreError(message, res.status);
  }

  return (await res.json()) as T;
}

export function getCart(): Promise<Cart> {
  return request<Cart>("/cart");
}

export function addItem(id: number, quantity = 1): Promise<Cart> {
  return request<Cart>("/cart/add-item", {
    method: "POST",
    body: JSON.stringify({ id, quantity }),
  });
}

export function updateItem(key: string, quantity: number): Promise<Cart> {
  return request<Cart>("/cart/update-item", {
    method: "POST",
    body: JSON.stringify({ key, quantity }),
  });
}

export function removeItem(key: string): Promise<Cart> {
  return request<Cart>("/cart/remove-item", {
    method: "POST",
    body: JSON.stringify({ key }),
  });
}

/**
 * Our catalogue is written in code and keyed by slug; Woo's cart is keyed by
 * numeric id. This bridges the two. A miss means the product exists on the site
 * but was never seeded into Woo — which is a real state worth failing loudly on
 * rather than silently adding the wrong thing.
 */
export async function productIdBySlug(slug: string): Promise<number> {
  const results = await request<StoreProduct[]>(`/products?slug=${encodeURIComponent(slug)}`);
  const match = results.find((p) => p.slug === slug);
  if (!match) {
    throw new StoreError("This product isn't available to order yet.", 404);
  }
  return match.id;
}

/**
 * The Ritual Builder's bundle discount is a Woo coupon, not storefront maths.
 * Woo owns the money: if the saving were only computed in React the customer
 * would be quoted one total and charged another. Create it once with:
 *   wp wc shop_coupon create --code=ritual15 --discount_type=percent \
 *     --amount=15 --user=1
 */
export const RITUAL_COUPON = "ritual15";

export function applyCoupon(code: string): Promise<Cart> {
  return request<Cart>("/cart/apply-coupon", {
    method: "POST",
    body: JSON.stringify({ code }),
  });
}

export const CHECKOUT_URL = `${CMS}/checkout`;
export const IS_CONFIGURED = Boolean(CMS);

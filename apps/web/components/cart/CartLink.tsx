"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { Bag } from "@/components/ui/icons";

/** Basket icon with a live count. Silent until there is something to count. */
export function CartLink() {
  const { cart } = useCart();
  const count = cart?.items_count ?? 0;

  return (
    <Link
      href="/cart"
      aria-label={count > 0 ? `Cart, ${count} item${count === 1 ? "" : "s"}` : "Cart"}
      className="relative transition-colors hover:text-violet"
    >
      <Bag size={20} />
      {count > 0 && (
        <span className="absolute -right-2 -top-1.5 flex size-[17px] items-center justify-center rounded-full bg-rose text-[10px] font-semibold text-white">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}

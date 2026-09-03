import Link from "next/link";
import { nav } from "@/lib/content";
import { Logo, Wordmark } from "@/components/ui/icons";
import { Button } from "@/components/ui/Button";
import { CartLink } from "@/components/cart/CartLink";
import { CurrencySwitcher } from "@/components/currency/CurrencySwitcher";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ivory/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 lg:px-gutter">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo size={34} />
          <Wordmark className="text-2xl" />
        </Link>

        <nav className="hidden items-center gap-8 text-[13.5px] font-medium lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-violet">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <CurrencySwitcher className="hidden sm:flex" />
          <CartLink />
          <Button href="/shop" className="hidden sm:inline-flex">
            Shop Calm
          </Button>
        </div>
      </div>
    </header>
  );
}

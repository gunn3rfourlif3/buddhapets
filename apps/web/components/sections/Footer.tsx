import Link from "next/link";
import { LogoLight, Wordmark } from "@/components/ui/icons";
import { collections, nav } from "@/lib/content";

const social = [
  {
    label: "Instagram",
    path: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="3.6" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "X",
    path: (
      <>
        <path d="M4 4h4l12 16h-4L4 4Z" />
        <path d="m4 20 6.8-7.8M13.2 11.8 20 4" />
      </>
    ),
  },
  {
    label: "Facebook",
    path: <path d="M14 8h3V4.5h-3c-2 0-3.5 1.6-3.5 3.5v3H8V15h2.5v5.5H14V15h2.6l.6-4H14V8.5c0-.3.2-.5.5-.5Z" />,
  },
];

export function Footer() {
  return (
    <footer className="bg-midnight px-6 pb-10 pt-[4.375rem] lg:px-gutter">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12">
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:gap-15">
          <div className="flex max-w-[300px] flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <LogoLight size={30} />
              <Wordmark light className="text-[21px]" />
            </Link>
            <p className="text-[13px] leading-[1.75] text-[#f6f4fb]/60">
              The science of pet serenity — hand-selected calm for anxious dogs, restless cats, and
              the people who love them.
            </p>
            <div className="flex gap-2.5">
              {social.map((s) => (
                <Link
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex size-8 items-center justify-center rounded-full bg-[#f6f4fb]/10 text-[#f6f4fb] transition-colors hover:bg-rose"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {s.path}
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3.5">
            <p className="text-[13px] font-semibold tracking-[0.5px] text-[#f6f4fb]">Contact</p>
            <div className="flex flex-col gap-2.5 text-[13px] text-[#f6f4fb]/60">
              <p>[Business address]</p>
              <p>[Phone / WhatsApp]</p>
              <p>hello@buddhapets.co.za</p>
            </div>
          </div>

          <div className="flex flex-col gap-3.5">
            <p className="text-[13px] font-semibold tracking-[0.5px] text-[#f6f4fb]">Shop</p>
            <div className="flex flex-col gap-2.5 text-[13px] text-[#f6f4fb]/60">
              {collections.map((c) => (
                <Link key={c.slug} href={`/collections/${c.slug}`} className="transition-colors hover:text-[#f6f4fb]">
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex max-w-[320px] flex-col gap-3.5">
            <p className="text-[13px] font-semibold tracking-[0.5px] text-[#f6f4fb]">Subscribe</p>
            <p className="text-[13px] leading-[1.75] text-[#f6f4fb]/60">
              Seven evenings of calm — a free one-week ritual for you and your pet, by email.
            </p>
            <form className="flex gap-2.5">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder="Email address"
                className="grow rounded-full border border-[#f6f4fb]/18 bg-[#f6f4fb]/8 px-5 py-2.5 text-[12.5px] text-[#f6f4fb] placeholder:text-[#f6f4fb]/40"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-rose px-5 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:brightness-105"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-[#f6f4fb]/10 pt-5.5 text-xs text-[#f6f4fb]/40 sm:flex-row sm:justify-between">
          <div className="flex flex-wrap gap-5.5">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-[#f6f4fb]/70">
                {item.label}
              </Link>
            ))}
          </div>
          <p>© {new Date().getFullYear()} BuddhaPets. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

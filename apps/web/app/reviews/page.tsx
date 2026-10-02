import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { CheckDot, Clock, Heart, Shield } from "@/components/ui/icons";
import { products } from "@/lib/content";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "BuddhaPets opened in October 2026 and has no customer reviews yet. Here is how reviews work here, and how to post the first one.",
};

/**
 * The reviews page.
 *
 * It exists because the honest answer to "what do customers say?" is currently
 * "nothing yet", and a shop that says so plainly is more credible than one that
 * fills the space. Every claim on this page is about OUR policy, which we can
 * keep. Nothing on it is attributed to a customer.
 *
 * When real reviews arrive, the per-product blocks fill themselves from
 * WooCommerce (see components/sections/ProductReviews.tsx) and the invitation
 * below should be cut down to the promise section.
 */

const promises = [
  {
    icon: <Shield size={18} />,
    title: "Only people who bought it",
    body: "Reviews are restricted to verified buyers in WooCommerce. If an order was never placed, the form will not accept a review — which is why there is no way for us, or anyone else, to pad this page.",
  },
  {
    icon: <Heart size={18} />,
    title: "We publish the bad ones",
    body: "Three stars goes up the same as five. A wall of perfect scores tells you nothing except that someone is curating, and the qualified review is the one that helps the next person decide.",
  },
  {
    icon: <Clock size={18} />,
    title: "We ask after it arrives, not after you pay",
    body: "Our stock ships from a supplier and takes 12–25 days to reach a South African address. The review request goes out a week after delivery, when you have actually used the thing.",
  },
  {
    icon: <CheckDot size={18} />,
    title: "Your words, unedited",
    body: "We fix nothing but a broken link. We do not rewrite, trim for flattery, or reorder reviews to put the kind ones on top.",
  },
];

const steps = [
  {
    n: "01",
    title: "Use it for a week",
    body: "A calming bed judged on the day it arrives is a review of a parcel. Give it a few nights — ideally one loud one.",
  },
  {
    n: "02",
    title: "Open the product page",
    body: "Every product page has a review block at the bottom. If you are signed in with the email you ordered under, the form is there.",
  },
  {
    n: "03",
    title: "Say one specific thing",
    body: "What changed, or did not. “She settled by the second night” is worth more to the next owner than “great product”.",
  },
];

export default function ReviewsPage() {
  const featured = products.slice(0, 6);

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow={<>Nothing here yet</>}
          icon={<Heart size={14} />}
          title={
            <>
              Be the first to <span className="accent-gold">review us</span>
            </>
          }
          footer={
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <Button href="/shop" variant="light">
                Browse the shop
              </Button>
              <Button href="/contact" variant="outline-light">
                Ask us anything first
              </Button>
            </div>
          }
        >
          BuddhaPets opened in October 2026. No customer has had one of these long
          enough to tell you what they think, so this page is empty &mdash; and it
          will stay empty until somebody fills it who actually bought something.
        </PageHero>

        {/* The promise */}
        <section className="mx-auto flex max-w-[1040px] flex-col gap-10 px-6 py-section lg:px-gutter">
          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)]">
              What we promise about this page
            </h2>
            <p className="max-w-[58ch] text-[15px] leading-[1.85] text-body">
              It is easy to buy reviews and most new stores do. We would rather tell
              you the rules we hold ourselves to, so that when this page does fill
              up, it means something.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {promises.map((p) => (
              <article
                key={p.title}
                className="flex flex-col gap-3 rounded-card border border-line bg-white p-7 shadow-soft"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-blush text-rose-deep">
                  {p.icon}
                </span>
                <h3 className="font-sans text-[15px] font-semibold text-ink">{p.title}</h3>
                <p className="text-[13.5px] leading-[1.8] text-body">{p.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* How to post one */}
        <section className="bg-mist">
          <div className="mx-auto flex max-w-[1040px] flex-col gap-10 px-6 py-section lg:px-gutter">
            <div className="flex flex-col gap-3">
              <h2 className="text-[clamp(1.5rem,3vw,2rem)]">
                How to write the <span className="italic text-violet">first one</span>
              </h2>
              <p className="max-w-[58ch] text-[15px] leading-[1.85] text-body">
                If you have already ordered, this is all of it. It takes about two
                minutes and it is the single most useful thing you can do for the
                next person deciding.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {steps.map((s) => (
                <article key={s.n} className="flex flex-col gap-3 rounded-card bg-white p-7 shadow-soft">
                  <span className="font-display text-[1.75rem] leading-none text-champagne">
                    {s.n}
                  </span>
                  <h3 className="font-sans text-[15px] font-semibold text-ink">{s.title}</h3>
                  <p className="text-[13.5px] leading-[1.8] text-body">{s.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Pick something to review */}
        <section className="mx-auto flex max-w-[1040px] flex-col gap-8 px-6 py-section lg:px-gutter">
          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)]">Nothing to review yet?</h2>
            <p className="max-w-[58ch] text-[15px] leading-[1.85] text-body">
              Start here. Everything is covered by the 60-Day Happy Pet Guarantee, so
              the risk of going first is ours, not yours.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {featured.map((p) => (
              <Button key={p.slug} href={`/shop/${p.slug}`} variant="outline">
                {p.name}
              </Button>
            ))}
          </div>

          <div className="mt-4 flex flex-col items-start gap-4 rounded-card border border-line bg-white p-8 shadow-soft sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1.5">
              <p className="font-sans text-[15px] font-semibold text-ink">
                Bought something already?
              </p>
              <p className="text-[13.5px] leading-[1.8] text-body">
                Open the product page and scroll to the bottom &mdash; the form is
                waiting for you.
              </p>
            </div>
            <Button href="/shop" variant="primary">
              Find your product
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

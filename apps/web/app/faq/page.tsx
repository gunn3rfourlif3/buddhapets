import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Chevron, Question, Shield } from "@/components/ui/icons";
import { faqGroups } from "@/lib/content";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "Delivery, the 60-Day Happy Pet Guarantee, product suitability and the Calm Quiz — answered plainly.",
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow={<>General &amp; popular</>}
          icon={<Question size={14} />}
          title={<>Frequently asked <span className="accent-gold">questions</span></>}
        >
          Everything pet parents ask before their first order. If yours isn&rsquo;t here, ask us —
          a real person answers.
        </PageHero>

        <section className="mx-auto flex max-w-[820px] flex-col gap-14 px-6 py-section">
          {faqGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-5">
              <h2 className="text-[clamp(1.375rem,2.8vw,1.75rem)]">{group.title}</h2>

              <div className="flex flex-col gap-3">
                {group.items.map((item, i) => (
                  <details
                    key={item.q}
                    open={i === 0}
                    className="group rounded-[18px] border border-line bg-white px-6 py-5 shadow-soft"
                  >
                    <summary className="flex cursor-pointer list-none items-center gap-4 [&::-webkit-details-marker]:hidden">
                      <span className="grow text-[15px] font-semibold">{item.q}</span>
                      <Chevron
                        size={18}
                        className="shrink-0 text-violet transition-transform duration-300 group-open:rotate-180"
                      />
                    </summary>
                    <p className="pt-3 text-[14.5px] leading-[1.8] text-body">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}

          <div className="flex flex-col items-center gap-5 rounded-card border border-line bg-white p-8 text-center shadow-soft">
            <Shield size={26} className="text-champagne" />
            <h2 className="text-2xl">Still not sure?</h2>
            <p className="max-w-[44ch] text-[14.5px] leading-[1.75] text-body">
              Tell us about your pet — breed, age, and what they do when they&rsquo;re unsettled —
              and we&rsquo;ll tell you honestly whether we have something that helps.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href="/contact">Ask us a question</Button>
              <Button href="/quiz" variant="outline">
                Take the Calm Quiz
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

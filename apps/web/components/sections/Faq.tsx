import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Chevron, Question } from "@/components/ui/icons";
import { faqs } from "@/lib/content";

export function Faq() {
  return (
    <section className="bg-mist px-6 py-section lg:px-gutter">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-16 lg:flex-row lg:gap-[5.625rem]">
        <div className="flex max-w-[440px] flex-col gap-4.5">
          <Eyebrow icon={<Question size={14} />}>General &amp; popular</Eyebrow>
          <h2 className="text-[clamp(2rem,4.2vw,2.75rem)] leading-[1.15]">
            Frequently asked <span className="accent">questions</span>
          </h2>
          <p className="text-[15px] leading-[1.8] text-body">
            Everything pet parents ask us before their first order.
          </p>
          <Button href="/faq" variant="outline" className="mt-1 self-start">
            Other FAQs
          </Button>
        </div>

        <div className="flex w-full grow flex-col gap-3.5">
          {faqs.map((item, i) => (
            <details
              key={item.q}
              open={i === 0}
              className="group rounded-[18px] border border-line bg-white px-6 py-5 shadow-soft"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 [&::-webkit-details-marker]:hidden">
                <span className="font-display text-[17px] text-rose">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="grow text-[15px] font-semibold">{item.q}</span>
                <Chevron
                  size={18}
                  className="shrink-0 text-violet transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <p className="pl-9 pt-3 text-sm leading-[1.75] text-body">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

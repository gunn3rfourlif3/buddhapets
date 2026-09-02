import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { ContactForm } from "@/components/contact/ContactForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Enso, Shield } from "@/components/ui/icons";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about an order, a ritual, or whether something suits your pet — ask us.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-mist px-6 py-20 lg:px-gutter">
          <div className="mx-auto flex max-w-[820px] flex-col items-center gap-4 text-center">
            <Eyebrow icon={<Enso size={14} />}>Talk to us</Eyebrow>
            <h1 className="text-[clamp(2rem,4.5vw,3rem)] leading-[1.15]">
              Ask us <span className="accent">anything</span>
            </h1>
            <p className="max-w-[52ch] text-[15px] leading-[1.8] text-body">
              Whether something suits your pet, where an order is, or which ritual to start with —
              a real person reads these.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1100px] gap-12 px-6 py-section lg:grid-cols-[1fr_320px] lg:gap-16">
          <ContactForm />

          <aside className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="font-sans text-[13px] font-semibold uppercase tracking-[1.5px] text-muted">
                Reach us directly
              </h2>
              <div className="flex flex-col gap-2 text-[14.5px] text-[#4d4468]">
                <p>hello@buddhapets.co.za</p>
                <p className="text-muted">[Phone / WhatsApp]</p>
                <p className="text-muted">[Business address]</p>
              </div>
              <p className="text-[13px] leading-[1.7] text-muted">
                We answer within one business day, usually sooner.
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-card border border-line bg-white p-5 shadow-soft">
              <Shield size={20} className="mt-0.5 shrink-0 text-champagne" />
              <p className="text-[13.5px] leading-[1.7] text-[#4d4468]">
                <span className="font-semibold text-ink">60-Day Happy Pet Guarantee.</span> If your
                pet doesn&rsquo;t settle, tell us and we&rsquo;ll make it right.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="font-sans text-[13px] font-semibold uppercase tracking-[1.5px] text-muted">
                Answered already
              </h2>
              <div className="flex flex-col gap-2">
                {faqs.map((f) => (
                  <details
                    key={f.q}
                    className="group rounded-2xl border border-line bg-white px-4 py-3"
                  >
                    <summary className="cursor-pointer list-none text-[13.5px] font-semibold [&::-webkit-details-marker]:hidden">
                      {f.q}
                    </summary>
                    <p className="pt-2 text-[13px] leading-[1.7] text-body">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { ContactForm } from "@/components/contact/ContactForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Chat, Clock, Enso, Mail, Pin, Question, Shield } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about an order, a ritual, or whether something suits your pet — ask us.",
};

/** The three ways to reach a real person, ordered by how fast they answer. */
const channels = [
  {
    icon: <Chat size={20} />,
    label: "WhatsApp",
    value: "081 430 0804",
    note: "Fastest — usually within the hour",
    href: "https://wa.me/27814300804",
  },
  {
    icon: <Mail size={20} />,
    label: "Email",
    value: "hello@buddhapets.co.za",
    note: "Answered within one business day",
    href: "mailto:hello@buddhapets.co.za",
  },
  {
    icon: <Pin size={20} />,
    label: "Registered address",
    value: "32a Devonshire Bryanston Ave",
    note: "Johannesburg, South Africa",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="bg-ivory">
        <section className="bg-mist px-6 pb-28 pt-16 lg:px-gutter">
          <div className="mx-auto flex max-w-[640px] flex-col items-center gap-4 text-center">
            <Eyebrow icon={<Enso size={14} />}>Talk to us</Eyebrow>
            <h1 className="text-[clamp(2rem,4.5vw,3rem)] leading-[1.15]">
              Ask us <span className="accent">anything</span>
            </h1>
            <p className="max-w-[46ch] text-[15px] leading-[1.8] text-body">
              Whether something suits your pet, where an order is, or which ritual to start with —
              a real person reads every one of these.
            </p>
          </div>
        </section>

        {/* Pulled up over the band so the page opens on the answer, not the form. */}
        <section className="px-6 lg:px-gutter">
          <div className="mx-auto -mt-16 grid max-w-[1120px] gap-5 sm:grid-cols-3">
            {channels.map((c) => {
              const inner = (
                <>
                  <span className="flex size-11 items-center justify-center rounded-full bg-blush text-rose-deep">
                    {c.icon}
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="text-[11.5px] font-semibold uppercase tracking-[1.3px] text-muted">
                      {c.label}
                    </span>
                    <span className="text-[15px] font-semibold leading-snug text-ink">
                      {c.value}
                    </span>
                    <span className="text-[12.5px] leading-[1.6] text-body">{c.note}</span>
                  </span>
                </>
              );

              const shell =
                "flex h-full flex-col items-start gap-4 rounded-card border border-line bg-white p-6 shadow-soft";

              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  className={`${shell} transition-shadow duration-300 hover:shadow-lifted`}
                >
                  {inner}
                </a>
              ) : (
                <div key={c.label} className={shell}>
                  {inner}
                </div>
              );
            })}
          </div>
        </section>

        <section className="px-6 lg:px-gutter">
          <div className="mx-auto grid max-w-[1120px] gap-10 pb-section pt-20 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
          <div className="rounded-band border border-line bg-white p-7 shadow-soft sm:p-10">
            <div className="mb-8 flex flex-col gap-2">
              <h2 className="text-[clamp(1.5rem,3vw,1.875rem)] leading-tight">
                Send us a <span className="accent">message</span>
              </h2>
              <p className="text-[14px] leading-[1.75] text-body">
                The more you tell us about your pet, the more useful our answer.
              </p>
            </div>
            <ContactForm />
          </div>

          <aside className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-start gap-3.5 rounded-card border border-line bg-white p-5 shadow-soft">
              <Clock size={20} className="mt-0.5 shrink-0 text-violet" />
              <p className="text-[13.5px] leading-[1.7] text-[#4d4468]">
                <span className="font-semibold text-ink">One business day.</span> That&rsquo;s our
                outside limit, not our average — most messages are answered the same day.
              </p>
            </div>

            <div className="flex items-start gap-3.5 rounded-card border border-line bg-white p-5 shadow-soft">
              <Shield size={20} className="mt-0.5 shrink-0 text-champagne" />
              <p className="text-[13.5px] leading-[1.7] text-[#4d4468]">
                <span className="font-semibold text-ink">60-Day Happy Pet Guarantee.</span> If your
                pet doesn&rsquo;t settle, tell us and we&rsquo;ll make it right.
              </p>
            </div>

            <Link
              href="/faq"
              className="group flex items-start gap-3.5 rounded-card border border-line bg-mist p-5 transition-colors duration-300 hover:border-line-strong"
            >
              <Question size={20} className="mt-0.5 shrink-0 text-violet" />
              <span className="text-[13.5px] leading-[1.7] text-[#4d4468]">
                <span className="font-semibold text-ink group-hover:text-violet">
                  Read the FAQ first
                </span>{" "}
                — delivery, the guarantee, and which product suits which pet are all answered there.
              </span>
            </Link>
          </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

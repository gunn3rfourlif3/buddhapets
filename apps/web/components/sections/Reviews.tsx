import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Heart, Shield, Clock, CheckDot } from "@/components/ui/icons";

/**
 * The home page review band.
 *
 * There are no customer reviews yet, so this asks for the first one instead of
 * displaying four placeholder cards with five filled stars — which is what used
 * to be here, and which read as a rated shop to anyone who did not stop to read
 * the bracketed text.
 *
 * NEVER populate this with invented testimonials. When real reviews exist,
 * replace this with the three or four best, quoted exactly, attributed to the
 * name the customer left in WooCommerce.
 */
const promises = [
  { icon: <Shield size={15} />, text: "Verified buyers only" },
  { icon: <Heart size={15} />, text: "Three stars published too" },
  { icon: <Clock size={15} />, text: "Asked a week after delivery" },
  { icon: <CheckDot size={15} />, text: "Never edited" },
];

export function Reviews() {
  return (
    <section className="mx-auto flex max-w-[1440px] flex-col gap-13 px-6 py-section lg:px-gutter">
      <SectionHeading eyebrow={<Eyebrow icon={<Heart size={14} />}>Nothing here yet</Eyebrow>}>
        Be the first to <span className="italic text-rose">review us</span>
      </SectionHeading>

      <div className="mx-auto mt-10 w-full max-w-[920px] overflow-hidden rounded-card border border-dashed border-line-strong bg-white shadow-soft">
        <div className="flex flex-col items-center gap-6 px-7 py-14 text-center">
          <p className="max-w-[54ch] text-[15px] leading-[1.9] text-body">
            We opened in October 2026. Nobody has lived with any of this long enough
            to tell you whether it works &mdash; so rather than borrow someone
            else&rsquo;s words, we have left the space empty. The first review here
            will be a real one, from someone who paid for the thing they are
            describing.
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2.5">
            {promises.map((p) => (
              <li
                key={p.text}
                className="inline-flex items-center gap-2 rounded-full bg-mist px-4 py-2 text-[12.5px] font-semibold text-violet"
              >
                <span className="text-rose-deep">{p.icon}</span>
                {p.text}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button href="/shop" variant="primary">
              Pick something to try
            </Button>
            <Button href="/reviews" variant="outline">
              How reviews work here
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

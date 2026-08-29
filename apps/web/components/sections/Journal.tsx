import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Figure } from "@/components/ui/Figure";
import { journalArt } from "@/components/ui/illustrations";
import { Journal as JournalIcon } from "@/components/ui/icons";
import { journal } from "@/lib/content";
import { journalPhotos } from "@/lib/images";


export function Journal() {
  return (
    <section className="mx-auto flex max-w-[1440px] flex-col gap-13 px-6 py-section lg:px-gutter">
      <SectionHeading eyebrow={<Eyebrow icon={<JournalIcon size={14} />}>Latest from the Journal</Eyebrow>}>
        Articles &amp; <span className="accent">rituals</span>
      </SectionHeading>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {journal.map((post) => (
          <Link
            key={post.slug}
            href={`/journal/${post.slug}`}
            className="group flex flex-col gap-[18px] rounded-card border border-line bg-white p-3.5 pb-7 shadow-soft transition-shadow duration-300 hover:shadow-lifted"
          >
            <Figure
              tile={post.tile}
              photo={journalPhotos[post.slug]}
              illustration={journalArt[post.slug]}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="flex flex-col gap-2.5 px-2.5">
              <span className="self-start rounded-full bg-blush px-3 py-1 text-[10.5px] font-semibold text-rose-deep">
                {post.category}
              </span>
              <h3 className="text-xl leading-[1.3] transition-colors group-hover:text-violet">
                {post.title}
              </h3>
              <p className="text-[13px] leading-[1.65] text-muted">{post.excerpt}</p>
              <p className="text-[11.5px] text-faint">{post.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

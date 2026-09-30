import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { PageHero } from "@/components/sections/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Figure } from "@/components/ui/Figure";
import { journalArt } from "@/components/ui/illustrations";
import { Journal as JournalIcon } from "@/components/ui/icons";
import { journal } from "@/lib/content";
import { journalPhotos } from "@/lib/images";
import { articleBySlug } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Rituals, feeding and ingredients — practical writing on helping an anxious pet settle, without the marketing claims.",
};

export default function JournalPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="The Journal"
          icon={<JournalIcon size={14} />}
          title={<>Articles &amp; <span className="accent-gold">rituals</span></>}
        >
          Practical writing on helping an anxious pet settle. Behavioural advice, honest about what
          the evidence does and doesn&rsquo;t support.
        </PageHero>

        <section className="mx-auto grid max-w-[1440px] gap-6 px-6 py-section md:grid-cols-2 lg:grid-cols-3 lg:px-gutter">
          {journal.map((post) => {
            const article = articleBySlug(post.slug);
            return (
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
                  <h2 className="text-xl leading-[1.3] transition-colors group-hover:text-violet">
                    {post.title}
                  </h2>
                  <p className="text-[13px] leading-[1.65] text-muted">{post.excerpt}</p>
                  <p className="text-[11.5px] text-faint">
                    {article ? `${article.readingTime} min read` : post.date}
                  </p>
                </div>
              </Link>
            );
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}

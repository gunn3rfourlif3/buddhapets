import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { Figure } from "@/components/ui/Figure";
import { journalArt } from "@/components/ui/illustrations";
import { journal } from "@/lib/content";
import { journalPhotos } from "@/lib/images";
import { articleBySlug } from "@/lib/journal";

type Params = { slug: string };

export function generateStaticParams() {
  return journal.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = journal.find((p) => p.slug === slug);
  if (!post) return { title: "Journal" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: `${post.title} · BuddhaPets`, description: post.excerpt, type: "article" },
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = journal.find((p) => p.slug === slug);
  const article = articleBySlug(slug);
  if (!post || !article) notFound();

  const others = journal.filter((p) => p.slug !== slug);

  return (
    <>
      <Header />
      <main>
        <article>
          {/* Header */}
          <div className="mx-auto flex max-w-[720px] flex-col items-center gap-5 px-6 pb-10 pt-16 text-center">
            <nav aria-label="Breadcrumb" className="text-[13px] text-muted">
              <Link href="/journal" className="transition-colors hover:text-violet">
                Journal
              </Link>
              <span className="px-2">/</span>
              <span className="text-ink">{post.category}</span>
            </nav>

            <h1 className="text-[clamp(2rem,4.5vw,3rem)] leading-[1.15]">{post.title}</h1>
            <p className="max-w-[46ch] text-[16px] leading-[1.8] text-body">{post.excerpt}</p>
            <p className="text-[12.5px] text-faint">
              {article.readingTime} min read · {post.date}
            </p>
          </div>

          <div className="mx-auto max-w-[900px] px-6">
            <Figure
              tile={post.tile}
              photo={journalPhotos[post.slug]}
              illustration={journalArt[post.slug]}
              height="h-[300px] sm:h-[380px]"
              sizes="(max-width: 900px) 100vw, 900px"
              priority
              className="rounded-card"
            />
          </div>

          {/* Body */}
          <div className="mx-auto flex max-w-[680px] flex-col gap-6 px-6 py-14">
            {article.body.map((block, i) =>
              block.startsWith("## ") ? (
                <h2 key={i} className="mt-4 text-[clamp(1.375rem,2.6vw,1.75rem)] leading-[1.3]">
                  {block.slice(3)}
                </h2>
              ) : (
                <p key={i} className="text-[16.5px] leading-[1.85] text-body">
                  {block}
                </p>
              ),
            )}

            <p className="mt-4 border-t border-line pt-6 text-[13.5px] italic leading-[1.7] text-muted">
              Written for general guidance, not as veterinary advice. If your pet&rsquo;s distress is
              severe, sudden, or new, talk to your vet before changing anything.
            </p>
          </div>
        </article>

        {/* Quiz CTA */}
        <section className="bg-mist px-6 py-16 lg:px-gutter">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-5 text-center">
            <h2 className="text-2xl">Not sure which ritual fits?</h2>
            <p className="max-w-[46ch] text-[14.5px] leading-[1.75] text-body">
              Two minutes of questions about your pet&rsquo;s stress signals, and we&rsquo;ll match
              them to a plan built for exactly that pattern.
            </p>
            <Button href="/quiz">Take the Calm Quiz</Button>
          </div>
        </section>

        {/* More reading */}
        {others.length > 0 && (
          <section className="mx-auto flex max-w-[1440px] flex-col gap-8 px-6 py-section lg:px-gutter">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)]">
              More from the <span className="accent">Journal</span>
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/journal/${p.slug}`}
                  className="group flex items-center gap-5 rounded-card border border-line bg-white p-4 shadow-soft transition-shadow hover:shadow-lifted"
                >
                  <Figure
                    tile={p.tile}
                    photo={journalPhotos[p.slug]}
                    illustration={journalArt[p.slug]}
                    height="h-[92px] w-[120px] shrink-0"
                    sizes="120px"
                  />
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10.5px] font-semibold uppercase tracking-[1.2px] text-rose-deep">
                      {p.category}
                    </span>
                    <h3 className="font-sans text-[15px] font-semibold leading-[1.4] transition-colors group-hover:text-violet">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

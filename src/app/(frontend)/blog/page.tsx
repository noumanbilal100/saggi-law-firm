import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { loadAllBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Long-form guides and case notes from Saggi Law Firm on Canadian criminal law — bail, impaired driving, Charter issues, and more.",
  alternates: { canonical: "/blog" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Journal", item: `${siteConfig.url}/blog` },
  ],
};

export default async function BlogIndexPage() {
  const posts = await loadAllBlogPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="relative overflow-hidden pb-8 pt-16 md:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(173,82,7,0.08), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
          <nav
            className="mb-6 flex items-center gap-2 text-[0.85rem] text-muted"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-rust">Home</Link>
            <span aria-hidden className="opacity-50">›</span>
            <span>Journal</span>
          </nav>

          <Eyebrow>Journal</Eyebrow>
          <h1 className="mt-4 max-w-[22ch] font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.03em]">
            Guides, case notes and{" "}
            <em className="font-medium not-italic italic text-rust">answers</em>.
          </h1>
          <p className="mt-5 max-w-[62ch] text-[1.1rem] leading-[1.65] text-muted">
            Long-form pieces on Canadian criminal law — the process, the defences, the mistakes to avoid — from Saggi Law Firm.
          </p>
        </div>
      </section>

      <section className="pb-24 pt-8 md:pb-32">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          {posts.length === 0 ? (
            <div className="rounded-[10px] border border-dashed border-rule bg-cream-warm p-16 text-center text-muted">
              No posts yet.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const date = new Date(post.frontmatter.date);
                return (
                  <Link
                    key={post.frontmatter.slug}
                    href={`/blog/${post.frontmatter.slug}`}
                    className="group flex h-full flex-col gap-3 rounded-[10px] border border-rule bg-paper p-7 transition-all hover:-translate-y-1 hover:border-rust hover:shadow-brand-sm"
                  >
                    <div className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.12em]">
                      <span className="text-rust">{post.frontmatter.category}</span>
                      {post.frontmatter.sample && (
                        <span className="rounded bg-maple/10 px-1.5 py-0.5 font-mono text-[0.65rem] text-maple">
                          sample
                        </span>
                      )}
                    </div>
                    <h2 className="font-display text-[1.25rem] font-medium leading-[1.3]">
                      {post.frontmatter.title}
                    </h2>
                    <p className="line-clamp-3 text-[0.95rem] leading-[1.6] text-muted">
                      {post.frontmatter.excerpt}
                    </p>
                    <div className="mt-auto flex items-center gap-2 pt-3 text-[0.78rem] text-muted">
                      <time dateTime={post.frontmatter.date}>
                        {date.toLocaleDateString("en-CA", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      {post.frontmatter.readTime && (
                        <>
                          <span aria-hidden>·</span>
                          <span>{post.frontmatter.readTime}</span>
                        </>
                      )}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[0.85rem] font-semibold text-rust transition-transform group-hover:translate-x-1">
                      Read the article →
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

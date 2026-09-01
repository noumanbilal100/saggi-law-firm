import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { RichText } from "@payloadcms/richtext-lexical/react";
import remarkGfm from "remark-gfm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { serviceMdxComponents } from "@/components/service/mdx-components";
import { jsxConverters } from "@/components/service/lexical-converters";
import { loadAllBlogPosts, loadBlogPost, listBlogSlugs } from "@/lib/blog";
import { siteConfig } from "@/lib/siteConfig";
import { services as allServices } from "@/lib/services";
import { buildMetadata } from "@/lib/build-metadata";

export async function generateStaticParams() {
  const slugs = await listBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

type Params = { slug: string };

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadBlogPost(slug);
  if (!post) return { title: "Journal" };
  return buildMetadata({
    path: `/blog/${slug}`,
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    doc: { ...post.frontmatter, seo: (post.frontmatter as any).seo } as any,
    article: {
      publishedTime: post.frontmatter.date,
      section: post.frontmatter.category,
      authors: siteConfig.lawyer.name ? [siteConfig.lawyer.name] : undefined,
    },
  });
}

export default async function BlogPostPage(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const post = await loadBlogPost(slug);
  if (!post) notFound();

  const date = new Date(post.frontmatter.date);
  const dateDisplay = date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const allPosts = await loadAllBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.frontmatter.slug !== slug)
    .slice(0, 3);

  const relatedServiceSlugs = post.frontmatter.services;
  const relatedServices = allServices.filter((s) =>
    relatedServiceSlugs.includes(s.slug)
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    datePublished: post.frontmatter.date,
    author: siteConfig.lawyer.name
      ? { "@type": "Person", name: siteConfig.lawyer.name }
      : { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    url: `${siteConfig.url}/blog/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
        <div className="relative mx-auto max-w-[820px] px-4 sm:px-6">
          <nav
            className="mb-6 flex flex-wrap items-center gap-2 text-[0.9rem] text-muted"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-rust">Home</Link>
            <span aria-hidden className="opacity-50">›</span>
            <Link href="/blog" className="hover:text-rust">Journal</Link>
            <span aria-hidden className="opacity-50">›</span>
            <span className="truncate">{post.frontmatter.title}</span>
          </nav>

          <div className="mb-6 flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.12em]">
            <span className="text-rust">{post.frontmatter.category}</span>
            {post.frontmatter.sample && (
              <span className="rounded bg-maple/10 px-1.5 py-0.5 font-mono text-[0.7rem] text-maple">
                sample
              </span>
            )}
          </div>

          <h1 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.08] tracking-[-0.02em]">
            {post.frontmatter.title}
          </h1>

          <p className="mt-5 text-[1.15rem] leading-[1.6] text-muted">
            {post.frontmatter.excerpt}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-rule pt-6 text-[0.9rem] text-muted">
            {siteConfig.lawyer.name && (
              <>
                <span>
                  By{" "}
                  <span className="font-semibold text-ink">
                    {siteConfig.lawyer.name}
                  </span>
                </span>
                <span aria-hidden>·</span>
              </>
            )}
            <time dateTime={post.frontmatter.date}>{dateDisplay}</time>
            {post.frontmatter.readTime && (
              <>
                <span aria-hidden>·</span>
                <span>{post.frontmatter.readTime}</span>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-[820px] px-4 sm:px-6">
          <article className="prose-styled">
            {post.lexicalBody ? (
              <RichText
                data={post.lexicalBody as never}
                converters={jsxConverters}
              />
            ) : (
              <MDXRemote
                source={post.body}
                components={serviceMdxComponents}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
            )}
          </article>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="border-t border-rule bg-cream-warm py-16 md:py-20">
          <div className="mx-auto max-w-[820px] px-4 sm:px-6">
            <Eyebrow>Related practice areas</Eyebrow>
            <h2 className="mt-3 font-display text-[1.5rem] font-medium leading-[1.15]">
              Read more on this topic
            </h2>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {relatedServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-rule bg-paper px-4 py-2 text-[0.95rem] font-medium text-ink transition-all hover:border-rust hover:bg-rust hover:text-white"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedPosts.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-[1.5rem] font-medium">
                Keep reading
              </h2>
              <Link
                href="/blog"
                className="text-[0.95rem] font-semibold text-rust hover:text-rust-hover"
              >
                All articles →
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((post) => {
                const d = new Date(post.frontmatter.date);
                return (
                  <Link
                    key={post.frontmatter.slug}
                    href={`/blog/${post.frontmatter.slug}`}
                    className="group flex h-full flex-col gap-3 rounded-[10px] border border-rule bg-paper p-6 transition-all hover:-translate-y-1 hover:border-rust hover:shadow-brand-sm"
                  >
                    <span className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-rust">
                      {post.frontmatter.category}
                    </span>
                    <h3 className="font-display text-[1.1rem] font-medium leading-[1.3]">
                      {post.frontmatter.title}
                    </h3>
                    <p className="line-clamp-2 text-[0.95rem] leading-[1.55] text-muted">
                      {post.frontmatter.excerpt}
                    </p>
                    <div className="mt-auto text-[0.75rem] text-muted">
                      <time dateTime={post.frontmatter.date}>
                        {d.toLocaleDateString("en-CA", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

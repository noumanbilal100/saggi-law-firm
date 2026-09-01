import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { getPayloadInstance } from "@/lib/payload";

const CONTENT_ROOT = path.join(process.cwd(), "content", "blog");

export const blogFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.string(), // ISO date
  excerpt: z.string(),
  category: z.string().default("General"),
  /** Service slugs this post is relevant to (for auto-suggestion). */
  services: z.array(z.string()).default([]),
  /** Free-form tags for future filtering. */
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
  readTime: z.string().optional(),
  sample: z.boolean().default(false),
});

export type BlogFrontmatter = z.infer<typeof blogFrontmatterSchema>;

export type BlogPost = {
  frontmatter: BlogFrontmatter;
  /** Raw MDX/markdown body for file-based posts. Empty string when the
      post comes from Payload (see `lexicalBody`). */
  body: string;
  /** Lexical rich-text JSON when the post comes from the Payload
      `blog_posts` collection. Rendered by the RichText component with
      the shared jsxConverters instead of MDXRemote. */
  lexicalBody?: unknown;
};

async function readMdxPosts(): Promise<BlogPost[]> {
  let entries: string[];
  try {
    entries = await fs.readdir(CONTENT_ROOT);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }

  const files = entries.filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  const posts: BlogPost[] = [];

  for (const file of files) {
    const raw = await fs.readFile(path.join(CONTENT_ROOT, file), "utf8");
    const { content, data } = matter(raw);
    const slug = file.replace(/\.mdx?$/, "");
    /* gray-matter runs js-yaml which auto-parses unquoted YAML dates into
       Date objects. Normalize back to an ISO date string so downstream
       consumers get a stable, sortable format regardless of MDX authoring. */
    const dateValue = data.date;
    const dateString =
      dateValue instanceof Date
        ? dateValue.toISOString().slice(0, 10)
        : dateValue;
    const frontmatter = blogFrontmatterSchema.parse({
      ...data,
      slug,
      date: dateString,
    });
    posts.push({ frontmatter, body: content });
  }

  return posts;
}

/* Read every published post from the Payload `blog_posts` collection.
   Returns [] when Payload isn't reachable (build time before DB is up)
   so `readAll` can still return the MDX-only set as a fallback. */
async function readPayloadPosts(): Promise<BlogPost[]> {
  try {
    const payload = await getPayloadInstance();
    const result = await payload.find({
      collection: "blog-posts",
      where: { _status: { equals: "published" } },
      limit: 500,
      depth: 1,
    });
    return result.docs
      .map((doc): BlogPost | null => {
        const d = doc as unknown as Record<string, unknown>;
        const slug = d.slug ? String(d.slug) : null;
        if (!slug) return null;

        const date = String(
          d.publishedAt ?? d.updatedAt ?? d.createdAt ?? new Date().toISOString(),
        );
        const readTimeRaw = d.readTime;
        const readTimeMin =
          typeof readTimeRaw === "number"
            ? readTimeRaw
            : typeof readTimeRaw === "string"
              ? Number(readTimeRaw)
              : NaN;
        const cover = d.cover as { url?: string } | null | undefined;

        try {
          const frontmatter = blogFrontmatterSchema.parse({
            title: String(d.title ?? "Untitled"),
            slug,
            date,
            excerpt: String(d.excerpt ?? ""),
            category:
              typeof d.category === "string" && d.category.length > 0
                ? d.category
                : "General",
            services: [], // relationships come through `blog_posts_rels`; wired later
            tags: [],
            cover: cover?.url ?? undefined,
            readTime:
              Number.isFinite(readTimeMin) && readTimeMin > 0
                ? `${readTimeMin} min read`
                : undefined,
            sample: false,
          });
          return { frontmatter, body: "", lexicalBody: d.body };
        } catch {
          return null;
        }
      })
      .filter((p): p is BlogPost => p !== null);
  } catch {
    return [];
  }
}

async function readAll(): Promise<BlogPost[]> {
  /* Payload posts take priority — the admin-published set is the
     source of truth. MDX files only fill in slugs Payload doesn't
     cover, so dev-authored preview posts still work locally when
     the DB isn't seeded. */
  const [payloadPosts, mdxPosts] = await Promise.all([
    readPayloadPosts(),
    readMdxPosts(),
  ]);
  const seen = new Set(payloadPosts.map((p) => p.frontmatter.slug));
  const merged = [
    ...payloadPosts,
    ...mdxPosts.filter((p) => !seen.has(p.frontmatter.slug)),
  ];

  return merged.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  );
}

export async function loadAllBlogPosts(): Promise<BlogPost[]> {
  return readAll();
}

export async function loadBlogPost(slug: string): Promise<BlogPost | null> {
  const all = await readAll();
  return all.find((p) => p.frontmatter.slug === slug) ?? null;
}

export async function listBlogSlugs(): Promise<string[]> {
  const all = await readAll();
  return all.map((p) => p.frontmatter.slug);
}

/** Blog posts most relevant to a given service, most recent first. */
export async function getBlogPostsForService(
  serviceSlug: string,
  limit = 3
): Promise<BlogPost[]> {
  const all = await readAll();
  const related = all.filter((p) =>
    p.frontmatter.services.includes(serviceSlug)
  );
  if (related.length >= limit) return related.slice(0, limit);
  const others = all.filter((p) => !p.frontmatter.services.includes(serviceSlug));
  return [...related, ...others].slice(0, limit);
}

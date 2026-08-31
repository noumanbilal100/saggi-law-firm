import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

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
  body: string;
};

async function readAll(): Promise<BlogPost[]> {
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

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
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

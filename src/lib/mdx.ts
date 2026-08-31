import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const CONTENT_ROOT = path.join(process.cwd(), "content");

/** Frontmatter schema shared by every service page. */
export const serviceFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  summary: z.string(),
  icon: z.string().default("§"),
  order: z.number().int().default(999),
  updated: z.string().optional(),
  /* Optional per-page hero / CTA overrides */
  heroKicker: z.string().optional(),
  /* Path to a hero image under /public (e.g. "/hero-dui.jpg").
     When unset, the hero renders a brand-styled visual placeholder built
     from the service icon and colors. */
  heroImage: z.string().optional(),
  heroImageAlt: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});
export type ServiceFrontmatter = z.infer<typeof serviceFrontmatterSchema>;

export type LoadedMdx<T> = {
  frontmatter: T;
  body: string;
};

async function readCollectionSlugs(dir: string): Promise<string[]> {
  const abs = path.join(CONTENT_ROOT, dir);
  try {
    const entries = await fs.readdir(abs);
    return entries
      .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
      .map((f) => f.replace(/\.mdx?$/, ""));
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function readCollectionEntry(
  dir: string,
  slug: string
): Promise<{ raw: string } | null> {
  const abs = path.join(CONTENT_ROOT, dir, `${slug}.mdx`);
  const abs2 = path.join(CONTENT_ROOT, dir, `${slug}.md`);
  try {
    const raw = await fs.readFile(abs, "utf8");
    return { raw };
  } catch {
    try {
      const raw = await fs.readFile(abs2, "utf8");
      return { raw };
    } catch {
      return null;
    }
  }
}

/** Load one service MDX by slug, or null if not found. */
export async function loadServiceMdx(
  slug: string
): Promise<LoadedMdx<ServiceFrontmatter> | null> {
  const entry = await readCollectionEntry("services", slug);
  if (!entry) return null;
  const { content, data } = matter(entry.raw);
  const frontmatter = serviceFrontmatterSchema.parse({ ...data, slug });
  return { frontmatter, body: content };
}

/** List all service slugs found in content/services/. */
export async function listServiceSlugs(): Promise<string[]> {
  return readCollectionSlugs("services");
}

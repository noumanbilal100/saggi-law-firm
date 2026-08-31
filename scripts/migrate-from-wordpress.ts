/**
 * WordPress → Payload one-shot migration.
 *
 * What it does:
 *   1. Paginates every published post + page from saggilawfirm.com's public
 *      WP REST API (no auth required for published content).
 *   2. Downloads featured images AND inline `<img>` assets, uploads them
 *      into Payload's Media collection (deduped by source URL).
 *   3. Converts each post's HTML body into Payload Lexical JSON — headings,
 *      paragraphs, lists, blockquotes, inline formatting, links, and
 *      images become upload nodes referencing the freshly-imported media.
 *   4. Creates blog-posts entries (WP posts) and pages entries (WP pages)
 *      with _status: "draft" so nothing appears live until the client
 *      hits Publish in admin.
 *
 * Safe to re-run:
 *   - Existing slugs are skipped (nothing overwritten).
 *   - Rerun after moderating drafts to import newly-published WP items.
 *
 * Usage:
 *   npm run migrate:wp                    (imports posts + pages)
 *   npm run migrate:wp -- posts           (posts only)
 *   npm run migrate:wp -- pages           (pages only)
 *   npm run migrate:wp -- posts limit=10  (first 10 posts — for testing)
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload } from "payload";
import * as cheerio from "cheerio";
import config from "../src/payload.config.ts";

const WP_BASE = "https://saggilawfirm.com/wp-json/wp/v2";
const UA = "SaggiLawFirm-Migration/1.0";

/* ────────── Lexical helpers ─────────────────────────────────────────── */

type LexicalNode = { type: string; [k: string]: any };

const textNode = (text: string, format = 0): LexicalNode => ({
  type: "text",
  detail: 0,
  format,
  mode: "normal",
  style: "",
  text,
  version: 1,
});

const paragraph = (children: LexicalNode[]): LexicalNode => ({
  type: "paragraph",
  format: "",
  indent: 0,
  version: 1,
  direction: "ltr",
  textFormat: 0,
  textStyle: "",
  children: children.length > 0 ? children : [textNode("")],
});

const heading = (
  level: 1 | 2 | 3 | 4 | 5 | 6,
  children: LexicalNode[]
): LexicalNode => ({
  type: "heading",
  tag: `h${level}`,
  format: "",
  indent: 0,
  version: 1,
  direction: "ltr",
  children,
});

const quote = (children: LexicalNode[]): LexicalNode => ({
  type: "quote",
  format: "",
  indent: 0,
  version: 1,
  direction: "ltr",
  children,
});

const list = (
  listType: "bullet" | "number",
  items: LexicalNode[][]
): LexicalNode => ({
  type: "list",
  listType,
  start: 1,
  tag: listType === "bullet" ? "ul" : "ol",
  format: "",
  indent: 0,
  version: 1,
  direction: "ltr",
  children: items.map((itemChildren, i) => ({
    type: "listitem",
    value: i + 1,
    format: "",
    indent: 0,
    version: 1,
    direction: "ltr",
    checked: undefined,
    children: itemChildren,
  })),
});

const linkNode = (url: string, children: LexicalNode[]): LexicalNode => ({
  type: "link",
  format: "",
  indent: 0,
  version: 3,
  direction: "ltr",
  fields: {
    linkType: "custom",
    url,
    newTab: false,
  },
  children,
});

const uploadNode = (mediaId: number): LexicalNode => ({
  type: "upload",
  version: 3,
  format: "",
  fields: {},
  relationTo: "media",
  value: mediaId,
});

const rootNode = (children: LexicalNode[]): { root: LexicalNode } => ({
  root: {
    type: "root",
    format: "",
    indent: 0,
    version: 1,
    direction: "ltr",
    children:
      children.length > 0 ? children : [paragraph([textNode("")])],
  },
});

/* ────────── WP fetching ─────────────────────────────────────────────── */

async function fetchAll(kind: "posts" | "pages"): Promise<any[]> {
  const perPage = 50;
  const out: any[] = [];
  let page = 1;
  for (;;) {
    const url = `${WP_BASE}/${kind}?per_page=${perPage}&page=${page}&status=publish&_embed=1`;
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (!res.ok) {
      if (res.status === 400) break; /* out of pages */
      throw new Error(`WP fetch failed: ${res.status} ${res.statusText}`);
    }
    const batch = (await res.json()) as any[];
    if (!Array.isArray(batch) || batch.length === 0) break;
    out.push(...batch);
    if (batch.length < perPage) break;
    page += 1;
  }
  return out;
}

/* ────────── Image caching + upload to Payload ───────────────────────── */

const IMG_CACHE = new Map<string, number>(); /* url → media id */

function extFromUrl(url: string): string {
  const u = url.split("?")[0];
  const m = u.match(/\.([a-zA-Z0-9]{2,5})$/);
  return m ? m[1].toLowerCase() : "jpg";
}

function mimeFromExt(ext: string): string {
  const map: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    avif: "image/avif",
  };
  return map[ext] ?? "application/octet-stream";
}

async function importImage(
  url: string,
  alt: string,
  payload: any
): Promise<number | null> {
  if (IMG_CACHE.has(url)) return IMG_CACHE.get(url)!;
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (!res.ok) {
      console.log(`      ! image ${res.status}: ${url}`);
      return null;
    }
    const arrayBuf = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuf);
    const ext = extFromUrl(url);
    const mimetype = mimeFromExt(ext);
    /* Use a stable name derived from the URL path so re-uploads dedupe. */
    const rawName = url.split("/").pop() ?? `image.${ext}`;
    const name = rawName.split("?")[0].replace(/[^a-zA-Z0-9._-]/g, "-");

    const created = await payload.create({
      collection: "media",
      data: { alt: alt || name },
      file: {
        data: buffer,
        mimetype,
        name,
        size: buffer.length,
      },
    });
    const id = created.id as number;
    IMG_CACHE.set(url, id);
    return id;
  } catch (err) {
    console.log(`      ! image error: ${(err as Error).message}`);
    return null;
  }
}

/* ────────── HTML → Lexical conversion (cheerio-based) ───────────────── */

/**
 * Walk cheerio nodes inside a block context (paragraph, list item, heading)
 * and collect inline Lexical children — text, bold, italic, links, br.
 */
function inlineChildren(
  $: cheerio.CheerioAPI,
  el: any,
  format = 0
): LexicalNode[] {
  const out: LexicalNode[] = [];
  const kids = el.children ?? [];
  for (const c of kids) {
    if (c.type === "text") {
      const t = c.data ?? "";
      if (t) out.push(textNode(t, format));
      continue;
    }
    if (c.type !== "tag") continue;
    const tag = c.name.toLowerCase();

    if (tag === "br") {
      out.push({ type: "linebreak", version: 1 });
      continue;
    }
    if (tag === "strong" || tag === "b") {
      out.push(...inlineChildren($, c, format | 1));
      continue;
    }
    if (tag === "em" || tag === "i") {
      out.push(...inlineChildren($, c, format | 2));
      continue;
    }
    if (tag === "u") {
      out.push(...inlineChildren($, c, format | 8));
      continue;
    }
    if (tag === "code") {
      out.push(...inlineChildren($, c, format | 16));
      continue;
    }
    if (tag === "a") {
      const href = $(c).attr("href") ?? "";
      const inner = inlineChildren($, c, format);
      /* Rewrite absolute WP URLs to relative so links keep working after
         the domain switch. */
      const rewritten = href
        .replace(/^https?:\/\/(www\.)?saggilawfirm\.com/i, "")
        .replace(/^https?:\/\/saggilawfirm\.com/i, "");
      if (inner.length > 0) out.push(linkNode(rewritten || href, inner));
      continue;
    }
    /* Nested span / any other inline tag — flatten. */
    out.push(...inlineChildren($, c, format));
  }
  return out;
}

/**
 * Walk cheerio nodes at the block level and emit block-level Lexical
 * nodes (paragraph, heading, list, quote, upload). Images at block level
 * are downloaded + uploaded and become upload nodes.
 */
async function blockChildren(
  $: cheerio.CheerioAPI,
  parentEl: any,
  payload: any
): Promise<LexicalNode[]> {
  const out: LexicalNode[] = [];
  const kids = parentEl.children ?? [];

  for (const c of kids) {
    if (c.type === "text") {
      const t = (c.data ?? "").trim();
      if (t) out.push(paragraph([textNode(t)]));
      continue;
    }
    if (c.type !== "tag") continue;
    const tag = c.name.toLowerCase();

    if (/^h[1-6]$/.test(tag)) {
      /* Demote all headings by one level — WP posts often use <h1> for
         section titles which would clash with the page's own H1 from
         PageLayout. */
      const raw = parseInt(tag[1], 10);
      const level = Math.min(6, Math.max(2, raw + 1)) as 2 | 3 | 4 | 5 | 6;
      out.push(heading(level, inlineChildren($, c)));
      continue;
    }

    if (tag === "p") {
      /* If the paragraph only contains an <img>, hoist it to a block-level
         upload node instead of wrapping in a paragraph. */
      const imgs = $(c).find("img");
      if (imgs.length === 1 && $(c).text().trim() === "") {
        const src = imgs.attr("src");
        const alt = imgs.attr("alt") ?? "";
        if (src) {
          const id = await importImage(src, alt, payload);
          if (id != null) out.push(uploadNode(id));
        }
        continue;
      }
      const kids = inlineChildren($, c);
      if (kids.length > 0) out.push(paragraph(kids));
      continue;
    }

    if (tag === "img") {
      const src = $(c).attr("src");
      const alt = $(c).attr("alt") ?? "";
      if (src) {
        const id = await importImage(src, alt, payload);
        if (id != null) out.push(uploadNode(id));
      }
      continue;
    }

    if (tag === "ul" || tag === "ol") {
      const items: LexicalNode[][] = [];
      $(c)
        .children("li")
        .each((_, li) => {
          items.push(inlineChildren($, li));
        });
      if (items.length > 0)
        out.push(list(tag === "ul" ? "bullet" : "number", items));
      continue;
    }

    if (tag === "blockquote") {
      const inner = await blockChildren($, c, payload);
      out.push(quote(inner.length > 0 ? inner : [paragraph([textNode("")])]));
      continue;
    }

    if (tag === "figure") {
      /* WP wraps images in <figure><img>...</figure> — extract inner img. */
      const img = $(c).find("img").first();
      if (img.length > 0) {
        const src = img.attr("src");
        const alt = img.attr("alt") ?? "";
        if (src) {
          const id = await importImage(src, alt, payload);
          if (id != null) out.push(uploadNode(id));
        }
      }
      /* Also handle figcaption as a paragraph. */
      const caption = $(c).find("figcaption").first();
      if (caption.length > 0) {
        const kids = inlineChildren($, caption[0]);
        if (kids.length > 0) {
          const cap = paragraph([textNode("")]);
          cap.children = [textNode("", 2), ...kids]; /* italic caption */
          out.push(cap);
        }
      }
      continue;
    }

    if (tag === "hr") {
      /* Skip HRs — the HorizontalRule feature is disabled in richtext.ts. */
      continue;
    }

    if (tag === "table") {
      /* Preserve as best-effort — dump plain text row per line. */
      const rows: string[] = [];
      $(c)
        .find("tr")
        .each((_, tr) => {
          const cells: string[] = [];
          $(tr)
            .find("th,td")
            .each((_, cell) => {
              cells.push($(cell).text().trim());
            });
          if (cells.length > 0) rows.push(cells.join(" · "));
        });
      for (const r of rows) out.push(paragraph([textNode(r)]));
      continue;
    }

    /* Container tags — recurse into children. */
    if (
      tag === "div" ||
      tag === "section" ||
      tag === "article" ||
      tag === "main" ||
      tag === "header" ||
      tag === "footer" ||
      tag === "aside"
    ) {
      out.push(...(await blockChildren($, c, payload)));
      continue;
    }

    /* Unknown tag — try to extract text so we don't lose content. */
    const text = $(c).text().trim();
    if (text) out.push(paragraph([textNode(text)]));
  }
  return out;
}

/**
 * Post-process the Lexical tree: drop empty paragraphs, drop headings
 * with no visible text, and coerce nodes so nothing malformed reaches
 * Payload's rich-text validator ("Content > Body: field is invalid").
 */
function sanitizeTree(nodes: LexicalNode[]): LexicalNode[] {
  const out: LexicalNode[] = [];
  for (const n of nodes) {
    if (n.type === "paragraph" || n.type === "heading" || n.type === "quote") {
      const kids = (n.children as LexicalNode[]) ?? [];
      const cleaned = kids.filter((k) => {
        if (k.type === "text") return String((k as any).text ?? "").length > 0;
        return true;
      });
      const hasText = cleaned.some((k) => {
        if (k.type === "text") return String((k as any).text ?? "").trim().length > 0;
        if (k.type === "link") {
          const linkKids = ((k as any).children ?? []) as LexicalNode[];
          return linkKids.some(
            (lk) => String((lk as any).text ?? "").trim().length > 0
          );
        }
        return true;
      });
      if (!hasText) continue; /* drop empty block */
      out.push({ ...n, children: cleaned });
      continue;
    }
    if (n.type === "list") {
      const items = ((n.children as LexicalNode[]) ?? [])
        .map((li) => {
          const liKids = ((li.children as LexicalNode[]) ?? []).filter(
            (k) => {
              if (k.type === "text") return String((k as any).text ?? "").length > 0;
              return true;
            }
          );
          return { ...li, children: liKids };
        })
        .filter((li) => (li.children as LexicalNode[]).length > 0);
      if (items.length > 0) out.push({ ...n, children: items });
      continue;
    }
    out.push(n);
  }
  return out;
}

async function htmlToLexical(
  html: string,
  payload: any
): Promise<{ root: LexicalNode }> {
  /* Strip WordPress shortcodes like [caption ...] ... [/caption] — they
     usually surround an <img> which we handle separately. */
  const cleaned = html.replace(/\[[^\]]+\]/g, "");
  const $ = cheerio.load(`<div id="__root">${cleaned}</div>`);
  const root = $("#__root")[0] as any;
  const children = await blockChildren($, root, payload);
  let sanitized = sanitizeTree(children);

  /* Fallback: Elementor / page-builder pages nest content deeply inside
     styled divs that our block walker doesn't recognise. If we ended up
     with no blocks, flatten all visible text into a single paragraph so
     the entry still saves and the admin can restructure later. */
  if (sanitized.length === 0) {
    const plainText = $("#__root")
      .text()
      .replace(/\s+/g, " ")
      .trim();
    if (plainText) {
      /* Split on sentence-ish boundaries so we get multiple paragraphs
         instead of one wall of text. */
      const chunks = plainText
        .split(/(?<=[.!?])\s+(?=[A-Z])/)
        .reduce<string[]>((acc, sentence) => {
          const last = acc[acc.length - 1];
          if (last && (last + " " + sentence).length < 500) {
            acc[acc.length - 1] = last + " " + sentence;
          } else {
            acc.push(sentence);
          }
          return acc;
        }, []);
      sanitized = chunks.map((c) => paragraph([textNode(c)]));
    } else {
      /* Truly empty source content — save a placeholder so the entry
         still exists in admin for review. */
      sanitized = [
        paragraph([
          textNode(
            "(Original page content was empty or built with a visual editor — please add body content in admin.)"
          ),
        ]),
      ];
    }
  }

  return rootNode(sanitized);
}

/* ────────── Excerpt / meta helpers ──────────────────────────────────── */

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, "\"")
    .replace(/&#8221;/g, "\"")
    .replace(/&#8211;/g, "–")
    .replace(/\s+/g, " ")
    .trim();
}

function excerptFrom(wpItem: any, fallbackHtml: string): string {
  const raw =
    wpItem.excerpt?.rendered ??
    fallbackHtml.slice(0, 800);
  const text = stripTags(raw);
  return text.length > 220 ? text.slice(0, 217) + "…" : text;
}

/* ────────── Import a single item ────────────────────────────────────── */

/* Slugs Next.js catch-all routes reserve — a page with these slugs would
   be unreachable, so we don't import them. */
const RESERVED_PAGE_SLUGS = new Set([
  "services",
  "blog",
  "about",
  "contact",
  "booking",
  "locations",
  "admin",
  "api",
]);

async function importOne(
  wpItem: any,
  collection: "blog-posts" | "pages",
  payload: any
): Promise<"created" | "skipped" | "failed"> {
  try {
    const slug = String(wpItem.slug);
    const rawTitle = stripTags(wpItem.title?.rendered ?? "");
    /* Payload requires a non-empty title. Fall back to the slug (title-cased)
       if the source title was empty or a number. */
    const title =
      rawTitle && !/^\d+$/.test(rawTitle)
        ? rawTitle
        : slug
            .split(/[-_]/)
            .filter(Boolean)
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ") || slug;

    if (collection === "pages" && RESERVED_PAGE_SLUGS.has(slug.toLowerCase())) {
      return "skipped"; /* would clash with a built-in route */
    }

    /* Skip if already imported. */
    const existing = await payload.find({
      collection,
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    });
    if (existing.docs[0]) return "skipped";

    const rawHtml = String(wpItem.content?.rendered ?? "");
    const body = await htmlToLexical(rawHtml, payload);

    /* Featured image → cover / heroImage. */
    let coverId: number | null = null;
    const featuredUrl = wpItem._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
    const featuredAlt =
      wpItem._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ?? title;
    if (featuredUrl) {
      coverId = await importImage(featuredUrl, featuredAlt, payload);
    }

    /* Build a plain-text fallback body from the source HTML so we can
       retry if Payload rejects the structured body (e.g. Elementor
       pages that produce oddly-shaped Lexical trees). */
    const plainTextFallback = (): { root: LexicalNode } => {
      const text = stripTags(rawHtml);
      const chunks = text
        .split(/(?<=[.!?])\s+(?=[A-Z])/)
        .reduce<string[]>((acc, s) => {
          const last = acc[acc.length - 1];
          if (last && (last + " " + s).length < 500) {
            acc[acc.length - 1] = last + " " + s;
          } else {
            acc.push(s);
          }
          return acc;
        }, [])
        .filter((c) => c.trim().length > 0);
      const nodes: LexicalNode[] =
        chunks.length > 0
          ? chunks.map((c) => paragraph([textNode(c)]))
          : [
              paragraph([
                textNode(
                  "(Imported from WordPress — original content had no readable body. Please add content in admin.)"
                ),
              ]),
            ];
      return rootNode(nodes);
    };

    async function tryCreate(bodyToUse: { root: LexicalNode }) {
      if (collection === "blog-posts") {
        const excerpt = excerptFrom(wpItem, rawHtml);
        const publishedAt = wpItem.date
          ? new Date(wpItem.date).toISOString()
          : new Date().toISOString();
        const data: any = {
          title,
          slug,
          excerpt: excerpt || title,
          body: bodyToUse,
          category: "Criminal defence",
          publishedAt,
          _status: "draft",
        };
        if (coverId != null) data.cover = coverId;
        await payload.create({ collection: "blog-posts", data });
      } else {
        const summary = excerptFrom(wpItem, rawHtml).slice(0, 220);
        const data: any = {
          title,
          slug,
          summary,
          body: bodyToUse,
          _status: "draft",
        };
        if (coverId != null) data.heroImage = coverId;
        await payload.create({ collection: "pages", data });
      }
    }

    try {
      await tryCreate(body);
    } catch (err) {
      const msg = (err as Error).message ?? "";
      if (msg.toLowerCase().includes("body")) {
        /* Payload rejected the structured body — retry with plain-text
           fallback so at least the entry gets created. */
        await tryCreate(plainTextFallback());
      } else {
        throw err;
      }
    }
    return "created";
  } catch (err) {
    console.log(`      ! ${collection} ${wpItem.slug}: ${(err as Error).message}`);
    return "failed";
  }
}

/* ────────── Runner ──────────────────────────────────────────────────── */

async function main() {
  const args = process.argv.slice(2);
  const wantPosts = args.length === 0 || args.includes("posts");
  const wantPages = args.length === 0 || args.includes("pages");
  const limitArg = args.find((a) => a.startsWith("limit="));
  const limit = limitArg ? parseInt(limitArg.split("=")[1], 10) : Infinity;

  const payload = await getPayload({ config });

  const stats = {
    postsCreated: 0,
    postsSkipped: 0,
    postsFailed: 0,
    pagesCreated: 0,
    pagesSkipped: 0,
    pagesFailed: 0,
    imagesImported: 0,
  };

  if (wantPosts) {
    console.log(`\nFetching WP posts from ${WP_BASE}/posts …`);
    const posts = (await fetchAll("posts")).slice(0, limit);
    console.log(`  → ${posts.length} posts to consider`);
    for (const [i, post] of posts.entries()) {
      const label = `[${i + 1}/${posts.length}]`;
      process.stdout.write(`  ${label} ${post.slug} … `);
      const result = await importOne(post, "blog-posts", payload);
      console.log(result);
      stats[`posts${result[0].toUpperCase()}${result.slice(1)}` as keyof typeof stats] =
        (stats as any)[`posts${result[0].toUpperCase()}${result.slice(1)}`] + 1;
    }
  }

  if (wantPages) {
    console.log(`\nFetching WP pages from ${WP_BASE}/pages …`);
    const pages = (await fetchAll("pages")).slice(0, limit);
    console.log(`  → ${pages.length} pages to consider`);
    for (const [i, pg] of pages.entries()) {
      const label = `[${i + 1}/${pages.length}]`;
      process.stdout.write(`  ${label} ${pg.slug} … `);
      const result = await importOne(pg, "pages", payload);
      console.log(result);
      stats[`pages${result[0].toUpperCase()}${result.slice(1)}` as keyof typeof stats] =
        (stats as any)[`pages${result[0].toUpperCase()}${result.slice(1)}`] + 1;
    }
  }

  stats.imagesImported = IMG_CACHE.size;

  console.log(`\n──────── Summary ────────`);
  console.log(`Posts:  created ${stats.postsCreated}, skipped ${stats.postsSkipped}, failed ${stats.postsFailed}`);
  console.log(`Pages:  created ${stats.pagesCreated}, skipped ${stats.pagesSkipped}, failed ${stats.pagesFailed}`);
  console.log(`Images: ${stats.imagesImported} imported to Media collection`);
  console.log(`\nAll imported entries are DRAFT. Review in admin → Publish the ones you want live.\n`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

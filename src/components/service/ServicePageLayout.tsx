import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { PageLayout } from "@/components/shared/PageLayout";
import { ServiceSidebar } from "@/components/service/ServiceSidebar";
import { serviceMdxComponents } from "@/components/service/mdx-components";
import type { ServiceFrontmatter } from "@/lib/mdx";

type Props = {
  frontmatter: ServiceFrontmatter;
  body: string;
};

/**
 * Thin wrapper around the shared PageLayout for MDX-driven service pages.
 * Adds MDX rendering; the hero, sidebar, and trailing sections come from
 * PageLayout so custom Payload pages and service pages share one design.
 */
export async function ServicePageLayout({ frontmatter, body }: Props) {
  const heroImage =
    typeof frontmatter.heroImage === "string" ? frontmatter.heroImage : null;

  return (
    <PageLayout
      hero={{
        title: frontmatter.title,
        summary: frontmatter.summary,
        kicker: frontmatter.heroKicker ?? "Criminal defence",
        icon: frontmatter.icon,
        imageSrc: heroImage,
        imageAlt: frontmatter.heroImageAlt ?? frontmatter.title,
        breadcrumb: [
          { label: "Home", href: "/" },
          { label: "Criminal Defence", href: "/services" },
          { label: frontmatter.title },
        ],
      }}
      serviceSlug={frontmatter.slug}
      finalCtaTitle={`Facing a ${frontmatter.title.toLowerCase()} charge?`}
      sidebar={<ServiceSidebar serviceSlug={frontmatter.slug} />}
    >
      <MDXRemote
        source={body}
        components={serviceMdxComponents}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </PageLayout>
  );
}

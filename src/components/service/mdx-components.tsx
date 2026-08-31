import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ReactNode, AnchorHTMLAttributes } from "react";
import { Stat, StatBlock, StatsGrid } from "@/components/prose/Stat";
import { KeyPoints, KeyPoint } from "@/components/prose/KeyPoints";
import { ProcessSteps, Step } from "@/components/prose/ProcessSteps";
import { IconCards, IconCard } from "@/components/prose/IconCards";
import { ProseCta } from "@/components/prose/ProseCta";
import { Callout } from "@/components/prose/Callout";

/**
 * MDX element overrides + custom design blocks for service pages.
 *
 * Standard HTML tags render as plain markup — visual styling comes from
 * the `.prose-brand` class on the parent article so MDX and Payload
 * rich-text content read identically.
 *
 * Design blocks (use nested children instead of array props — MDX in
 * next-mdx-remote can't reliably parse `items={[…]}` expressions):
 *
 *   <StatsGrid>
 *     <Stat number="14+" label="Years defending" />
 *     <Stat number="400+" label="Files handled" />
 *   </StatsGrid>
 *
 *   <StatBlock number="14+" label="…" detail="…" />
 *
 *   <IconCards>
 *     <IconCard icon="1" title="…">Body copy…</IconCard>
 *   </IconCards>
 *
 *   <KeyPoints title="…">
 *     <KeyPoint title="Your job">Body copy…</KeyPoint>
 *   </KeyPoints>
 *
 *   <ProcessSteps>
 *     <Step title="Confidential call">Body copy…</Step>
 *   </ProcessSteps>
 *
 *   <ProseCta title="…" subtitle="…" />
 *
 *   <Callout label="In plain language">Short quote…</Callout>
 */
export const serviceMdxComponents: MDXComponents = {
  a: ({
    href = "#",
    children,
    ...rest
  }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </a>
      );
    }
    return <Link href={href}>{children as ReactNode}</Link>;
  },
  Callout,
  Stat,
  StatBlock,
  StatsGrid,
  IconCard,
  IconCards,
  KeyPoint,
  KeyPoints,
  Step,
  ProcessSteps,
  ProseCta,
};

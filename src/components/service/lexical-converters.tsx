/* eslint-disable @typescript-eslint/no-explicit-any */
import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import { Stat, StatBlock, StatsGrid } from "@/components/prose/Stat";
import { KeyPoints, KeyPoint } from "@/components/prose/KeyPoints";
import { ProcessSteps, Step } from "@/components/prose/ProcessSteps";
import { IconCards, IconCard } from "@/components/prose/IconCards";
import { ProseCta } from "@/components/prose/ProseCta";
import { Callout } from "@/components/prose/Callout";

/**
 * Custom JSX converters for Payload Lexical rich text — turn design
 * blocks (defined in `src/payload/blocks/designBlocks.ts`) into the same
 * React components that MDX uses. Same input in either flow, same output.
 */
export const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    ...(defaultConverters.blocks ?? {}),

    statsGrid: ({ node }: any) => {
      const items: Array<{ number: string; label: string }> =
        node.fields?.items ?? [];
      return (
        <StatsGrid>
          {items.map((it, i) => (
            <Stat key={i} number={it.number} label={it.label} />
          ))}
        </StatsGrid>
      );
    },

    statBlock: ({ node }: any) => (
      <StatBlock
        number={node.fields?.number ?? ""}
        label={node.fields?.label ?? ""}
        detail={node.fields?.detail}
      />
    ),

    iconCards: ({ node }: any) => {
      const items: Array<{ icon: string; title: string; body: string }> =
        node.fields?.items ?? [];
      return (
        <IconCards>
          {items.map((it, i) => (
            <IconCard key={i} icon={it.icon} title={it.title}>
              {it.body}
            </IconCard>
          ))}
        </IconCards>
      );
    },

    keyPoints: ({ node }: any) => {
      const items: Array<{ title: string; body: string }> =
        node.fields?.items ?? [];
      return (
        <KeyPoints title={node.fields?.title}>
          {items.map((it, i) => (
            <KeyPoint key={i} title={it.title}>
              {it.body}
            </KeyPoint>
          ))}
        </KeyPoints>
      );
    },

    processSteps: ({ node }: any) => {
      const items: Array<{ title: string; body: string }> =
        node.fields?.items ?? [];
      return (
        <ProcessSteps>
          {items.map((it, i) => (
            <Step key={i} title={it.title}>
              {it.body}
            </Step>
          ))}
        </ProcessSteps>
      );
    },

    proseCta: ({ node }: any) => (
      <ProseCta
        title={node.fields?.title}
        subtitle={node.fields?.subtitle}
      />
    ),

    callout: ({ node }: any) => (
      <Callout label={node.fields?.label}>
        {node.fields?.content}
      </Callout>
    ),
  },
});

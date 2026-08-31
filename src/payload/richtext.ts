import {
  lexicalEditor,
  FixedToolbarFeature,
  InlineToolbarFeature,
  HeadingFeature,
  BlockquoteFeature,
  UnorderedListFeature,
  OrderedListFeature,
  ChecklistFeature,
  LinkFeature,
  UploadFeature,
  IndentFeature,
  AlignFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  InlineCodeFeature,
  ParagraphFeature,
  BlocksFeature,
} from "@payloadcms/richtext-lexical";
import { designBlocks } from "@/payload/blocks/designBlocks";

/**
 * Shared Lexical editor config used by every rich-text field in the CMS.
 *
 * Adds a fixed top toolbar (WordPress-style) so the current block type is
 * always visible and changeable. All six heading levels enabled — writers
 * can promote/demote a heading without opening a submenu. The floating
 * inline toolbar still appears when text is selected for quick formatting.
 */
export const richTextEditor = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
    FixedToolbarFeature(),
    InlineToolbarFeature(),
    HeadingFeature({
      enabledHeadingSizes: ["h1", "h2", "h3", "h4", "h5", "h6"],
    }),
    ParagraphFeature(),
    BlockquoteFeature(),
    UnorderedListFeature(),
    OrderedListFeature(),
    ChecklistFeature(),
    LinkFeature({ enabledCollections: ["pages", "services", "blog-posts"] }),
    UploadFeature({ collections: { media: { fields: [] } } }),
    /* HorizontalRuleFeature removed — it registers a duplicate node
       Klass on paste (Payload / Lexical bundling issue) and throws
       "Type horizontalrule in node X does not match registered node Y".
       Horizontal rules are rarely pasted from ChatGPT anyway. */
    BlocksFeature({ blocks: designBlocks }),
    IndentFeature(),
    AlignFeature(),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    InlineCodeFeature(),
  ],
});

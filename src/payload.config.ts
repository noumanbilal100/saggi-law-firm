import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { Services } from "./payload/collections/Services";
import { BlogPosts } from "./payload/collections/BlogPosts";
import { Pages } from "./payload/collections/Pages";
import { CaseResults } from "./payload/collections/CaseResults";
import { Locations } from "./payload/collections/Locations";
import { FaqItems } from "./payload/collections/FaqItems";

import { SiteSettings } from "./payload/globals/SiteSettings";
import { Contact } from "./payload/globals/Contact";
import { LawyerProfile } from "./payload/globals/LawyerProfile";
import { SocialLinks } from "./payload/globals/SocialLinks";
import { GoogleReviews } from "./payload/globals/GoogleReviews";
import { Navigation } from "./payload/globals/Navigation";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " — Saggi Law CMS",
    },
  },
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || "insecure-dev-secret-change-me",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || "file:./saggi-cms.db",
    },
    /* Auto-accept schema pushes in dev — new / removed / renamed
       fields sync to SQLite without waiting for an interactive
       confirmation prompt (which would hang the dev server when it
       cannot see a TTY). */
    push: true,
  }),
  sharp,
  collections: [
    Users,
    Media,
    Services,
    BlogPosts,
    Pages,
    CaseResults,
    Locations,
    FaqItems,
  ],
  globals: [
    SiteSettings,
    Contact,
    LawyerProfile,
    SocialLinks,
    GoogleReviews,
    Navigation,
  ],
});

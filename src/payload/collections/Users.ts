import type { CollectionConfig } from "payload";

/**
 * Admin users who can log in to /admin. Payload's `auth: true` gives us
 * email/password login, password reset, sessions, and API tokens — no
 * custom auth code needed. First user is created via the sign-up screen
 * on first visit to /admin.
 */
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "role"],
    description:
      "People with access to this admin panel. Add colleagues here only if they should be able to edit the site.",
  },
  access: {
    admin: () => true,
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Owner", value: "owner" },
        { label: "Editor", value: "editor" },
      ],
    },
  ],
};

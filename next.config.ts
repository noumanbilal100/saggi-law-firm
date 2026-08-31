import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    /* Locally-hosted assets (Payload media at /api/media/file/*, files
       under /public) use relative paths — no remote hosts to declare
       for the current asset set. If the client later moves uploads to
       an S3 / Cloudinary bucket, add its host under remotePatterns. */
  },
  /* Trim what npm ships to production. Standalone bundles everything
     the runtime needs into .next/standalone so the deploy folder can
     be moved / rebuilt without pulling all of node_modules. */
  output: "standalone",
  /* Trust the cPanel Passenger proxy header for the visitor's origin. */
  poweredByHeader: false,
};

export default withPayload(nextConfig);

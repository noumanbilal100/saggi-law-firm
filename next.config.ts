import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    /* Locally-hosted assets (Payload media at /api/media/file/*, files
       under /public) use relative paths — no remote hosts to declare
       for the current asset set. If the client later moves uploads to
       an S3 / Cloudinary bucket, add its host under remotePatterns. */
  },
  /* Not using `output: "standalone"` here — Payload's admin bundle
     copies its own runtime resources at build time and does not
     survive the standalone trim. Sticking with the default `next
     start` from the full `.next/` directory keeps every Payload
     collection, hook, and admin panel dependency in place. */
  /* Trust the cPanel Passenger proxy header for the visitor's origin. */
  poweredByHeader: false,
};

export default withPayload(nextConfig);

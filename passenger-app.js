/**
 * cPanel Passenger entrypoint for the Next.js + Payload app.
 *
 * cPanel's Node.js Selector uses Phusion Passenger to run the app.
 * Passenger executes ONE startup file with `node <file>` and passes
 * PORT (plus every env var configured in the app) in `process.env`.
 * It does not accept CLI arguments for the wrapped app.
 *
 * `next start` needs to know it is in "start" mode and which port to
 * bind — but pointing Passenger straight at `node_modules/next/dist/bin/next`
 * would run the next CLI with no argv, so it would print the help
 * banner and exit. This wrapper solves that by spawning `next start
 * -p $PORT` as a child process and forwarding its exit code.
 *
 * The wrapper is intentionally small — every dependency it needs is
 * built into Node.js core, so it will run even if the trimmed
 * production `npm install --omit=dev` skipped something unexpected.
 */

import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const nextBin = path.join(
  __dirname,
  "node_modules",
  "next",
  "dist",
  "bin",
  "next"
);
const port = String(process.env.PORT || 3000);

const child = spawn(process.execPath, [nextBin, "start", "-p", port], {
  stdio: "inherit",
  env: process.env,
});

/* Mirror the child's exit code so Passenger knows if it failed. */
child.on("exit", (code) => process.exit(code ?? 0));

/* Forward the standard signals so Passenger's stop/restart works. */
process.on("SIGTERM", () => child.kill("SIGTERM"));
process.on("SIGINT", () => child.kill("SIGINT"));

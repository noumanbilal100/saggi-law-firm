/**
 * cPanel Passenger entrypoint for the Next.js + Payload app.
 *
 * Phusion Passenger runs this file as a plain Node process and waits
 * for THIS process to bind to $PORT. Spawning `next start` as a child
 * would let the child bind while Passenger keeps watching the parent,
 * so Passenger times out and returns a 500. Instead, we load Next.js
 * in-process and let it call listen() on the port Passenger gave us.
 */

import { createServer } from "node:http";
import next from "next";

const port = Number(process.env.PORT) || 3000;
const hostname = "0.0.0.0";

const app = next({ dev: false, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => handle(req, res)).listen(port, hostname, () => {
      console.log(`Next.js ready on http://${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start Next.js app:", err);
    process.exit(1);
  });

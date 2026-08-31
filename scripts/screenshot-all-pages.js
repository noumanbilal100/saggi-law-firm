/**
 * Screenshot every top-level route on the site at desktop + mobile
 * so we can eyeball the whole site in one glance for the design +
 * SEO audit.
 */
import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";

const OUT = path.resolve(
  "C:/Users/Heel1/AppData/Local/Temp/claude/c--Users-Heel1-Desktop-saggilawfirm/e0d3655a-fc7f-4e35-9e7a-fdf0a88de426/scratchpad/screens-all"
);
fs.mkdirSync(OUT, { recursive: true });

const ROUTES = [
  { name: "home", path: "/" },
  { name: "services-list", path: "/services" },
  { name: "about", path: "/about" },
  { name: "contact", path: "/contact" },
  { name: "booking", path: "/booking" },
  { name: "blog-list", path: "/blog" },
  { name: "locations", path: "/locations" },
];

const VIEWPORTS = [
  { name: "desktop", w: 1440, h: 900 },
  { name: "mobile", w: 390, h: 844 },
];

const browser = await chromium.launch();
for (const vp of VIEWPORTS) {
  console.log(`\n[${vp.name} ${vp.w}×${vp.h}]`);
  const ctx = await browser.newContext({
    viewport: { width: vp.w, height: vp.h },
  });
  const page = await ctx.newPage();
  for (const r of ROUTES) {
    try {
      const res = await page.goto(`http://localhost:3000${r.path}`, {
        waitUntil: "networkidle",
        timeout: 45000,
      });
      const status = res?.status() ?? 0;
      await page.waitForTimeout(400);
      const file = path.join(OUT, `${vp.name}-${r.name}.png`);
      await page.screenshot({ path: file, fullPage: true });
      const kb = (fs.statSync(file).size / 1024).toFixed(0);
      console.log(`  ${status}  ${r.name}  → ${kb} KB`);
    } catch (err) {
      console.log(`  ERR ${r.name}: ${err.message}`);
    }
  }
  await ctx.close();
}
await browser.close();
console.log(`\nSaved to ${OUT}`);

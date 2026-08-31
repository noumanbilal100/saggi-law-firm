import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";

const OUT = path.resolve(
  "C:/Users/Heel1/AppData/Local/Temp/claude/c--Users-Heel1-Desktop-saggilawfirm/e0d3655a-fc7f-4e35-9e7a-fdf0a88de426/scratchpad/screens"
);
fs.mkdirSync(OUT, { recursive: true });

const URL =
  "http://localhost:3000/services/criminal-law-impairedover-80-dui";

const VIEWPORTS = [
  { name: "desktop", w: 1440, h: 900 },
  { name: "mobile", w: 390, h: 844 },
];

async function shotSection(page, label, outFile) {
  const handle = await page.evaluateHandle((label) => {
    const spans = Array.from(document.querySelectorAll("span"));
    const eyebrow = spans.find(
      (s) => s.textContent && s.textContent.trim() === label
    );
    if (!eyebrow) return null;
    let el = eyebrow;
    while (el && el.tagName !== "SECTION") el = el.parentElement;
    return el;
  }, label);
  const el = handle.asElement();
  if (!el) {
    console.log(`  ! not found: ${label}`);
    return false;
  }
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await el.screenshot({ path: outFile });
  return true;
}

async function screenshotViewport(browser, vp) {
  const context = await browser.newContext({
    viewport: { width: vp.w, height: vp.h },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(600);

  const targets = [
    { key: "covers", label: "What it covers" },
    { key: "penalties", label: "What's at stake" },
    { key: "defense", label: "Our approach" },
    { key: "process", label: "What happens next" },
  ];

  for (const t of targets) {
    const out = path.join(OUT, `${vp.name}-${t.key}.png`);
    const ok = await shotSection(page, t.label, out);
    if (ok) {
      const size = fs.statSync(out).size;
      console.log(`  ✓ ${vp.name}-${t.key}.png  (${(size / 1024).toFixed(1)} KB)`);
    }
  }

  await context.close();
}

const browser = await chromium.launch();
for (const vp of VIEWPORTS) {
  console.log(`\n[${vp.name} ${vp.w}×${vp.h}]`);
  await screenshotViewport(browser, vp);
}
await browser.close();
console.log(`\nSaved to ${OUT}`);

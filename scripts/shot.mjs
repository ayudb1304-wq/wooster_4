// Usage: npm run shot -- <name> [path]
// Captures http://localhost:3000<path>#<name> at 390x844 and 1440x900 into design/shots/.
// <path> defaults to "/". Pass a full path like "/scratch" to shoot another route.
// Set REDUCED_MOTION=1 to emulate prefers-reduced-motion.

import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const [, , name = "page", route = "/"] = process.argv;
const base = process.env.SHOT_BASE_URL ?? "http://localhost:3000";
const reduced = process.env.REDUCED_MOTION === "1";
const outDir = path.resolve("design/shots");
await mkdir(outDir, { recursive: true });

const viewports = [
  { label: "390", width: 390, height: 844, mobile: true },
  { label: "1440", width: 1440, height: 900, mobile: false },
];

const browser = await chromium.launch();
for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
    isMobile: vp.mobile,
    hasTouch: vp.mobile,
    reducedMotion: reduced ? "reduce" : "no-preference",
  });
  const page = await context.newPage();
  const hash = name === "page" ? "" : `#${name}`;
  await page.goto(`${base}${route}${hash}`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1200);
  const suffix = reduced ? "-reduced" : "";
  const file = path.join(outDir, `${name}-${vp.label}${suffix}.png`);
  await page.screenshot({ path: file, fullPage: name === "page" });
  console.log(`wrote ${path.relative(process.cwd(), file)}`);
  await context.close();
}
await browser.close();

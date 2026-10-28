// Full-page screenshots for review: node scripts/shots.cjs <outDir> <width> <path> [path...]
const { chromium } = require("playwright-core");
const path = require("node:path");
const fs = require("node:fs");

(async () => {
  const [out, width, ...routes] = process.argv.slice(2);
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ channel: "chrome" }).catch(() => chromium.launch());
  const page = await browser.newPage({ viewport: { width: Number(width), height: width < 700 ? 844 : 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(`${page.url()}: ${e.message}`));
  page.on("console", (m) => m.type() === "error" && errors.push(`${page.url()}: ${m.text()}`));
  for (const route of routes) {
    await page.goto(`http://127.0.0.1:3108${route}`, { waitUntil: "networkidle" });
    // Walk the page so lazy images and reveals settle, then return to the top.
    const height = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < height; y += 700) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(120); }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(700);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    const name = (route.replace(/\//g, "_") || "_home").replace(/^_/, "") || "home";
    await page.screenshot({ path: path.join(out, `${name}-${width}.png`), fullPage: true });
    console.log(`${route} ${width}px overflow=${overflow} height=${height}`);
  }
  if (errors.length) console.log("ERRORS\n" + [...new Set(errors)].join("\n"));
  await browser.close();
})();

// Renders the site's default share banner (WhatsApp, Facebook, X, LinkedIn): 1200x630 JPEG under 300 KB.
// node scripts/og/build-og.cjs  ->  public/og-tourmelloh.jpg
const { chromium } = require("playwright-core");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

(async () => {
  const browser = await chromium.launch({ channel: "chrome" });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto(pathToFileURL(path.join(__dirname, "og.html")).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const out = path.join(__dirname, "..", "..", "public", "og-tourmelloh.jpg");
  await page.screenshot({ path: out, type: "jpeg", quality: 84 });
  await browser.close();
  console.log("og ok", require("node:fs").statSync(out).size, "bytes");
})();

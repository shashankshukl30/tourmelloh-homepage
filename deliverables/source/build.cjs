// Renders the stationery: node deliverables/source/build.cjs
// Outputs in deliverables/: Tourmelloh-Letterhead.pdf, letterhead header/footer PNGs (for the Word file),
// Tourmelloh-Letterhead-preview.png and Tourmelloh-Email-Signature-preview.png.
const { chromium } = require("playwright-core");
const path = require("node:path");

const here = __dirname;
const out = path.join(here, "..");
const file = (name) => "file:///" + path.join(here, name).replace(/\\/g, "/");

(async () => {
  const browser = await chromium.launch({ channel: "chrome" }).catch(() => chromium.launch());
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 4 });
  await page.goto(file("letterhead.html"), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: path.join(out, "Tourmelloh-Letterhead.pdf"), format: "A4", printBackground: true, preferCSSPageSize: true });
  await page.screenshot({ path: path.join(out, "Tourmelloh-Letterhead-preview.png") });
  // Header (with the clay rule and tagline) and footer as images for the Word letterhead.
  const header = await page.evaluate(() => {
    const t = document.querySelector(".tagline").getBoundingClientRect();
    return { x: 0, y: 0, width: 794, height: Math.ceil(t.bottom + 6) };
  });
  await page.screenshot({ path: path.join(here, "header.png"), clip: header });
  const foot = await page.evaluate(() => {
    const r = document.querySelector("#lh-footer").getBoundingClientRect();
    return { x: 0, y: Math.floor(r.top - 4), width: 794, height: Math.ceil(r.height + 8) };
  });
  await page.screenshot({ path: path.join(here, "footer.png"), clip: foot });

  const sig = await browser.newPage({ viewport: { width: 640, height: 200 }, deviceScaleFactor: 2 });
  await sig.goto(file("signature.html"), { waitUntil: "load" });
  // Preview with the local logo, since the hosted copy goes live with the site.
  await sig.evaluate((src) => { document.querySelector("img").src = src; }, "file:///" + path.join(here, "..", "..", "public", "brand", "email", "tourmelloh-signature.png").replace(/\\/g, "/"));
  await sig.waitForTimeout(300);
  const box = await sig.locator("table").boundingBox();
  await sig.screenshot({ path: path.join(out, "Tourmelloh-Email-Signature-preview.png"), clip: { x: 0, y: 0, width: Math.ceil(box.width + 24), height: Math.ceil(box.height + 24) } });
  await browser.close();
  console.log("stationery rendered");
})();

// PNG exports of the client logo SVGs (public/brand): favicon, Apple icon, Google logo, email signature.
// node scripts/brand/render-client-logo.cjs
const { chromium } = require("playwright-core");
const path = require("node:path");
const fs = require("node:fs");

const dir = path.join(__dirname, "..", "..", "public", "brand");
const svg = (name) => "data:image/svg+xml;base64," + fs.readFileSync(path.join(dir, name)).toString("base64");

const jobs = [
  { out: "tourmelloh-icon-32.png", w: 32, h: 32, html: (s) => `<img src="${s("tourmelloh-icon.svg")}" style="width:32px;height:32px">` },
  { out: "tourmelloh-icon-180.png", w: 180, h: 180, html: (s) => `<img src="${s("tourmelloh-icon.svg")}" style="width:180px;height:180px">` },
  { out: "tourmelloh-icon-512.png", w: 512, h: 512, html: (s) => `<img src="${s("tourmelloh-icon.svg")}" style="width:512px;height:512px">` },
  // Google's Organization logo: the wordmark on cream, square-safe margins.
  { out: "tourmelloh-logo-google.png", w: 1200, h: 630, bg: "#FFF3E3", html: (s) => `<img src="${s("tourmelloh-lockup.svg")}" style="width:900px">` },
  // Email signature: wordmark at 2x for retina, on white.
  { out: "email/tourmelloh-signature.png", w: 440, h: 76, bg: "#ffffff", html: (s) => `<img src="${s("tourmelloh-wordmark.svg")}" style="height:64px">` },
];

(async () => {
  const browser = await chromium.launch({ channel: "chrome" });
  for (const job of jobs) {
    const page = await browser.newPage({ viewport: { width: job.w, height: job.h } });
    await page.setContent(`<html><body style="margin:0;width:${job.w}px;height:${job.h}px;display:grid;place-items:center;background:${job.bg ?? "transparent"}">${job.html(svg)}</body></html>`);
    await page.waitForTimeout(150);
    fs.mkdirSync(path.dirname(path.join(dir, job.out)), { recursive: true });
    await page.screenshot({ path: path.join(dir, job.out), omitBackground: !job.bg });
    await page.close();
    console.log(job.out);
  }
  await browser.close();
})();

// Renders changes.html to deliverables/Tourmelloh - Website Update.pdf (A4, Digiocular format).
const { chromium } = require("playwright-core");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

(async () => {
  const browser = await chromium.launch({ channel: "chrome" });
  const page = await browser.newPage();
  await page.goto(pathToFileURL(path.join(__dirname, "changes.html")).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: path.join(__dirname, "..", "..", "Tourmelloh - Website Update.pdf"), format: "A4", printBackground: true, preferCSSPageSize: true });
  await browser.close();
  console.log("pdf ok");
})();

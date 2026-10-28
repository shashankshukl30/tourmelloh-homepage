// Every sitemap page at phone and tablet widths: page wider than the screen, and which element causes it.
// node scripts/overflow-sweep.cjs [baseUrl]
const { chromium } = require("playwright-core");

const base = process.argv[2] || "http://127.0.0.1:3108";
const widths = [320, 360, 390, 414, 768];

(async () => {
  const browser = await chromium.launch({ channel: "chrome" }).catch(() => chromium.launch());
  const xml = await (await fetch(`${base}/sitemap.xml`)).text();
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  paths.push("/search", "/photo-credits", "/does-not-exist");
  let problems = 0;
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 800 } });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    for (const path of paths) {
      await page.goto(base + path, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(150);
      const result = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        const over = document.documentElement.scrollWidth - vw;
        const culprits = [];
        if (over > 0) {
          for (const el of document.querySelectorAll("body *")) {
            const r = el.getBoundingClientRect();
            if (r.right > vw + 1 && r.width > 0 && getComputedStyle(el).position !== "fixed") {
              let scroller = el.parentElement, clipped = false;
              while (scroller) { const o = getComputedStyle(scroller).overflowX; if (o === "auto" || o === "hidden" || o === "scroll" || o === "clip") { clipped = true; break; } scroller = scroller.parentElement; }
              if (!clipped) culprits.push(`${el.tagName.toLowerCase()}.${String(el.className).split(" ")[0]} right=${Math.round(r.right)}`);
            }
            if (culprits.length >= 3) break;
          }
        }
        return { over, culprits };
      });
      if (result.over > 0) { problems++; console.log(`${width}px ${path} overflow=${result.over} ${result.culprits.join(" | ")}`); }
    }
    if (errors.length) console.log(`${width}px page errors:`, [...new Set(errors)].slice(0, 5));
    await page.close();
  }
  console.log(`${paths.length} pages × ${widths.length} widths checked, ${problems} with horizontal overflow`);
  await browser.close();
})();

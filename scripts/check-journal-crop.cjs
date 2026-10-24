const { chromium } = require('playwright-core');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const checks = [];
  try {
    const page = await browser.newPage({ reducedMotion: 'reduce' });
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const route of ['/blog', '/blog/sarnath-to-bodh-gaya']) {
        await page.goto(`http://127.0.0.1:3108${route}`, { waitUntil: 'networkidle' });
        const image = page.locator('main img[src*="bodhgaya-spire"]');
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(element => element.decode());
        const result = await image.evaluate(element => ({ position: getComputedStyle(element).objectPosition, loaded: element.naturalWidth > 0, overflow: document.body.scrollWidth > innerWidth }));
        checks.push({ route, width, ...result, passed: result.position === '50% 0%' && result.loaded && !result.overflow });
        await image.locator('..').screenshot({ path: `evidence/evolution-review/bodh-${route === '/blog' ? 'card' : 'cover'}-${width}.png` });
      }
    }
  } finally { await browser.close(); }
  fs.writeFileSync('evidence/evolution-review/crop-review.json', JSON.stringify({ checks }, null, 2));
  console.log(JSON.stringify(checks, null, 2));
  if (checks.some(check => !check.passed)) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });

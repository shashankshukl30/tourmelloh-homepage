const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, reducedMotion: 'reduce' });
    await page.goto('http://127.0.0.1:3108', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: 'public/og.jpg', type: 'jpeg', quality: 92 });
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

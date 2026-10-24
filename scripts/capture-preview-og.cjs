const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, reducedMotion: 'no-preference' });
    await page.goto('http://127.0.0.1:3108', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => {
      const video = document.querySelector('.hero-film');
      return video && !video.paused && video.readyState >= 2 && !document.querySelector('.hero-play-prompt');
    });
    await page.locator('.hero-film').evaluate(async video => {
      video.pause();
      if (video.currentTime > 0) await new Promise(resolve => {
        video.addEventListener('seeked', resolve, { once: true });
        video.currentTime = 0;
      });
    });
    await page.waitForFunction(() => document.querySelector('.hero-film')?.dataset.place === '0'
      && Number(getComputedStyle(document.querySelector('.hero-shade')).opacity) === .56);
    await page.screenshot({ path: 'public/og.jpg', type: 'jpeg', quality: 92 });
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

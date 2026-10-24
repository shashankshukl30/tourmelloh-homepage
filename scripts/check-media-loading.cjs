const { chromium } = require('playwright-core');
const fs = require('node:fs');
const base = process.env.MEDIA_CHECK_URL || 'http://127.0.0.1:3108';
const report = { base, checks: [], errors: [] };
const check = (name, passed, detail) => report.checks.push({ name, passed: Boolean(passed), detail });
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    for (const width of [390, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      page.on('pageerror', error => report.errors.push(String(error)));
      const requests = [];
      page.on('request', request => { if (request.url().includes('.mp4')) requests.push(request.url()); });
      await page.goto(base, { waitUntil: 'networkidle' });
      check(`${width}: reduced motion downloads no video`, requests.length === 0, requests.slice());
      check(`${width}: removed hero label is absent`, await page.getByText('Rooted in Varanasi. Open to India.', { exact: true }).count() === 0);
      await page.getByRole('button', { name: 'Play Varanasi film', exact: true }).click();
      await page.waitForFunction(() => { const video = document.querySelector('video'); return video && !video.paused && video.currentTime > .1; });
      const source = await page.locator('video').evaluate(video => video.currentSrc);
      check(`${width}: explicit play selects the right film`, source.includes(width <= 700 ? 'varanasi-mobile.mp4' : 'varanasi-desktop.mp4'), source);
      await page.getByRole('button', { name: 'Pause Varanasi film', exact: true }).click();
      check(`${width}: pause remains usable`, await page.locator('video').evaluate(video => video.paused));
      await context.close();
    }
    const native = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
    const nativePage = await native.newPage();
    await nativePage.goto(base, { waitUntil: 'load' });
    await nativePage.waitForFunction(() => { const video = document.querySelector('video'); return video && video.readyState >= 1; });
    // Browser policies may block autoplay when scripting is disabled. Resource
    // discovery is the optimization; playback controls are tested above with JS.
    check('Browser discovers the selected film without waiting for JavaScript', await nativePage.locator('video').evaluate(video => video.currentSrc.includes('varanasi-mobile.mp4') && video.readyState >= 1));
    await native.close();
  } finally { await browser.close(); }
  report.passed = report.checks.every(item => item.passed) && !report.errors.length;
  fs.mkdirSync('evidence/performance', { recursive: true });
  fs.writeFileSync('evidence/performance/media-loading.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  if (!report.passed) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });

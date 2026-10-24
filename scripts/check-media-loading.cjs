const { chromium, webkit } = require('playwright-core');
const fs = require('node:fs');
const base = process.env.MEDIA_CHECK_URL || 'http://127.0.0.1:3108';
const report = { base, checks: [], errors: [], skipped: [] };
const check = (name, passed, detail) => report.checks.push({ name, passed: Boolean(passed), detail });
const filmState = page => page.locator('.hero-film').evaluate(video => ({
  source: video.currentSrc, paused: video.paused, time: video.currentTime,
  width: video.videoWidth, controls: video.controls, muted: video.muted, loop: video.loop,
}));
const waitForPlayback = page => page.waitForFunction(() => {
  const video = document.querySelector('.hero-film');
  return video && !video.paused && video.currentTime > .1 && video.videoWidth > 0;
}, null, { timeout: 15000 });
const saveReport = () => {
  report.passed = report.checks.length > 0 && report.checks.every(item => item.passed) && !report.errors.length;
  fs.mkdirSync('evidence/performance', { recursive: true });
  fs.writeFileSync('evidence/performance/media-loading.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  if (!report.passed) process.exitCode = 1;
};
(async () => {
  const engines = [{ name: 'Chrome', type: chromium, options: { channel: 'chrome', headless: true } }];
  if (fs.existsSync(webkit.executablePath())) engines.push({ name: 'WebKit', type: webkit, options: { headless: true } });
  else report.skipped.push({ engine: 'WebKit', reason: 'No matching Node Playwright WebKit binary is installed.' });
  for (const engine of engines) {
  const browser = await engine.type.launch(engine.options);
  try {
    for (const width of [390, 1440]) {
      const label = `${engine.name} ${width}`;
      const expected = width <= 700 ? '/videos/india-mobile.mp4' : '/videos/india-desktop.mp4';
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      page.on('pageerror', error => report.errors.push(String(error)));
      const requests = [];
      page.on('request', request => { if (request.url().includes('.mp4')) requests.push(request.url()); });
      await page.goto(base, { waitUntil: 'networkidle' });
      check(`${label}: reduced motion downloads no video`, requests.length === 0, requests.slice());
      const reduced = await filmState(page);
      check(`${label}: reduced motion retains the still poster`, reduced.paused && !reduced.source, reduced);
      check(`${label}: removed hero label is absent`, await page.getByText('Rooted in Varanasi. Open to India.', { exact: true }).count() === 0);
      check(`${label}: film has no play or pause controls`, !reduced.controls && await page.locator('.film-control').count() === 0 && await page.getByRole('button', { name: /^(play|pause).*film/i }).count() === 0);
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await waitForPlayback(page);
      const enabled = await filmState(page);
      check(`${label}: enabling motion autoplays the selected India film`, enabled.source.endsWith(expected) && enabled.muted && enabled.loop, enabled);
      check(`${label}: only the matching film is requested`, requests.length > 0 && requests.every(url => new URL(url).pathname === expected), requests.slice());
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForFunction(() => document.querySelector('.hero-film')?.paused);
      const paused = await filmState(page);
      await page.waitForTimeout(250);
      const settled = await filmState(page);
      check(`${label}: changing to reduced motion pauses playback`, settled.paused && Math.abs(settled.time - paused.time) < .05, { paused, settled });
      await context.close();

      const autoplay = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'no-preference' });
      const autoplayPage = await autoplay.newPage();
      autoplayPage.on('pageerror', error => report.errors.push(String(error)));
      await autoplayPage.goto(base, { waitUntil: 'networkidle' });
      await waitForPlayback(autoplayPage);
      const fresh = await filmState(autoplayPage);
      check(`${label}: fresh normal-motion visit autoplays without controls`, fresh.source.endsWith(expected) && !fresh.controls && fresh.muted && fresh.loop, fresh);
      await autoplay.close();
    }
    const native = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false, reducedMotion: 'no-preference' });
    const nativePage = await native.newPage();
    await nativePage.goto(base, { waitUntil: 'load' });
    await nativePage.waitForFunction(() => { const video = document.querySelector('video'); return video && video.readyState >= 1; });
    // Browser policies may block autoplay when scripting is disabled. Resource
    // discovery is the optimization; actual autoplay is tested above with JS.
    check(`${engine.name}: browser discovers the selected film without waiting for JavaScript`, await nativePage.locator('video').evaluate(video => video.currentSrc.endsWith('/videos/india-mobile.mp4') && video.readyState >= 1));
    await native.close();
  } finally { await browser.close(); }
  }
})().catch(error => { report.errors.push(String(error)); process.exitCode = 1; }).finally(saveReport);

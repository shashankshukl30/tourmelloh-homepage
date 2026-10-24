const { chromium, webkit } = require('playwright-core');
const fs = require('node:fs');
const base = process.env.MEDIA_CHECK_URL || 'http://127.0.0.1:3108';
const report = { base, checks: [], errors: [], skipped: [] };
const check = (name, passed, detail) => report.checks.push({ name, passed: Boolean(passed), detail });
const filmState = page => page.locator('.hero-film').evaluate(video => ({
  source: video.currentSrc, paused: video.paused, time: video.currentTime,
  width: video.videoWidth, duration: video.duration, controls: video.controls, muted: video.muted, loop: video.loop,
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
      check(`${label}: reduced motion offers an explicit play prompt without a pause control`, !reduced.controls && await page.getByRole('button', { name: 'Play destination video', exact: true }).isVisible() && await page.getByRole('button', { name: /^pause.*(?:film|video)/i }).count() === 0);
      await page.getByRole('button', { name: 'Play destination video', exact: true }).click();
      await waitForPlayback(page);
      const requested = await filmState(page);
      check(`${label}: explicit play works while reduced motion stays enabled`, requested.source.endsWith(expected) && requested.muted && requested.loop && await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches), requested);
      await page.waitForFunction(() => !document.querySelector('.hero-play-prompt'));
      check(`${label}: successful explicit playback removes the prompt`, await page.locator('.hero-play-prompt').count() === 0);
      requests.length = 0;
      await page.reload({ waitUntil: 'networkidle' });
      const reloaded = await filmState(page);
      check(`${label}: reload respects reduced motion again without downloading video`, requests.length === 0 && reloaded.paused && !reloaded.source, { requests: requests.slice(), state: reloaded });
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
      check(`${label}: changing to reduced motion pauses playback and restores the play prompt`, settled.paused && Math.abs(settled.time - paused.time) < .05 && await page.getByRole('button', { name: 'Play destination video', exact: true }).isVisible(), { paused, settled });
      await context.close();

      const autoplay = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'no-preference' });
      const autoplayPage = await autoplay.newPage();
      autoplayPage.on('pageerror', error => report.errors.push(String(error)));
      await autoplayPage.goto(base, { waitUntil: 'networkidle' });
      await waitForPlayback(autoplayPage);
      const fresh = await filmState(autoplayPage);
      await autoplayPage.waitForFunction(() => !document.querySelector('.hero-play-prompt'));
      check(`${label}: fresh normal-motion visit autoplays without a prompt or pause control`, fresh.source.endsWith(expected) && !fresh.controls && fresh.muted && fresh.loop && await autoplayPage.getByRole('button', { name: /^pause.*(?:film|video)/i }).count() === 0, fresh);
      check(`${label}: destination sequence runs for 16 seconds`, Math.abs(fresh.duration - 16) < .1, fresh.duration);
      for (const [time, place] of [[0, 'Varanasi'], [6, 'Agra'], [10, 'Lucknow'], [14, 'Jaipur'], [15.8, 'Varanasi']]) {
        await autoplayPage.locator('.hero-film').evaluate(async (video, target) => {
          video.pause();
          if (Math.abs(video.currentTime - target) > .001) await new Promise((resolve, reject) => {
            const timer = setTimeout(() => reject(new Error('Timed out seeking destination film')), 10000);
            video.addEventListener('seeked', () => { clearTimeout(timer); resolve(); }, { once: true });
            video.currentTime = target;
          });
        }, time);
        await autoplayPage.waitForFunction(expectedPlace => document.querySelector('.hero-location')?.textContent.includes(expectedPlace), place);
        const frame = await filmState(autoplayPage);
        const location = await autoplayPage.locator('.hero-location').innerText();
        check(`${label}: ${time}s frame is labelled ${place}`, Math.abs(frame.time - time) < .05 && frame.width > 0 && location.includes(place), { frame, location });
      }
      await autoplayPage.locator('.hero-film').evaluate(video => video.play());
      await autoplayPage.waitForFunction(() => { const video = document.querySelector('.hero-film'); return video && !video.paused && video.currentTime > .1 && video.currentTime < 2; }, null, { timeout: 6000 });
      check(`${label}: actual playback loops back to Varanasi`, await autoplayPage.locator('.hero-location').innerText().then(location => location.includes('Varanasi')));
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

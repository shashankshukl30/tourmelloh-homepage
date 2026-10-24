const { chromium } = require('playwright-core');
const AxeBuilder = require('@axe-core/playwright').default;
const fs = require('node:fs');
const path = require('node:path');

const routes = ['/', '/journeys', '/journeys/kashi-before-the-world-wakes', '/journeys/along-the-sacred-rivers', '/journeys/the-road-to-bodh-gaya', '/journeys/awadh-agra-and-braj', '/destinations/varanasi', '/journeys/ayodhya-at-your-own-pace', '/journeys/a-weekend-in-lucknow', '/journeys/taj-mahal-and-the-lanes-of-braj', '/destinations/ayodhya', '/destinations/agra', '/destinations/bodh-gaya', '/search', '/blog', '/blog/first-time-in-varanasi', '/blog/varanasi-prayagraj-ayodhya-route', '/blog/planning-an-ayodhya-visit', '/blog/sarnath-to-bodh-gaya', '/blog/agra-and-vrindavan', '/blog/a-slower-visit-to-lucknow'];
const output = path.join('evidence', process.env.REVIEW_STAGE || 'multipage');
const base = process.env.REVIEW_URL_FILE ? fs.readFileSync(process.env.REVIEW_URL_FILE, 'utf8').trim().replace(/^\uFEFF/, '') : 'http://127.0.0.1:3108';
const baseUrl = new URL(base);
const report = { pages: [], accessibility: [], functional: [], consoleErrors: [], pageErrors: [] };
if (process.env.REVIEW_FUNCTIONS_ONLY) {
  const prior = JSON.parse(fs.readFileSync(path.join(output, 'report-incomplete.json'), 'utf8'));
  report.pages = prior.pages;
  report.accessibility = prior.accessibility;
}
fs.mkdirSync(output, { recursive: true });

function check(name, passed, detail) {
  report.functional.push({ name, passed: Boolean(passed), detail });
  if (!passed) console.error(`FAIL: ${name}`);
}

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const filmRequests = [];
  page.on('request', request => { if (request.url().includes('.mp4')) filmRequests.push(request.url()); });
  page.on('pageerror', error => report.pageErrors.push(String(error)));
  page.on('console', message => { if (message.type() === 'error') report.consoleErrors.push(message.text()); });
  await page.goto(base, { waitUntil: 'networkidle' });
  if (!process.env.REVIEW_FUNCTIONS_ONLY) for (const width of [1440, 390, 768, 360]) {
    await page.setViewportSize({ width, height: width > 600 ? 1000 : 844 });
    for (const route of routes) {
      const response = await page.goto(new URL(route, baseUrl.origin).href, { waitUntil: 'networkidle' });
      await page.evaluate(async () => {
        await document.fonts.ready;
        for (const img of document.images) img.loading = 'eager';
        await Promise.all([...document.images].map(image => image.decode().catch(() => null)));
      });
      const result = await page.evaluate(() => ({
        width: innerWidth, body: document.body.scrollWidth, client: document.documentElement.clientWidth,
        title: document.title, h1: [...document.querySelectorAll('h1')].map(element => element.textContent),
        missingImages: [...document.images].filter(image => !image.complete || !image.naturalWidth).map(image => image.getAttribute('src')),
        invalidHashLinks: [...document.querySelectorAll('a[href^="#"]')].map(link => link.getAttribute('href')).filter(href => href.length > 1 && !document.getElementById(href.slice(1))),
        hasMain: Boolean(document.querySelector('main#main')),
      }));
      report.pages.push({ route, status: response.status(), ...result });
      if ([1440, 390].includes(width)) {
        const scan = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
        report.accessibility.push({ route, width, violations: scan.violations.map(({ id, impact, nodes }) => ({ id, impact, nodes: nodes.map(node => ({ target: node.target, summary: node.failureSummary })) })), passes: scan.passes.length });
        const filename = route === '/' ? 'home' : route.slice(1).replaceAll('/', '-');
        if (process.env.REVIEW_SCREENSHOTS !== '0') await page.screenshot({ path: path.join(output, `${width}-${filename}.png`) });
        if (process.env.REVIEW_SCREENSHOTS !== '0' && ['/', '/journeys', '/journeys/kashi-before-the-world-wakes', '/destinations/varanasi', '/destinations/agra', '/search'].includes(route)) {
          await page.screenshot({ path: path.join(output, `${width}-${filename}-full.png`), fullPage: true });
        }
      }
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(new URL('/journeys', baseUrl.origin).href, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Sacred journeys', exact: true }).click();
  check('Interest filter narrows collection', await page.locator('.collection-card').count() === 2);
  await page.getByLabel('Filter by destination').selectOption('Agra');
  check('Combined filters provide clear empty state', await page.locator('.collection-card').count() === 0 && await page.getByRole('button', { name: 'Show all journeys' }).isVisible());
  await page.getByRole('button', { name: 'Show all journeys' }).click();
  check('Reset restores all seven routes', await page.locator('.collection-card').count() === 7);
  await page.getByRole('button', { name: 'My shortlist' }).click();
  check('Empty shortlist provides guidance', await page.getByRole('heading', { name: 'Your next journey is waiting.' }).isVisible());
  await page.getByRole('button', { name: 'Show all journeys' }).click();
  await page.getByRole('button', { name: 'Save Kashi, before the world wakes', exact: true }).click();
  await page.getByRole('button', { name: 'My shortlist' }).click();
  check('Saved filter displays selected journey', await page.locator('.collection-card').count() === 1);
  await page.reload({ waitUntil: 'networkidle' });
  check('Shortlist survives reload', await page.getByRole('button', { name: 'Unsave Kashi, before the world wakes', exact: true }).getAttribute('aria-pressed') === 'true');
  await page.getByRole('link', { name: 'Tourmelloh Home', exact: true }).click();
  await page.waitForURL(baseUrl.origin + '/');
  check('Shortlist carries to homepage', await page.getByRole('button', { name: 'Unsave Kashi, before the world wakes', exact: true }).getAttribute('aria-pressed') === 'true');
  await page.getByRole('button', { name: 'Open menu', exact: true }).click();
  await page.keyboard.press('Escape');
  check('Mobile menu Escape restores trigger focus', await page.getByRole('button', { name: 'Open menu', exact: true }).evaluate(element => document.activeElement === element));
  await page.getByRole('button', { name: 'Open menu', exact: true }).click();
  await page.locator('#mobile-navigation').getByRole('link', { name: 'Tours & routes' }).click();
  await page.waitForURL('**/journeys');
  check('Mobile menu navigates to collection', !await page.locator('#mobile-navigation').count() && await page.locator('.collection-page').isVisible());
  await page.getByRole('link', { name: 'Explore Kashi, before the world wakes', exact: true }).click();
  await page.waitForURL('**/journeys/kashi-before-the-world-wakes');
  check('Tour card opens full itinerary', await page.locator('h1').textContent().then(text => text.includes('Kashi')));
  const days = page.locator('.tour-day-trigger');
  if (await days.count()) {
    await days.nth(1).click();
    check('Day-by-day accordion opens day two', await days.nth(1).getAttribute('aria-expanded') === 'true');
    await days.nth(1).click();
    check('Day-by-day accordion closes on repeat', await days.nth(1).getAttribute('aria-expanded') === 'false');
  } else check('Day-by-day accordion exists', false);
  await page.locator('a[href*="journey=kashi-before-the-world-wakes"]').first().click();
  await page.waitForURL('**/*journey=kashi-before-the-world-wakes#plan');
  await page.waitForTimeout(300);
  check('Planning link opens prefilled homepage brief', await page.getByLabel('I’d like to explore').inputValue() === 'Varanasi');
  check('Selected itinerary retained in planning form', await page.locator('.planner-chosen-journey').textContent().then(text => text.includes('Kashi, before the world wakes')));
  check('Planning hash scrolls to form', await page.locator('#plan').evaluate(element => Math.abs(element.getBoundingClientRect().top) < 180));
  await page.getByRole('button', { name: 'Create my travel brief', exact: true }).click();
  check('Travel brief retains route and duration', await page.locator('.brief-result').textContent().then(text => text.includes('Kashi, before the world wakes') && text.includes('Varanasi · Sarnath') && text.includes('4 days / 3 nights')));
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download brief', exact: true }).click();
  const download = await downloadPromise;
  const briefText = fs.readFileSync(await download.path(), 'utf8');
  check('Downloaded brief preserves selected itinerary', briefText.includes('Suggested journey: Kashi, before the world wakes') && briefText.includes('Route: Varanasi · Sarnath') && briefText.includes('Duration: 4 days / 3 nights'));
  await download.delete();
  await page.goto(new URL('/destinations/varanasi', baseUrl.origin).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, 1300));
  await page.reload({ waitUntil: 'networkidle' });
  check('Reload returns to top without a hash', await page.evaluate(() => scrollY < 5));
  await page.locator('a[href="/?destination=Varanasi#plan"]').click();
  await page.waitForURL('**/?destination=Varanasi#plan');
  check('Destination CTA opens prefilled brief', await page.getByLabel('I’d like to explore').inputValue() === 'Varanasi');
  await page.goto(new URL('/search?q=Banaras', baseUrl.origin).href, { waitUntil: 'networkidle' });
  check('Search index resolves Banaras to Varanasi, journeys and articles', await page.locator('.search-result').count() >= 4 && await page.locator('.search-results').textContent().then(text => text.includes('Varanasi') && text.includes('Article')));
  await page.getByRole('searchbox', { name: 'Search tours and destinations' }).fill('Taj Mahal');
  check('Search resolves landmark aliases across tours, destinations and articles', await page.locator('.search-result').count() === 4);
  await page.getByRole('button', { name: 'Destinations', exact: true }).click();
  check('Search type filter keeps the relevant destination', await page.locator('.search-result').count() === 1 && await page.locator('.search-result h2').textContent() === 'Agra');
  await page.locator('.search-result').click();
  await page.waitForURL('**/destinations/agra');
  check('Search result opens the matching destination guide', page.url().endsWith('/destinations/agra') && await page.locator('h1').textContent() === 'Agra');
  await page.goto(new URL('/search?q=no-such-place-xyz', baseUrl.origin).href, { waitUntil: 'networkidle' });
  check('Unmatched search has a useful empty state', await page.locator('.search-empty').isVisible() && await page.locator('.search-result').count() === 0);
  await page.getByRole('button', { name: 'Clear the search', exact: true }).click();
  check('Search reset restores all twenty-one index entries', await page.locator('.search-result').count() === 21);
  await page.goto(baseUrl.origin + '/', { waitUntil: 'networkidle' });
  for (const place of ['Ayodhya','Agra','Prayagraj','Lucknow','Bodhgaya','Vrindavan','Gaya','Varanasi']) {
    await page.locator('.atlas-places').getByRole('button', {name: new RegExp('\\b' + place + '$', 'i')}).click();
    check('Destination index selects ' + place, await page.locator('.atlas-photo-label h3').textContent() === place);
  }
  check('Reduced motion downloads no hero film', filmRequests.length === 0, filmRequests.slice());
  check('Reduced motion keeps the hero poster still', await page.locator('.hero-film').evaluate(v => v.paused && !v.currentSrc));
  check('Hero film has no play or pause controls', await page.locator('.hero-film').evaluate(v => !v.controls) && await page.locator('.film-control').count() === 0 && await page.getByRole('button', { name: /^(play|pause).*film/i }).count() === 0);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.waitForFunction(() => { const v = document.querySelector('.hero-film'); return v && !v.paused && v.currentTime > .1 && v.videoWidth > 0; });
  check('Enabling motion autoplays the mobile India film', await page.locator('.hero-film').evaluate(v => v.currentSrc.endsWith('/videos/india-mobile.mp4') && v.muted && v.loop));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => document.querySelector('.hero-film')?.paused);
  check('Changing to reduced motion pauses the hero film', await page.locator('.hero-film').evaluate(v => v.paused));
  const missing = await page.goto(new URL('/journeys/not-a-real-journey', baseUrl.origin).href, { waitUntil: 'networkidle' });
  check('Unknown route shows branded 404', missing.status() === 404 && await page.getByRole('heading', { name: /find your.*way back/ }).isVisible());
  await browser.close();
  report.summary = {
    layouts: report.pages.length,
    layoutFailures: report.pages.filter(item => item.status !== 200 || item.body !== item.client || item.missingImages.length || item.invalidHashLinks.length || item.h1.length !== 1 || !item.hasMain).length,
    accessibilityViolations: report.accessibility.reduce((total, item) => total + item.violations.length, 0),
    functionalPassed: report.functional.filter(item => item.passed).length,
    functionalFailed: report.functional.filter(item => !item.passed).length,
    pageErrors: report.pageErrors.length,
    consoleErrors: report.consoleErrors.filter(error => !error.includes('404')).length,
  };
  fs.writeFileSync(path.join(output, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report.summary, null, 2));
  if (Object.entries(report.summary).some(([key, value]) => /Failures|Violations|Failed|Errors/.test(key) && value > 0)) process.exitCode = 1;
})().catch(error => {
  fs.writeFileSync(path.join(output, 'report-incomplete.json'), JSON.stringify(report, null, 2) + '\n');
  console.error(error);
  process.exitCode = 1;
});

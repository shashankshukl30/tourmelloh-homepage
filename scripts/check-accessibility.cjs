const { chromium } = require('playwright-core');
const AxeBuilder = require('@axe-core/playwright').default;
const fs = require('node:fs');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const results = [];
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:3108', { waitUntil: 'networkidle' });
    await page.evaluate(async () => { for (const img of document.images) img.loading = 'eager'; await Promise.all([...document.images].map(i => i.decode().catch(() => null))); });
    const scan = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    results.push({ width, violations: scan.violations.map(({id, impact, description, nodes}) => ({id,impact,description,nodes:nodes.map(n=>({target:n.target,summary:n.failureSummary}))})), passes: scan.passes.length });
    await context.close();
  }
  await browser.close();
  fs.mkdirSync('evidence', { recursive: true });
  fs.writeFileSync('evidence/accessibility.json', JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
})().catch(error => { console.error(error); process.exitCode = 1; });

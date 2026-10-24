const { chromium } = require('playwright-core');
const fs = require('node:fs');
const path = require('node:path');

const out = __dirname;
const base = 'http://127.0.0.1:3108';
const routes = ['/', '/journeys', '/destinations/agra', '/destinations/bodh-gaya', '/journeys/kashi-before-the-world-wakes'];
const results = [];
async function snapshot(page) {
  return page.evaluate(() => {
    const resources = performance.getEntriesByType('resource');
    return [...document.images].map(image => {
      const box = image.getBoundingClientRect();
      const entry = resources.find(entry => entry.name === image.currentSrc);
      return {
        alt: image.alt, classes: image.parentElement?.className,
        src: image.currentSrc.replace(location.origin, ''), sizes: image.sizes,
        loading: image.loading, fetchPriority: image.fetchPriority,
        width: Math.round(box.width), height: Math.round(box.height),
        top: Math.round(box.top + scrollY), complete: image.complete,
        bytes: entry?.encodedBodySize || 0,
      };
    });
  });
}
(async () => {
  const browser = await chromium.launch({headless: true, channel:'chrome'});
  for (const view of [{width:1440,height:1000,dpr:1}, {width:390,height:844,dpr:3}]) {
    for (const route of routes) {
      const context = await browser.newContext({viewport:{width:view.width,height:view.height},deviceScaleFactor:view.dpr,reducedMotion:'reduce'});
      const page = await context.newPage();
      const requests = [];
      page.on('response', response => {
        if (response.request().resourceType() === 'image') requests.push({url:response.url().replace(base,''),status:response.status()});
      });
      await page.goto(base+route,{waitUntil:'networkidle'});
      const initial = await snapshot(page);
      const initialRequests = requests.slice();
      if (route === '/' || route === '/journeys') {
        for (const image of await page.locator('main img').all()) {
          await image.scrollIntoViewIfNeeded();
          await image.evaluate(image => image.decode().catch(()=>null));
        }
      }
      const afterScroll = await snapshot(page);
      const row = {route,view,initialRequests,initial,afterScroll};
      results.push(row);
      console.log(route,view.width,'initial image KB',Math.round(initial.reduce((s,i)=>s+i.bytes,0)/1024),'all requested KB',Math.round(afterScroll.reduce((s,i)=>s+i.bytes,0)/1024));
      await context.close();
    }
  }
  await browser.close();
  fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({recorded:new Date().toISOString(),results},null,2));
})().catch(error=>{console.error(error);process.exit(1)});

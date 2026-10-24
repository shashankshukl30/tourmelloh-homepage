const { chromium } = require('playwright-core');
const fs = require('node:fs');
const path = require('node:path');
const report = { cases: [], errors: [] };
const sources = { agra: {width:1400,height:2100}, 'bodh-gaya':{width:1200,height:1831} };
const base = 'http://127.0.0.1:3108';
(async () => {
  const browser = await chromium.launch({headless:true,channel:'chrome'});
  for (const dpr of [1,2,3]) {
    for (const width of [320,390,700,760,761,940,1440,1920]) {
      const context = await browser.newContext({viewport:{width,height:1000},deviceScaleFactor:dpr,reducedMotion:'reduce'});
      for (const [slug,source] of Object.entries(sources)) {
        const page = await context.newPage();
        page.on('pageerror', error => report.errors.push(String(error)));
        await page.goto(`${base}/destinations/${slug}`,{waitUntil:'domcontentloaded'});
        const hero = page.locator('.guide-hero img');
        await hero.evaluate(image=>image.decode());
        const result = await hero.evaluate((image, source) => {
          const box = image.getBoundingClientRect();
          const selectedWidth = Number(new URL(image.currentSrc).searchParams.get('w'));
          const effectiveCoverWidth = Math.max(box.width,box.height*source.width/source.height);
          const neededWidth = Math.min(source.width,effectiveCoverWidth*devicePixelRatio);
          const deliveredWidth = Math.min(source.width,selectedWidth);
          const resource = performance.getEntriesByName(image.currentSrc)[0];
          return {sizes:image.sizes,boxWidth:box.width,boxHeight:box.height,selectedWidth,
            sourceWidth:source.width,effectiveCoverWidth,neededWidth,deliveredWidth,
            adequate:deliveredWidth>=neededWidth-.5,quality:new URL(image.currentSrc).searchParams.get('q'),
            bytes:resource?.encodedBodySize,src:image.currentSrc.replace(location.origin,''),
            overflow:document.body.scrollWidth>innerWidth};
        },source);
        if(!result.sizes.includes('390px')) throw new Error('Production server is still serving the old guide sizes');
        report.cases.push({slug,width,dpr,...result});
        console.log(slug,width,dpr,'candidate',result.selectedWidth,'need',Math.round(result.neededWidth),'bytes',result.bytes,'adequate',result.adequate);
        if(slug==='agra'&&((width===1440&&dpr===1)||(width===390&&dpr===3))) {
          await page.locator('.guide-hero').screenshot({path:path.join(__dirname,`guide-${width}-dpr${dpr}.jpg`),type:'jpeg',quality:88});
        }
        await page.close();
      }
      await context.close();
    }
  }
  await browser.close();
  report.passed = !report.errors.length && report.cases.every(x=>x.adequate&&x.quality==='90'&&!x.overflow);
  fs.writeFileSync(path.join(__dirname,'guide-coverage.json'),JSON.stringify(report,null,2));
  if(!report.passed)process.exitCode=1;
})().catch(error=>{console.error(error);process.exit(1)});

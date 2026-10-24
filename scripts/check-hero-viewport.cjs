const { chromium } = require('playwright-core');
const fs = require('node:fs');
const sizes = [[1920,1080],[1897,866],[1536,690],[1440,900],[1366,650],[1280,600],[1024,768],[820,1180],[768,1024],[430,932],[390,844],[375,667],[360,640],[320,568],[320,480],[844,390],[667,375],[568,320]];
const target = process.env.HERO_REVIEW_URL_FILE ? fs.readFileSync(process.env.HERO_REVIEW_URL_FILE,'utf8').replace(/^\uFEFF/,'').trim() : 'http://127.0.0.1:3108';
const out = process.env.HERO_REVIEW_DIR || 'evidence/hero-viewport';
fs.mkdirSync(out,{recursive:true});
(async () => {
 const browser = await chromium.launch({headless:true,channel:'chrome'});
 const page = await browser.newPage({reducedMotion:'reduce'});
 const report = {checks:[],errors:[]};
 page.on('pageerror', error => report.errors.push(String(error)));
 try {
  for (const [width,height] of sizes) {
   await page.setViewportSize({width,height});
   await page.goto(target,{waitUntil:'networkidle'});
   await page.evaluate(() => document.fonts.ready);
   const result = await page.evaluate(() => {
    const rect = selector => { const r = document.querySelector(selector).getBoundingClientRect(); return {top:r.top,bottom:r.bottom,left:r.left,right:r.right,width:r.width,height:r.height}; };
    const hero = rect('.hero');
    const header = rect('.site-header');
    const content = ['.hero h1','.hero-bottom','.hero-location','.film-control'].map(selector=>({selector,...rect(selector)}));
    const contained = content.every(r=>r.top>=hero.top-1 && r.bottom<=hero.bottom+1 && r.left>=hero.left && r.right<=hero.right);
    const main = rect('.hero-content');
    const footer = rect('.hero-location');
    const control = rect('.film-control');
    return {viewport:{width:innerWidth,height:innerHeight},hero,header,content,passed:contained && main.bottom <= Math.min(footer.top,control.top)+1 && hero.top>=header.bottom-1 && hero.bottom<=innerHeight && hero.bottom>=innerHeight-17 && document.body.scrollWidth===document.documentElement.clientWidth};
   });
   report.checks.push(result);
   if ([[1897,866],[1536,690],[320,480],[568,320]].some(([w,h])=>w===width&&h===height)) await page.screenshot({path:`${out}/${width}-${height}.png`});
  }
 } finally { await browser.close(); }
 report.passed = report.errors.length===0 && report.checks.every(check=>check.passed);
 fs.writeFileSync(`${out}/report.json`,JSON.stringify(report,null,2));
 console.log(JSON.stringify({passed:report.passed,checks:report.checks.length,failures:report.checks.filter(check=>!check.passed),errors:report.errors},null,2));
 if(!report.passed)process.exitCode=1;
})().catch(error=>{console.error(error);process.exitCode=1;});

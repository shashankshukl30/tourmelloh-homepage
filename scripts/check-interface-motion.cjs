const { chromium } = require('playwright-core');
const fs = require('node:fs');
fs.mkdirSync('evidence/interface-motion', { recursive: true });
const report = { checks: [], errors: [] };
function check(name, passed, detail) { report.checks.push({ name, passed: Boolean(passed), detail }); }
(async () => {
 const browser = await chromium.launch({ headless: true, channel: 'chrome' });
 try {
  for (const config of [{reducedMotion:'no-preference',width:1440,height:900},{reducedMotion:'reduce',width:1440,height:900},{reducedMotion:'no-preference',width:320,height:480}]) {
   const {reducedMotion,width,height} = config;
   const label = `${reducedMotion} ${width}x${height}`;
   const context = await browser.newContext({viewport:{width,height},reducedMotion});
   const page = await context.newPage();
   page.on('pageerror',error=>report.errors.push(String(error)));
   await page.goto('http://127.0.0.1:3108',{waitUntil:'domcontentloaded'});
   await page.waitForSelector('.hero-title-line');
   const title = page.locator('.hero-title-line').first();
   let inMotion = false;
   let contained = true;
   for (let sample = 0; sample < 10; sample++) {
    const opacity = Number(await title.evaluate(element=>getComputedStyle(element).opacity));
    if(opacity < 0.99) inMotion = true;
    contained = contained && await page.evaluate(() => {
     const hero = document.querySelector('.hero').getBoundingClientRect();
     const bottom = document.querySelector('.hero-bottom').getBoundingClientRect();
     const control = document.querySelector('.film-control').getBoundingClientRect();
     return [...document.querySelectorAll('.hero-eyebrow,.hero-title-line,.hero-bottom')].every(element => { const r=element.getBoundingClientRect(); return r.top>=hero.top && r.bottom<=hero.bottom; }) && bottom.bottom<=control.top+1;
    });
    await page.waitForTimeout(80);
   }
   await page.waitForTimeout(650);
   const settled = await title.evaluate(element=>({opacity:getComputedStyle(element).opacity,transform:getComputedStyle(element).transform}));
   check(`${label}: hero entrance`, reducedMotion==='reduce' ? !inMotion && settled.opacity==='1' : inMotion && settled.opacity==='1',settled);
   check(`${label}: entrance stays inside the hero without control overlap`, contained);
   const button = page.getByRole('button',{name:'Find my journey',exact:true});
   await button.scrollIntoViewIfNeeded();
   await button.hover();
   await page.waitForTimeout(350);
   const hovered = await button.evaluate(element=>{const c=getComputedStyle(element);return{active:element.hasAttribute('data-ui-active'),transform:c.transform,shadow:c.boxShadow,y:new DOMMatrixReadOnly(c.transform).m42}});
   check(`${label}: button feedback`,hovered.active && hovered.shadow!=='none' && (reducedMotion==='reduce' ? hovered.y===0 : Math.abs(hovered.y+3)<0.2),hovered);
   await page.mouse.move(1,1);
   await page.waitForTimeout(350);
   check(`${label}: hover resets`,await button.evaluate(element=>!element.hasAttribute('data-ui-active') && Math.abs(new DOMMatrixReadOnly(getComputedStyle(element).transform).m42)<0.2));
   await page.keyboard.press('Tab');
   await button.focus();
   await page.waitForTimeout(350);
   check(`${label}: keyboard feedback`,await button.evaluate(element=>element.matches(':focus-visible') && element.hasAttribute('data-ui-active')));
   await page.screenshot({path:`evidence/interface-motion/${reducedMotion}-${width}-button.png`});
   await context.close();
  }
 } finally { await browser.close(); }
 report.passed=report.errors.length===0 && report.checks.every(check=>check.passed);
 fs.writeFileSync('evidence/interface-motion/report.json',JSON.stringify(report,null,2));
 console.log(JSON.stringify(report,null,2));
 if(!report.passed)process.exitCode=1;
})().catch(error=>{console.error(error);process.exitCode=1;});

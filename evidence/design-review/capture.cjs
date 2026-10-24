const { chromium } = require('D:/remotion-studio/node_modules/playwright');
const fs = require('fs');
const root = 'D:/Digiocular/Websites/india-travel-homepage/evidence/design-review';
(async () => {
 const browser = await chromium.launch({headless:true});
 const result = [];
 for (const size of [{name:'desktop1440',width:1440,height:1000},{name:'mobile390',width:390,height:844}]) {
  const context = await browser.newContext({viewport:{width:size.width,height:size.height},deviceScaleFactor:1,isMobile:size.name==='mobile390',hasTouch:size.name==='mobile390'});
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3108',{waitUntil:'networkidle'});
  await page.emulateMedia({reducedMotion:'reduce'});
  for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=650) { await page.evaluate(y=>scrollTo(0,y),y); await page.waitForTimeout(220); }
  await page.waitForTimeout(500);
  await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:root+'/'+size.name+'-full-final.png',fullPage:true});
  await page.screenshot({path:root+'/'+size.name+'-hero-final.png'});
  for(const id of ['varanasi','destinations','journeys','approach','plan']) { await page.locator('#'+id).scrollIntoViewIfNeeded(); await page.waitForTimeout(200); await page.screenshot({path:root+'/'+size.name+'-'+id+'-final.png'}); }
  result.push(await page.evaluate(size=>({name:size.name,innerWidth,clientWidth:document.documentElement.clientWidth,bodyWidth:document.body.scrollWidth,height:document.body.scrollHeight,dpr:devicePixelRatio,missingImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>({alt:i.alt,src:i.currentSrc})),sections:[...document.querySelectorAll('section')].map(e=>({id:e.id,height:Math.round(e.getBoundingClientRect().height)}))}),size));
  await context.close();
 }
 await browser.close();
 fs.writeFileSync(root+'/metrics.json',JSON.stringify(result,null,2));
 console.log(JSON.stringify(result,null,2));
})().catch(e=>{console.error(e);process.exit(1)});

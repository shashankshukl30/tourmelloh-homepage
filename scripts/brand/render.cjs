let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require('D:/remotion-studio/node_modules/playwright')); }
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const root = path.resolve(__dirname, '../..');
const out = path.join(root, 'public/brand');
(async () => {
 const browser = await chromium.launch({headless:true});
 const page = await browser.newPage({viewport:{width:1600,height:1120},deviceScaleFactor:1});
 await page.goto(pathToFileURL(path.join(out,'logo-preview.html')).href, {waitUntil:'networkidle'});
 await page.screenshot({path:path.join(out,'logo-preview.png')});
 const manifest = JSON.parse(fs.readFileSync(path.join(out,'brand-assets.json'),'utf8'));
 const ratio = manifest.geometry.aspect_ratio;
 for (const job of [
  {name:'tourmelloh-logo',width:2400,height:Math.round(2400/ratio)},
  {name:'tourmelloh-logo-ivory',width:2400,height:Math.round(2400/ratio)},
  {name:'tourmelloh-symbol',width:1024,height:1024},
  {name:'tourmelloh-symbol-ivory',width:1024,height:1024},
  {name:'tourmelloh-favicon',width:512,height:512}
 ]) {
  await page.setViewportSize({width:job.width,height:job.height});
  const source = fs.readFileSync(path.join(out,job.name+'.svg'),'utf8');
  await page.setContent('<style>html,body{margin:0;background:transparent;width:100%;height:100%}svg{display:block;width:100%;height:100%}</style>'+source);
  await page.screenshot({path:path.join(out,job.name+'.png'),omitBackground:true});
 }
 await browser.close();
 console.log('Rendered preview, transparent logo PNGs, symbol PNGs, and favicon PNG.');
})().catch(e=>{console.error(e);process.exit(1)});

from pathlib import Path
from playwright.sync_api import sync_playwright
from PIL import Image
import io, json, time

OUT=Path(__file__).resolve().parent
results=[]
def lum(c):
    f=lambda v:(v/255)/12.92 if v/255<=.04045 else ((v/255+.055)/1.055)**2.4
    return .2126*f(c[0])+.7152*f(c[1])+.0722*f(c[2])
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True)
    for width,height in [(1440,1000),(390,844),(320,740)]:
        page=browser.new_page(viewport={'width':width,'height':height},reduced_motion='reduce')
        for slug in ['ayodhya','agra','bodh-gaya']:
            for attempt in range(10):
                try:
                    response=page.goto(f'http://127.0.0.1:3108/destinations/{slug}',wait_until='networkidle',timeout=20000)
                    page.locator('.guide-hero img').wait_for(state='visible',timeout=10000)
                    break
                except Exception:
                    if attempt==9: raise
                    time.sleep(2)
            page.evaluate('document.fonts.ready')
            page.wait_for_timeout(250)
            page.screenshot(path=str(OUT/f'{slug}-{width}-hero.jpg'),quality=88,type='jpeg')
            facts=page.evaluate('''()=>({body:document.body.scrollWidth,document:document.documentElement.scrollWidth,viewport:innerWidth,hero:document.querySelector('.guide-hero').className,h1:document.querySelector('h1').textContent,imgComplete:document.querySelector('.guide-hero img').complete,imagePosition:getComputedStyle(document.querySelector('.guide-hero img')).objectPosition})''')
            label=page.locator('.guide-hero > div:last-child > span')
            bounds=label.bounding_box()
            rgba=label.evaluate('''el=>{const c=document.createElement('canvas');c.width=1;c.height=1;const ctx=c.getContext('2d');ctx.fillStyle=getComputedStyle(el).color;ctx.fillRect(0,0,1,1);return Array.from(ctx.getImageData(0,0,1,1).data)}''')
            label.evaluate("el=>el.style.color='transparent'")
            image=Image.open(io.BytesIO(page.screenshot())).convert('RGB')
            fg=lum(rgba[:3]);samples=[]
            for fx in [.15,.5,.85]:
                xy=(int(bounds['x']+bounds['width']*fx),int(bounds['y']+bounds['height']*.5))
                rgb=image.getpixel(xy);bg=lum(rgb)
                samples.append({'xy':xy,'background':rgb,'ratio':round((max(fg,bg)+.05)/(min(fg,bg)+.05),2)})
            facts.update({'slug':slug,'width':width,'status':response.status,'regionLabel':label.text_content(),'contrastSamples':samples})
            results.append(facts)
            print(slug,width,'overflow',facts['body']-width,'contrast',[x['ratio'] for x in samples],flush=True)
        page.close()
    browser.close()
(OUT/'report.json').write_text(json.dumps(results,indent=2,ensure_ascii=False)+'\n',encoding='utf8')

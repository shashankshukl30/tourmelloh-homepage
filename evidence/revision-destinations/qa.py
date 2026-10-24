from pathlib import Path
import json
from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parent
OUT.mkdir(parents=True, exist_ok=True)
SLUGS = ['ayodhya', 'agra', 'bodh-gaya']
VIEWPORTS = [(1440, 1000), (390, 844), (320, 740)]
results = []

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for width, height in VIEWPORTS:
        context = browser.new_context(viewport={'width': width, 'height': height}, reduced_motion='reduce', device_scale_factor=1)
        for slug in SLUGS:
            page = context.new_page()
            errors = []
            page.on('pageerror', lambda e: errors.append(str(e)))
            response = page.goto(f'http://127.0.0.1:3108/destinations/{slug}', wait_until='networkidle')
            page.evaluate('document.fonts.ready')
            page.locator('.guide-hero img').wait_for(state='visible')
            page.wait_for_timeout(500)
            page.screenshot(path=str(OUT / f'{slug}-{width}-hero.jpg'), quality=88, type='jpeg')
            facts = page.evaluate('''() => {
              const visible = el => { const s = getComputedStyle(el); return s.display !== 'none' && s.visibility !== 'hidden' && el.getBoundingClientRect().width > 0; };
              const r = el => { const b=el.getBoundingClientRect(); return {x:b.x,y:b.y,width:b.width,height:b.height}; };
              return {
                title: document.title,
                viewport: innerWidth,
                bodyWidth: document.body.scrollWidth,
                documentWidth: document.documentElement.scrollWidth,
                h1: document.querySelector('h1').textContent,
                h1Bounds: r(document.querySelector('h1')),
                heroBounds: r(document.querySelector('.guide-hero')),
                heroImage: [...document.querySelectorAll('.guide-hero img')].map(el=>({src:el.currentSrc,alt:el.alt,complete:el.complete,naturalWidth:el.naturalWidth,naturalHeight:el.naturalHeight,objectPosition:getComputedStyle(el).objectPosition})),
                overflow: [...document.querySelectorAll('main *,header *,footer *')].filter(visible).filter(el=>{const b=el.getBoundingClientRect(); return b.left < -1 || b.right > innerWidth+1}).map(el=>({tag:el.tagName,cls:el.className,text:el.textContent.slice(0,90),bounds:r(el)})),
                textClipping: [...document.querySelectorAll('h1,h2,h3,p,.eyebrow,summary')].filter(visible).filter(el=>el.scrollWidth>el.clientWidth+1 || el.scrollHeight>el.clientHeight+2).map(el=>({tag:el.tagName,cls:el.className,text:el.textContent,client:[el.clientWidth,el.clientHeight],scroll:[el.scrollWidth,el.scrollHeight]})),
                labels: [...document.querySelectorAll('.eyebrow,.place-breadcrumb,.guide-caption')].filter(visible).map(el=>({text:el.textContent,bounds:r(el),font:getComputedStyle(el).fontSize,lineHeight:getComputedStyle(el).lineHeight})),
                links: [...document.querySelectorAll('main a')].map(el=>({text:el.textContent.trim(),href:el.getAttribute('href')}))
              }
            }''')
            for y in range(0, int(page.evaluate('document.body.scrollHeight')), 650):
                page.evaluate('(y) => scrollTo(0,y)', y)
                page.wait_for_timeout(70)
            page.evaluate('scrollTo(0,0)')
            page.wait_for_timeout(150)
            page.screenshot(path=str(OUT / f'{slug}-{width}-full.jpg'), full_page=True, quality=86, type='jpeg')
            summaries = page.locator('.guide-questions summary')
            accordion = []
            for i in range(summaries.count()):
                summary = summaries.nth(i)
                prior = summary.evaluate('(el)=>el.parentElement.open')
                summary.click()
                after = summary.evaluate('(el)=>el.parentElement.open')
                accordion.append({'title':summary.inner_text(),'toggled':prior != after})
                summary.click()
            facts.update({'slug':slug,'width':width,'height':height,'status':response.status,'errors':errors,'accordions':accordion})
            results.append(facts)
            print(slug, width, 'status', response.status, 'width', facts['bodyWidth'], 'overflow', len(facts['overflow']), 'clipping', len(facts['textClipping']), 'errors', len(errors), flush=True)
            page.close()
        context.close()
    browser.close()

(OUT / 'report.json').write_text(json.dumps(results, indent=2, ensure_ascii=False)+'\n', encoding='utf8')

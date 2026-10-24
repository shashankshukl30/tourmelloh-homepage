from pathlib import Path
import json
import os
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
ROUTES = ['/', '/journeys', '/journeys/kashi-before-the-world-wakes', '/journeys/along-the-sacred-rivers', '/journeys/the-road-to-bodh-gaya', '/journeys/awadh-agra-and-braj', '/destinations/varanasi']
WIDTHS = [320, 360, 375, 390, 414, 430, 600, 700, 768, 820, 900, 1024, 1280, 1440, 1920]
BASE = os.environ.get('REVIEW_BASE', 'http://127.0.0.1:3108')
report = {'layouts': [], 'expanded_states': [], 'errors': []}
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width':1440,'height':1000}, reduced_motion='reduce')
    page.on('pageerror', lambda error: report['errors'].append(str(error)))
    for route in ROUTES:
        page.goto(BASE+route, wait_until='networkidle')
        page.evaluate('document.fonts.ready')
        for width in WIDTHS:
            page.set_viewport_size({'width':width, 'height':844 if width<700 else 1000})
            page.wait_for_timeout(80)
            result=page.evaluate('''() => ({
              width: innerWidth, body: document.body.scrollWidth, client: document.documentElement.clientWidth,
              clippedText: [...document.querySelectorAll('h1,h2,h3,p,button,dd')].filter(e=>e.getClientRects().length && e.clientWidth>0 && e.scrollWidth > e.clientWidth+2 && getComputedStyle(e).overflowX!=='auto').map(e=>({tag:e.tagName,class:e.className,text:e.textContent.slice(0,100),width:e.clientWidth,scroll:e.scrollWidth})),
              wrappedLabels: [...document.querySelectorAll('.eyebrow,.tour-kicker')].filter(e=>e.getClientRects().length && e.children.length===0 && e.getBoundingClientRect().height > parseFloat(getComputedStyle(e).lineHeight)*1.6).map(e=>e.textContent)
            })''')
            report['layouts'].append({'route':route,**result})
        page.set_viewport_size({'width':320,'height':740})
        page.locator('.photo-credits summary').click()
        report['expanded_states'].append({'route':route,'state':'Photo credits open at320','body':page.evaluate('document.body.scrollWidth'),'width':320})
        if route=='/':
            for faq in page.locator('.faq-list summary').all(): faq.click()
            page.get_by_role('button',name='Quick overview',exact=True).first.click()
            report['expanded_states'].append({'route':route,'state':'AllFAQ andquickoverview open at320','body':page.evaluate('document.body.scrollWidth'),'width':320})
    browser.close()
report['failures']=[r for r in report['layouts'] if r['body']!=r['client'] or r['clippedText'] or r['wrappedLabels']]
report['expanded_failures']=[r for r in report['expanded_states'] if r['body']!=r['width']]
(ROOT/'evidence/responsive-matrix.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps({'layouts':len(report['layouts']),'failures':report['failures'],'expanded_failures':report['expanded_failures'],'errors':report['errors']},indent=2))

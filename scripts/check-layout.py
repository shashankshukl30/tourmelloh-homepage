from pathlib import Path
import json
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'evidence' / 'layout'
OUT.mkdir(parents=True, exist_ok=True)
report = {'viewports': [], 'console_errors': [], 'page_errors': []}
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 1000}, device_scale_factor=1)
    page.on('pageerror', lambda error: report['page_errors'].append(str(error)))
    page.on('console', lambda msg: report['console_errors'].append(msg.text) if msg.type == 'error' else None)
    for width in [1440, 390, 768, 1024, 360, 1920]:
        page.set_viewport_size({'width': width, 'height': 1000 if width > 600 else 844})
        page.goto('http://127.0.0.1:3108', wait_until='networkidle')
        page.evaluate('document.fonts.ready')
        page.evaluate('''async () => { for (const img of document.images) img.loading = 'eager'; await Promise.all([...document.images].map(i => i.decode().catch(() => null))); }''')
        page.locator('footer').scroll_into_view_if_needed()
        page.wait_for_timeout(600)
        page.evaluate('window.scrollTo({top:0,behavior:"instant"})')
        page.wait_for_timeout(300)
        result = page.evaluate('''() => ({width:innerWidth, body:document.body.scrollWidth, client:document.documentElement.clientWidth, title:document.title, h1:document.querySelector('h1').textContent, missingImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src), headings:[...document.querySelectorAll('h1,h2')].map(e=>({text:e.textContent, width:e.getBoundingClientRect().width})), overflowing:[...document.querySelectorAll('main > *,header,footer')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).map(e=>e.className)})''')
        report['viewports'].append(result)
        if width in [1440, 390, 768]:
            page.screenshot(path=str(OUT/f'{width}-full.png'), full_page=True)
            page.screenshot(path=str(OUT/f'{width}-hero.png'))
    page.set_viewport_size({'width':1200,'height':630})
    page.goto('http://127.0.0.1:3108',wait_until='networkidle')
    page.screenshot(path=str(ROOT/'public'/'og.jpg'),type='jpeg',quality=88)
    browser.close()
(OUT/'report.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps(report,indent=2))

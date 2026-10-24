import json
from datetime import datetime, timezone
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent
ROUTES = [
    '/', '/journeys', '/destinations/varanasi',
    '/journeys/kashi-before-the-world-wakes',
    '/journeys/along-the-sacred-rivers',
    '/journeys/the-road-to-bodh-gaya',
    '/journeys/awadh-agra-and-braj',
]
report = {'browser': 'WebKit', 'base': 'http://127.0.0.1:3108',
          'startedAt': datetime.now(timezone.utc).isoformat(),
          'layouts': [], 'interactions': [], 'visualInspection': 'pending'}

def check(name, width, passed, detail=None):
    report['interactions'].append({'name': name, 'width': width,
                                    'passed': bool(passed), 'detail': detail})

with sync_playwright() as p:
    browser = p.webkit.launch(headless=True)
    report['browserVersion'] = browser.version
    report['executable'] = p.webkit.executable_path
    for width, height in [(390, 844), (768, 1024)]:
        context = browser.new_context(viewport={'width': width, 'height': height},
                                      is_mobile=True, has_touch=True,
                                      device_scale_factor=1)
        for route in ROUTES:
            page = context.new_page()
            page.set_default_timeout(15000)
            errors = []
            console_errors = []
            page.on('pageerror', lambda error: errors.append(str(error)))
            page.on('console', lambda message: console_errors.append(message.text)
                    if message.type == 'error' else None)
            response = page.goto(report['base'] + route, wait_until='networkidle')
            page.evaluate('document.fonts.ready')
            page.wait_for_timeout(300)
            samples = []
            total_height = page.evaluate('document.documentElement.scrollHeight')
            for y in range(0, total_height, max(400, height - 140)):
                page.evaluate('(y) => window.scrollTo(0,y)', y)
                page.wait_for_timeout(100)
                samples.append(page.evaluate('''() => ({
                    y: window.scrollY, innerWidth: innerWidth,
                    bodyWidth: document.body.scrollWidth,
                    clientWidth: document.documentElement.clientWidth,
                    documentWidth: document.documentElement.scrollWidth
                })'''))
            page.wait_for_load_state('networkidle')
            # Native lazy images outside the horizontal destination rail need
            # to be revealed before they can be classified as missing.
            for photo in page.locator('img').all():
                if not photo.evaluate('(i) => i.complete && i.naturalWidth > 0'):
                    photo.scroll_into_view_if_needed()
                    page.wait_for_timeout(120)
            page.wait_for_load_state('networkidle')
            missing = page.evaluate('''() => [...document.images]
                .filter(i => !i.complete || i.naturalWidth === 0)
                .map(i => ({src:i.currentSrc,alt:i.alt}))''')
            overflow = [s for s in samples if
                        s['bodyWidth'] != s['clientWidth'] or
                        s['documentWidth'] != s['clientWidth'] or
                        s['innerWidth'] != width]
            page.evaluate('window.scrollTo(0,0)')
            page.wait_for_timeout(350)
            if width == 390 and route in ['/journeys', '/journeys/kashi-before-the-world-wakes']:
                name = 'collection' if route == '/journeys' else 'kashi'
                page.screenshot(path=str(ROOT / f'mobile-webkit-{name}.png'))
            if route == '/':
                toggle = page.locator('.menu-toggle')
                toggle.click()
                page.wait_for_timeout(120)
                menu_open = page.locator('#mobile-navigation').is_visible()
                locked = page.evaluate('document.body.style.overflow') == 'hidden'
                page.keyboard.press('Escape')
                page.wait_for_timeout(100)
                restored = page.evaluate('document.activeElement.classList.contains("menu-toggle")')
                closed = page.locator('#mobile-navigation').count() == 0
                unlocked = page.evaluate('document.body.style.overflow') != 'hidden'
                check('menu Escape closes, unlocks and restores focus', width,
                      menu_open and locked and closed and unlocked and restored)
                toggle.click()
                page.locator('#mobile-navigation a[href="/journeys"]').click()
                page.wait_for_url('**/journeys')
                page.wait_for_load_state('networkidle')
                check('menu link navigates and closes with scroll unlocked', width,
                      page.locator('#mobile-navigation').count() == 0 and
                      page.evaluate('document.body.style.overflow') != 'hidden' and
                      page.locator('h1').count() == 1)
            if route.startswith('/journeys/'):
                buttons = page.locator('.tour-day-trigger')
                default = buttons.nth(0).get_attribute('aria-expanded') == 'true'
                buttons.nth(1).click()
                check('tour accordion changes active day: ' + route, width,
                      default and buttons.nth(1).get_attribute('aria-expanded') == 'true'
                      and buttons.nth(0).get_attribute('aria-expanded') == 'false')
                buttons.nth(1).click()
                check('tour accordion collapses active day: ' + route, width,
                      buttons.nth(1).get_attribute('aria-expanded') == 'false')
            row = {'route': route, 'viewport': {'width':width,'height':height},
                   'status':response.status, 'scrollSamples': len(samples),
                   'overflow': overflow, 'missingImages': missing,
                   'pageErrors': errors, 'consoleErrors': console_errors}
            report['layouts'].append(row)
            print(json.dumps(row), flush=True)
            page.close()
        context.close()
    browser.close()

report['summary'] = {
    'layouts':len(report['layouts']),
    'layoutFailures':sum(1 for r in report['layouts'] if r['status'] != 200 or
                         r['overflow'] or r['missingImages'] or r['pageErrors'] or r['consoleErrors']),
    'interactions':len(report['interactions']),
    'interactionFailures':sum(1 for r in report['interactions'] if not r['passed']),
}
report['finishedAt'] = datetime.now(timezone.utc).isoformat()
(ROOT / 'mobile-webkit.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
print(json.dumps(report['summary']), flush=True)

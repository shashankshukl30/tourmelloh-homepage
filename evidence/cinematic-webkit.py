"""Isolated Safari/WebKit QA for the cinematic Tourmelloh preview."""
import json
from datetime import datetime, timezone
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent
BASE = 'http://127.0.0.1:3108'
TOUR = '/journeys/kashi-before-the-world-wakes'
ROUTES = ['/', '/journeys', TOUR, '/journeys/along-the-sacred-rivers',
          '/journeys/the-road-to-bodh-gaya', '/journeys/awadh-agra-and-braj',
          '/destinations/varanasi', '/journeys/ayodhya-at-your-own-pace',
          '/journeys/a-weekend-in-lucknow', '/journeys/taj-mahal-and-the-lanes-of-braj',
          '/destinations/ayodhya', '/destinations/agra', '/destinations/bodh-gaya', '/search']
report = {'browser': 'WebKit', 'base': BASE, 'startedAt': datetime.now(timezone.utc).isoformat(),
          'layouts': [], 'interactions': [], 'visualInspection': 'pending'}

def check(name, width, passed, detail=None):
    report['interactions'].append({'name': name, 'width': width, 'passed': bool(passed), 'detail': detail})

def dimensions(page):
    return page.evaluate('''() => ({y:scrollY,innerWidth:innerWidth,
      bodyWidth:document.body.scrollWidth,clientWidth:document.documentElement.clientWidth,
      documentWidth:document.documentElement.scrollWidth})''')

def save():
    report['summary'] = {'layouts': len(report['layouts']),
      'layoutFailures': sum(bool(r.get('exception') or r['status'] != 200 or r['overflow'] or
        r['missingImages'] or r['pageErrors'] or r['consoleErrors']) for r in report['layouts']),
      'interactions': len(report['interactions']),
      'interactionFailures': sum(not r['passed'] for r in report['interactions'])}
    report['finishedAt'] = datetime.now(timezone.utc).isoformat()
    (ROOT / 'cinematic-webkit.json').write_text(json.dumps(report, indent=2), encoding='utf-8')

with sync_playwright() as p:
    browser = p.webkit.launch(headless=True)
    report['browserVersion'] = browser.version
    report['executable'] = p.webkit.executable_path
    for width, height in [(390, 844), (768, 1024), (320, 844)]:
        context = browser.new_context(viewport={'width': width, 'height': height},
          is_mobile=True, has_touch=True, device_scale_factor=1, accept_downloads=True)
        for route in (ROUTES if width != 320 else ['/', '/search', TOUR]):
            page = context.new_page()
            page.set_default_timeout(12000)
            errors, console_errors = [], []
            page.on('pageerror', lambda error, out=errors: out.append(str(error)))
            page.on('console', lambda message, out=console_errors: out.append(message.text) if message.type == 'error' else None)
            row = {'route': route, 'viewport': {'width': width, 'height': height}, 'status': None,
                   'overflow': [], 'missingImages': [], 'pageErrors': errors, 'consoleErrors': console_errors}
            try:
                response = page.goto(BASE + route, wait_until='networkidle')
                row['status'] = response.status
                page.evaluate('document.fonts.ready')
                samples = [dimensions(page)]
                total = page.evaluate('document.documentElement.scrollHeight')
                for y in range(0, total, max(500, height - 160)):
                    page.evaluate('(y) => window.scrollTo(0,y)', y)
                    page.wait_for_timeout(75)
                    samples.append(dimensions(page))
                for photo in page.locator('img').all():
                    if not photo.evaluate('(i) => i.complete && i.naturalWidth > 0'):
                        photo.scroll_into_view_if_needed()
                        page.wait_for_timeout(100)
                page.wait_for_load_state('networkidle')
                row['imageCount'] = page.locator('img').count()
                row['missingImages'] = page.evaluate('''() => [...document.images].filter(i => !i.complete || i.naturalWidth === 0).map(i => ({src:i.currentSrc,alt:i.alt}))''')
                row['scrollSamples'] = len(samples)
                row['overflow'] = [s for s in samples if s['bodyWidth'] != s['clientWidth'] or s['documentWidth'] != s['clientWidth'] or s['innerWidth'] != width]
                page.evaluate('window.scrollTo(0,0)')
                page.wait_for_timeout(200)
                if width == 320 and route == '/':
                    page.screenshot(path=str(ROOT / 'cinematic-webkit-home-320.png'))
                    row['video'] = page.locator('video').evaluate_all('(videos) => videos.map(v => ({readyState:v.readyState,paused:v.paused,muted:v.muted,loop:v.loop,error:v.error?.code ?? null}))')
                if width == 390 and route == TOUR:
                    page.screenshot(path=str(ROOT / 'cinematic-webkit-kashi-390.png'))
                if route == '/':
                    toggle = page.locator('.menu-toggle')
                    toggle.click()
                    opened = page.locator('#mobile-navigation').is_visible()
                    locked = page.evaluate('document.body.style.overflow') == 'hidden'
                    page.keyboard.press('Escape')
                    page.wait_for_timeout(80)
                    check('Menu Escape closes, unlocks and restores focus', width, opened and locked and
                      page.locator('#mobile-navigation').count() == 0 and
                      page.evaluate('document.body.style.overflow') != 'hidden' and
                      toggle.evaluate('(e) => document.activeElement === e'))
                    toggle.click()
                    page.locator('#mobile-navigation a[href="/journeys"]').click()
                    page.wait_for_url('**/journeys')
                    check('Menu link opens collection and unlocks scrolling', width,
                      page.locator('#mobile-navigation').count() == 0 and page.evaluate('document.body.style.overflow') != 'hidden')
                if route.startswith('/journeys/'):
                    buttons = page.locator('.tour-day-trigger')
                    first_open = buttons.nth(0).get_attribute('aria-expanded') == 'true'
                    buttons.nth(1).click()
                    check('Day accordion opens second and closes first: ' + route, width,
                      first_open and buttons.nth(1).get_attribute('aria-expanded') == 'true' and buttons.nth(0).get_attribute('aria-expanded') == 'false')
                    expanded_size = dimensions(page)
                    check('Expanded day has no horizontal overflow: ' + route, width,
                      expanded_size['bodyWidth'] == width and expanded_size['documentWidth'] == width)
                    buttons.nth(1).click()
                    check('Day accordion collapses second: ' + route, width, buttons.nth(1).get_attribute('aria-expanded') == 'false')
                if route == '/search':
                    page.locator('#travel-search').fill('Banaras')
                    results = page.locator('.search-result')
                    check('Banaras resolves four relevant results and updates URL', width,
                      results.count() == 4 and 'q=Banaras' in page.url and 'Varanasi' in page.locator('.search-results').inner_text())
                    page.get_by_role('button', name='Destinations', exact=True).click()
                    check('Search destination filter isolates Varanasi', width, results.count() == 1 and results.locator('h2').inner_text() == 'Varanasi')
                    if width == 320:
                        page.screenshot(path=str(ROOT / 'cinematic-webkit-search-320.png'))
                    results.first.click()
                    page.wait_for_url('**/destinations/varanasi')
                    check('Banaras search opens Varanasi guide', width, 'Varanasi' in page.locator('h1').inner_text())
            except Exception as exc:
                row['exception'] = str(exc)
            report['layouts'].append(row)
            save()
            print(json.dumps({'route': route, 'width': width, 'overflow': len(row['overflow']),
              'missingImages': len(row['missingImages']), 'runtimeErrors': len(errors), 'exception': row.get('exception')}), flush=True)
            page.close()
        # Selected-tour planning is checked independently at every mobile width.
        page = context.new_page()
        try:
            page.goto(BASE + '/?destination=Varanasi&journey=kashi-before-the-world-wakes#plan', wait_until='networkidle')
            check('Planner retains selected journey', width, 'Kashi, before the world wakes' in page.locator('.planner-chosen-journey').inner_text())
            page.locator('#plan select').nth(1).select_option('November')
            page.locator('#plan select').nth(2).select_option('With family')
            page.locator('#plan textarea').fill('Gentle mornings and extra time in Sarnath.')
            page.get_by_role('button', name='Create my travel brief', exact=True).click()
            brief = page.locator('.brief-result').inner_text()
            check('Planner creates complete browser-local brief', width, all(s in brief for s in
              ['Kashi, before the world wakes', '4 days / 3 nights', 'November', 'With family', 'Gentle mornings']))
            d = dimensions(page)
            check('Planner result has no horizontal overflow', width, d['bodyWidth'] == width and d['documentWidth'] == width)
            with page.expect_download() as download_info:
                page.get_by_role('button', name='Download brief', exact=True).click()
            download = download_info.value
            text = Path(download.path()).read_text(encoding='utf-8')
            check('Downloaded brief retains route and preferences', width,
              all(s in text for s in ['Kashi, before the world wakes', 'Sarnath', 'November', 'Gentle mornings']))
            download.delete()
        except Exception as exc:
            check('Planner interaction completed', width, False, str(exc))
        page.close()
        context.close()
        save()
    browser.close()
save()
print(json.dumps(report['summary']), flush=True)

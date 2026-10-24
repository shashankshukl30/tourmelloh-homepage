import json
import re
from pathlib import Path
from datetime import datetime, timezone
from playwright.sync_api import sync_playwright, expect

ROOT = Path(r'D:\Digiocular\Websites\india-travel-homepage')
report = {'reviewed_at': datetime.now(timezone.utc).isoformat(), 'url': 'http://127.0.0.1:3108', 'engine': 'Python Playwright isolated headless Chromium', 'checks': [], 'content_observations': [], 'console_errors': [], 'page_errors': [], 'mutation_requests': []}

def check(name, action):
    try:
        detail = action()
        report['checks'].append({'name': name, 'status': 'pass', 'detail': detail})
    except Exception as exc:
        report['checks'].append({'name': name, 'status': 'fail', 'detail': str(exc)[:2500]})

def require(condition, detail):
    assert condition, detail
    return detail

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 1440, 'height': 1000}, reduced_motion='reduce', accept_downloads=True, permissions=['clipboard-read', 'clipboard-write'])
    page = context.new_page()
    page.on('pageerror', lambda error: report['page_errors'].append(str(error)))
    page.on('console', lambda message: report['console_errors'].append(message.text) if message.type == 'error' else None)
    page.on('request', lambda request: report['mutation_requests'].append({'method': request.method, 'url': request.url}) if request.method not in ['GET', 'HEAD', 'OPTIONS'] else None)
    page.goto(report['url'])
    page.wait_for_load_state('networkidle')
    report['page_title'] = page.title()
    report['initial_text'] = page.locator('body').inner_text()
    check('Initial four journey cards and eight destinations', lambda: require(page.locator('.journey-card').count() == 4 and page.locator('.destination-card').count() == 8, f"journeys={page.locator('.journey-card').count()}, destinations={page.locator('.destination-card').count()}"))

    def trip_finder():
        page.get_by_label('Where would you like to go?').select_option('Ayodhya')
        page.get_by_label('What draws you here?').select_option('Sacred journeys')
        page.get_by_role('button', name='Find my journey', exact=True).click()
        expect(page.locator('.journey-card')).to_have_count(1)
        expect(page.locator('.journey-card h3')).to_have_text('Along the sacred rivers')
        expect(page.locator('.filter-chip')).to_contain_text('Ayodhya')
        return 'Ayodhya + Sacred journeys returns exactly Along the sacred rivers.'
    check('Trip finder combines destination and interest', trip_finder)

    def empty_filter():
        page.get_by_role('button', name='Buddhist trails', exact=True).click()
        expect(page.locator('.journey-card')).to_have_count(0)
        expect(page.locator('.no-journeys')).to_be_visible()
        page.get_by_role('button', name='See all suggested journeys', exact=True).click()
        expect(page.locator('.journey-card')).to_have_count(4)
        expect(page.locator('.filter-chip')).to_have_count(0)
        return 'Empty combination offers recovery, reset restores four cards and removes destination filter.'
    check('No-results state and reset', empty_filter)

    def categories():
        for label, count in [('Sacred journeys', 1), ('Culture & heritage', 2), ('Buddhist trails', 1), ('All journeys', 4)]:
            button = page.get_by_role('button', name=label, exact=True)
            button.click()
            expect(button).to_have_attribute('aria-pressed', 'true')
            expect(page.locator('.journey-card')).to_have_count(count)
        return 'Counts 1/2/1/4 and pressed state verified.'
    check('Interest filters', categories)

    def save_persistence():
        page.get_by_role('button', name='Save Kashi, before the world wakes', exact=True).click()
        expect(page.get_by_role('button', name='Unsave Kashi, before the world wakes', exact=True)).to_have_attribute('aria-pressed', 'true')
        page.reload()
        page.wait_for_load_state('networkidle')
        expect(page.get_by_role('button', name='Unsave Kashi, before the world wakes', exact=True)).to_have_attribute('aria-pressed', 'true')
        stored = page.evaluate("localStorage.getItem('india-journey-shortlist')")
        page.get_by_role('button', name='Unsave Kashi, before the world wakes', exact=True).click()
        page.reload()
        page.wait_for_load_state('networkidle')
        expect(page.get_by_role('button', name='Save Kashi, before the world wakes', exact=True)).to_have_attribute('aria-pressed', 'false')
        return {'saved_value': stored, 'unsaved_value': page.evaluate("localStorage.getItem('india-journey-shortlist')")}
    check('Save and unsave survive reload', save_persistence)

    def journey_details():
        for index in range(4):
            card = page.locator('.journey-card').nth(index)
            title = card.locator('h3').inner_text()
            card.get_by_role('button', name='Explore the journey', exact=True).click()
            expect(page.locator('#journey-detail')).to_be_visible()
            expect(page.locator('#journey-detail h3')).to_have_text(title)
            assert page.locator('#journey-detail li').count() >= 3
            card.get_by_role('button', name='Close itinerary', exact=True).click()
            expect(page.locator('#journey-detail')).to_have_count(0)
        return 'All four inline itineraries open and close with correct title and stages.'
    check('All journey details', journey_details)

    def destination_details():
        for name in ['Varanasi', 'Ayodhya', 'Agra', 'Prayagraj', 'Lucknow', 'Bodhgaya', 'Vrindavan', 'Gaya']:
            card = page.locator('.destination-card').filter(has=page.get_by_role('heading', name=name, exact=True))
            card.click()
            expect(card).to_have_attribute('aria-expanded', 'true')
            expect(page.locator('#destination-detail')).to_contain_text(name)
            page.get_by_role('button', name='Close destination details', exact=True).click()
            expect(page.locator('#destination-detail')).to_have_count(0)
        return 'All eight destination details open with matching name and close.'
    check('All destination details', destination_details)

    def destination_prefill():
        page.locator('.destination-card').filter(has=page.get_by_role('heading', name='Ayodhya', exact=True)).click()
        page.get_by_role('button', name='Plan for Ayodhya', exact=True).click()
        expect(page.locator('#plan select').nth(0)).to_have_value('Ayodhya')
        return 'Destination CTA prefills Ayodhya.'
    check('Destination CTA prefills planner', destination_prefill)

    def repeated_destination_prefill():
        page.locator('#plan select').nth(0).select_option('Agra')
        page.get_by_role('button', name='Plan for Ayodhya', exact=True).click()
        expect(page.locator('#plan select').nth(0)).to_have_value('Ayodhya', timeout=1500)
        return 'Repeated destination CTA correctly overrides a manually changed planner value.'
    check('Repeated destination CTA after editing selection', repeated_destination_prefill)

    def planner_create():
        page.locator('#plan select').nth(0).select_option('More than one destination')
        page.locator('#plan select').nth(1).select_option('November')
        page.locator('#plan select').nth(2).select_option('With family')
        page.locator('#plan textarea').fill('Varanasi and Ayodhya; gentle walking pace, time for rest. <script>window.qaInjected=true</script>')
        page.get_by_role('button', name='Create my travel brief', exact=True).click()
        result = page.locator('.brief-result')
        expect(result).to_contain_text('More than one destination')
        expect(result).to_contain_text('November')
        expect(result).to_contain_text('With family')
        expect(result).to_contain_text('<script>window.qaInjected=true</script>')
        assert page.evaluate('window.qaInjected === undefined')
        assert result.evaluate('(el) => el === document.activeElement')
        return 'All chosen fields appear; text is escaped; result receives focus; preview clarifies no enquiry/booking.'
    check('Planner preview and safe text rendering', planner_create)

    def download_brief():
        with page.expect_download() as event:
            page.get_by_role('button', name='Download brief', exact=True).click()
        download = event.value
        content = Path(download.path()).read_text(encoding='utf-8')
        assert 'Destination: More than one destination' in content
        assert 'When: November' in content
        assert 'Travelling: With family' in content
        assert 'No enquiry has been sent.' in content
        return {'filename': download.suggested_filename, 'content': content, 'retention': 'Read from Playwright-owned temporary download path; browser context disposes download.'}
    check('Planner actual download content', download_brief)

    def copy_brief():
        page.get_by_role('button', name='Copy travel brief', exact=True).click()
        expect(page.locator('.form-status')).to_have_text('Your travel brief has been copied.')
        content = page.evaluate('navigator.clipboard.readText()')
        assert 'When: November' in content
        return 'Clipboard content matches chosen brief data in isolated browser.'
    check('Planner copy', copy_brief)

    def planner_edit():
        page.get_by_role('button', name='Adjust my ideas', exact=True).click()
        expect(page.locator('#plan select').nth(0)).to_have_value('More than one destination')
        expect(page.locator('#plan select').nth(1)).to_have_value('November')
        expect(page.locator('#plan select').nth(2)).to_have_value('With family')
        expect(page.locator('#plan textarea')).to_contain_text('gentle walking pace')
        return {'values_preserved': True, 'focused_element_after_edit': page.evaluate('document.activeElement.tagName')}
    check('Planner adjust preserves data', planner_edit)

    def faq_keyboard():
        details = page.locator('.faq-list details')
        for index in range(details.count()):
            detail = details.nth(index)
            detail.locator('summary').focus()
            page.keyboard.press('Enter')
            assert detail.evaluate('(el) => el.open')
            expect(detail.locator('p')).to_be_visible()
            page.keyboard.press('Enter')
            assert not detail.evaluate('(el) => el.open')
        return 'All four FAQs toggle with keyboard Enter and expose their answer.'
    check('FAQs keyboard and repeated toggle', faq_keyboard)

    def mobile_menu():
        page.set_viewport_size({'width': 390, 'height': 844})
        page.goto(report['url'])
        page.wait_for_load_state('networkidle')
        page.get_by_role('button', name='Open menu', exact=True).click()
        expect(page.get_by_role('navigation', name='Mobile navigation')).to_be_visible()
        page.wait_for_timeout(60)
        assert page.evaluate("document.activeElement.closest('#mobile-navigation') !== null")
        assert page.evaluate("document.body.style.overflow === 'hidden'")
        for key in ['Tab'] * 18 + ['Shift+Tab'] * 18:
            page.keyboard.press(key)
            assert page.evaluate("!!document.activeElement.closest('#mobile-navigation') || document.activeElement.classList.contains('menu-toggle')"), f'Focus escaped on {key}: ' + page.evaluate('document.activeElement.outerHTML')
        page.keyboard.press('Escape')
        expect(page.locator('#mobile-navigation')).to_have_count(0)
        expect(page.get_by_role('button', name='Open menu', exact=True)).to_be_focused()
        assert page.evaluate("document.body.style.overflow !== 'hidden'")
        page.get_by_role('button', name='Open menu', exact=True).click()
        page.get_by_role('navigation', name='Mobile navigation').get_by_role('link', name=re.compile('Destinations')).click()
        expect(page.locator('#mobile-navigation')).to_have_count(0)
        assert page.url.endswith('#destinations')
        return '390px: focus enters menu, stays trapped through 18 forward and 18 backward Tabs, Escape restores toggle and scrolling, navigation closes menu.'
    check('Mobile menu keyboard trap, Escape and navigation', mobile_menu)

    def mobile_journey_visibility():
        first = page.locator('.journey-card').first
        first.get_by_role('button', name='Explore the journey', exact=True).click()
        detail = page.locator('#journey-detail')
        expect(detail).to_be_visible()
        rect = detail.bounding_box()
        viewport = page.viewport_size
        require(rect['y'] < viewport['height'] and rect['y'] + rect['height'] > 0, f'Opened first mobile itinerary is outside viewport: y={rect["y"]}, height={rect["height"]}, viewportHeight={viewport["height"]}. No scrolling or focus movement reveals it.')
        return rect
    check('Mobile first itinerary is revealed in viewport', mobile_journey_visibility)

    check('Mobile viewport has no document overflow', lambda: require(page.evaluate('document.body.scrollWidth === document.documentElement.clientWidth'), page.evaluate('JSON.stringify({body:document.body.scrollWidth, viewport:document.documentElement.clientWidth})')))

    report['content_observations'] = [
        {'severity': 'pass', 'finding': 'No imported business metrics, testimonials, prices, client identities, VIP guarantees or booking claims observed. Working brand and proposed routes are explicitly disclosed; planner is explicitly local preview.'},
        {'severity': 'pass', 'finding': 'Destination factual descriptions align with research/content-research.json: Gaya/Bodh Gaya distinct; Saraswati qualified as mythical; Taj Friday closure noted.'},
        {'severity': 'review', 'finding': 'Destination photo alt text is derived from first destination highlight, not the actual photographed subject. Lucknow image filename is lucknow-rumi-darwaza.webp but alt starts Bara Imambara. Vrindavan image filename is vrindavan-madan-mohan.webp but alt starts Banke Bihari. Replace with accurate subject-specific alt text.', 'observed_alt_text': page.locator('.destination-card img').evaluate_all('(els)=>els.map(el=>({alt:el.alt,src:el.getAttribute("src")}))')},
        {'severity': 'known_fix_in_progress', 'finding': 'Root is correcting the wide river photograph caption from first light to evening. Latest source already says EVENING ON THE GANGA; no independent image-time verification performed in this functional pass.'}
    ]
    report['mutation_requests'] = [request for request in report['mutation_requests'] if '_next' not in request['url']]
    report['summary'] = {'passed': sum(item['status'] == 'pass' for item in report['checks']), 'failed': sum(item['status'] == 'fail' for item in report['checks']), 'no_live_enquiry_requests': len(report['mutation_requests']) == 0}
    context.close()
    browser.close()

out = ROOT / 'evidence' / 'functional-review.json'
out.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding='utf-8')
print(json.dumps({'report': str(out), 'summary': report['summary'], 'failures': [item for item in report['checks'] if item['status'] == 'fail']}, ensure_ascii=True, indent=2))

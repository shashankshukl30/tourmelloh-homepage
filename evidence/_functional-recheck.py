import json
from pathlib import Path
from datetime import datetime, timezone
from playwright.sync_api import sync_playwright, expect

root = Path(r'D:\Digiocular\Websites\india-travel-homepage')
report = {'reviewed_at': datetime.now(timezone.utc).isoformat(), 'url': 'http://127.0.0.1:3108', 'scope': 'Affected checks only: repeated destination requests, mobile itinerary reveal/close/focus, corrected photograph descriptions, hero accessible name, public contact anchors.', 'checks': []}

def check(name, action):
    try:
        report['checks'].append({'name': name, 'status': 'pass', 'detail': action()})
    except Exception as exc:
        report['checks'].append({'name': name, 'status': 'fail', 'detail': str(exc)[:2000]})

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 1440, 'height': 1000}, reduced_motion='reduce')
    page = context.new_page()
    page.goto(report['url'])
    page.wait_for_load_state('networkidle')
    report['page_title'] = page.title()

    def repeat_destination():
        page.locator('.destination-card').filter(has=page.get_by_role('heading', name='Ayodhya', exact=True)).click()
        page.get_by_role('button', name='Plan for Ayodhya', exact=True).click()
        expect(page.locator('#plan select').first).to_have_value('Ayodhya')
        page.locator('#plan select').first.select_option('Agra')
        page.get_by_role('button', name='Plan for Ayodhya', exact=True).click()
        expect(page.locator('#plan select').first).to_have_value('Ayodhya')
        page.get_by_role('button', name='Create my travel brief', exact=True).click()
        expect(page.locator('.brief-result')).to_be_visible()
        page.get_by_role('button', name='Plan for Ayodhya', exact=True).click()
        expect(page.locator('.brief-result')).to_have_count(0)
        expect(page.locator('#plan select').first).to_have_value('Ayodhya')
        return 'Repeating Ayodhya CTA overrides manual Agra choice and reopens the form from an existing Ayodhya brief.'
    check('Repeated destination selection and preview reset', repeat_destination)

    def corrected_alts():
        observed = {}
        for destination, expected in [('Lucknow', 'Rumi Darwaza in Lucknow'), ('Vrindavan', 'Madan Mohan Temple in Vrindavan')]:
            image = page.locator('.destination-card').filter(has=page.get_by_role('heading', name=destination, exact=True)).locator('img')
            expect(image).to_have_attribute('alt', expected)
            observed[destination] = image.get_attribute('alt')
        return observed
    check('Corrected photo-specific alternative text', corrected_alts)

    def contacts():
        phone = page.locator('footer a[href^="tel:"]')
        email = page.locator('footer a[href^="mailto:"]')
        expect(phone).to_have_attribute('href', 'tel:+917706997271')
        expect(email).to_have_attribute('href', 'mailto:tourmelloh@gmail.com')
        expect(email).to_have_text('tourmelloh@gmail.com')
        assert '7706997271' in ''.join(character for character in phone.inner_text() if character.isdigit())
        return {'phone_display': phone.inner_text(), 'phone_href': phone.get_attribute('href'), 'email_display': email.inner_text(), 'email_href': email.get_attribute('href'), 'verification': 'Matches locally verified client-public-details.json. Links inspected, not activated.'}
    check('Verified client phone and email anchors', contacts)

    def mobile_detail():
        page.set_viewport_size({'width': 390, 'height': 844})
        page.goto(report['url'])
        page.wait_for_load_state('networkidle')
        trigger = page.locator('.journey-card').first.get_by_role('button', name='Explore the journey', exact=True)
        trigger.click()
        panel = page.locator('#journey-detail')
        expect(panel).to_be_visible()
        expect(panel).to_be_focused()
        rect = panel.bounding_box()
        assert rect['y'] < 844 and rect['y'] + rect['height'] > 0, rect
        page.get_by_role('button', name='Close itinerary details', exact=True).click()
        expect(panel).to_have_count(0)
        expect(trigger).to_be_focused()
        trigger_rect = trigger.bounding_box()
        assert trigger_rect['y'] < 844 and trigger_rect['y'] + trigger_rect['height'] > 0, trigger_rect
        trigger.press('Enter')
        expect(panel).to_be_focused()
        page.get_by_role('button', name='Close itinerary details', exact=True).focus()
        page.keyboard.press('Enter')
        expect(panel).to_have_count(0)
        expect(trigger).to_be_focused()
        return {'opened_panel_position': rect, 'returned_trigger_position': trigger_rect, 'repeat_keyboard_open_close': 'pass', 'overflow': page.evaluate('({body:document.body.scrollWidth,viewport:document.documentElement.clientWidth})')}
    check('390px itinerary reveal, focus and close return', mobile_detail)

    def hero_name():
        link = page.locator('.hero-explore')
        label = link.get_attribute('aria-label')
        assert label and label.strip(), 'Hero arrow link lacks explicit accessible label.'
        return {'aria_label': label, 'href': link.get_attribute('href')}
    check('Mobile hero arrow accessible label', hero_name)

    context.close()
    browser.close()

report['summary'] = {'passed': sum(item['status'] == 'pass' for item in report['checks']), 'failed': sum(item['status'] == 'fail' for item in report['checks'])}
out = root / 'evidence' / 'functional-recheck.json'
out.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding='utf-8')
print(json.dumps(report, indent=2, ensure_ascii=True))

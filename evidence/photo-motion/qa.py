from pathlib import Path
from playwright.sync_api import sync_playwright
import json

OUT=Path(__file__).resolve().parent
report={'errors':[],'checks':[]}
def state(photo):
    return photo.evaluate('''el=>({active:el.dataset.photoActive,frame:getComputedStyle(el,'::before').opacity,image:getComputedStyle(el.querySelector('img')).transform,cursor:getComputedStyle(el).cursor,tabindex:el.getAttribute('tabindex')})''')
def record(name,value):
    report['checks'].append({'name':name,'result':value})
    print(name,value,flush=True)
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True)
    context=browser.new_context(viewport={'width':1440,'height':1000})
    page=context.new_page()
    page.on('pageerror',lambda e:report['errors'].append(str(e)))
    page.goto('http://127.0.0.1:3108',wait_until='networkidle')
    page.locator('.journey-photo[data-photo-motion]').first.wait_for()
    photo=page.locator('.journey-photo').first
    photo.scroll_into_view_if_needed()
    page.mouse.move(0,0)
    page.wait_for_timeout(1250)
    record('desktop baseline',state(photo))
    photo.hover()
    page.wait_for_timeout(1150)
    record('desktop photo hover',state(photo))
    page.locator('.journey-card').first.screenshot(path=str(OUT/'journey-hover.jpg'),type='jpeg',quality=90)
    page.mouse.move(0,0)
    page.wait_for_timeout(1350)
    record('desktop pointer leave',state(photo))
    link=page.locator('.journey-image-link').first
    link.focus()
    page.keyboard.press('Tab')
    page.keyboard.press('Shift+Tab')
    page.wait_for_timeout(1150)
    record('keyboard link focus',{'photo':state(photo),'focused':link.evaluate('el=>document.activeElement===el'),'focusVisible':link.evaluate('el=>el.matches(":focus-visible")')})
    page.locator('.journey-card').first.screenshot(path=str(OUT/'journey-keyboard.jpg'),type='jpeg',quality=90)
    page.keyboard.press('Tab')
    page.wait_for_timeout(1300)
    record('save-button focus does not pretend to open photo',state(photo))

    page.get_by_role('button',name='Bodhgaya',exact=False).first.click()
    atlas=page.locator('.atlas-photo')
    page.wait_for_timeout(150)
    atlas.hover()
    page.wait_for_timeout(1150)
    record('dynamic atlas photo',{'state':state(atlas),'source':atlas.locator('img').get_attribute('src')})
    atlas.screenshot(path=str(OUT/'atlas-hover.jpg'),type='jpeg',quality=90)
    page.locator('.atlas-places button').filter(has=page.get_by_text('Gaya',exact=True)).click()
    page.wait_for_timeout(200)
    record('typographic Gaya excluded',page.locator('.atlas-photo').get_attribute('data-photo-motion'))

    page.goto('http://127.0.0.1:3108/journeys',wait_until='networkidle')
    collection=page.locator('.collection-image').first
    collection.wait_for()
    collection.hover()
    page.wait_for_timeout(1150)
    record('collection photo hover',state(collection))
    collection.screenshot(path=str(OUT/'collection-hover.jpg'),type='jpeg',quality=90)
    collection.locator('a').first.click()
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(300)
    record('client navigation registers new gallery',{'url':page.url,'gallery':page.locator('.tour-gallery-photo[data-photo-motion]').count(),'heroExcluded':page.locator('.tour-hero-photo[data-photo-motion]').count()})
    record('desktop overflow',page.evaluate('({body:document.body.scrollWidth,viewport:innerWidth})'))
    context.close()

    reduced=browser.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce')
    page=reduced.new_page()
    page.on('pageerror',lambda e:report['errors'].append(str(e)))
    page.goto('http://127.0.0.1:3108',wait_until='networkidle')
    photo=page.locator('.journey-photo').first
    photo.hover()
    page.wait_for_timeout(150)
    record('reduced motion static hover',state(photo))
    reduced.close()

    touch=browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True)
    page=touch.new_page()
    page.on('pageerror',lambda e:report['errors'].append(str(e)))
    page.goto('http://127.0.0.1:3108',wait_until='networkidle')
    atlas=page.locator('.atlas-photo')
    atlas.tap()
    page.wait_for_timeout(300)
    record('touch nonlinked image has no sticky hover',state(atlas))
    record('mobile overflow',page.evaluate('({body:document.body.scrollWidth,viewport:innerWidth})'))
    atlas.screenshot(path=str(OUT/'touch-atlas.jpg'),type='jpeg',quality=88)
    touch.close()
    browser.close()
(OUT/'report.json').write_text(json.dumps(report,indent=2,ensure_ascii=False)+'\n',encoding='utf8')

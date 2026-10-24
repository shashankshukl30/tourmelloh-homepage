import json
from pathlib import Path
from datetime import datetime, timezone
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parent
report={'browser':'WebKit','startedAt':datetime.now(timezone.utc).isoformat(),'layouts':[],'interactions':[]}
def check(name,width,passed,detail=None):
    report['interactions'].append({'name':name,'width':width,'passed':bool(passed),'detail':detail})

with sync_playwright() as p:
    browser=p.webkit.launch(headless=True)
    for width,height in [(1024,768),(1150,800),(1440,900),(390,844)]:
        context=browser.new_context(viewport={'width':width,'height':height},is_mobile=width<1000,has_touch=width<1000)
        page=context.new_page();errors=[]
        page.on('pageerror',lambda e,out=errors:out.append(str(e)))
        page.goto('http://127.0.0.1:3108',wait_until='networkidle')
        page.evaluate('document.fonts.ready')
        layout=page.evaluate('''() => {
          const rect=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom}};
          const elements=[...document.querySelectorAll('.header-inner > .brand,.desktop-nav,.nav-search,.header-cta,.menu-toggle')].filter(e=>e.getBoundingClientRect().width>0);
          const boxes=elements.map(e=>({className:e.className,...rect(e)})),overlaps=[];
          for(let i=0;i<boxes.length;i++)for(let j=i+1;j<boxes.length;j++){
            const a=boxes[i],b=boxes[j];if(Math.min(a.right,b.right)-Math.max(a.x,b.x)>1&&Math.min(a.bottom,b.bottom)-Math.max(a.y,b.y)>1)overlaps.push([a.className,b.className]);
          }
          return {width:innerWidth,bodyWidth:document.body.scrollWidth,boxes,overlaps,outside:boxes.filter(b=>b.x<0||b.right>innerWidth),labels:[...document.querySelectorAll('.nav-text-link')].map(e=>({text:e.textContent,fontSize:getComputedStyle(e).fontSize,fontWeight:getComputedStyle(e).fontWeight}))};
        }''')
        layout['pageErrors']=errors
        report['layouts'].append(layout)
        check('Header has no overlaps or horizontal overflow',width,not layout['overlaps'] and not layout['outside'] and layout['bodyWidth']==width)
        check('Contact destination exists',width,page.locator('#contact').count()==1)
        if width>1000:
            links=page.locator('.nav-text-link')
            check('All four navigation labels visible at 16px',width,links.count()==4 and all(x['fontSize']=='16px' for x in layout['labels']) and all(x.is_visible() for x in links.all()))
            links.nth(0).hover();page.wait_for_timeout(350)
            start=page.locator('.nav-backplate').bounding_box()
            links.nth(3).hover();page.wait_for_timeout(60)
            middle=page.locator('.nav-backplate').bounding_box()
            page.wait_for_timeout(600)
            end=page.locator('.nav-backplate').bounding_box();target=links.nth(3).bounding_box()
            check('Rounded backplate visibly travels between labels',width,abs(middle['x']-start['x'])>1 and abs(middle['x']-end['x'])>1,{'start':start,'middle':middle,'end':end})
            check('Hover backplate settles on hovered label',width,abs(end['x']-target['x'])<1 and abs(end['width']-target['width'])<1)
            links.nth(1).focus();page.wait_for_timeout(600)
            check('Keyboard focus receives navigation highlight',width,links.nth(1).get_attribute('data-highlighted')=='true' and links.nth(1).evaluate('(e)=>document.activeElement===e'))
            cta=page.locator('.header-cta');cta.hover();page.wait_for_timeout(400)
            fill=page.locator('.nav-cta-fill').bounding_box();button=cta.bounding_box()
            check('CTA hover fill reaches button frame',width,abs(fill['y']-button['y'])<1)
            if width==1150:
                links.nth(1).hover();page.wait_for_timeout(400)
                page.screenshot(path=str(ROOT/'navigation-motion-webkit-1150.png'))
        else:
            toggle=page.locator('.menu-toggle');toggle.click();page.wait_for_timeout(400)
            check('Mobile menu shows new labels',width,all(page.locator('#mobile-navigation').get_by_role('link',name=name).is_visible() for name in ['Explore India','Tours & routes','Varanasi guide','Get in touch']))
            check('Mobile menu locks page scrolling',width,page.evaluate('document.body.style.overflow')=='hidden')
            page.screenshot(path=str(ROOT/'navigation-motion-webkit-390.png'))
            page.keyboard.press('Escape')
            check('Escape closes mobile menu and restores focus',width,page.locator('#mobile-navigation').count()==0 and toggle.evaluate('(e)=>document.activeElement===e') and page.evaluate('document.body.style.overflow')!='hidden')
            toggle.click();page.locator('#mobile-navigation').get_by_role('link',name='Tours & routes').click()
            page.wait_for_url('**/journeys')
            check('Renamed tour link opens collection and closes menu',width,page.locator('#mobile-navigation').count()==0 and page.locator('.collection-page').is_visible())
        context.close()
    context=browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,reduced_motion='reduce')
    page=context.new_page();page.goto('http://127.0.0.1:3108',wait_until='networkidle')
    page.locator('.menu-toggle').click()
    check('Reduced-motion menu opens without translated entrance',390,page.locator('#mobile-navigation').evaluate('(e)=>getComputedStyle(e).transform') in ['none','matrix(1, 0, 0, 1, 0, 0)'])
    context.close();browser.close()
report['summary']={'layouts':len(report['layouts']),'interactions':len(report['interactions']),'failures':sum(not x['passed'] for x in report['interactions']),'pageErrors':sum(len(x['pageErrors']) for x in report['layouts'])}
report['visualReview']='pending'
(ROOT/'navigation-motion-webkit.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps(report['summary']))
for row in report['interactions']:
    if not row['passed']:print(json.dumps(row))

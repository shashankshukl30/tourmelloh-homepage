"""Bounded grouped-header and WhatsApp QA; deliberately excludes hero film controls."""
import json
from datetime import datetime, timezone
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent
BASE = 'http://127.0.0.1:3108'
WIDTHS = [320, 390, 600, 601, 768, 1000, 1001, 1151, 1240, 1280, 1281, 1440, 1920]
report = {'base': BASE, 'startedAt': datetime.now(timezone.utc).isoformat(),
          'scope': 'Header actions, responsive navigation and WhatsApp only. Film controls excluded.',
          'browsers': {}, 'layouts': [], 'checks': [], 'visualReview': 'pending'}

def check(browser, width, name, passed, detail=None):
    report['checks'].append({'browser': browser, 'width': width, 'name': name,
                             'passed': bool(passed), 'detail': detail})

def save():
    report['summary'] = {'layouts': len(report['layouts']),
      'layoutFailures': sum(bool(r['failures']) for r in report['layouts']),
      'checks': len(report['checks']), 'checkFailures': sum(not c['passed'] for c in report['checks'])}
    report['finishedAt'] = datetime.now(timezone.utc).isoformat()
    (ROOT / 'header-actions-review.json').write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')

GEOMETRY = '''() => {
  const rect = e => {const b=e.getBoundingClientRect(); return {name:e.className,
    x:b.x,y:b.y,width:b.width,height:b.height,right:b.right,bottom:b.bottom};};
  const visible = e => getComputedStyle(e).display !== 'none' && e.getBoundingClientRect().width>0;
  const inner=document.querySelector('.header-inner'), actions=document.querySelector('.header-actions');
  const overlap=(a,b)=>Math.min(a.right,b.right)-Math.max(a.x,b.x)>.5 && Math.min(a.bottom,b.bottom)-Math.max(a.y,b.y)>.5;
  const groups=[...inner.children].filter(visible).map(rect), children=[...actions.children].filter(visible).map(rect);
  const overlaps=[];for(let i=0;i<groups.length;i++)for(let j=i+1;j<groups.length;j++)if(overlap(groups[i],groups[j]))overlaps.push([groups[i].name,groups[j].name]);
  const actionOverlaps=[];for(let i=0;i<children.length;i++)for(let j=i+1;j<children.length;j++)if(overlap(children[i],children[j]))actionOverlaps.push([children[i].name,children[j].name]);
  const f=document.querySelector('.whatsapp-floating'), svg=f.querySelector('svg'), icon=svg.getBoundingClientRect(), fr=f.getBoundingClientRect(), cs=getComputedStyle(f);
  return {bodyWidth:document.body.scrollWidth,clientWidth:document.documentElement.clientWidth,
    documentWidth:document.documentElement.scrollWidth,inner:rect(inner),actions:rect(actions),groups,children,
    gaps:children.slice(1).map((r,i)=>r.x-children[i].right),gapStyle:getComputedStyle(actions).gap,
    overlaps,actionOverlaps,headerOverflow:groups.filter(r=>r.x < -.5 || r.right>innerWidth+.5),
    floating:{rect:rect(f),icon:rect(svg),viewBox:svg.getAttribute('viewBox'),fill:getComputedStyle(svg).fill,
      stroke:getComputedStyle(svg).stroke,border:cs.borderTopWidth,outline:cs.outlineStyle,
      fits:icon.x>=fr.x&&icon.right<=fr.right&&icon.y>=fr.y&&icon.bottom<=fr.bottom,
      centerX:(icon.x+icon.right-fr.x-fr.right)/2,centerY:(icon.y+icon.bottom-fr.y-fr.bottom)/2},
    missingImages:[...document.querySelectorAll('.site-header img')].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)};
}'''

with sync_playwright() as p:
    for name in ['Chrome', 'WebKit']:
        browser = p.chromium.launch(channel='chrome', headless=True) if name == 'Chrome' else p.webkit.launch(headless=True)
        report['browsers'][name] = browser.version
        for width in WIDTHS:
            height = 844 if width <= 600 else 900
            context = browser.new_context(viewport={'width': width, 'height': height}, device_scale_factor=1,
                is_mobile=width<=1000,has_touch=width<=1000,reduced_motion='no-preference')
            page = context.new_page()
            page.set_default_timeout(12000)
            errors=[]
            page.on('pageerror',lambda e: errors.append(str(e)))
            row={'browser':name,'width':width,'height':height,'failures':[],'pageErrors':errors}
            try:
                response=page.goto(BASE,wait_until='domcontentloaded')
                page.evaluate('document.fonts.ready')
                page.wait_for_function("document.querySelector('.brand-logo')?.naturalWidth > 0")
                page.wait_for_timeout(350)
                g=page.evaluate(GEOMETRY)
                row['geometry']=g
                if response.status!=200:row['failures'].append('Homepage status '+str(response.status))
                if g['bodyWidth']!=width or g['documentWidth']!=width:row['failures'].append('Page horizontal overflow')
                if g['overlaps'] or g['actionOverlaps'] or g['headerOverflow']:row['failures'].append('Header overlap or viewport overflow')
                if g['missingImages']:row['failures'].append('Missing header image')
                expected_gap=8 if width<=600 or 1001<=width<=1280 else 12
                check(name,width,'Visible action gaps match responsive8/12px rule',all(abs(n-expected_gap)<.6 for n in g['gaps']),g['gaps'])
                check(name,width,'Action group aligns with right edge of header content',abs(g['actions']['right']-g['inner']['right'])<.6)
                check(name,width,'Every visible action has at least44px touch target',all(c['width']>=43.9 and c['height']>=43.9 for c in g['children']))
                f=g['floating']
                check(name,width,'Standard filled WhatsApp SVG is centered and unclipped',f['fits'] and abs(f['centerX'])<.6 and abs(f['centerY'])<.6 and f['viewBox']=='0 0 16 16' and f['stroke']=='none' and f['icon']['width']==28,f)
                check(name,width,'Floating WhatsApp has no resting border or outline',f['border']=='0px' and f['outline']=='none')
                check(name,width,'Header WhatsApp link is accessible and preserves direct chat',page.locator('.whatsapp-header').get_attribute('href').startswith('https://wa.me/917706997271?text=') and page.locator('.whatsapp-header').get_attribute('target')=='_blank' and 'noopener' in page.locator('.whatsapp-header').get_attribute('rel') and bool(page.locator('.whatsapp-header').get_attribute('aria-label')))
                if width<=1000:
                    toggle=page.locator('.menu-toggle')
                    toggle.click()
                    page.locator('#mobile-navigation').wait_for(state='visible')
                    page.wait_for_timeout(300)
                    check(name,width,'Mobile menu shows search and Travel journal; floating contact hides',page.locator('#mobile-navigation a[href="/blog"]').is_visible() and page.locator('.mobile-search-link').is_visible() and not page.locator('.whatsapp-floating').is_visible())
                    check(name,width,'Open menu does not overflow viewport',page.evaluate('document.body.scrollWidth===innerWidth && document.documentElement.scrollWidth===innerWidth'))
                    page.keyboard.press('Escape')
                    page.wait_for_timeout(100)
                    check(name,width,'Escape closes menu, restores focus and unlocks page',page.locator('#mobile-navigation').count()==0 and toggle.evaluate('(e)=>document.activeElement===e') and page.evaluate('document.body.style.overflow')!='hidden' and page.locator('.whatsapp-floating').is_visible())
                    toggle.click()
                    page.locator('.mobile-search-link').click()
                    page.wait_for_url('**/search')
                    page.locator('#travel-search').wait_for(state='visible')
                    page.locator('#travel-search').fill('Banaras')
                    check(name,width,'Mobile search link navigates, closes menu and returns Banaras results',page.locator('#mobile-navigation').count()==0 and page.locator('.search-result').count()>0 and page.evaluate('document.body.style.overflow')!='hidden')
                    page.goto(BASE,wait_until='domcontentloaded')
                    page.evaluate('document.fonts.ready')
                else:
                    journal=page.locator('.desktop-nav a[href="/blog"]')
                    journal.hover()
                    check(name,width,'Desktop nav hover selects its rounded backplate',journal.get_attribute('data-highlighted')=='true' and journal.locator('.nav-backplate').count()==1)
                    page.mouse.move(0,height-10)
                    journal.focus()
                    check(name,width,'Desktop nav keyboard focus selects its backplate',journal.get_attribute('data-highlighted')=='true' and journal.evaluate('(e)=>document.activeElement===e'))
                if name=='Chrome' and width in [390,1440]:
                    page.evaluate('document.activeElement?.blur();window.scrollTo(0,0)')
                    page.mouse.move(1,height-10)
                    page.wait_for_timeout(500)
                    page.screenshot(path=str(ROOT/f'header-actions-{width}.png'))
                if errors:row['failures'].append('Runtime page errors')
            except Exception as e:
                row['failures'].append(str(e))
            report['layouts'].append(row)
            save()
            print(name,width,'PASS' if not row['failures'] else row['failures'],flush=True)
            context.close()
        browser.close()
save()
print(json.dumps(report['summary']),flush=True)

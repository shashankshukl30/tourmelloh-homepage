import json
from datetime import datetime, timezone
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent
sizes = [(1897,866),(1536,690),(1366,650),(390,844),(320,568),(320,480),(844,390),(568,320)]
report = {'browser':'WebKit','url':'http://127.0.0.1:3108','startedAt':datetime.now(timezone.utc).isoformat(),'layouts':[]}
with sync_playwright() as p:
    browser=p.webkit.launch(headless=True)
    report['browserVersion']=browser.version
    for width,height in sizes:
        context=browser.new_context(viewport={'width':width,'height':height},is_mobile=width<=844,has_touch=width<=844,device_scale_factor=1)
        page=context.new_page()
        errors=[]
        page.on('pageerror',lambda e,out=errors:out.append(str(e)))
        response=page.goto(report['url'],wait_until='networkidle')
        page.evaluate('document.fonts.ready')
        page.wait_for_timeout(300)
        data=page.evaluate('''() => {
          const rect=(el)=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom}};
          const hero=rect(document.querySelector('.hero'));
          const header=rect(document.querySelector('.site-header'));
          const selectors={eyebrow:'.hero-eyebrow',title:'.hero h1',copy:'.hero-bottom p',cta:'.hero-explore',location:'.hero-location',control:'.film-control'};
          const boxes=Object.fromEntries(Object.entries(selectors).map(([key,selector])=>[key,rect(document.querySelector(selector))]));
          const failures=[];
          if(hero.bottom>innerHeight+1) failures.push('Hero extends below first viewport');
          if(header.bottom>hero.y+1) failures.push('Header overlaps hero');
          if(document.body.scrollWidth!==innerWidth || document.documentElement.scrollWidth!==innerWidth) failures.push('Horizontal page overflow');
          for(const [key,r] of Object.entries(boxes)) {
            if(r.x<hero.x-1 || r.y<hero.y-1 || r.right>hero.right+1 || r.bottom>hero.bottom+1) failures.push(key+' outside hero frame');
          }
          const keys=Object.keys(boxes);
          for(let a=0;a<keys.length;a++)for(let b=a+1;b<keys.length;b++) {
            const r=boxes[keys[a]],s=boxes[keys[b]];
            if(Math.min(r.right,s.right)-Math.max(r.x,s.x)>1 && Math.min(r.bottom,s.bottom)-Math.max(r.y,s.y)>1) failures.push(keys[a]+' overlaps '+keys[b]);
          }
          const textOverflow=[];
          for(const [key,selector] of Object.entries(selectors)) {
            const el=document.querySelector(selector),walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);
            while(walker.nextNode()) {
              const node=walker.currentNode;if(!node.textContent.trim())continue;
              const range=document.createRange();range.selectNodeContents(node);
              for(const r of range.getClientRects()) if(r.width>0 && r.height>0 && (r.x<hero.x-1||r.y<hero.y-1||r.right>hero.right+1||r.bottom>hero.bottom+1)) textOverflow.push({key,text:node.textContent});
            }
          }
          if(textOverflow.length)failures.push('Visible text extends beyond hero frame');
          const video=document.querySelector('video');
          return {viewport:{width:innerWidth,height:innerHeight},hero,header,boxes,failures,textOverflow,bodyWidth:document.body.scrollWidth,
            video:{readyState:video.readyState,paused:video.paused,error:video.error?.code??null}};
        }''')
        data['status']=response.status
        data['pageErrors']=errors
        if (width,height) in [(1536,690),(320,480),(568,320),(844,390)]:
            name=f'hero-viewport-webkit-{width}x{height}.png'
            page.screenshot(path=str(ROOT/name))
            data['screenshot']=name
        report['layouts'].append(data)
        print(json.dumps({'size':[width,height],'hero':data['hero'],'failures':data['failures'],'pageErrors':errors}),flush=True)
        context.close()
    browser.close()
report['summary']={'layouts':len(report['layouts']),'failures':sum(bool(x['failures'] or x['pageErrors'] or x['status']!=200) for x in report['layouts'])}
report['visualReview']='pending'
report['finishedAt']=datetime.now(timezone.utc).isoformat()
(ROOT/'hero-viewport-webkit.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps(report['summary']),flush=True)

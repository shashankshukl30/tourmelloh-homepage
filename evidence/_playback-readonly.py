"""Read the unchanged public page under native browser motion preferences."""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

path = Path(__file__).parent / 'india-film/playback-delivery-audit.json'
report = json.loads(path.read_text())
report['browserCases'] = []
with sync_playwright() as p:
    for engine in ['Chrome', 'WebKit']:
        browser = p.chromium.launch(channel='chrome', headless=True) if engine == 'Chrome' else p.webkit.launch(headless=True)
        for preference in ['no-preference', 'reduce']:
            context = browser.new_context(viewport={'width': 390, 'height': 844},
                is_mobile=True, has_touch=True, reduced_motion=preference)
            page = context.new_page()
            page.goto(report['base'], wait_until='domcontentloaded')
            page.wait_for_timeout(2500)
            if preference == 'no-preference':
                try:
                    page.wait_for_function("document.querySelector('.hero-film').currentTime > .3", timeout=12000)
                except Exception:
                    pass
            result = page.locator('.hero-film').evaluate('''v => ({
                currentSrc:v.currentSrc,time:v.currentTime,paused:v.paused,ready:v.readyState,
                error:v.error?{code:v.error.code,message:v.error.message}:null,
                muted:v.muted,defaultMuted:v.defaultMuted,playsInline:v.playsInline,controls:v.controls,
                sourceMatches:[...v.querySelectorAll('source')].map(s=>({src:s.src,media:s.media,matches:matchMedia(s.media).matches})),
                high41Support:v.canPlayType('video/mp4; codecs="avc1.640029"')
            })''')
            result.update({'browser':engine,'version':browser.version,'motionPreference':preference,
                'playButtons':page.get_by_role('button',name='Play film',exact=False).count(),
                'qualification':'Desktop engine with touch viewport emulation; physical iOS/Android devices unverified.'})
            report['browserCases'].append(result)
            path.write_text(json.dumps(report,indent=2)+'\n')
            print(json.dumps(result),flush=True)
            context.close()
        browser.close()

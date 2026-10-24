"""Native local-only offline recovery check; no request or prototype interception."""
import json
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright

BASE = 'http://127.0.0.1:3108'
assert urlparse(BASE).hostname in {'127.0.0.1', 'localhost'}
OUTPUT = Path(__file__).parent / 'local-offline-recovery.json'
report = {'base': BASE, 'startedAt': datetime.now(timezone.utc).isoformat(),
          'method': 'Native context offline/online state; no response interception or media-prototype changes.',
          'cases': []}
STATE = '''v => ({src:v.currentSrc,time:v.currentTime,paused:v.paused,ready:v.readyState,
    network:v.networkState,error:v.error?{code:v.error.code,message:v.error.message}:null,
    muted:v.muted,defaultMuted:v.defaultMuted,playsInline:v.playsInline,
    duration:Number.isFinite(v.duration)?v.duration:null,online:navigator.onLine})'''

def save():
    report['summary'] = {'cases':len(report['cases']),
        'passed':sum(c['passed'] is True for c in report['cases']),
        'failed':sum(c['passed'] is False for c in report['cases']),
        'unsupported':sum(c['passed'] is None for c in report['cases'])}
    OUTPUT.write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')

with sync_playwright() as p:
    for name in ['Chrome','WebKit']:
        browser = p.chromium.launch(channel='chrome',headless=True) if name=='Chrome' else p.webkit.launch(headless=True)
        for width,height in [(390,844),(1440,900)]:
            context = browser.new_context(viewport={'width':width,'height':height},
                is_mobile=width==390,has_touch=width==390,reduced_motion='reduce')
            page=context.new_page()
            page.set_default_timeout(12000)
            requests=[]
            page.on('request',lambda request,sink=requests:sink.append(request.url) if '.mp4' in request.url else None)
            case={'browser':name,'version':browser.version,'viewport':[width,height],
                  'passed':False,'checks':{},'qualification':'Desktop browser engine; physical device autoplay policy remains unverified.'}
            try:
                page.goto(BASE,wait_until='networkidle')
                play=page.get_by_role('button',name='Play destination video',exact=True)
                play.wait_for(state='visible')
                video=page.locator('.hero-film')
                case['initial']=video.evaluate(STATE)
                case['initialMediaRequests']=list(requests)
                case['checks']['reducedMotionWaitsForUser']=case['initial']['src']=='' and case['initial']['paused'] and case['initial']['ready']==0
                if name=='Chrome':
                    case['checks']['noInitialMp4Fetch']=not requests
                context.set_offline(True)
                play.click()
                page.wait_for_timeout(1500)
                case['afterOfflineTap']=video.evaluate(STATE)
                if not case['afterOfflineTap']['online'] and not case['afterOfflineTap']['paused'] and case['afterOfflineTap']['time']>.3:
                    case['passed']=None
                    case['unsupportedReason']='Native media loader keeps playing despite browser-context offline state; a network-failure/Retry expectation is unsupported in this engine.'
                    report['cases'].append(case)
                    save()
                    print(json.dumps(case),flush=True)
                    continue
                retry=page.get_by_role('button',name='Retry destination video',exact=True)
                retry.wait_for(state='visible')
                case['offline']=video.evaluate(STATE)
                case['checks']['offlineFailureOffersRetry']=not case['offline']['online'] and case['offline']['paused'] and retry.is_visible()
                context.set_offline(False)
                retry.click()
                page.wait_for_function("document.querySelector('.hero-film').currentTime>.3 && !document.querySelector('.hero-film').paused")
                case['recovered']=video.evaluate(STATE)
                expected='india-mobile.mp4' if width==390 else 'india-desktop.mp4'
                case['checks']['retryLoadsCorrectFilm']=case['recovered']['src'].endswith(expected)
                case['checks']['retryStartsRealPlayback']=case['recovered']['time']>.3 and not case['recovered']['paused'] and case['recovered']['ready']>=2 and case['recovered']['error'] is None
                case['checks']['promptClearsOnlyOncePlaying']=page.locator('.hero-play-prompt').count()==0
                case['checks']['mutedInline16SecondFilm']=case['recovered']['muted'] and case['recovered']['defaultMuted'] and case['recovered']['playsInline'] and case['recovered']['duration']==16
                case['passed']=all(case['checks'].values())
            except Exception as exc:
                case['exception']=str(exc)
            finally:
                context.set_offline(False)
                context.close()
            report['cases'].append(case)
            save()
            print(json.dumps(case),flush=True)
        browser.close()
report['finishedAt']=datetime.now(timezone.utc).isoformat()
save()
print(json.dumps(report['summary']),flush=True)

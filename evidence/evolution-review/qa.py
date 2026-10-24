"""Bounded Tourmelloh release review. Run only after production is declared ready."""
from __future__ import annotations

import hashlib
import json
import shutil
import subprocess
import traceback
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parent
BASE = "http://127.0.0.1:3108"
BASE_ROUTES = [
    "/", "/journeys", "/journeys/kashi-before-the-world-wakes",
    "/journeys/along-the-sacred-rivers", "/journeys/the-road-to-bodh-gaya",
    "/journeys/awadh-agra-and-braj", "/journeys/ayodhya-at-your-own-pace",
    "/journeys/a-weekend-in-lucknow", "/journeys/taj-mahal-and-the-lanes-of-braj",
    "/destinations/varanasi", "/destinations/ayodhya", "/destinations/agra",
    "/destinations/bodh-gaya", "/search",
]
REPORT = {
    "started_utc": datetime.now(timezone.utc).isoformat(),
    "base_url": BASE, "build_id": (ROOT / ".next/BUILD_ID").read_text().strip(),
    "commit": subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=ROOT, text=True).strip(),
    "pages": [], "checks": [], "page_errors": [], "console_errors": [],
    "expected_404_errors": [], "screenshots": [], "external_navigation": [],
}
current = {"route": None, "width": None, "expected404": False}


def check(name: str, passed: bool | None, detail: object = None) -> None:
    REPORT["checks"].append({"name": name, "passed": passed, "detail": detail})
    if passed is False:
        print("FAIL: " + name, flush=True)


def save() -> None:
    REPORT["summary"] = {
        "passed": sum(item["passed"] is True for item in REPORT["checks"]),
        "failed": sum(item["passed"] is False for item in REPORT["checks"]),
        "blocked_external": sum(item["passed"] is None for item in REPORT["checks"]),
        "page_samples": len(REPORT["pages"]),
        "page_errors": len(REPORT["page_errors"]),
        "unexpected_console_errors": len(REPORT["console_errors"]),
    }
    (OUT / "report.json").write_text(json.dumps(REPORT, indent=2) + "\n", encoding="utf-8")


def attach_errors(page) -> None:
    page.on("pageerror", lambda error: REPORT["page_errors"].append({**current, "message": str(error)}))

    def console(message):
        if message.type == "error":
            key = "expected_404_errors" if current["expected404"] and "404" in message.text else "console_errors"
            REPORT[key].append({**current, "message": message.text})
    page.on("console", console)


def settle(page) -> None:
    page.evaluate("""async () => {
        await document.fonts.ready;
        for (const image of document.images) image.loading = 'eager';
        await Promise.all([...document.images].map(image => image.decode().catch(() => null)));
    }""")


def whatsapp_valid(link: dict) -> bool:
    url = urlparse(link["href"])
    number = url.path.strip("/") if url.hostname == "wa.me" else parse_qs(url.query).get("phone", [""])[0]
    return number == "917706997271" and link["target"] == "_blank" and "noopener" in link["rel"]


def snapshot(page, route: str, width: int) -> None:
    current.update(route=route, width=width, expected404=False)
    page.set_viewport_size({"width": width, "height": 844 if width < 700 else 1000})
    response = page.goto(BASE + route, wait_until="networkidle", timeout=45000)
    settle(page)
    result = page.evaluate("""() => ({
        width: innerWidth, bodyWidth: document.body.scrollWidth, clientWidth: document.documentElement.clientWidth,
        h1: [...document.querySelectorAll('h1')].map(el => el.textContent.trim()),
        title: document.title, hasMain: Boolean(document.querySelector('main#main')),
        missingImages: [...document.images].filter(image => !image.complete || !image.naturalWidth).map(image => image.src),
        images: [...document.querySelectorAll('.journal-photo img,.article-cover img')].map(image => ({
            alt:image.alt, src:image.currentSrc, naturalWidth:image.naturalWidth, naturalHeight:image.naturalHeight,
            fit:getComputedStyle(image).objectFit, position:getComputedStyle(image).objectPosition,
            width:image.getBoundingClientRect().width, height:image.getBoundingClientRect().height
        })),
        logo: [...document.querySelectorAll('.brand-logo,.footer-brand img')].map(image => ({
            src:image.getAttribute('src'), naturalWidth:image.naturalWidth, naturalHeight:image.naturalHeight,
            fit:getComputedStyle(image).objectFit, width:image.getBoundingClientRect().width, height:image.getBoundingClientRect().height
        })),
        footer: {text:document.querySelector('.footer-credit')?.textContent.trim(),
            href:document.querySelector('.footer-credit a')?.href, target:document.querySelector('.footer-credit a')?.target,
            heartColor:document.querySelector('.credit-heart') ? getComputedStyle(document.querySelector('.credit-heart')).color : null},
        whatsapp:[...document.querySelectorAll('a[href*="wa.me"],a[href*="api.whatsapp.com"]')].map(link => ({
            href:link.href, target:link.target, rel:link.rel, label:link.getAttribute('aria-label') || link.textContent.trim(),
            placement:link.classList.contains('whatsapp-header')?'header':link.classList.contains('whatsapp-floating')?'floating':link.classList.contains('whatsapp-footer')?'footer':'unknown'
        })),
        invalidHashes:[...document.querySelectorAll('a[href^="#"]')].map(link => link.getAttribute('href')).filter(hash => hash.length>1 && !document.getElementById(hash.slice(1)))
    })""")
    result.update(route=route, status=response.status)
    REPORT["pages"].append(result)
    label = f"{width}px {route}"
    check(label + " loads without overflow", response.status == 200 and result["bodyWidth"] == result["clientWidth"], result)
    check(label + " has one H1 and valid anchors", len(result["h1"]) == 1 and bool(result["h1"][0]) and result["hasMain"] and not result["invalidHashes"])
    check(label + " images decode", not result["missingImages"] and all(image["fit"] == "cover" for image in result["images"]), result["images"])
    check(label + " retains corrected logo", len(result["logo"]) == 2 and all(
        logo["src"] in ["/brand/tourmelloh-logo.svg", "/brand/tourmelloh-logo-ivory.svg"]
        and logo["naturalHeight"] and abs(logo["naturalWidth"] / logo["naturalHeight"] - 5.011205) < 0.02
        and logo["fit"] == "contain" for logo in result["logo"]), result["logo"])
    footer = result["footer"]
    check(label + " footer credit", bool(footer["text"]) and "Made with" in footer["text"] and "Digiocular" in footer["text"] and footer["href"] == "https://digiocular.com/" and footer["target"] == "_blank", footer)
    check(label + " three correct WhatsApp links", len(result["whatsapp"]) == 3 and all(whatsapp_valid(link) for link in result["whatsapp"])
          and sorted(link["placement"] for link in result["whatsapp"]) == ["floating", "footer", "header"], result["whatsapp"])
    save()


def take_screenshot(page, filename: str, full_page: bool = True) -> None:
    page.screenshot(path=str(OUT / filename), full_page=full_page)
    REPORT["screenshots"].append(filename)


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True, channel="chrome")
    try:
        context = browser.new_context(viewport={"width": 390, "height": 844}, reduced_motion="reduce")
        page = context.new_page()
        page.set_default_timeout(15000)
        attach_errors(page)
        page.goto(BASE + "/blog", wait_until="networkidle")
        blog_links = page.locator('main a[href^="/blog/"]').evaluate_all("links => links.map(link => ({href:link.getAttribute('href'),title:link.querySelector('h2')?.textContent.trim()}))")
        blog_links = list({item["href"]: item for item in blog_links}.values())
        check("Blog index exposes six distinct articles", len(blog_links) == 6, blog_links)
        blog_routes = ["/blog"] + [item["href"] for item in blog_links]
        all_routes = BASE_ROUTES + blog_routes
        check("Release has 21 intended routes", len(all_routes) == 21)
        article = next((item["href"] for item in blog_links if "varanasi" in item["href"]), blog_links[0]["href"])
        for width, routes in [(390, all_routes), (320, blog_routes), (1440, blog_routes)]:
            for route in routes:
                try:
                    snapshot(page, route, width)
                    if width in [390, 1440] and route in ["/blog", article]:
                        take_screenshot(page, f'{"blog" if route == "/blog" else "article"}-{width}.png')
                except Exception as error:
                    check(f"{width}px {route} review completed", False, str(error))
                    save()

        titles = [item["h1"][0] for item in REPORT["pages"] if item["width"] == 390 and len(item["h1"]) == 1]
        check("All 21 routes have distinct H1 text", len(titles) == 21 and len(set(titles)) == 21, titles)
        for width in [1240, 1280]:
            current.update(route="/", width=width)
            page.set_viewport_size({"width": width, "height": 1000})
            page.goto(BASE, wait_until="networkidle")
            navigation = page.evaluate("""() => {
                const elements=[...document.querySelectorAll('.header-inner > .brand,.header-inner > .desktop-nav,.header-inner > .nav-search,.header-inner > .whatsapp-header,.header-inner > .header-cta,.header-inner > .menu-toggle')]
                    .map(el=>({label:el.className,left:el.getBoundingClientRect().left,right:el.getBoundingClientRect().right,
                        top:el.getBoundingClientRect().top,bottom:el.getBoundingClientRect().bottom,width:el.getBoundingClientRect().width,
                        display:getComputedStyle(el).display})).filter(el=>el.display!=='none' && el.width>0);
                const overlaps=[];
                for(let i=0;i<elements.length;i++)for(let j=i+1;j<elements.length;j++){
                    const a=elements[i],b=elements[j];
                    if(Math.min(a.right,b.right)-Math.max(a.left,b.left)>1 && Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>1)overlaps.push([a.label,b.label]);
                }
                return {width:innerWidth,elements,overlaps,bodyWidth:document.body.scrollWidth,clientWidth:document.documentElement.clientWidth};
            }""")
            check(f"Homepage navbar at {width}px has no overlaps", not navigation["overlaps"] and navigation["bodyWidth"] == navigation["clientWidth"], navigation)
        for path in ["/brand/tourmelloh-logo.svg", "/brand/tourmelloh-logo-ivory.svg"]:
            response = context.request.get(BASE + path)
            check("Served corrected vector matches source " + path, response.status == 200 and hashlib.sha256(response.body()).hexdigest() == hashlib.sha256((ROOT / "public" / path.lstrip("/")).read_bytes()).hexdigest())

        page.set_viewport_size({"width": 390, "height": 844})
        current.update(width=390, route="/blog")
        for link in blog_links:
            page.goto(BASE + "/blog", wait_until="networkidle")
            page.locator(f'main a[href="{link["href"]}"]').click()
            page.wait_for_url(BASE + link["href"])
            check("Blog card opens " + link["href"], page.locator("h1").inner_text().strip() == link["title"])
            toc = page.locator('nav[aria-label="Article contents"] a')
            hashes = toc.evaluate_all("links => links.map(link => link.getAttribute('href'))")
            for hash_value in hashes:
                page.locator(f'nav[aria-label="Article contents"] a[href="{hash_value}"]').click()
                page.wait_for_function("hash => location.hash === hash", arg=hash_value)
                position = page.locator(hash_value).evaluate("""element => ({
                    top:element.getBoundingClientRect().top,heading:element.querySelector('h2')?.textContent,
                    expectedOffset:parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop || '0') + parseFloat(getComputedStyle(element).scrollMarginTop || '0'),
                    headerBottom:document.querySelector('.site-header').getBoundingClientRect().bottom,
                    viewportHeight:innerHeight
                })""")
                check(link["href"] + " TOC " + hash_value,
                      position["headerBottom"] <= position["top"] <= position["viewportHeight"] / 2
                      and abs(position["top"] - position["expectedOffset"]) < 2 and bool(position["heading"]), position)

        current.update(route="/search")
        page.goto(BASE + "/search", wait_until="networkidle")
        page.get_by_role("button", name="Articles", exact=True).click()
        check("Articles filter exposes all six", page.locator(".search-result").count() == 6 and page.locator('.search-result[href^="/blog/"]').count() == 6)
        page.locator('input[type="search"]').fill("Kashi")
        page.wait_for_timeout(200)
        results = page.locator('.search-result[href^="/blog/"]')
        check("Kashi finds an article", results.count() >= 1)
        expected_title = results.first.locator("h2").inner_text()
        expected_path = results.first.get_attribute("href")
        results.first.click()
        page.wait_for_url(BASE + expected_path)
        check("Kashi search opens matching article", page.locator("h1").inner_text().strip() == expected_title)

        page.goto(BASE, wait_until="networkidle")
        current.update(route="/")
        page.get_by_role("button", name="Open menu", exact=True).click()
        page.locator('#mobile-navigation a[href="/blog"]').click()
        page.wait_for_url(BASE + "/blog")
        check("Mobile menu opens Blog and closes", page.locator(".journal-page").is_visible() and page.locator("#mobile-navigation").count() == 0)

        page.goto(BASE, wait_until="networkidle")
        links = page.locator('a[href*="wa.me"],a[href*="api.whatsapp.com"]')
        external_responses = []
        context.on("response", lambda response: external_responses.append({"url": response.url, "status": response.status})
                   if response.request.is_navigation_request() and ("whatsapp.com" in response.url or response.url.startswith("https://wa.me/")) else None)
        for index in range(links.count()):
            expected = links.nth(index).get_attribute("href")
            response_start = len(external_responses)
            with page.expect_popup(timeout=15000) as popup_event:
                links.nth(index).click()
            popup = popup_event.value
            detail = {"source_href": expected, "opened_new_tab": True}
            try:
                popup.wait_for_load_state("domcontentloaded", timeout=25000)
                popup.wait_for_timeout(1200)
                detail.update(final_url=popup.url, title=popup.title(), h1=popup.locator("h1").all_text_contents())
                if not detail["h1"]:
                    detail["body_excerpt"] = popup.locator("body").inner_text()[:350]
                landed_host = urlparse(popup.url).hostname or ""
                valid_host = landed_host in ["wa.me", "api.whatsapp.com", "web.whatsapp.com", "www.whatsapp.com"]
                responses = external_responses[response_start:]
                successful_response = bool(responses) and responses[-1]["status"] < 400
                check(f"WhatsApp link {index + 1} opens real target in new tab", True if valid_host and successful_response else None, detail)
            except Exception as error:
                detail.update(final_url=popup.url, limitation=str(error))
                check(f"WhatsApp link {index + 1} opens real target in new tab", None, detail)
            finally:
                detail["navigation_responses"] = external_responses[response_start:]
                REPORT["external_navigation"].append(detail)
                popup.close()

        current.update(route="/blog/this-article-does-not-exist", expected404=True)
        response = page.goto(BASE + "/blog/this-article-does-not-exist", wait_until="networkidle")
        check("Unknown article returns 404", response.status == 404, {"status": response.status, "text": page.locator("body").inner_text()[:250]})
        current["expected404"] = False

        motion = browser.new_context(viewport={"width": 390, "height": 844}, reduced_motion="no-preference")
        hero = motion.new_page()
        attach_errors(hero)
        current.update(route="/", width=390)
        hero.goto(BASE, wait_until="networkidle")
        hero.wait_for_function("() => {const v=document.querySelector('video'); return v && !v.paused && v.currentTime > .3;}", timeout=15000)
        check("Fresh mobile hero actually plays", hero.locator("video").evaluate("v=>!v.paused && v.currentTime>.3"))
        take_screenshot(hero, "home-390.png", full_page=False)
        hero.get_by_role("button", name="Pause Varanasi film", exact=True).click()
        check("Hero pause works", hero.locator("video").evaluate("v=>v.paused"))
        hero.get_by_role("button", name="Play Varanasi film", exact=True).click()
        hero.wait_for_function("() => !document.querySelector('video').paused")
        check("Hero manual resume works", hero.locator("video").evaluate("v=>!v.paused"))
        motion.close()
        check("No browser runtime errors", not REPORT["page_errors"], REPORT["page_errors"])
        check("No unexpected console errors", not REPORT["console_errors"], REPORT["console_errors"])
    except Exception as error:
        REPORT["harness_exception"] = traceback.format_exc()
        check("Bounded functional review completed", False, str(error))
    finally:
        browser.close()
        REPORT["cleanup"] = {
            "removed": [], "bytes_removed": 0,
            "note": "Only requested screenshots, review script and evidence retained; isolated browser closed.",
            "free_bytes": {drive: shutil.disk_usage(drive + ":\\").free for drive in ["C", "D"]},
        }
        REPORT["finished_utc"] = datetime.now(timezone.utc).isoformat()
        save()
        print(json.dumps(REPORT["summary"]), flush=True)

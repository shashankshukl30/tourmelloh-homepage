// Alignment sweep across every sitemap page: uneven card endings, unlevel form fields,
// wrapped caps labels, clipped button text, and (phones) swipe cards taller than the visible screen.
// Collapsed forms are opened first.
// node scripts/align-sweep.cjs [baseUrl] [widths]
const { chromium } = require("playwright-core");

const base = process.argv[2] || "http://127.0.0.1:3108";
const widths = (process.argv[3] || "360,390,414,768,1024,1440").split(",").map(Number);
// Real device heights, so "fits on one screen" is tested honestly.
const HEIGHT = { 360: 740, 390: 844, 414: 896, 768: 1024, 1024: 768, 1440: 900 };

(async () => {
  const browser = await chromium.launch({ channel: "chrome" }).catch(() => chromium.launch());
  const xml = await (await fetch(`${base}/sitemap.xml`)).text();
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  paths.push("/search", "/your-journey");
  const found = new Map();
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: HEIGHT[width] ?? 900 }, reducedMotion: "reduce" });
    for (const path of paths) {
      await page.goto(base + path, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(120);
      const issues = await page.evaluate(() => {
        const out = [];
        const vis = (el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none"; };
        const name = (el) => `${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 2).join(".")}`;
        // 1. Cards in a row: last action must end level.
        for (const box of document.querySelectorAll("main *")) {
          const s = getComputedStyle(box);
          if (!(s.display === "grid" || (s.display === "flex" && s.flexDirection === "row"))) continue;
          if (box instanceof SVGElement) continue;
          const kids = Array.from(box.children || []).filter(vis);
          if (kids.length < 2) continue;
          const rows = new Map();
          for (const k of kids) { const t = Math.round(k.getBoundingClientRect().top / 4); (rows.get(t) || rows.set(t, []).get(t)).push(k); }
          for (const row of rows.values()) {
            if (row.length < 2 || new Set(row.map((k) => k.className)).size > 1) continue;
            if (row.some((k) => k.getBoundingClientRect().height < 160)) continue;
            const ends = row.map((k) => { const acts = [...k.querySelectorAll(":scope > a, :scope > div > a, :scope > button, :scope > details > summary, :scope > .cat-card-foot")].filter(vis); return acts.length ? acts[acts.length - 1].getBoundingClientRect().bottom - k.getBoundingClientRect().bottom : null; });
            const v = ends.filter((e) => e !== null);
            if (v.length === row.length && Math.max(...v) - Math.min(...v) > 6) out.push(`uneven card endings in ${name(box)} (${Math.round(Math.max(...v) - Math.min(...v))}px)`);
          }
        }
        document.querySelectorAll("details").forEach((d) => (d.open = true));
        // 1b. Phones: one swipe card (a tier level, a package, a tile) must fit the screen between header and contact bar.
        if (innerWidth <= 700) {
          const header = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0;
          const dock = document.querySelector(".dock-bar")?.getBoundingClientRect().height ?? 0;
          const room = innerHeight - header - dock - 16;
          for (const el of document.querySelectorAll(".tl-card, .hp-rail > .pk, .coll-tile, .atlas-card, .home-moment, .home-collection")) {
            if (!vis(el)) continue;
            const extra = el.classList.contains("tl-card") ? (document.querySelector(".tl-switch")?.getBoundingClientRect().height ?? 0) + 18 : 0;
            const h = el.getBoundingClientRect().height + extra;
            if (h > room) out.push(`${name(el)} taller than the screen (${Math.round(h)} > ${Math.round(room)})`);
          }
        }
        // 2. Form rows: controls start level.
        for (const row of document.querySelectorAll(".enquiry-row")) {
          const ctrls = [...row.querySelectorAll(":scope > .enquiry-field > input, :scope > .enquiry-field > textarea, :scope > .enquiry-field > .select-wrap")].filter(vis);
          const tops = ctrls.map((c) => Math.round(c.getBoundingClientRect().top));
          const byRow = new Map(); ctrls.forEach((c, i) => { const r = Math.round(c.parentElement.getBoundingClientRect().top / 8); (byRow.get(r) || byRow.set(r, []).get(r)).push(tops[i]); });
          for (const t of byRow.values()) if (t.length > 1 && Math.max(...t) - Math.min(...t) > 2) { out.push("form fields not level"); break; }
        }
        // 3. Caps labels should stay on one line.
        for (const el of document.querySelectorAll(".tour-kicker, .eyebrow, .cat-card-tag, .dep-status, .wl-state, .nav-count")) {
          if (!vis(el)) continue;
          // Count rendered text lines (padding and icons do not count).
          const range = document.createRange(); range.selectNodeContents(el);
          const lines = new Set([...range.getClientRects()].filter((r) => r.width > 1).map((r) => Math.round(r.top / 6))).size;
          if (lines > 1 && el.textContent.trim().length < 90) out.push(`wrapped label "${el.textContent.trim().slice(0, 30)}"`);
        }
        // 4. Clipped text in buttons, pills and selects.
        for (const el of document.querySelectorAll("button, .tour-primary, .cat-whatsapp, .wl-button, .dock-bar a, select, .tier-tabs button, .enquiry-pills button")) {
          if (!vis(el)) continue;
          if (el.scrollWidth > el.clientWidth + 2) out.push(`clipped text in ${name(el)} "${(el.innerText || el.value || "").trim().slice(0, 24)}"`);
        }
        return [...new Set(out)];
      });
      for (const i of issues) { const k = `${i}`; if (!found.has(k)) found.set(k, []); found.get(k).push(`${path}@${width}`); }
    }
    await page.close();
  }
  await browser.close();
  if (!found.size) return console.log(`${paths.length} pages × ${widths.length} widths: no alignment issues`);
  for (const [issue, where] of found) console.log(`${issue}\n    ${where.slice(0, 6).join("  ")}${where.length > 6 ? `  (+${where.length - 6})` : ""}`);
})();

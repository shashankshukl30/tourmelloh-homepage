const { chromium } = require('playwright-core');
const fs = require('node:fs');
const path = require('node:path');

const base = process.argv[2] || 'http://127.0.0.1:3108';
const output = process.argv[3] || 'evidence/performance/baseline.json';
const repeats = Number(process.env.PERF_RUNS || 3);
const profiles = [
  { name: 'mobile', width: 390, height: 844, deviceScaleFactor: 2, latency: 150, download: 375000, cpu: 4 },
  { name: 'desktop', width: 1440, height: 900, deviceScaleFactor: 1, latency: 60, download: 1250000, cpu: 1 },
];

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const report = { base, measuredAt: new Date().toISOString(), conditions: 'Fresh context and disabled cache for every run; no interaction or scrolling; 12 seconds after DOMContentLoaded.', runs: [] };
  try {
    for (const profile of profiles) for (let run = 1; run <= repeats; run++) {
      const context = await browser.newContext({ viewport: { width: profile.width, height: profile.height }, deviceScaleFactor: profile.deviceScaleFactor });
      const page = await context.newPage();
      const session = await context.newCDPSession(page);
      await session.send('Network.enable');
      await session.send('Network.setCacheDisabled', { cacheDisabled: true });
      await session.send('Network.emulateNetworkConditions', { offline: false, latency: profile.latency, downloadThroughput: profile.download, uploadThroughput: 187500 });
      await session.send('Emulation.setCPUThrottlingRate', { rate: profile.cpu });
      const requests = new Map();
      const errors = [];
      page.on('pageerror', error => errors.push(String(error)));
      session.on('Network.requestWillBeSent', event => requests.set(event.requestId, { url: event.request.url, type: event.type, priority: event.request.initialPriority, bytes: 0 }));
      session.on('Network.dataReceived', event => { const item = requests.get(event.requestId); if (item) item.bytes += event.encodedDataLength; });
      session.on('Network.responseReceived', event => { const item = requests.get(event.requestId); if (item) Object.assign(item, { status: event.response.status, cache: event.response.headers['cache-control'] || event.response.headers['Cache-Control'] }); });
      session.on('Network.loadingFinished', event => { const item = requests.get(event.requestId); if (item) Object.assign(item, { bytes: event.encodedDataLength, complete: true }); });
      await page.addInitScript(() => {
        window.__loadMetrics = { lcp: [], cls: 0, longTasks: [], firstVideoFrame: null, playing: null };
        new PerformanceObserver(list => list.getEntries().forEach(entry => window.__loadMetrics.lcp.push({ time: entry.startTime, element: entry.element?.tagName, url: entry.url }))).observe({ type: 'largest-contentful-paint', buffered: true });
        new PerformanceObserver(list => list.getEntries().forEach(entry => { if (!entry.hadRecentInput) window.__loadMetrics.cls += entry.value; })).observe({ type: 'layout-shift', buffered: true });
        new PerformanceObserver(list => list.getEntries().forEach(entry => window.__loadMetrics.longTasks.push(entry.duration))).observe({ type: 'longtask', buffered: true });
        document.addEventListener('playing', event => {
          if (!(event.target instanceof HTMLVideoElement) || window.__loadMetrics.playing !== null) return;
          window.__loadMetrics.playing = performance.now();
          event.target.requestVideoFrameCallback?.(() => { window.__loadMetrics.firstVideoFrame = performance.now(); });
        }, true);
      });
      await page.goto(base, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(12000);
      const metrics = await page.evaluate(() => ({
        ...window.__loadMetrics,
        paints: performance.getEntriesByType('paint').map(item => ({ name: item.name, time: item.startTime })),
        navigation: performance.getEntriesByType('navigation').map(item => ({ ttfb: item.responseStart, domContentLoaded: item.domContentLoadedEventEnd, loaded: item.loadEventEnd }))[0],
        resources: performance.getEntriesByType('resource').map(item => ({ url: item.name, start: item.startTime, end: item.responseEnd, transfer: item.transferSize, size: item.encodedBodySize, type: item.initiatorType })),
        video: (() => { const video = document.querySelector('video'); return video ? { src: video.currentSrc, time: video.currentTime, width: video.videoWidth, height: video.videoHeight, paused: video.paused, ready: video.readyState } : null; })(),
        overflow: document.body.scrollWidth > innerWidth,
      }));
      const result = { profile, run, ...metrics, requests: [...requests.values()], errors };
      report.runs.push(result);
      console.log(JSON.stringify({ profile: profile.name, run, fcp: metrics.paints.find(item => item.name === 'first-contentful-paint')?.time, lcp: metrics.lcp.at(-1)?.time, video: metrics.firstVideoFrame, bytes: result.requests.reduce((sum, item) => sum + item.bytes, 0) }));
      fs.mkdirSync(path.dirname(output), { recursive: true });
      fs.writeFileSync(output, JSON.stringify(report, null, 2));
      await context.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

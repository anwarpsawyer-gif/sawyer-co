// Usage: node render-carousel.js [content.json] [outDir]
// Writes slide-01.png ... slide-NN.png (1080x1350) and carousel.pdf (vector text) into outDir.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const path = require('path');
(async () => {
  const [jsonPath, outDir = 'out'] = process.argv.slice(2);
  fs.mkdirSync(outDir, { recursive: true });
  const override = jsonPath ? JSON.parse(fs.readFileSync(jsonPath, 'utf8')) : null;
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  if (override) await p.addInitScript((o) => { window.__OVERRIDE__ = o; }, override);
  await p.goto('file://' + path.resolve(__dirname, 'carousel.html'));
  await p.waitForFunction(() => window.__READY__ === true);
  const n = await p.evaluate(() => window.SLIDE_COUNT);
  for (let i = 0; i < n; i++) {
    await p.evaluate((k) => window.renderSlides(k), i);
    await p.screenshot({ path: path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`), clip: { x: 0, y: 0, width: 1080, height: 1350 } });
  }
  await p.evaluate(() => window.renderSlides());
  await p.pdf({ path: path.join(outDir, 'carousel.pdf'), width: '1080px', height: '1350px', printBackground: true, pageRanges: '' });
  await b.close();
})();

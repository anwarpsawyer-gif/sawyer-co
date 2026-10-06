// Usage: node render.js [content.json] [out.png]
// With no JSON, renders the CONTENT block at the top of reading-the-regulator.html.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const path = require('path');
(async () => {
  const [jsonPath, out = 'reading-the-regulator.png'] = process.argv.slice(2);
  const override = jsonPath ? JSON.parse(fs.readFileSync(jsonPath, 'utf8')) : null;
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  if (override) await p.addInitScript((o) => { window.__OVERRIDE__ = o; }, override);
  await p.goto('file://' + path.resolve(__dirname, 'reading-the-regulator.html'));
  await p.waitForFunction(() => window.__READY__ === true);
  await p.screenshot({ path: out, clip: { x: 0, y: 0, width: 1080, height: 1350 } });
  await b.close();
})();

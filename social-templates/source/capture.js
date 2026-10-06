const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const FPS = 30, DUR = 8;
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
  for (const f of ['post', 'story']) {
    const H = f === 'story' ? 1920 : 1350;
    fs.mkdirSync(`frames_${f}`, { recursive: true });
    const p = await b.newPage({ viewport: { width: 1080, height: H } });
    await p.goto(`file://${process.cwd()}/scene.html?format=${f}`);
    await p.evaluate(() => document.fonts.ready);
    for (let i = 0; i < FPS * DUR; i++) {
      await p.evaluate((t) => window.seek(t), (i / FPS) * 1000);
      await p.screenshot({ path: `frames_${f}/f${String(i).padStart(4, '0')}.png` });
    }
    await p.close();
  }
  await b.close();
})();

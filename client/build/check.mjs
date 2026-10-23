import { chromium } from '/home/claude/.npm-global/lib/node_modules/playwright/index.mjs';
const b = await chromium.launch();
const routes = ['/', '/services', '/services/web-development', '/work', '/tech-stack', '/reviews', '/team', '/about', '/contact', '/privacy'];
for (const [name, w, h] of [['mobile', 375, 800], ['desktop', 1280, 900]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  for (const r of routes) {
    await p.goto('file:///mnt/user-data/outputs/index.html#' + r);
    await p.waitForTimeout(250);
    const res = await p.evaluate(() => {
      const lum = c => { const [r, g, b] = c.map(v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }); return .2126 * r + .7152 * g + .0722 * b; };
      const parse = s => (s.match(/[\d.]+/g) || []).map(Number);
      const bgOf = el => { while (el) { const c = parse(getComputedStyle(el).backgroundColor); if (c.length >= 3 && (c[3] === undefined || c[3] > .5)) return c; el = el.parentElement; } return [251, 249, 246]; };
      const bad = []; const seen = new Set();
      document.querySelectorAll('main *, footer *').forEach(el => {
        if (![...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) return;
        const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) return;
        const fg = parse(cs.color), bg = bgOf(el); const L1 = lum(fg), L2 = lum(bg);
        const cr = (Math.max(L1, L2) + .05) / (Math.min(L1, L2) + .05);
        if (cr < 4.5 && !seen.has(el.className + el.textContent.slice(0, 20))) { seen.add(el.className + el.textContent.slice(0, 20)); bad.push(cr.toFixed(1) + ' ' + el.tagName + '.' + el.className + ' "' + el.textContent.trim().slice(0, 30) + '"'); }
      });
      const emo = /[\u{1F300}-\u{1FAFF}\u2600-\u27BF]/u.test(document.body.innerText);
      return { overflow: document.documentElement.scrollWidth - innerWidth, len: document.body.innerText.length, bad: bad.slice(0, 6), emo };
    });
    console.log(name, r, JSON.stringify(res));
  }
  if (errs.length) console.log('ERRORS', errs.slice(0, 3));
  if (name === 'mobile') { await p.goto('file:///mnt/user-data/outputs/index.html#/'); await p.waitForTimeout(400); await p.screenshot({ path: '/tmp/m_home.png' }); await p.click('.burger'); await p.waitForTimeout(400); await p.screenshot({ path: '/tmp/m_menu.png' }); }
  else { await p.goto('file:///mnt/user-data/outputs/index.html#/'); await p.waitForTimeout(400); await p.screenshot({ path: '/tmp/d_home.png' }); }
}
await b.close();

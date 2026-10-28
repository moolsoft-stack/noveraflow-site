import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {readLocales, renderPage} from '../scripts/build-site.mjs';
import {pages} from '../scripts/site-config.mjs';
test('home offers a same-origin web entry in all three supported languages', async () => {
 const locales = await readLocales();
 const home = pages.find(p => p.key === 'home');
 const template = await fs.readFile('index.html', 'utf8');
 for (const language of ['ko', 'en', 'ja']) {
  const html = renderPage(template, home, language, locales);
  assert.match(html, /href="\/app\/"[^>]*data-i18n="landing.nav.web"/);
  assert.ok(html.includes(locales[language].messages['landing.nav.web']));
  assert.equal((html.match(/href="\/app\/"/g) || []).length, 2);
 }
});

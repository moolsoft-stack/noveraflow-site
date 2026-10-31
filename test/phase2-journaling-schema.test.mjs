import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {readLocales} from '../scripts/build-site.mjs';

test('English application schema matches the current visible journaling introduction', async () => {
  const locales = await readLocales();
  for (const file of ['index.html', '_localized/en/home/index.html']) {
    const html = await readFile(new URL('../' + file, import.meta.url), 'utf8');
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
    const description = graph.find(item => item['@type'] === 'MobileApplication').description;
    assert.equal(description, locales.en.messages['landing.intro.copy']);
    assert.match(description, /free journaling app/);
    assert.ok(html.includes(description), 'description must be visible in the introduction too');
    assert.equal(graph.find(item => item['@type'] === 'WebPage').description, locales.en.meta.home.description);
  }
});

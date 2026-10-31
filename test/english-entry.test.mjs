import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {readLocales,renderPage} from '../scripts/build-site.mjs';
import {pages,languages} from '../scripts/site-config.mjs';

test('public localized CTAs carry language without JavaScript and describe actual web scope',async()=>{
  const locales=await readLocales();
  const home=pages.find(p=>p.key==='home');
  const template=await readFile(new URL('../index.html',import.meta.url),'utf8');
  for(const lang of languages){
    const html=renderPage(template,home,lang,locales);
    const entries=[...html.matchAll(/<a[^>]*data-web-entry[^>]*>/g)].map(m=>m[0]);
    assert.equal(entries.length,3);
    for(const entry of entries)assert.ok(entry.includes(`href="/app/?lang=${lang}"`));
  }
  assert.match(locales.en.meta.home.title,/Journaling App/);
  assert.match(locales.en.messages['landing.intro.copy'],/free journaling app/);
  assert.match(locales.en.messages['landing.web.scope'],/Google or Apple/);
  assert.match(locales.en.messages['landing.premium.note'],/not available on the web/);
  for(const lang of languages){
    for(const key of ['landing.store.status','landing.premium.note','landing.ai.copy','about.section2.copy','faq.q7.copy']){
      assert.doesNotMatch(locales[lang].messages[key],/1\.0\.61|1\.0\.80|under Apple review/);
    }
  }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import worker from '../_worker.js';
import {naverSiteVerification} from '../scripts/build-site.mjs';
import {assets} from '../scripts/preview-site.mjs';
import {pages,languages,localizedUrl} from '../scripts/site-config.mjs';

test('every public locale returns static localized content, metadata and canonical without JavaScript',async()=>{
  for (const page of pages) for (const lang of languages) {
    const response=await worker.fetch(new Request(localizedUrl(page.route,lang)),{ASSETS:assets});
    assert.equal(response.status,200,`${page.route}/${lang}`);
    assert.equal(response.headers.get('Content-Language'),lang);
    const html=await response.text();
    assert.match(html,new RegExp(`<html[^>]+lang="${lang}"`));
    assert.ok(html.includes(`href="${localizedUrl(page.route,lang)}"`));
    if(page.key==='home') {
      assert.equal(html.match(/<meta name="naver-site-verification"/g)?.length,1);
      assert.ok(html.includes(`<meta name="naver-site-verification" content="${naverSiteVerification}" />`));
    }
    const head=await worker.fetch(new Request(localizedUrl(page.route,lang),{method:'HEAD'}),{ASSETS:assets});
    assert.equal(head.status,200);assert.equal(await head.text(),'');
  }
});
test('legacy links preserve query parameters and resolve to canonical routes without loops',async()=>{
  for(const [from,to] of [['/index.html','/'],['/about.html','/about'],['/philosophy.html','/philosophy'],['/faq.html','/faq'],['/contact.html','/contact'],['/privacy.html','/privacy'],['/privacy/','/privacy'],['/terms.html','/terms'],['/account-deletion','/account-deletion/'],['/account-deletion/index.html','/account-deletion/']]) {
    const response=await worker.fetch(new Request(`https://noveraflow.com${from}?lang=ja&utm_source=old-share`),{ASSETS:assets});
    assert.equal(response.status,308);
    assert.equal(response.headers.get('location'),`https://noveraflow.com${to}?lang=ja&utm_source=old-share`);
    const target=await worker.fetch(new Request(response.headers.get('location')),{ASSETS:assets});
    assert.equal(target.status,200);
  }
});
test('unknown paths, internal paths and repository files never fall back to the homepage',async()=>{
  for(const route of ['/missing-seo-phase1','/llms.txt','/api/app/account','/api/admin/users','/admin','/backups','/_localized/ko/home/','/docs/HANDOVER_STATUS.md','/.git/config','/.env','/package.json','/scripts/site-config.mjs','/test/seo-routing.test.mjs','/assets/missing.png','/faq/missing']) {
    const response=await worker.fetch(new Request('https://noveraflow.com'+route),{ASSETS:assets});
    assert.equal(response.status,404,route);assert.equal(response.headers.get('X-Robots-Tag'),'noindex');
    assert.ok(!(await response.text()).includes('id="hero-title"'));
  }
});
test('unsupported languages and stored browser preferences cannot change the static language',async()=>{
  for(const query of ['?lang=en','?lang=zh','?lang=KO','?utm_source=share']) {
    const response=await worker.fetch(new Request('https://noveraflow.com/'+query),{ASSETS:assets});
    assert.equal(response.status,200);assert.equal(response.headers.get('Content-Language'),'en');
    assert.ok((await response.text()).includes('href="https://noveraflow.com/"'));
  }
});
test('search and training crawler strings receive the same localized public document',async()=>{
  let previous;
  for(const ua of ['OAI-SearchBot','Googlebot','bingbot','PerplexityBot','GPTBot','Mozilla/5.0']) {
    const response=await worker.fetch(new Request('https://noveraflow.com/?lang=ko',{headers:{'User-Agent':ua}}),{ASSETS:assets});
    assert.equal(response.status,200);
    const html=await response.text();
    if(previous)assert.equal(html,previous);previous=html;
  }
});
test('missing generated HTML fails closed and state-changing requests are not handled',async()=>{
  const missing=await worker.fetch(new Request('https://noveraflow.com/?lang=ja'),{ASSETS:{fetch:async()=>new Response('missing',{status:404})}});
  assert.equal(missing.status,503);assert.equal(missing.headers.get('X-Robots-Tag'),'noindex');
  const post=await worker.fetch(new Request('https://noveraflow.com/',{method:'POST'}),{ASSETS:assets});
  assert.equal(post.status,405);
});
test('decorative hero SVG and animation timing source match the preserved release baseline',async()=>{
  // Fixed digest is the SVG content of the pre-SEO homepage; copy changes cannot affect it.
  const {createHash}=await import('node:crypto');
  const home=await readFile(new URL('../index.html',import.meta.url),'utf8');
  const scenery=home.match(/<div class="land-scene"[\s\S]*?(?=<div class="hero-editorial")/)[0];
  const hash=createHash('sha256').update(scenery.replace(/\r\n/g,'\n')).digest('hex');
  assert.equal(hash,'31960546828798c614b089705becbc5e7bcef88fdc26079198d458acb4e33bfa');
});

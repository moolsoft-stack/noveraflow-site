import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {pages,artifactPath,origin} from '../scripts/site-config.mjs';
import {readLocales,renderPage} from '../scripts/build-site.mjs';
const keys=['home','features','faq'];
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
test('existing English intent pages have consistent metadata, visible FAQ schema and valid contextual links',async()=>{
  const en=(await readLocales()).en;
  for(const key of keys){
    const page=pages.find(p=>p.key===key),html=await readFile(new URL('../'+artifactPath(page,'en'),import.meta.url),'utf8');
    assert.equal((html.match(/<h1\b/g)||[]).length,1);
    assert.ok(html.includes(`<title>${escape(en.meta[key].title)}</title>`));
    assert.ok(html.includes(`<link rel="canonical" href="${origin+page.route}"`));
    assert.equal((html.match(/rel="alternate" hreflang=/g)||[]).length,4);
    const graph=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
    const node=graph.find(p=>p['@id']==='https://noveraflow.com'+page.route+'#page');
    assert.equal(node.name,en.meta[key].title);assert.equal(node.description,en.meta[key].description);
    assert.equal((html.match(/src="\/js\/conversions\.js/g)||[]).length,1);
    const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
    for(const block of html.matchAll(/<!-- english-search-guide:start -->([\s\S]*?)<!-- english-search-guide:end -->/g))for(const link of block[1].matchAll(/href="([^"]+)"/g)){
      const url=new URL(link[1],origin+page.route);
      if(url.pathname==='/app/'){assert.equal(url.searchParams.get('lang'),'en');continue;}
      const target=pages.find(p=>p.route===url.pathname);assert.ok(target,'known public destination '+url.pathname);
      if(url.hash){const other=await readFile(new URL('../'+artifactPath(target,'en'),import.meta.url),'utf8');assert.ok(other.includes(`id="${url.hash.slice(1)}"`),'existing fragment '+url.href);}
    }
    if(key==='faq'){
      assert.equal(node['@type'],'FAQPage');assert.equal(node.mainEntity.length,12);
      for(let i=1;i<=12;i++){assert.equal(node.mainEntity[i-1].name,en.messages[`faq.q${i}.title`]);assert.equal(node.mainEntity[i-1].acceptedAnswer.text,en.messages[`faq.q${i}.copy`]);assert.ok(html.includes(escape(node.mainEntity[i-1].acceptedAnswer.text)));}
    }
  }
});
test('English guide and new conversion script do not leak into Korean or Japanese templates',async()=>{
  const locales=await readLocales();
  for(const key of keys){const page=pages.find(p=>p.key===key),template=await readFile(new URL('../'+page.source,import.meta.url),'utf8');
    for(const lang of ['ko','ja']){const html=renderPage(template,page,lang,locales);assert.ok(!html.includes('english-search-guide:start'));assert.ok(!html.includes('A small reflection you can return to'));if(key!=='home')assert.ok(!html.includes('/js/conversions.js'));}
    const first=renderPage(template,page,'en',locales),second=renderPage(first,page,'en',locales);assert.equal((first.match(/english-search-guide:start/g)||[]).length,1);assert.equal((second.match(/english-search-guide:start/g)||[]).length,1);
  }
});

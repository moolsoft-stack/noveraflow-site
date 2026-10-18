import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {pages,languages,origin,localizedUrl} from './site-config.mjs';
import {startPreview} from './preview-site.mjs';

const server=process.env.SITE_CHECK_BASE ? null : await startPreview();
const base=process.env.SITE_CHECK_BASE || `http://127.0.0.1:${server.address().port}`;
const checks=[];
const local=url=>url.replace(origin,base);
try {
  const resources=new Set();
  for(const page of pages)for(const language of languages) {
    const url=localizedUrl(page.route,language);
    const response=await fetch(local(url),{redirect:'manual'});
    assert.equal(response.status,200,url);assert.equal(response.headers.get('content-language'),language);
    const html=await response.text();
    assert.ok(html.includes(`<link rel="canonical" href="${url}" />`));
    assert.equal(JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@context'],'https://schema.org');
    for(const match of html.matchAll(/(?:href|src)="(\/[^"#]*)"/g))resources.add(match[1].replace(/&amp;/g,'&'));
    const head=await fetch(local(url),{method:'HEAD',redirect:'manual'});assert.equal(head.status,200);assert.equal(await head.text(),'');
    checks.push({url,status:response.status,language});
  }
  for(const resource of resources) {
    const response=await fetch(base+resource,{redirect:'manual'});
    assert.equal(response.status,200,resource+' linked resource must be canonical and available');
    await response.arrayBuffer();
  }
  for(const from of ['/about.html','/philosophy.html','/faq.html','/contact.html','/privacy.html','/terms.html','/account-deletion','/index.html']) {
    const response=await fetch(base+from+'?lang=ko&utm_source=legacy',{redirect:'manual'});assert.equal(response.status,308);
    const target=new URL(response.headers.get('location'));assert.equal(target.search,'?lang=ko&utm_source=legacy');
    assert.equal((await fetch(target,{redirect:'manual'})).status,200);
  }
  for(const route of ['/missing-seo-phase1','/llms.txt','/api/app/diary','/api/admin/users','/admin','/backup','/_localized/en/home/','/docs/HANDOVER_STATUS.md','/.git/config','/.env','/package.json','/assets/missing.png']) {
    const response=await fetch(base+route,{redirect:'manual'});assert.equal(response.status,404,route);assert.equal(response.headers.get('x-robots-tag'),'noindex');
  }
  for(const ua of ['OAI-SearchBot','Googlebot','bingbot','PerplexityBot','GPTBot']) {
    const response=await fetch(base+'/?lang=ja',{headers:{'user-agent':ua}});assert.equal(response.status,200);assert.equal(response.headers.get('content-language'),'ja');
  }
  const result={base,status:'PASS',documents:checks,linkedResources:resources.size,legacyRedirects:8,notFound:12,botStrings:5};
  if(process.env.SITE_CHECK_HTTP_OUTPUT)await writeFile(process.env.SITE_CHECK_HTTP_OUTPUT,JSON.stringify(result,null,2));
  console.log(JSON.stringify(result,null,2));
} finally {if(server)await new Promise(resolve=>server.close(resolve));}

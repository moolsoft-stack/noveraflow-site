import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../_worker.js';
const request=path=>new Request(`https://noveraflow.com${path}`);
test('app routing default OFF does not fetch assets',async()=>{
  const r=await worker.fetch(request('/app/'),{});
  assert.equal(r.status,503);assert.equal(r.headers.get('X-Robots-Tag'),'noindex, nofollow');
});
test('enabled direct/reload/callback route and assets stay in /app with noindex',async()=>{
  const fetched=[];const env={WEB_APP_ENABLED:'true',ASSETS:{fetch:async r=>{
    fetched.push(new URL(r.url).pathname);return new Response('fixture app',{status:200});
  }}};
  for(const path of ['/app/','/app/auth/callback?code=fixture','/app/records']){
    const r=await worker.fetch(request(path),env);assert.equal(r.status,200);
    assert.equal(fetched.at(-1),'/app/index.html');assert.equal(r.headers.get('Cache-Control'),'no-store');
    assert.equal(r.headers.get('X-Robots-Tag'),'noindex, nofollow');
  }
  const r=await worker.fetch(request('/app'),env);assert.equal(r.status,308);
  assert.equal(r.headers.get('Location'),'https://noveraflow.com/app/');
  await worker.fetch(request('/app/main.dart.js'),env);assert.equal(fetched.at(-1),'/app/main.dart.js');
});
test('existing home and sitemap routing unchanged by app gate',async()=>{
  const fetched=[];const env={ASSETS:{fetch:async r=>{
    fetched.push(new URL(r.url).pathname);return new Response('existing fixture',{status:200});
  }}};
  assert.equal((await worker.fetch(request('/?lang=ko'),env)).status,200);
  assert.equal(fetched.at(-1),'/_localized/ko/home/');
  await worker.fetch(request('/sitemap.xml'),env);assert.equal(fetched.at(-1),'/sitemap.xml');
});

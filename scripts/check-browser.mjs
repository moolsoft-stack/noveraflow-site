import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {pages,languages,localizedUrl} from './site-config.mjs';
import {startPreview} from './preview-site.mjs';

// Use an existing Playwright installation; no browser or production action is installed by this script.
const modulePath=process.env.PLAYWRIGHT_MODULE_PATH;
const {chromium,webkit}=await import(modulePath ? pathToFileURL(modulePath).href : 'playwright');
const server=process.env.SITE_CHECK_BASE ? null : await startPreview();
const base=process.env.SITE_CHECK_BASE || `http://127.0.0.1:${server.address().port}`;
const output=path.resolve(process.env.SITE_CHECK_OUTPUT || '../tmp/seo-phase1-20261018/browser');
await fs.mkdir(output,{recursive:true});
const results=[];
const inspect=()=>{
  const h=document.querySelector('#hero-title');
  const rect=h.getBoundingClientRect();
  const hero=document.querySelector('.land-hero');
  const header=document.querySelector('.site-header').getBoundingClientRect();
  const content=document.querySelector('.hero-editorial').getBoundingClientRect();
  const bottom=document.querySelector('.hero-bottom').getBoundingClientRect();
  const mobile=matchMedia('(max-width:640px)').matches;
  const scene=document.querySelector('.land-scene');
  return {top:rect.top+scrollY,scroll:scrollY,overflow:document.documentElement.scrollWidth>innerWidth+1,
    headerClear:rect.top>=header.bottom+8 || scrollY>0,controlsClear:content.bottom<=bottom.top+1,
    heroOverflow:getComputedStyle(hero).overflow,scenePaused:scene.classList.contains('page-hidden'),
    scene:document.documentElement.dataset.scene,motion:document.documentElement.dataset.motion,
    activeSvg:getComputedStyle(document.querySelector('.scene-'+document.documentElement.dataset.scene.toLowerCase())).display,
    inactiveSvg:getComputedStyle(document.querySelector('.scene-'+(document.documentElement.dataset.scene==='A'?'b':'a'))).display,
    mobile,running:document.getAnimations().filter(a=>a.playState==='running').length,
    lang:document.documentElement.lang,title:document.title,canonical:document.querySelector('[rel=canonical]').href};
};
const browsers=[];
try {
  const chrome=await chromium.launch({headless:true,...(process.env.CHROME_EXECUTABLE ? {executablePath:process.env.CHROME_EXECUTABLE}:{})});
  const safari=await webkit.launch({headless:true});browsers.push(chrome,safari);
  // Existing help is tested with fixture responses, never real feedback writes.
  async function setup(context) {
    await context.route('**/api/public/support-faq**',route=>route.fulfill({contentType:'application/json',body:'{"items":[]}'}));
  }
  for(const [engine,browser,profiles] of [
    ['chrome',chrome,[['android',411,756,true],['narrow',320,568,true],['desktop',1440,1000,false]]],
    ['webkit',safari,[['mini',375,812,true],['iphone',390,844,true],['large',440,956,true]]],
  ]) for(const [profile,width,height,mobile] of profiles) {
    const context=await browser.newContext({viewport:{width,height},isMobile:mobile,hasTouch:mobile,deviceScaleFactor:1});
    await setup(context);
    const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
    for(const lang of languages) {
      await page.goto(base+'/?lang='+lang);await page.evaluate(()=>document.fonts.ready);
      for(const scene of ['A','B']) {
        await page.evaluate(scene=>window.NoveraFlowScene.select(scene),scene);await page.waitForTimeout(100);
        const initial=await page.evaluate(inspect);const tag=`${engine}-${profile}-${lang}-${scene}`;
        assert.equal(initial.lang,lang,tag);assert.equal(initial.overflow,false,tag+' horizontal overflow');
        assert.ok(initial.headerClear && initial.controlsClear,tag+' overlap');assert.ok(initial.running>0,tag+' animation');
        assert.equal(initial.scene,scene);
        for(const card of await page.locator('.product-facts-art').evaluateAll(nodes=>nodes.map(node=>({height:node.clientHeight,scroll:node.scrollHeight,width:node.clientWidth,scrollWidth:node.scrollWidth})))) {
          assert.ok(card.scroll<=card.height+1 && card.scrollWidth<=card.width+1,tag+' product card clipping');
        }
        if(mobile){assert.equal(initial.heroOverflow,'visible');assert.equal(initial.inactiveSvg,'none');}
        for(let i=0;i<4;i++) {
          await page.evaluate(()=>scrollTo({top:1100,behavior:'instant'}));await page.waitForTimeout(25);
          await page.setViewportSize({width,height:height-100});
          await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
          await page.setViewportSize({width,height});await page.waitForTimeout(30);
          const after=await page.evaluate(inspect);
          assert.ok(Math.abs(after.top-initial.top)<1,tag+' title drift');
          assert.equal(after.overflow,false);if(mobile)assert.equal(after.scenePaused,false);
        }
        if(profile==='android'||profile==='desktop'||profile==='mini')await page.screenshot({path:path.join(output,tag+'.png'),fullPage:true});
        results.push({tag,status:'PASS',...initial});
      }
    }
    assert.deepEqual(errors,[],`${engine}/${profile} browser errors`);await context.close();
  }
  console.log('36 language/scene/viewport cases passed. Checking all public pages with and without JavaScript.');
  for(const js of [false,true]) {
    const context=await chrome.newContext({javaScriptEnabled:js,viewport:{width:390,height:844}});await setup(context);
    const page=await context.newPage();
    for(const route of pages)for(const lang of languages) {
      const publicUrl=localizedUrl(route.route,lang);const response=await page.goto(publicUrl.replace('https://noveraflow.com',base));
      assert.equal(response.status(),200,publicUrl);assert.equal(await page.locator('html').getAttribute('lang'),lang);
      assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),publicUrl);
      assert.equal(await page.locator('h1:visible').count(),1,publicUrl);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,publicUrl+' overflow');
      if(route.key==='home')assert.ok((await page.locator('.intro-strip').innerText()).includes('NoveraFlow'));
      if(route.key==='faq')assert.equal(await page.locator('.content-body > h2').count(),12);
    }
    // Native links work with JavaScript disabled and storage preferences cannot override a shared URL.
    await page.goto(base+'/?lang=ja');await page.locator('[data-locale=ko]').click();
    assert.equal(await page.locator('html').getAttribute('lang'),'ko');
    if(js){await page.evaluate(()=>localStorage.setItem('noveraflow.locale','ja'));await page.goto(base+'/?lang=ko');assert.equal(await page.locator('html').getAttribute('lang'),'ko');}
    if(js)for(const query of ['?lang=KO','?lang=zh','?lang=ko-KR']) {
      await page.goto(base+'/'+query);assert.equal(await page.locator('html').getAttribute('lang'),'en');
    }
    await context.close();
  }
  const context=await chrome.newContext({viewport:{width:411,height:756},isMobile:true,hasTouch:true});await setup(context);
  const page=await context.newPage();await page.goto(base+'/?lang=ko');
  const before=await page.evaluate(inspect);
  await page.locator('[data-motion-toggle]').click();assert.equal((await page.evaluate(inspect)).motion,'off');
  await page.locator('[data-motion-toggle]').click();assert.equal((await page.evaluate(inspect)).motion,'on');
  await context.close();
  const desktop=await chrome.newContext({viewport:{width:1440,height:1000}});await setup(desktop);
  const desktopPage=await desktop.newPage();await desktopPage.goto(base+'/');
  await desktopPage.mouse.move(1100,300);await desktopPage.waitForTimeout(100);
  assert.notEqual(await desktopPage.locator('.land-scene').evaluate(el=>el.style.getPropertyValue('--pointer-x')),'0.000');
  await desktopPage.evaluate(()=>scrollTo({top:1200,behavior:'instant'}));await desktopPage.waitForTimeout(150);
  assert.equal(await desktopPage.locator('.land-scene').evaluate(el=>el.classList.contains('page-hidden')),true);
  await desktop.close();
  for(const mode of ['storage-blocked','save-data']) {
    const limited=await chrome.newContext({viewport:{width:390,height:844}});await setup(limited);
    await limited.addInitScript(mode=>{
      if(mode==='storage-blocked')Object.defineProperty(window,'localStorage',{get(){throw Error('Storage blocked');}});
      else Object.defineProperty(navigator,'connection',{value:{saveData:true}});
    },mode);
    const limitedPage=await limited.newPage();const errors=[];limitedPage.on('pageerror',error=>errors.push(error.message));
    await limitedPage.goto(base+'/?lang=ja');assert.equal(await limitedPage.locator('html').getAttribute('lang'),'ja');
    if(mode==='save-data')assert.equal((await limitedPage.evaluate(inspect)).motion,'off');
    assert.deepEqual(errors,[]);await limited.close();
  }
  const reduced=await chrome.newContext({reducedMotion:'reduce',viewport:{width:390,height:844}});await setup(reduced);
  const reducedPage=await reduced.newPage();await reducedPage.goto(base+'/');assert.equal((await reducedPage.evaluate(inspect)).motion,'off');await reduced.close();
  // XML parsing supplements the route/metadata checks; this catches malformed sitemap entities.
  const xmlContext=await chrome.newContext();const xmlPage=await xmlContext.newPage();await xmlPage.goto(base+'/');
  const xml=await xmlPage.evaluate(async()=>{const text=await(await fetch('/sitemap.xml')).text();const doc=new DOMParser().parseFromString(text,'application/xml');return {errors:doc.querySelectorAll('parsererror').length,urls:doc.querySelectorAll('url').length};});
  assert.deepEqual(xml,{errors:0,urls:24});await xmlContext.close();
  if(process.env.SITE_CHECK_SOAK==='1') {
    const held=await chrome.newContext({viewport:{width:411,height:756},isMobile:true,hasTouch:true});await setup(held);
    const tabs=[];
    for(const lang of languages)for(const scene of ['A','B']) {
      const page=await held.newPage();await page.goto(base+'/?lang='+lang);await page.evaluate(scene=>window.NoveraFlowScene.select(scene),scene);
      tabs.push({page,lang,scene,initial:await page.evaluate(inspect)});
    }
    for(let cycle=1;cycle<=4;cycle++) {
      await new Promise(resolve=>setTimeout(resolve,30000));
      for(const tab of tabs) {
        await tab.page.evaluate(()=>scrollTo({top:1100,behavior:'instant'}));await tab.page.setViewportSize({width:411,height:812});
        await tab.page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await tab.page.setViewportSize({width:411,height:756});
        const current=await tab.page.evaluate(inspect);
        assert.ok(Math.abs(current.top-tab.initial.top)<1,`soak/${tab.lang}/${tab.scene} drift`);
        assert.equal(current.scenePaused,false);assert.equal(current.overflow,false);
      }
      console.log(`Soak: six language/scene tabs passed ${cycle*30}s and viewport/scroll cycle ${cycle}.`);
    }
    for(const tab of tabs)await tab.page.screenshot({path:path.join(output,`soak-${tab.lang}-${tab.scene}.png`)});
    await held.close();
  }
  await fs.writeFile(path.join(output,'results.json'),JSON.stringify({base,results,publicPages:48,soak:process.env.SITE_CHECK_SOAK==='1',xml,status:'PASS'},null,2));
  console.log(`PASS: 36 scene cases, 48 JS/no-JS locale page visits, navigation, motion controls, reduced motion, sitemap XML. Evidence: ${output}`);
} finally {
  await Promise.all(browsers.map(browser=>browser.close()));
  if(server)await new Promise(resolve=>server.close(resolve));
}

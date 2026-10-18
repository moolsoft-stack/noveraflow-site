import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {pages,languages,origin,localizedUrl,artifactPath,stores} from './site-config.mjs';
import {root,readLocales,renderPage} from './build-site.mjs';
import path from 'node:path';

const read = relative => readFile(path.join(root,relative),'utf8');
export async function verifySeo() {
  const sitemap = await read('sitemap.xml');
  const locales = await readLocales();
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
  const expected = pages.flatMap(page=>languages.map(lang=>localizedUrl(page.route,lang)));
  assert.deepEqual([...locations].sort(),[...expected].sort(),'sitemap contains exactly 24 canonical URLs');
  assert.equal(new Set(locations).size,24);
  for (const page of pages) for (const language of languages) {
    const html = await read(artifactPath(page,language));
    const url = localizedUrl(page.route,language);
    const prefix = `${page.key}/${language}`;
    assert.equal(html,renderPage(await read(page.source),page,language,locales),prefix+' generated output is current and deterministic');
    assert.ok(html.includes(`lang="${language}"`),prefix+' lang');
    assert.equal(html.match(/<link rel="canonical"/g)?.length,1,prefix+' one canonical');
    assert.ok(html.includes(`<link rel="canonical" href="${url}" />`),prefix+' canonical');
    assert.ok(html.includes(`<meta property="og:url" content="${url}" />`),prefix+' og:url');
    assert.ok(html.includes(`<meta property="og:locale" content="${locales[language].meta[page.key].locale}"`));
    for (const alternate of [...languages,'x-default']) {
      const href = localizedUrl(page.route,alternate==='x-default'?'en':alternate);
      assert.ok(html.includes(`<link rel="alternate" hreflang="${alternate}" href="${href}" />`),prefix+' reciprocal hreflang');
      assert.ok(sitemap.includes(`hreflang="${alternate}" href="${href}"`));
    }
    assert.equal(html.match(/<title>/g)?.length,1);
    assert.equal(html.match(/<h1\b/g)?.length,1,prefix+' one h1');
    assert.ok(!/noindex/.test(html),prefix+' indexable');
    const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    assert.equal(scripts.length,1,prefix+' single JSON-LD graph');
    const graph = JSON.parse(scripts[0][1]);
    assert.equal(graph['@context'],'https://schema.org');
    assert.ok(!/aggregateRating|ratingValue|reviewCount|downloadCount|award|"offers"/.test(scripts[0][1]),prefix+' no unsupported claims');
    const pageNode = graph['@graph'].find(node=>node['@id']===url+'#page');
    assert.equal(pageNode.inLanguage,language);
    const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/<svg\b[\s\S]*?<\/svg>/g,'');
    if (page.key==='home') {
      assert.ok(visible.includes(locales[language].messages['landing.intro.copy']));
      assert.ok(!html.includes('data-screen="5_p"'),prefix+' misleading annual screenshot removed');
      assert.ok(!html.includes('data-screen="2_m"'),prefix+' unreleased conversation screenshot removed from mood description');
      const app = graph['@graph'].find(node=>node['@type']==='MobileApplication');
      assert.deepEqual(app.installUrl,stores);
      assert.ok(!/yearly|annual|연간|年間/.test(app.featureList.join(' ')),prefix+' public feature list');
    }
    if (page.key==='faq') {
      assert.equal(pageNode.mainEntity.length,12);
      for (const question of pageNode.mainEntity) {
        const escape = value=>value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
        assert.ok(visible.includes(escape(question.name)) && visible.includes(escape(question.acceptedAnswer.text)),prefix+' FAQ matches visible copy');
      }
    }
    for (const key of [...html.matchAll(/data-i18n="([^"]+)"/g)].map(m=>m[1])) {
      for (const lang of languages) assert.ok(key in locales[lang].messages,`missing key ${key}/${lang}`);
    }
    for (const img of html.matchAll(/<img\b[^>]*>/g)) assert.ok(/alt="[^"]*"/.test(img[0]),prefix+' image alt');
    assert.ok(!/\/api\/(?:app|admin)|SUPABASE_(?:SECRET|SERVICE)|service_role|-----BEGIN .*PRIVATE KEY/.test(html),prefix+' no private data or endpoints');
  }
  assert.equal((await read('robots.txt')).replace(/\r\n/g,'\n'),'User-agent: *\nAllow: /\n\nSitemap: https://noveraflow.com/sitemap.xml\n');
}

import {readFile, writeFile, mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import vm from 'node:vm';
import {origin, languages, pages, localizedUrl, artifactPath, stores} from './site-config.mjs';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const escape = value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export async function readLocales() {
  const context = {document: {documentElement: {dataset: {}}, addEventListener() {}},
    window: {location: {search: ''}, localStorage: {getItem() {}}}, navigator: {language: 'en'}, URLSearchParams};
  vm.runInNewContext(await readFile(path.join(root, 'js/i18n.js'), 'utf8'), context);
  return context.window.NoveraFlowI18n.locales;
}

function metadata(html, name, value, property = false) {
  const attr = property ? 'property' : 'name';
  const pattern = new RegExp(`<meta\\s+${attr}="${name}"[^>]*>`, 'g');
  const tag = `<meta ${attr}="${name}" content="${escape(value)}" />`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
}

export function renderPage(template, page, language, locales, {preserveLocales = false} = {}) {
  const copy = locales[language];
  const meta = copy.meta[page.key];
  if (!meta) throw Error(`Missing metadata: ${page.key}/${language}`);
  const url = localizedUrl(page.route, language);
  let html = template.replace(/(<html\b[^>]*\blang=)"[^"]*"/, `$1"${language}"`)
    .replace(/data-default-locale="[^"]*"/, `data-default-locale="${language}"`)
    .replace(/data-site-url="[^"]*"/g, `data-site-url="${url}"`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(meta.title)}</title>`)
    .replace(/<link rel="canonical"[^>]*>/g, `<link rel="canonical" href="${escape(url)}" />`)
    .replace(/\s*<link rel="alternate"[^>]*>/g, '');
  if (page.key === 'accountDeletion' && !preserveLocales) {
    html = html.replace(/<article class="locale-copy locale-copy-(en|ko|ja)"[\s\S]*?<\/article>/g, (article, lang)=>lang===language ? article : '');
    html = html.replace(/^[ \t]+$/gm, '');
  }
  const alternates = [...languages, 'x-default'].map(lang => `<link rel="alternate" hreflang="${lang}" href="${escape(localizedUrl(page.route, lang === 'x-default' ? 'en' : lang))}" />`).join('\n    ');
  html = html.replace('</head>', `    ${alternates}\n  </head>`);
  // These elements contain translated text only; decorative SVG trees are untouched.
  html = html.replace(/(<([a-z][a-z0-9-]*)\b[^>]*data-i18n="([^"]+)"[^>]*>)[\s\S]*?(<\/\2>)/g,
    (_, open, tag, key, close) => {
      if (!(key in copy.messages)) throw Error(`Missing ${language} translation: ${key}`);
      return open + escape(copy.messages[key]) + close;
    });
  html = html.replace(/<[^>]+data-i18n-(?:aria-label|title)="[^"]+"[^>]*>/g, tag => {
    for (const attr of ['aria-label', 'title']) {
      const key = tag.match(new RegExp(`data-i18n-${attr}="([^"]+)"`))?.[1];
      if (!key) continue;
      if (!(key in copy.messages)) throw Error(`Missing ${language} translation: ${key}`);
      const pattern = new RegExp(`(?<!data-i18n-)${attr}="[^"]*"`);
      tag = pattern.test(tag) ? tag.replace(pattern, `${attr}="${escape(copy.messages[key])}"`) : tag.replace(/>$/, ` ${attr}="${escape(copy.messages[key])}">`);
    }
    return tag;
  });
  html = html.replace(/<button\b([^>]*\bdata-locale="(ko|en|ja)"[^>]*)>([\s\S]*?)<\/button>/g,
    (_, attrs, lang, text) => `<a${attrs.replace(/\s*type="button"/g, '').replace(/\s*aria-pressed="[^"]*"/g, '')} href="${escape(localizedUrl(page.route, lang).replace(origin, ''))}" hreflang="${lang}"${language === lang ? ' aria-current="page"' : ''}>${text}</a>`);
  // Existing source files remain usable as English fallbacks; all links use final URLs.
  html = html.replace(/href="(\/(?:index\.html|about(?:\.html)?|philosophy(?:\.html)?|faq(?:\.html)?|contact(?:\.html)?|privacy(?:\.html|\/)?|terms(?:\.html)?|account-deletion\/?|))(?:\?lang=(?:en|ko|ja))?"/g, (whole, route) => {
    const normalized = route.replace(/index\.html$/, '').replace(/\.html$/, '').replace(/\/$/, '') || '/';
    const target = pages.find(p => p.route.replace(/\/$/, '') === normalized.replace(/\/$/, ''));
    return target ? `href="${escape(localizedUrl(target.route, language).replace(origin, ''))}"` : whole;
  });
  // Reapply language-switch links after ordinary internal-link localization.
  html = html.replace(/<a\b[^>]*\bdata-locale="(ko|en|ja)"[^>]*>/g, (tag, lang) => tag.replace(/href="[^"]*"/, `href="${escape(localizedUrl(page.route, lang).replace(origin, ''))}"`));
  html = html.replace(/<a\b[^>]*\bdata-locale="(ko|en|ja)"[^>]*>/g, (tag, lang) => {
    tag = tag.replace(/\s*(?:aria-current|class)="[^"]*"/g, '');
    return tag.replace(/>$/, lang === language ? ' class="is-active" aria-current="page">' : '>');
  });
  html = html.replace(/<img\b[^>]*data-screen="([^"]+)"[^>]*>/g, (tag, screen) => tag.replace(/src="[^"]*"/, `src="/assets/landing/${language}-${screen}-v20261017.webp"`).replace(/alt="[^"]*"/, `alt="${escape(copy.messages[`landing.screen.${screen}`])}"`));
  html = html.replace(/alt="NoveraFlow official mark"/g, `alt="${escape({en:'NoveraFlow official mark',ko:'NoveraFlow 공식 로고',ja:'NoveraFlow公式ロゴ'}[language])}"`);
  html = html.replace(/href="css\//g, 'href="/css/').replace(/\/js\/i18n\.js\?v=[^"]+/g, '/js/i18n.js?v=20261018a').replace(/\/js\/landing\.js\?v=[^"]+/g, '/js/landing.js?v=20261018a').replace(/\/css\/styles\.css(?:\?v=[^"]*)?/g, '/css/styles.css?v=20261018a').replace(/\/css\/landing\.css\?v=[^"]+/g, '/css/landing.css?v=20261018a');
  for (const [name, value, property] of [
    ['description',meta.description], ['og:title',meta.ogTitle || meta.title,true], ['og:description',meta.ogDescription || meta.description,true],
    ['og:url',url,true], ['og:locale',meta.locale,true], ['twitter:card','summary_large_image'],
    ['twitter:title',meta.twitterTitle || meta.title], ['twitter:description',meta.twitterDescription || meta.description],
    ['twitter:image',`${origin}/assets/landing/og-v20261017.png`],
    ['og:image:alt',copy.messages['common.brand.home'],true], ['twitter:image:alt',copy.messages['common.brand.home']],
  ]) html = metadata(html, name, value, property);
  html = html.replace(/\s*<meta property="og:locale:alternate"[^>]*>/g, '');
  html = html.replace('</head>', languages.filter(lang=>lang!==language).map(lang=>`    <meta property="og:locale:alternate" content="${locales[lang].meta[page.key].locale}" />\n`).join('')+'  </head>');
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, '');
  const graph = [
    {'@type':'Organization', '@id':`${origin}/#organization`, name:'moolsoft', alternateName:'NoveraFlow', url:origin+'/', logo:`${origin}/assets/landing/icon-1024-v20261017.png`},
    {'@type':'WebSite', '@id':`${origin}/#website`, name:'NoveraFlow', url:origin+'/', inLanguage:languages, publisher:{'@id':`${origin}/#organization`}},
    {'@type':page.key==='about'?'AboutPage':page.key==='contact'?'ContactPage':'WebPage', '@id':url+'#page', url, name:meta.title, description:meta.description, inLanguage:language, isPartOf:{'@id':`${origin}/#website`}},
  ];
  if (page.key === 'home') graph.push({
    '@type':'MobileApplication', '@id':`${origin}/#app`, name:'NoveraFlow', url, description:copy.messages['faq.q1.copy'],
    applicationCategory:'LifestyleApplication', operatingSystem:['Android','iOS'], inLanguage:languages,
    publisher:{'@id':`${origin}/#organization`}, installUrl:stores,
    featureList:[copy.messages['features.record.copy'],copy.messages['features.feedback.copy'],copy.messages['features.backup.copy']],
  });
  if (page.key === 'faq') {
    graph[2]['@type'] = 'FAQPage';
    graph[2].mainEntity = Array.from({length:12},(_,i)=>({'@type':'Question',name:copy.messages[`faq.q${i+1}.title`],acceptedAnswer:{'@type':'Answer',text:copy.messages[`faq.q${i+1}.copy`]}}));
  }
  if (page.key !== 'home') {
    const crumbs = {'@type':'BreadcrumbList','@id':url+'#breadcrumbs',itemListElement:[
      {'@type':'ListItem',position:1,name:copy.messages['common.nav.home'],item:localizedUrl('/',language)},
      {'@type':'ListItem',position:2,name:meta.title,item:url},
    ]};
    graph.push(crumbs);
    const nav = `<nav class="breadcrumbs" aria-label="${escape({en:'Breadcrumb',ko:'현재 위치',ja:'現在位置'}[language])}"><a href="${escape(localizedUrl('/',language).replace(origin,''))}">${escape(copy.messages['common.nav.home'])}</a><span aria-hidden="true"> / </span><span>${escape(meta.title)}</span></nav>`;
    html = html.replace(/(<main\b[^>]*>)\s*(?:<nav class="breadcrumbs"[\s\S]*?<\/nav>)?/, '$1\n      '+nav);
  }
  html = html.replace('</head>', `    <script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph}).replace(/</g,'\\u003c')}</script>\n  </head>`);
  return html;
}

export async function buildSite() {
  const locales = await readLocales();
  for (const page of pages) {
    const sourcePath = path.join(root,page.source);
    const template = await readFile(sourcePath,'utf8');
    for (const language of languages) {
      const output = path.join(root, artifactPath(page,language));
      await mkdir(path.dirname(output),{recursive:true});
      await writeFile(output,renderPage(template,page,language,locales));
    }
    const english = renderPage(template,page,'en',locales,{preserveLocales:true});
    await writeFile(sourcePath,english);
    if (page.key === 'privacy') await writeFile(path.join(root,'privacy.html'),english);
  }
  const entries = pages.flatMap(page=>languages.map(lang=>`  <url>\n    <loc>${escape(localizedUrl(page.route,lang))}</loc>\n${[...languages,'x-default'].map(other=>`    <xhtml:link rel="alternate" hreflang="${other}" href="${escape(localizedUrl(page.route,other==='x-default'?'en':other))}" />`).join('\n')}\n  </url>`));
  await writeFile(path.join(root,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`);
  process.stdout.write('Generated 24 localized HTML documents and canonical sitemap.\n');
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await buildSite();

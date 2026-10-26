// Cloudflare Pages advanced mode: serve prebuilt HTML for the existing ?lang URLs.
// No API proxy, credentials, account data or UA-specific rendering belongs here.
const routes = new Map([
  ['/', 'home'], ['/about', 'about'], ['/philosophy', 'features'], ['/faq', 'faq'],
  ['/contact', 'contact'], ['/privacy', 'privacy'], ['/terms', 'terms'], ['/account-deletion/', 'accountDeletion'],
]);
const files = new Set(['/robots.txt', '/sitemap.xml', '/site.webmanifest',
  '/css/styles.css', '/css/brand.css', '/css/landing.css',
  '/js/i18n.js', '/js/main.js', '/js/landing.js', '/js/landing-init.js', '/js/support-faq.js', '/js/contact.js']);
const aliases = new Map([
  ['/index.html', '/'], ['/privacy/index.html', '/privacy'],
  ['/account-deletion', '/account-deletion/'], ['/account-deletion/index.html', '/account-deletion/'],
  ...['about', 'philosophy', 'faq', 'contact', 'privacy', 'terms'].flatMap(name=>[[`/${name}.html`,`/${name}`],[`/${name}/`,`/${name}`]]),
]);
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!['GET', 'HEAD'].includes(request.method)) return new Response(null, {status:405,headers:{Allow:'GET, HEAD'}});
    // Separate app gate, default OFF. No API proxy or credentials in this worker.
    if (url.pathname === '/app' || url.pathname.startsWith('/app/')) {
      const headers = {'X-Robots-Tag':'noindex, nofollow', 'Cache-Control':'no-store', 'X-Content-Type-Options':'nosniff'};
      if (env.WEB_APP_ENABLED !== 'true') return new Response(request.method === 'HEAD' ? null : 'Web app unavailable', {status:503,headers});
      if (url.pathname === '/app') {
        url.pathname = '/app/';
        return new Response(null,{status:308,headers:{...headers,Location:url.toString()}});
      }
      if (/%2f|%5c/i.test(url.pathname)) return new Response(null,{status:404,headers});
      const assetUrl = new URL(url);
      // Flutter base href must be /app/. Deep links/callbacks return only app HTML.
      if (!/^\/app\/(assets|canvaskit|icons)\//.test(url.pathname) && !url.pathname.split('/').at(-1).includes('.')) assetUrl.pathname = '/app/index.html';
      assetUrl.search = '';
      const asset = await env.ASSETS.fetch(new Request(assetUrl,{method:'GET'}));
      const responseHeaders = new Headers(asset.headers);
      for (const [name,value] of Object.entries(headers)) responseHeaders.set(name,value);
      return new Response(request.method === 'HEAD' ? null : asset.body,{status:asset.status,headers:responseHeaders});
    }
    if (aliases.has(url.pathname)) {
      url.pathname = aliases.get(url.pathname);
      return Response.redirect(url.toString(), 308);
    }
    const page = routes.get(url.pathname);
    const language = ['en','ko','ja'].includes(url.searchParams.get('lang')) ? url.searchParams.get('lang') : 'en';
    const assetUrl = new URL(request.url);
    let notFound = false;
    if (page) {
      assetUrl.pathname = `/_localized/${language}/${page}/`;
      assetUrl.search = '';
    } else if (!files.has(url.pathname) && !/^\/assets\/(?:landing\/)?[a-zA-Z0-9_.-]+\.(?:png|webp|svg)$/.test(url.pathname)) {
      assetUrl.pathname = '/404.html';
      assetUrl.search = '';
      notFound = true;
    }
    const asset = await env.ASSETS.fetch(new Request(assetUrl, {method:'GET'}));
    const headers = new Headers(asset.headers);
    headers.set('X-Content-Type-Options','nosniff');
    if (page) {
      // A missing generated document must fail visibly instead of becoming a soft 404.
      if (asset.status !== 200) return new Response('Localized page unavailable', {status:503,headers:{'X-Robots-Tag':'noindex','Cache-Control':'no-store'}});
      headers.set('Content-Language',language);
      headers.set('Cache-Control','public, max-age=0, must-revalidate');
    }
    if (notFound || asset.status === 404) headers.set('X-Robots-Tag','noindex');
    return new Response(request.method === 'HEAD' ? null : asset.body, {status:notFound ? 404 : asset.status,headers});
  },
};

import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function source(relativePath) {
  return readFile(path.join(root, relativePath), 'utf8');
}

function requireMatch(value, pattern, message) {
  if (!pattern.test(value)) {
    throw new Error(message);
  }
}

function internalTarget(href) {
  const pathname = href.split(/[?#]/u, 1)[0];
  if (!pathname || pathname === '/') return 'index.html';
  if (pathname === '/privacy') return 'privacy/index.html';
  if (pathname === '/terms') return 'terms.html';
  if (pathname === '/account-deletion') return 'account-deletion/index.html';
  return pathname.replace(/^\//u, '');
}

async function requireInternalLinksResolve(relativePath, html) {
  for (const match of html.matchAll(/href="([^"]+)"/gu)) {
    const href = match[1];
    if (/^(?:https?:|mailto:|#)/u.test(href)) continue;
    const target = internalTarget(href);
    try {
      await access(path.join(root, target));
    } catch {
      throw new Error(`${relativePath} has an unresolved public link: ${href}`);
    }
  }
}

function requireTranslationParity(html, i18n, prefix, pageLabel) {
  const keys = new Set(
    [...html.matchAll(new RegExp(`data-i18n="(${prefix.replace('.', '\\.')}[^"]+)"`, 'gu'))]
      .map((match) => match[1]),
  );
  for (const key of keys) {
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const count = [...i18n.matchAll(new RegExp(`"${escaped}"\\s*:`, 'g'))].length;
    if (count !== 3) throw new Error(`${pageLabel}: ${key} must have ko, en, and ja translations`);
  }
}

export async function verifySite() {
  const [
    accountDeletion,
    privacyRoute,
    privacyHtml,
    terms,
    home,
    about,
    philosophy,
    faq,
    contact,
    main,
    i18n,
    sitemap,
    styles,
    manifest,
    robots,
  ] =
    await Promise.all([
      source('account-deletion/index.html'),
      source('privacy/index.html'),
      source('privacy.html'),
      source('terms.html'),
      source('index.html'),
      source('about.html'),
      source('philosophy.html'),
      source('faq.html'),
      source('contact.html'),
      source('js/main.js'),
      source('js/i18n.js'),
      source('sitemap.xml'),
      source('css/styles.css'),
      source('site.webmanifest'),
      source('robots.txt'),
    ]);

  requireMatch(
    accountDeletion,
    /<article class="locale-copy locale-copy-(?:ko|en|ja)"/,
    'account deletion page must contain localized content',
  );
  for (const locale of ['ko', 'en', 'ja']) {
    requireMatch(
      accountDeletion,
      new RegExp(`locale-copy-${locale}`),
      `account deletion page is missing ${locale}`,
    );
  }
  requireMatch(
    accountDeletion,
    /mailto:moolsoft\+help@gmail\.com\?subject=NoveraFlow%20Account%20Deletion%20Request/,
    'account deletion page must provide the verified external request entry point',
  );
  requireMatch(
    accountDeletion,
    /Supabase Auth/,
    'account deletion page must explain authentication-account deletion',
  );
  requireMatch(
    accountDeletion,
    /Push dispatch/,
    'account deletion page must explain Push dispatch redaction',
  );
  requireMatch(
    accountDeletion,
    /device-generated anonymous analytics identifier/i,
    'account deletion page must explain the anonymous analytics identifier',
  );
  requireMatch(
    accountDeletion,
    /Effective and last updated: September 2, 2026/,
    'account deletion page must publish the current effective date',
  );
  requireMatch(
    accountDeletion,
    /support\.apple\.com\/en-us\/102571/,
    'account deletion page must provide Apple manual disconnect guidance',
  );
  if (/http-equiv\s*=\s*["']refresh|location\.(?:assign|replace)|location\s*=/i.test(accountDeletion)) {
    throw new Error('account deletion page must not redirect to the home page');
  }
  if (/\/api\/app\/account-deletion|SUPABASE_SECRET_KEY|APPLE_PRIVATE_KEY/.test(accountDeletion)) {
    throw new Error('account deletion page exposes an internal endpoint or secret name');
  }

  const privacyBody = /<section class="content-body">([\s\S]*?)<\/section>/.exec(
    privacyRoute,
  )?.[1];
  const legacyPrivacyBody = /<section class="content-body">([\s\S]*?)<\/section>/.exec(
    privacyHtml,
  )?.[1];
  if (!privacyBody || privacyBody !== legacyPrivacyBody) {
    throw new Error('/privacy and /privacy.html policy bodies must remain identical');
  }
  requireTranslationParity(privacyRoute, i18n, 'privacy.', 'privacy policy');
  requireTranslationParity(terms, i18n, 'terms.', 'terms of service');
  requireMatch(privacyRoute, /device-generated anonymous analytics identifier/i, 'privacy policy must accurately describe analytics identity');
  if (/device-local anonymous analytics identifier/u.test(privacyRoute + i18n)) {
    throw new Error('analytics identity must not be described as device-local only');
  }
  requireMatch(privacyRoute, /Google and Apple process sign-in information/, 'privacy policy must identify authentication providers');
  requireMatch(privacyRoute, /Firebase Cloud Messaging/, 'privacy policy must identify Push processing');
  requireMatch(privacyRoute, /no automatic time-based expiry/, 'privacy policy must state the implemented unbounded retention behavior');
  requireMatch(terms, /Google or Apple reauthentication/, 'terms must explain account deletion reauthentication');
  requireMatch(terms, /href="\/privacy"/, 'terms must link to privacy');
  requireMatch(terms, /href="\/account-deletion"/, 'terms must link to account deletion');
  requireMatch(accountDeletion, /href="\/privacy"/, 'account deletion must link to privacy');
  requireMatch(accountDeletion, /href="\/terms"/, 'account deletion must link to terms');
  requireMatch(
    privacyRoute,
    /href="\/account-deletion"/,
    'privacy policy must link to account deletion instructions',
  );
  requireMatch(privacyRoute, /href="\/terms"/, 'privacy policy must link to terms');
  requireMatch(
    sitemap,
    /https:\/\/noveraflow\.com\/account-deletion/,
    'sitemap must include account deletion',
  );
  requireMatch(sitemap, /https:\/\/noveraflow\.com\/terms<\/loc>/, 'sitemap must use the canonical terms URL');
  for (const route of ['privacy', 'terms', 'account-deletion']) {
    for (const locale of ['en', 'ko', 'ja']) {
      requireMatch(
        sitemap,
        new RegExp(`https:\\/\\/noveraflow\\.com\\/${route}\\?lang=${locale}`),
        `sitemap must include ${route} ${locale} alternate`,
      );
    }
  }
  for (const html of [home, about, philosophy, faq, contact, privacyRoute, terms, accountDeletion]) {
    requireMatch(html, /<meta name="viewport" content="width=device-width, initial-scale=1" \/>/, 'every public page must retain a mobile viewport');
  }
  requireMatch(styles, /@media \(max-width: 520px\)/, 'mobile styles are missing');
  requireMatch(styles, /\.account-deletion-page/, 'account deletion styles are missing');

  const publicPages = new Map([
    ['index.html', home],
    ['about.html', about],
    ['philosophy.html', philosophy],
    ['faq.html', faq],
    ['contact.html', contact],
    ['privacy/index.html', privacyRoute],
    ['privacy.html', privacyHtml],
    ['terms.html', terms],
    ['account-deletion/index.html', accountDeletion],
  ]);
  await Promise.all(
    [...publicPages].map(([relativePath, html]) => requireInternalLinksResolve(relativePath, html)),
  );

  const publicText = [
    ...publicPages.values(),
    main,
    i18n,
    sitemap,
    styles,
    manifest,
    robots,
  ].join('\n');
  if (/SUPABASE_(?:SECRET|SERVICE)|service_role|APPLE_PRIVATE_KEY|GOOGLE_CLIENT_SECRET|-----BEGIN (?:RSA |EC )?PRIVATE KEY-----|\/api\/(?:app|admin)|zxhgoqwzhjnajqnbeoki\.supabase\.co/iu.test(publicText)) {
    throw new Error('public site contains a secret marker, internal endpoint, or Supabase project host');
  }

  if (/Backup and restore are being prepared|Notifications are being prepared|Login, cloud backup, and restore will be introduced/u.test(publicText)) {
    throw new Error('public copy still describes a released capability as future work');
  }
  new Function(i18n);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await verifySite();
  process.stdout.write('Static site verification passed.\n');
}

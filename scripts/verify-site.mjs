import { readFile } from 'node:fs/promises';
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

export async function verifySite() {
  const [accountDeletion, privacyRoute, privacyHtml, i18n, sitemap, styles] =
    await Promise.all([
      source('account-deletion/index.html'),
      source('privacy/index.html'),
      source('privacy.html'),
      source('js/i18n.js'),
      source('sitemap.xml'),
      source('css/styles.css'),
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
    /anonymous analytics identifier/,
    'account deletion page must explain the anonymous analytics identifier',
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
  for (const key of privacyRoute.matchAll(/data-i18n="(privacy\.[^"]+)"/g)) {
    const escaped = key[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const count = [...i18n.matchAll(new RegExp(`"${escaped}"\\s*:`, 'g'))].length;
    if (count !== 3) {
      throw new Error(`${key[1]} must have ko, en, and ja translations`);
    }
  }
  requireMatch(
    privacyRoute,
    /href="\/account-deletion"/,
    'privacy policy must link to account deletion instructions',
  );
  requireMatch(
    sitemap,
    /https:\/\/noveraflow\.com\/account-deletion/,
    'sitemap must include account deletion',
  );
  requireMatch(styles, /@media \(max-width: 520px\)/, 'mobile styles are missing');
  requireMatch(styles, /\.account-deletion-page/, 'account deletion styles are missing');
  new Function(i18n);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await verifySite();
  process.stdout.write('Static site verification passed.\n');
}

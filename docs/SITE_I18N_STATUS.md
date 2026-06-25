# Site i18n Status

Last updated: 2026-06-25

## Current Structure

- Supported locales: `ko`, `en`, `ja`
- Shared language file: `js/i18n.js`
- Page animation script: `js/main.js`
- Locale selection: language buttons store the selected locale in
  `localStorage` under `noveraflow.locale`.
- Locale detection order: `?lang=`, stored locale, browser language,
  `data-default-locale`, then English.
- Page identity: each HTML page sets `data-page` on the `<html>` element.
- Metadata: `js/i18n.js` updates title, description, keywords, Open Graph,
  Twitter title/description, and `og:locale` from each page's locale metadata.

## Pages Covered

- `index.html`: main page
- `about.html`: app/download guide
- `philosophy.html`: feature introduction
- `faq.html`: FAQ
- `privacy.html` and `privacy/index.html`: privacy policy
- `terms.html`: terms of service
- `contact.html`: contact/support
- `sitemap.xml`: includes `en`, `ko`, and `ja` alternates

## Key Structure

All three locales use the same flat key structure:

- `common.*`: shared navigation, footer, language labels
- `home.*`: main page copy
- `about.*`: app and download guide
- `features.*`: feature introduction
- `faq.*`: FAQ
- `privacy.*`: privacy policy
- `terms.*`: terms of service
- `contact.*`: contact/support

When adding copy, add the same key to `ko`, `en`, and `ja` before using it in
HTML. A key should not exist in only one locale.

## Remaining TODO

- Legal review is still required before public launch for privacy and terms
  wording in all supported languages.
- Store download links should be added after app store registration is ready.
- If cloud backup, account login, or web app features launch, update privacy,
  terms, FAQ, and metadata together.

## Adding a Language

1. Add the locale code to `SUPPORTED_LOCALES` in `js/i18n.js`.
2. Copy the full existing locale object and translate all `meta`, `messages`,
   and `thoughts` values.
3. Add a language button to each common header or move the header into a shared
   build step before the next larger site refactor.
4. Add `hreflang` entries in each HTML page and `sitemap.xml`.
5. Run a key parity check and `git diff --check`.

// Public route contract shared by the static generator, tests and local preview.
export const origin = 'https://noveraflow.com';
export const languages = ['en', 'ko', 'ja'];
export const pages = [
  {key: 'home', route: '/', source: 'index.html'},
  {key: 'about', route: '/about', source: 'about.html'},
  {key: 'features', route: '/philosophy', source: 'philosophy.html'},
  {key: 'faq', route: '/faq', source: 'faq.html'},
  {key: 'contact', route: '/contact', source: 'contact.html'},
  {key: 'privacy', route: '/privacy', source: 'privacy/index.html'},
  {key: 'terms', route: '/terms', source: 'terms.html'},
  {key: 'accountDeletion', route: '/account-deletion/', source: 'account-deletion/index.html'},
];
export function localizedUrl(route, language) {
  return `${origin}${route}${language === 'en' ? '' : `?lang=${language}`}`;
}
export function artifactPath(page, language) {
  return `_localized/${language}/${page.key}/index.html`;
}
export const stores = [
  'https://play.google.com/store/apps/details?id=com.moolsoft.noveraflow',
  'https://apps.apple.com/app/id6792970947',
];

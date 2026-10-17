# Handover Status

Last updated: 2026-10-17

## Completed

- Site i18n now supports `ko`, `en`, and `ja` through `js/i18n.js`.
- Main page, feature page, app/download guide, FAQ, privacy policy, terms,
  contact/support, footer, navigation, buttons, and metadata are connected to
  i18n keys.
- Locale key parity was checked across Korean, English, and Japanese.
- Core terminology was documented in `docs/NOVERAFLOW_GLOSSARY.md`.
- Site i18n structure and language-addition steps were documented in
  `docs/SITE_I18N_STATUS.md`.

## Notes

- `philosophy.html` now functions as the public feature introduction page while
  keeping its existing URL.
- `/privacy` and `privacy.html` are both connected to the same privacy keys.
- Legal language still needs final review before public launch.
- The landing page now uses verified public Google Play and App Store links;
  see the 2026-10-17 operating record below for release status.

## Do Not Modify From This Site Task

- `noveraflow-app`
- `noveraflow-admin`
- AnalyticsSystem
- Fortune or unrelated project files

## 2026-10-17 — A/B landscape landing Production release

Purpose: upgrade the main landing page while retaining the static site,
Korean/English/Japanese localization, policy routes, FAQ and support features.
The user explicitly approved Production deployment and Git commit/push.

### Baseline and deployment route

- Working tree was clean before this task. Baseline `main` and remote HEAD:
  `c29a12c4ab41318e9913da3a9c7c76a45cffd5e1`.
- Existing hosting is **Cloudflare Pages**, project `noveraflow-site`, with
  automatic deployment from `moolsoft-stack/noveraflow-site` branch `main`.
  Static publishing root is the repository root; there is no PM2 execution
  path or application server for this site.
- Baseline successful Cloudflare deployment:
  `e29f8aa7-baa3-4440-9aae-ded75a88aaa3`.
- Public HTML matched baseline through the closing body; the only extra
  Production HTML was the existing Cloudflare analytics injection.
- Local predeployment HTML snapshot:
  `D:\Development\Personal\tmp\site-landing-20261017\production-before.html`.
  Browser evidence is in the same temporary directory, outside Git.
- Production URL: `https://noveraflow.com/`.
  Existing provider URL: `https://noveraflow-site.pages.dev/`.

### Changed files and official logo

- `index.html`: HTML SEO content, two inline SVG landscapes, downloads,
  actual app screen cards, Premium/backup introduction, and localized footer.
- `css/landing.css`: landing-only layout, responsive styles and animation.
- `js/landing-init.js`: early session choice and reduced-motion policy.
- `js/landing.js`: 3-language landing copy, localized images and motion control.
- `site.webmanifest`: official app icons and landing theme color.
- `assets/landing/`: versioned official-logo derivatives, social preview and
  12 optimized app marketing screens (four per locale).
- `README.md` and this existing operating record.

The current app's `pubspec.yaml` launcher configuration points to
`noveraflow-app/assets/branding/mark_01_icon_1024.png`. That file is the logo
source, superseding the old `noveraflow_icon_master.png` website record.
The app source remains unchanged. Web derivatives are
`assets/landing/icon-{32,192,512,1024}-v20261017.png` and
`assets/landing/official-mark-v20261017.webp` (background margin trimmed and
resized, no shape distortion). Both scenes use the identical official logo.
`assets/landing/og-v20261017.png` also uses this official icon.

Screens come from `noveraflow-app/assets/IOS_K_E_J_img/{k,e,j}{1_h,2_m,3_w,5_p}_ios.png`.
They are resized to 640px WebP at quality 78, about 42–71 KB per image, and
lazy-loaded below the hero. Marketing images retain their real app content.

### A/B selection, motion and maintenance

- First page load chooses A/B with equal probability and stores the choice in
  `sessionStorage['noveraflow.landing.scene']`. Refresh/navigation in the same
  tab session keeps it. An independent new tab session gets its own choice.
  Storage failure and JavaScript-disabled HTML retain a static A fallback.
- A: muted dusk, lake/city reflections, clouds, moonlight, flowers, foliage,
  coffee steam and a cat. B adds spring blossoms, summer foliage, autumn gold,
  snowy ridges and long flowing light paths connecting the landscape.
- CSS animates transform/opacity for clouds, moonlight, city lights, leaves,
  petals, steam, reflections, a small cat ear movement and near-layer depth.
  B uses SVG stroke-dashoffset for the two light trails. No 3D engine, video,
  canvas render loop or new third-party JavaScript dependency is used.
- Mobile reduces motion speed and removes petal/near-layer animation; scene
  framing adapts to keep coffee/cat visible. Reduced-motion, Save-Data,
  deviceMemory <= 4 GB or hardwareConcurrency <= 2 selects static scenery.
  A visible pause/resume button is available; OS/low-resource overrides win.
  Offscreen and hidden-page scenery pauses.
- To inspect both on an existing browser tab, change the sessionStorage key
  to `A` or `B` through developer tools and refresh. There is no public debug
  query flag or analytics experiment tracking.
- Animation definitions and breakpoints are in `css/landing.css`; translation
  strings and image locale changes are in `js/landing.js`.

### Store links and truthful availability

- Google Play: `https://play.google.com/store/apps/details?id=com.moolsoft.noveraflow`.
  Official public listing was reachable on 2026-10-17.
- App Store: `https://apps.apple.com/app/id6792970947`.
  Apple's public lookup for Korea and US returned app ID `6792970947`,
  **public version 1.0.61**. The user's new 1.0.80 (81) is under review.
  The download button therefore links to the available app, with a localized
  notice that update 1.0.80 is under review. It does not advertise 1.0.80 as live.
- When 1.0.80 becomes public, update only `landing.store.status` in all three
  locales and the default HTML copy, after checking Apple's official lookup.
  Premium copy says availability depends on the installed app version.
- The links are ordinary official-store links with noopener/noreferrer; no
  purchase, account, payment configuration or app distribution setting changed.

### Predeployment verification

- `npm run build`: passed (existing static/link/policy contracts).
- `node --test --test-isolation=none test/*.test.mjs`: 2 tests passed. The
  default isolated runner initially hit the sandbox's process spawn EPERM;
  the authorized rerun passed without changing test code.
- Syntax checks for both new JavaScript files and `git diff --check`: passed.
- Real Chrome checks: A/B x ko/en/ja x 320/390/1440px = 18 combinations;
  no horizontal overflow, one visible scene, localized copy/images and both
  official download links. Desktop/mobile screenshots were visually reviewed.
- Session selection exercised both random branches and kept the first choice
  on refresh. Motion pause works. Reduced-motion and simulated two-core mode
  both had **zero running animations**.
- `/privacy`, `/terms`, `/account-deletion`, `/faq.html`, `/about.html`,
  `/contact.html`, `/philosophy.html`: HTTP 200 locally; optimized screenshots
  decoded successfully. Existing FAQ tests and policy translation checks pass.

### Rollback

Use the existing Cloudflare Pages project to roll Production back to deployment
`e29f8aa7-baa3-4440-9aae-ded75a88aaa3` (source `c29a12c`). Alternatively, revert
the landing release commit in Git and push the revert to `main` so the normal
Pages integration publishes the prior site. Preserve later unrelated work and
do not reset or force-push `main`. After rollback, verify the homepage and
`/privacy`, `/terms`, `/account-deletion`, `/faq.html` on the public domain.
Neither method touches nginx, PM2, databases, authentication or payment servers.

Production release revision and postdeployment evidence are appended below
after Cloudflare's deployment check and public browser checks complete.

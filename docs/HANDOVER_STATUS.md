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
  Storage failure always selects A. JavaScript-disabled HTML retains static A.
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

### Production result — 2026-10-17 19:52 KST

- Landing release source: `cb58deff7916937c39a85d4abe61ee6c93e54f8f`.
  `git push origin main` completed successfully.
- Cloudflare Pages deployment
  `b8edb256-815f-476b-9c2e-cf0e0568c3b0` completed with **success**.
  Execution/publishing path remains Pages project `noveraflow-site`, repository
  root, branch `main`; the dedicated host is not involved.
- `https://noveraflow.com/` serves the new landing. Real Chrome checks on that
  domain passed all 18 A/B/language/viewport combinations, refresh persistence,
  pause, reduced motion (0 running animations), two-core static mode (0),
  screenshot decoding, official store URLs, and all seven existing policy/help
  routes (HTTP 200). Desktop and mobile Production screenshots were reviewed.
- New CSS/JavaScript, official logo, OG asset and webmanifest all returned 200.
  No broken visible images or untranslated keys remained; webfonts loaded.
- JavaScript-disabled check: A, static, HTML heading and both store links stay
  available. The storage-error fallback is explicitly A even when a browser
  allows reads but denies sessionStorage writes.
- No blocking issue found; rollback was unnecessary. Future maintenance is
  limited to changing the iOS review-status copy when 1.0.80 is publicly live,
  or the user's subsequent visual feedback.
- A follow-up commit records these Production results and the storage-error
  fallback. Its Pages build uses the same publishing path; the implementation
  revision above identifies the complete visual release.

## 2026-10-17 — Scheduled landscapes, shared branding and subtle depth

Purpose: extend the accepted landing design to the existing public pages,
replace random selection with a shared KST schedule, and add restrained depth.
Production deployment and Git commit/push are explicitly authorized.

### Baseline and changed files

- Clean starting tree: `d058d1974e7d3b120890732891b35dcfb2fdeba3`.
- Recovery deployment: Cloudflare Pages `621fe855-875d-460e-9131-f71d05b4b25e`.
- Hosting remains project `noveraflow-site`, Git `main`, repository-root static
  publishing. Local checkout: `D:\Development\Personal\noveraflow-site`.
- Modified: `index.html`, `about.html`, `philosophy.html`, `faq.html`,
  `contact.html`, `privacy.html`, `privacy/index.html`, `terms.html`,
  `account-deletion/index.html`, `css/landing.css`, `js/landing-init.js`,
  `js/landing.js`, and this document.
- Added: `css/brand.css` and `test/landing-schedule.test.mjs`. No new dependency.
- All eight interior-page main bodies are unchanged, including privacy,
  terms and account deletion. Their canonical/hreflang/schema, shared i18n,
  sitemap, robots and FAQ logic are unchanged from the recovery revision.

### Selection rules and maintenance

- A = Design 1 (emotional landscape); B = Design 2 (flowing light).
- Slot = `floor((Date.now() + 9 hours) / 8 hours)`. Even slots use A; odd
  slots use B. Anchor: 1970-01-01 00:00 Asia/Seoul is A. Boundaries are
  00:00, 08:00, 16:00 KST; parity continues across midnight rather than
  resetting daily. For example, 2026-10-17 uses B/A/B and 10-18 uses A/B/A.
- The head script sets the scene before paint. A boundary timer and
  pageshow/focus/visibility resynchronization handle an open or suspended tab.
  Transition duration is 1.2 seconds; reduced/static mode switches directly.
- Manual buttons at the bottom of the Hero store `{slot, scene}` in
  `sessionStorage['noveraflow.landing.override']`. The choice survives reload
  and a visit to another page, but expires at the next slot. There is no
  random-selection path; the previous `noveraflow.landing.scene` key is removed.
- The same epoch time produces the same default regardless of browser timezone.
  This static site uses the visitor's device clock; a materially incorrect
  device clock can select the wrong slot. No time service or backend was added.
- Storage denial falls back to automatic scheduling, with manual choice held
  only in the current document. JavaScript disabled: static A and HTML content.

### Visual changes and limits

- Existing artwork is separate SVG geometry, not a flattened raster Hero.
  Original cloud/moon/city/water/foliage/petal/steam/cat/trail keyframes and
  durations are retained. New outer groups isolate transforms from those
  original animations: far landscape, water, shore, branches and foreground.
- Fine-pointer desktop movement is at most +/-1.5 SVG units for the far layer
  and +/-10 for branches. Differential scroll offsets are 22/14/10/3/4 units.
  Updates use one requested animation frame per input burst, not a running loop.
- B's original light paths are clipped into rear/front portions and drawn on
  different depth planes around the shore/branches, before the cup/cat plane.
- Existing app screenshot cards receive shadows and a 3px slow vertical float.
  Screens are not warped, rotated or enlarged on hover. Hero copy and download
  buttons stay fixed during pointer movement; store hover changes contrast/glow.
- Mobile has no mouse parallax; foreground depth adds a slow 2px translation.
  Reduced motion, data saver and existing low-resource detection disable depth
  and animations. The result is subtle 2.5D layering, not a 3D reconstruction.
- Header/footer marks on all nine HTML documents use the existing web asset
  `assets/landing/official-mark-v20261017.webp`, derived from official app source
  `noveraflow-app/assets/branding/mark_01_icon_1024.png`. App assets are untouched.
  Favicons/social images use the existing `assets/landing/*-v20261017` assets.
- Shared interior styles are in `css/brand.css`: warm neutral surfaces, readable
  cards, gentle borders, responsive navigation and a common footer.
- Store URLs are unchanged: Google Play `com.moolsoft.noveraflow` and Apple
  app ID `6792970947`. Existing localized 1.0.80 review-pending notice remains.

### Predeployment verification

- Static build passed; 5 tests passed (existing policy/FAQ contracts plus
  KST boundary, midnight continuity, persistence/expiry and denied storage).
- Source comparison confirmed interior text, SEO, policies and existing scenic
  keyframes unchanged. Syntax and whitespace checks passed.
- Real Chrome: 18 home cases (A/B x ko/en/ja x 1440/390/320px) and 48 interior
  cases (8 routes x ko/en/ja x 1440/320px). No horizontal overflow or missing
  logos; localized controls and unchanged official download URLs passed.
- Refresh and About-page round trip retain manual selection. Browser clock
  simulation crossed 16:00 KST while open: timer switched to auto/B and completed
  the fade without navigation. Midnight/resumed-tab expiry also passed.
- Real mouse input changed near and far transform matrices independently;
  text/button rectangles stayed identical. Scroll produced different layer
  offsets. Desktop and mobile screenshots were visually reviewed.
- Mobile pointer input had zero pointer offsets. Reduced motion and simulated
  two-core mode had 0 running animations. JavaScript-disabled fallback passed.
- Browser sizes are Chrome device emulation, not physical iPhone/Safari tests.
  Evidence lives outside Git under `tmp/site-landing-20261017/refine-*`.

### Recovery

If public verification fails, roll Cloudflare Pages back to successful baseline
deployment `621fe855-875d-460e-9131-f71d05b4b25e` (source `d058d19`). Alternatively,
revert this release's commits, then push `main` through the same Pages integration.
Preserve unrelated subsequent changes; never reset/force-push shared history.
Verify homepage, A/B, language switching, official store links, `/privacy`,
`/terms`, `/account-deletion`, `/faq.html` after rollback. No database, payment,
authentication, nginx, PM2 or app distribution change is involved.

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

### Production release

- Implementation revision: `ee9d372c58179b90026eb19e290a35c9e2887d25`.
  Push to `origin/main` succeeded through the existing Git integration.
- Cloudflare Pages deployment `d9e52962-10f6-4afc-a839-5471a261b244`:
  **completed / success**. Public URL: `https://noveraflow.com/`.
- Public main page passed all 18 A/B, locale and viewport combinations.
  Production desktop/mobile screenshots were visually reviewed.
- New CSS/JavaScript, sitemap, robots and webmanifest returned HTTP 200 and
  matched the checked-in sources (normalizing Windows line endings).
- Public interior-page verification passed all 48 route/locale/viewport cases.
  Cloudflare's existing `.html` to extensionless canonical redirects remain.
- On the public domain, manual selection survived refresh and an About-page
  round trip; midnight resume returned to automatic selection. An open-page
  timer crossed the simulated 16:00 KST boundary and completed the B fade.
- Production pointer/scroll checks confirmed independent depth transforms
  with stationary text/buttons. Mobile pointer offsets remained zero; language
  buttons localized the selector. Reduced/two-core modes had 0 animations,
  and the JavaScript-disabled static fallback passed.
- No blocking regression found; no rollback required. The follow-up commit
  only records these verified results. Its normal Pages deployment publishes
  identical application assets; `ee9d372` identifies the visual implementation.
- Verification limits: mobile viewport emulation in Chrome, not a physical
  iPhone/Safari session; schedule boundaries simulated without waiting 8 hours.
  No further implementation or user action is required for this release.

## 2026-10-17 — Sunrise / sunset light grading and numeric selector

Purpose: refine the accepted scenery through light and color, and replace the
internal "Design 1/2" labels with a quiet numeric control. Production deployment
and Git push are authorized. The working tree was clean at `fc62c55` (visual
implementation `ee9d372`). Verified recovery deployment:
`1281b2d5-d31f-4fe7-9622-dc38f71203b0`, Cloudflare Pages **success**.

### Minimal changes

- Files: `index.html`, `css/landing.css`, `js/landing.js`, this operating record.
- 1 / A = **Sunrise**: retained the dark pre-dawn foundation, with warm light
  arriving from the right horizon, softened stars/moon, a thin haze and warm
  water reflection. Added only gradient ellipses inside existing depth groups.
  The new light opacity varies slowly over 40/46 seconds; mobile retains the
  existing 60-second override. This is a quiet dawn impression, not a literal
  solar-position simulation.
- 2 / B = **Sunset**: deeper blue/violet sky and lake, cool soft moon halo,
  gently emphasized stars and lower-saturation seasonal glow/light trails.
  The intended mood is the calm transition from evening into night.
- Existing paths, keyframes, animation durations, 2.5D transforms and fixed
  text/button positions are preserved. No library, raster asset or app change.
- Selector: two circular **44 x 44px** buttons with visible text **1 / 2** only.
  Selection uses a subdued fill/border. Desktop hover and keyboard focus show
  the localized accessible name: 일출/일몰, Sunrise/Sunset, 日の出/日没.
  Touch users have accessible labels without permanently displayed descriptions.
- `js/landing-init.js` is unchanged: KST 00/08/16 boundaries, continuous parity
  across days, pre-paint selection, open-page transition and resume sync remain.
  Manual session choice expires at the next slot, as documented above. Names
  describe the visual concepts; they do not change the alternating schedule.
- All eight interior HTML documents, common branding CSS, official logo assets,
  shared translations, policy/terms text, sitemap and SEO schema are unchanged.
  Download anchors and the public-version/1.0.80-review notice are unchanged.

### Local verification

- `npm run build`, 5 existing tests, syntax and whitespace checks passed.
- Source comparison against `fc62c55` confirmed the preserved elements above.
- Real Chrome: 18 main cases (A/B x ko/en/ja x 1440/390/320px), 48 interior
  cases (8 routes x ko/en/ja x 1440/320px) passed; no overflow or missing logos.
- Checked numeric text, localized accessible names, circular 44px hit areas,
  hover tooltip, selected state, reload and page-navigation persistence.
- Simulated KST boundaries: open-page timer changes scene, finishes its fade
  and expires the manual override; midnight/resumed-tab behavior also passed.
- Pointer/scroll depth remains independent across layers while reading UI stays
  fixed. Reduced-motion and two-core fallback: 0 running animations. Mobile
  pointer offsets: 0. JavaScript-disabled static A and download links passed.
- Desktop/mobile screenshots reviewed for warm dawn vs cool evening, restrained
  controls and readable copy. Mobile checks use Chrome viewport/touch emulation,
  not physical iPhone/Safari. Time boundaries were simulated, not waited 8 hours.
- Temporary browser evidence: `tmp/site-landing-20261017/sunlight-*`, outside Git.

### Deployment and recovery

Use the unchanged Cloudflare Pages `noveraflow-site` Git integration (`main`,
repository-root publishing), local checkout `D:\Development\Personal\noveraflow-site`.
If this refinement regresses, roll Pages back to deployment
`1281b2d5-d31f-4fe7-9622-dc38f71203b0` / source `fc62c55`, or revert this release's
commits and push `main`. Do not reset/force-push. Verify the homepage, selector,
language buttons, download links and policy routes after recovery. No database,
payment, authentication, server configuration or app distribution change.

### Production result

- Implementation revision: `438731ddd53e77c37f014d9c3cb277dd9cfc7c76`.
  Push to `origin/main` succeeded.
- Cloudflare Pages deployment `6b613831-a2cf-4abe-b93c-af46c2326e6b` completed
  with **success**. `https://noveraflow.com/` serves the new light grading and
  numeric controls; desktop/mobile Production screenshots were reviewed.
- All 18 Production main-page A/B/locale/viewport cases passed, including
  numeric-only text, 44px circular controls, localized names and store links.
- Public CSS/JavaScript, sitemap, robots and webmanifest returned HTTP 200 and
  matched the local sources after normalizing line endings.
- All 48 Production interior route/locale/viewport cases passed. Official
  header/footer logos and unchanged policy/help pages remain intact.
- Production manual selection survived reload and an About-page round trip.
  Desktop hover showed the localized name while button text stayed numeric.
  Simulated midnight resume expired the manual override; the open-page timer
  crossed 16:00 KST and completed automatic selection and the fade.
- Production mouse/scroll depth, fixed reading UI, mobile pointer exclusion,
  language switching, reduced-motion/two-core static mode and no-JS fallback
  all passed. Zero running animations in both reduced/static scenarios.
- No blocking issue or required follow-up was found; rollback was unnecessary.
  The follow-up documentation commit records these results without modifying
  application assets. Browser/device and clock-simulation limits are noted above.

## 2026-10-17 — Mobile Hero content clipping protection

User report: the top of the main title was clipped on a real phone, seemingly
while the background moved. Preserve the accepted sunrise/sunset artwork,
animations, desktop depth, selector, download links and public-page content.

### Baseline, findings and scope

- Clean starting revision: `3fa30b5`; implementation `438731d`.
  Verified successful recovery deployment:
  `72d107b4-ee38-45f5-962a-f19eb0d5eec6` (Cloudflare Pages `noveraflow-site`).
- The title/editorial already had no transform or animation; JavaScript depth
  variables are assigned only to `.land-scene`. Background motion affecting
  the title's layout was **not** reproduced in the test engines.
- Confirmed risks: mobile Hero had a fixed `96svh` height, 790px minimum,
  950px maximum and `overflow:hidden`; the shared `main` overflow-x rule also
  computed to `overflow-y:auto`. Background/overlay used negative z-indices.
  There was no explicit safe-area allowance or flow space for bottom controls.
- With 200% browser text adjustment in Chrome, the baseline Hero stayed 790px
  tall while the content outgrew it. After the fix it grows to fit (1399.625px
  in the recorded 375px-wide probe), rather than clipping the content.
- The user's exact intermittent upper-title clipping was not reproduced on
  Windows WebKit/Chrome at normal text size. A screenshot/browser detail was
  requested. Do not describe this as a confirmed Safari engine defect or claim
  physical-device verification; the change removes the identified clipping
  and compositing risks with targeted regression coverage.

### Minimal fix

- Files: `css/landing.css`, `index.html` (CSS cache version only), this record.
- Only at widths <=640px: use a content-sized column Hero, preserving the
  normal 790–950px minimum-height appearance; remove its height ceiling and
  content clipping. Keep `overflow:hidden` on the decorative scene itself.
- Remove the landing main's implicit scroll/clip container. Put the scene,
  shade and content at explicit z-indices 0/1/2; scene ignores pointer events.
  Editorial/control wrappers have no transform or animation.
- Use normal-flow bottom controls with at least 48px separation from copy.
  Add safe-area padding to the Hero/header and a small title line-box allowance
  (`line-height:1.45`, `.08em` block padding). Honor the existing viewport's
  safe-area behavior without changing viewport-fit or disabling text zoom.
- Existing SVG geometry, scenic keyframes, motion speeds, mobile background
  parallax, desktop CSS, JavaScript, logo assets, store links and all other
  pages are unchanged. The 8-hour schedule and session selection are unchanged.
- Safe-area reference: [WebKit's official guidance](https://webkit.org/blog/7929/designing-websites-for-iphone-x/).

### Local verification and limits

- Static build, five existing policy/FAQ/schedule tests and whitespace check pass.
- Temporary tooling outside Git: `tmp/mobile-hero-check/` (Playwright, Windows
  WebKit 27.2 and installed Chrome). No site runtime dependency was added.
- 36 scene/language/profile combinations passed: A/B x ko/en/ja, with WebKit
  at 375x812 (iPhone 12 mini), 390x844 and 320x568; Chrome at 375x812,
  393x851 (Android profile) and 360x640.
- For every case: seek multiple background animation phases, scroll 100px,
  shrink/restore viewport height, return to top, check glyph bounds and actual
  hit testing for background occlusion, and check content/control separation.
  Heading document position stays stable throughout these changes.
- Enlarged text expands the Hero safely. Emulated +47px top / +34px bottom
  safe-area values are honored and reset correctly. Reduced-motion and
  two-core mode have zero ongoing animations after initial UI transitions.
- Both engines: tap selector, reload and About-page round trip retain choice;
  simulated 16:00 KST timer expires it and completes the automatic fade.
  Desktop mouse parallax remains active with stationary editorial bounds.
- Address-bar expansion/collapse is represented by viewport-height changes;
  Windows WebKit is not Mobile Safari's native browser chrome. Physical iPhone
  Safari/Android Chrome confirmation of the reported symptom remains a limit.

### Deployment and recovery

Use the existing `main` Git integration, repository-root publishing in Pages
project `noveraflow-site`; local checkout `D:\Development\Personal\noveraflow-site`.
Recovery: roll Pages back to `72d107b4-ee38-45f5-962a-f19eb0d5eec6` / `3fa30b5`,
or revert the mobile-fix commits and push `main`. Preserve unrelated work;
no reset/force-push. Recheck the Hero, store links, languages and selector.
No operating data, payment/auth service, app source or server configuration
is changed by this release.

### Production verification

- Fix revision: `82cdd3b825ac365ea2fa2ce07b962f43160e9d80`; pushed to `origin/main`.
- Cloudflare Pages deployment `09d19531-f73d-496a-84af-bcac4413d783` completed
  with **success**. `https://noveraflow.com/` returns HTTP 200 and references
  `landing.css?v=20261017d`.
- Repeated the targeted 36-case mobile matrix on the actual public domain in
  WebKit and Chrome: all passed. No heading glyph clipping or background
  occlusion was detected at sampled animation phases, scroll positions and
  changing viewport heights. Production screenshots were visually reviewed.
- Production safe-area emulation, enlarged text, low-resource/reduced motion,
  session selection, the open-page KST boundary and desktop parallax passed.
- No regression requiring rollback found. This follow-up record changes no
  application assets. Physical Mobile Safari's original intermittent symptom
  remains unconfirmed without the user's device/screenshot; do not equate the
  Windows WebKit verification with a real iPhone Safari test.

## 2026-10-17 — Recurrent iPhone Hero clipping investigation (OPEN)

The user reports that the title is initially intact after refresh and later
clips again on an actual iPhone. The preceding mobile layout release must
**not** be treated as a verified fix for that intermittent device symptom.
This follow-up requires a reproducible cause before another code change.

### Baseline and source trace

- Production baseline: `ec959c9`; Pages deployment
  `24a33bfb-3f71-4129-ad30-ac0d7c72cbf1`; implementation `82cdd3b`.
- Public `landing.css?v=20261017d`, `landing.js?v=20261017c` and
  `landing-init.js?v=20261017b` return HTTP 200 and match the checked-out
  files after line-ending normalization. This does not inspect the cache
  on the reporting iPhone.
- At <=640px, the title, editorial wrapper, Hero and main have no transform
  or animation and use visible overflow. Hero height is content-driven with
  a `clamp(790px,96svh,950px)` minimum. No JavaScript writes content height.
- `renderDepth()` writes pointer/scroll variables only on `.land-scene`.
  Mobile pointer depth is zero; mobile scroll depth still updates the SVG
  wrappers. It does not directly transform the title or its ancestors.
- Scene/shade/content use z-indices 0/1/2. Root/body retain computed
  `overflow: hidden auto`; separate ancestor scrolling was investigated,
  not assumed to be the cause. No `visualViewport` handler currently moves
  content. The scene IntersectionObserver only pauses decorative animation.

### New reproduction evidence and its limits

- Temporary read-only browser harness outside the repository:
  `D:\Development\Personal\tmp\mobile-hero-check\recurrence.mjs`.
  Event traces/screenshots use the `recurrence-` prefix in that directory.
  No diagnostic endpoint, telemetry or dependency was added to Production.
- Windows WebKit 27.2 and installed Chrome, mobile emulation at 375x812
  (iPhone 12 mini profile), on the public site: 12 engine/locale/scene cases
  (ko/en/ja x A/B); repeated scroll positions 0/80/170/210/400/1100 and height
  cycles 812/620/640. Collected window and visualViewport events, glyph
  bounds, ancestor scroll positions, overflow, transform and stacking state.
- Title document Y stayed at 172.46875px. Attempts to scroll body/main/Hero/
  editorial separately did not produce an independent scroll offset.
- Additionally let animations run for a real 120 seconds per engine (no
  animation seeking), returning from scrollY=1200 to the top every 30 seconds.
  The title position stayed stable and both final screenshots showed intact
  text. This elapsed-time phase used ja/B; other cases had the shorter
  repeated-scroll/resize sequence. No internal clipping was reproduced.
- At scrollY=210 the title crosses the top of the viewport normally; this
  is distinct from clipping inside a Hero while the title is in view.
  This observation does **not** classify the user's symptom as normal.
- Native iPhone Safari toolbar collapse, rubber-band scrolling and GPU
  compositing are not reproduced by Windows WebKit viewport resizing.
  `visualViewport.offsetTop` remained zero in these simulated cycles.
  Physical Safari remote debugging is not connected in this environment.
  **Direct cause unconfirmed; no verified recurrence fix yet.**

### Required device evidence and next action

- Ask for a screenshot/short recording before refreshing, iPhone/iOS version,
  and whether the title remains clipped after returning fully to the top.
- If a Mac is available, enable Safari Web Inspector on the iPhone, connect
  it to the Mac, and select its NoveraFlow tab from Safari's Develop menu.
  See [WebKit remote inspection instructions](https://webkit.org/web-inspector/enabling-web-inspector/).
- At the failing state, compare heading `getBoundingClientRect().top`,
  `scrollY`, their sum, `visualViewport.offsetTop/pageTop/height/scale`, and
  the ancestor overflow/transform/scrollTop values with the refreshed state.
  Capture pixels too: DOM bounds and hit testing alone cannot rule out a
  compositor paint defect, particularly with pointer-events:none scenery.
- Only after a failure is captured, isolate the mobile scroll transform or
  offending clipping/compositing layer in the inspector and demonstrate
  recovery without refresh. Apply that smallest proven change; retain the
  existing scenic keyframes and desktop depth. Repeat the actual failing
  device sequence before calling the issue resolved.

### Changes, deployment and recovery

- Repository change for this investigation: this document only. No further
  padding, transform or viewport workaround has been applied without evidence.
- No corrective Production deployment yet; baseline remains `ec959c9`.
  Save the investigation with a `[CF-Pages-Skip]` documentation-only commit
  so recording an open issue does not masquerade as a new fix release.
  [Cloudflare documents this deployment-skip prefix](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/#skipping-a-build-via-a-commit-message).
- For a later verified patch, use the existing `main` Pages integration.
  Recovery point: deployment `24a33bfb-3f71-4129-ad30-ac0d7c72cbf1` /
  `ec959c9`, or revert only the future patch and push; no reset/force-push.
  A rollback to this baseline restores the current site, not a proven cure
  for the reported iPhone defect. Site behavior and operating data unchanged.

## 2026-10-17 — Mobile Safari recurrent Hero clipping correction

Purpose: remove the mobile-only compositor trigger identified after the earlier
height/safe-area change did not stop the intermittent iPhone symptom. This is a
targeted follow-up to the open investigation above; no spacing, typography,
scenery, content, store link, schedule or non-landing page was changed.

### Direct cause and reproduction

- `js/landing.js` registered both `scroll` and `resize` handlers for
  `renderDepth()` at every viewport width. Although pointer depth was disabled
  on mobile, `--scroll-depth` was still recalculated there.
- Each mobile scroll/address-bar viewport cycle therefore transformed all
  `.depth-layer` SVG groups and transitioned the large scene compositor layers.
  The title box itself remained fixed, so the recurring visual cut was a scene
  recomposition/paint-order condition rather than title geometry or insufficient
  safe-area spacing. Refresh reset the transformed scene to scroll depth zero,
  matching the reported temporary recovery.
- Reproduced against the pre-fix Production page in a WebKit iPhone 12 mini
  profile: at scrollY=200, `--scroll-depth` changed from `0.000` to `0.253` and
  `.depth-far` changed from the identity matrix to Y=5.566px while title document
  Y stayed 172.46875px. The patched local page kept both the variable and matrix
  at zero under the identical sequence, with the same title document Y.

### Minimal change

- `js/landing.js`: mobile now always sets scene `--scroll-depth` to zero. A
  media-query change queues one depth refresh so crossing 640px cannot retain a
  stale desktop transform. Desktop pointer and scroll depth remain unchanged.
- `index.html`: advance only the landing JavaScript cache key to
  `landing.js?v=20261017d`.
- The SVG scene, individual cloud/moon/city/water/foliage/petal/steam/cat/light
  animations, the light grading, mobile automatic foreground movement, scene
  selector, 8-hour KST schedule, content and buttons remain unchanged.

### Verification before deployment

- Static site verification, five existing tests and `git diff --check` pass.
- Existing browser matrix passes all 36 cases: WebKit and Chrome; A/B scenes;
  ko/en/ja; iPhone 12 mini 375x812, iPhone 390x844, WebKit 320x568, Chrome
  375x812, Android 393x851 and Chrome 360x640.
- The matrix covers animation phases, scroll, viewport shrink/restore, enlarged
  text, selector/session persistence, the live 16:00 KST boundary, reduced
  motion and low-resource behavior. Desktop pointer depth still changes with
  pointer position while editorial bounds remain fixed.
- Native iPhone Safari cannot be remotely inspected from this Windows host
  because the recorded Mac mini SSH paths are unreachable. This release removes
  the directly reproduced mobile transform trigger; per the user's rule, final
  physical-device confirmation is still required before calling the visual
  symptom completely resolved.

### Deployment and recovery

- Production delivery uses the existing Cloudflare Pages Git integration from
  `main`; repository root is the publish directory.
- Recovery baseline before this correction: deployment
  `24a33bfb-3f71-4129-ad30-ac0d7c72cbf1`, site implementation `82cdd3b`, and
  recorded repository revision `ec959c9`. Revert only this correction commit
  and push `main`, or roll Pages back to that deployment; no reset/force-push.
- Production revision, Pages deployment ID and public-domain verification are
  recorded below after the deployment completes.

### Production result

- Correction revision: `cfd420c6e0151fa95fdc39105808cb9511250487`;
  pushed to `origin/main`.
- Cloudflare Pages deployment `cd5395c9-53ff-4c36-bf97-fa861ec43412`
  completed with `success`.
- `https://noveraflow.com/` returns HTTP 200 and references
  `landing.js?v=20261017d`; the public script contains the mobile guard.
- The complete 36-case WebKit/Chrome mobile matrix passed again on the public
  domain, including ko/en/ja and both scenes. Scene/session switching, the KST
  boundary, reduced motion and desktop depth also passed.
- On public Production at mobile scrollY=200, `--scroll-depth` is `0`, the far
  depth wrapper remains the identity matrix, title document Y is 172.46875px,
  and 19 independent scenic animations are still running. The corrective path
  is therefore live without removing the intended mobile atmosphere.
- No Production rollback was required. Physical iPhone Safari confirmation is
  the remaining acceptance check; until that check, describe the deployed
  trigger correction as verified in Production browser emulation rather than a
  fully confirmed physical-device resolution.

## 2026-10-17 — Mobile Safari Hero structural isolation follow-up

Purpose: prioritize stable iPhone title rendering after the physical device
reproduced the clipping again on Production revision `cfd420c`. This entry
supersedes the preceding claim that the JavaScript scroll-depth update alone
was the direct cause. That update removed one compositor trigger but did not
remove the remaining CSS clipping and SVG composition paths.

### Rendering-path findings and uncertainty

- Mobile DOM order is scene, editorial content, then bottom controls inside one
  Hero. The scene is absolute; editorial content and bottom controls are normal
  flow at <=640px. The site header is absolute. There are no fixed or sticky
  elements inside the Hero, and the landing page disables the global fixed body
  atmosphere pseudo-element.
- The title/editorial nodes have no transform, filter, perspective, animation,
  clip-path or clipping overflow. Their document coordinates stayed stable in
  automated traces. The previous height/safe-area fix therefore addressed the
  wrong failure class.
- Global `overflow-x:hidden` on both `html` and `body` computed as
  `overflow: hidden auto`, making the Safari viewport/root ancestors clipping
  scroll containers. Previous work changed only Hero/main overflow and left
  these two ancestors intact.
- After `cfd420c`, JavaScript mobile scroll depth was zero, but CSS still gave
  every SVG depth group a transform transition; the near groups still used the
  mobile depth animation; and both full SVG scenes remained opacity/visibility
  transition layers. These large composited layers shared the Hero stacking
  context with the content.
- The physical iPhone recurrence proves the earlier single-trigger conclusion
  was incomplete. Without a reachable Mac/iPhone Web Inspector session, it is
  still not possible to attribute the device paint failure to one specific
  WebKit internal layer. The confirmed site-side risk is the combination of
  root clipping scroll containers and residual full-scene composition layers.
  This release removes both rather than claiming an unobserved browser-internal
  mechanism as fact.

### Minimal mobile-only structural correction

- `css/landing.css`: landing `html` and `body` use `overflow-x:clip` and
  `overflow-y:visible` on mobile, retaining horizontal protection without
  creating vertical scroll containers.
- Hero/content/controls explicitly use the normal document flow without
  transform, filter, perspective, will-change, contain or clip-path. The Hero
  no longer creates the additional mobile isolation layer.
- The absolute scenic wrapper is paint-contained below the shade and content.
  Full SVG scenes have no transform/filter/perspective/will-change/transition.
  Only the active scene is displayed; mobile scene selection is an immediate
  stable swap instead of a full-SVG opacity crossfade.
- All mobile `.depth-layer` wrappers are static: no transform, individual
  translate, transition or wrapper animation. JavaScript mobile scroll depth
  remains zero. Desktop depth and crossfade rules are unchanged.
- Safe individual SVG descendant animations remain: clouds, moonlight, city
  lights, water, foliage, steam, cat and light trails. Existing mobile rules
  still suppress petals and near-layer motion and lengthen the remaining
  animation durations. Content, links, 8-hour scheduling and manual selection
  are unchanged.
- `index.html`: advance only the landing CSS cache key to
  `landing.css?v=20261017e` so Safari cannot reuse the previous CSS asset URL.

### Verification before deployment

- Static verification, five existing tests and `git diff --check` pass.
- Existing browser matrix passes all 36 WebKit/Chrome mobile cases: ko/en/ja,
  A/B, iPhone 12 mini 375x812, iPhone 390x844, narrow 320x568, Android 393x851
  and Chrome 360x640. Selector/session behavior, KST boundary, reduced motion,
  low-resource behavior and desktop mouse depth pass.
- A separate concurrent WebKit run kept all six ko/en/ja x A/B pages open for
  over two minutes, applying scrollY=220 and viewport 812/620 changes every 30
  seconds. Every title document Y remained 172.46875px; root/body computed to
  `clip/visible`; inactive SVG was `display:none`; depth transforms stayed
  `none`; and 13 (A) or 17 (B) scenic descendant animations remained running.
- Windows WebKit viewport resizing is not native Safari browser chrome. Actual
  iPhone validation remains the final acceptance check and must not be replaced
  by these automated results.

### Deployment and recovery

- Production baseline for this correction: code revision `cfd420c`, Pages
  deployment `cd5395c9-53ff-4c36-bf97-fa861ec43412`; repository record before
  work `5acf57f`.
- Deploy with the existing `main` Cloudflare Pages integration after local
  verification. If needed, roll back to the baseline deployment or revert only
  this correction commit and push; never reset or force-push.
- Production revision, deployment ID and public asset/browser verification are
  appended after completion.

### Production result

- Structural correction revision:
  `5d6510409ba73a2495a5195282dcdb2b3a64bd64`; pushed to `origin/main`.
- Cloudflare Pages deployment `a870de3e-dd06-4335-9368-fccf5894bcb5`
  completed successfully.
- `https://noveraflow.com/` returns HTTP 200 and references only
  `landing.css?v=20261017e` (the preceding `v=20261017d` reference is absent).
- The 36-case WebKit/Chrome matrix passed on the public domain. The concurrent
  two-minute Production WebKit run also passed all ko/en/ja x A/B pages after
  four scroll and viewport-height cycles. Title Y remained 172.46875px;
  root/body were `clip/visible`; inactive full scenes remained `display:none`;
  depth wrappers remained untransformed; and 13/17 scenic animations ran.
- Mac mini access was retried at the currently observed local candidate and the
  preserved external address; SSH timed out at both. No native iPhone Safari
  remote-inspector evidence was available. The user must perform the short
  physical-device acceptance sequence below before this is declared completely
  resolved: open/reload once, repeat scroll down/back to top while the address
  bar hides/shows, leave the page open over two minutes, and check both scenes.
- No regression or condition requiring rollback was observed in Production.
  Recovery remains the `cfd420c` deployment above or a revert of `5d65104`.

### Completion-check evidence: languages, viewport classes and warm cache

- The existing iPhone 12 mini WebKit evidence was retained without rerunning it:
  375x812, ko/en/ja x A/B, two minutes, four repeated scroll cycles and
  812->620->812 viewport-height changes. The title document Y remained
  172.46875px in every sample and the mobile content transform remained `none`.
- A targeted Production WebKit run added the current large-iPhone viewport
  class at 440x956. All ko/en/ja x A/B cases stayed open for 120 seconds and
  completed four cycles of scrollY=220 plus 956->700->956 height changes.
  Every case passed with 0px title document-position drift, `overflow:visible`
  on the Hero, and no title transform. At the top, ko/en titles occupied
  Y=172.46875..297.875px and the taller ja title occupied
  Y=172.46875..357.3125px, fully inside the 956px viewport.
- Before each large-viewport reload, the browser fetched the preceding asset
  URLs `landing.css?v=20261017d` and `landing.js?v=20261017c` with a cacheable
  request. After reload in the same browser context, the live document and
  resource trace selected `landing.css?v=20261017e` and
  `landing.js?v=20261017d`; neither preceding URL was selected as the page's
  stylesheet or script. This covers a returning browser with earlier assets in
  cache, in addition to the fresh-load checks already recorded above.
- These runs cover the requested language, scene, repeated-scroll, elapsed-time,
  viewport-height-change and warm-cache conditions in Production emulation.
  They do not constitute physical iPhone Safari evidence. Complete resolution
  remains pending the device sequence below.

### Minimum physical-iPhone acceptance sequence

1. On a physical iPhone 12 mini (375x812 class), use an existing non-private
   Safari tab that has visited the site before. Open Production without first
   clearing website data; this preserves the warm-cache condition.
2. Check Korean, English and Japanese. For each language, select scene 1 and
   scene 2 and confirm the full title, description and download buttons are
   visible at the top.
3. In every language/scene combination, scroll down and back to the top at
   least four times so Safari's address bar hides and reappears. Rotate
   portrait->landscape->portrait once to force a viewport-size change, then
   leave the page open for at least two minutes and repeat the scroll.
4. Repeat steps 1-3 on the newest/larger iPhone available (440x956 class). If a
   second physical device is unavailable, record that limitation explicitly;
   responsive simulation is supporting evidence and does not replace this
   physical-device check.
5. Reload the existing tab and repeat one scroll cycle. When Web Inspector is
   available, confirm the loaded asset URLs are
   `landing.css?v=20261017e` and `landing.js?v=20261017d`. Also open one private
   tab for a fresh-cache comparison. A pass requires the title to remain whole
   after warm-cache reload, fresh-cache load, resizing, repeated scrolling and
   the two-minute wait in all three languages and both scenes.

## 2026-10-17 — Android Chrome Hero scene-resume correction

The reporting device was corrected to Android Chrome; no matching iPhone
Safari failure has been reported. This entry replaces the device assumption in
the preceding investigation without reverting the useful mobile layout and
scene-isolation safeguards.

### Reproduction and cause boundary

- Production baseline: revision `5d6510409ba73a2495a5195282dcdb2b3a64bd64`,
  Pages deployment `a870de3e-dd06-4335-9368-fccf5894bcb5`.
- A connected Samsung SM-S901N running Chrome 155 provided a real-device
  pre-change trace. With browser chrome shown/hidden, the viewport height
  changed from about 756px to 812px while the title document Y remained
  172.476px. The title and Hero retained visible overflow and no transform;
  normal scrolling moved the whole title outside the viewport as expected.
- The USB debugging transport went offline before the reported visual failure
  could be captured. Therefore the internal Android GPU paint defect is not
  claimed as directly observed in DevTools.
- The remaining deterministic site trigger was reproduced on the public page
  with Chrome's Android mobile profile: when the Hero fully left the viewport,
  its IntersectionObserver added `page-hidden`. Animated SVG descendants
  changed from 521 running / 492 paused to 12 running / 1001 paused, then
  returned to 521 / 492 together when the Hero re-entered. Title document Y
  stayed 172.46875px. This explicit bulk pause/resume was the only remaining
  scroll-driven full-scene compositor reset after the three earlier fixes and
  matches the report that refresh is initially clean and scrolling triggers
  the visual loss.
- The confirmed cause fixed here is that site-authored bulk compositor reset.
  Which Android Chrome raster/compositor tile produced the clipped pixels
  remains unconfirmed until the failing physical device is inspected while the
  symptom is visible.

### Minimal change

- `js/landing.js`: mobile no longer applies the explicit `page-hidden`
  animation pause on Hero intersection or document visibility changes. Mobile
  Chrome performs its own background throttling, so scenic animations retain a
  stable compositor state across browser-chrome and scroll cycles. Desktop
  offscreen pause behavior remains enabled.
- `index.html`: advance only the landing JavaScript cache key to
  `landing.js?v=20261017e`.
- Existing normal-flow content, mobile scroll-depth disablement, scene
  isolation, sunrise/sunset selection, KST schedule, store links, desktop 2.5D
  depth and scenic keyframes are unchanged.

### Verification and Production result

- Static verification passed; all five existing tests passed. `git diff
  --check` passed.
- Local installed-Chrome verification passed at 411x756 for ko/en/ja x A/B.
  Each case completed four scrollY=1000 Hero exit/return cycles and
  756->812->756 viewport changes. The scene never acquired `page-hidden`,
  506 (A) or 521 (B) scenic animations remained running, title document Y
  stayed 172.46875px, title hit-testing returned `#hero-title`, and Hero
  overflow remained visible. Desktop still paused the offscreen scene.
- Production correction revision:
  `cfb49926db5cee47982da6a3e7b8d10da8a6254b`; pushed to `origin/main`.
  The Git-integrated Pages deployment is live at `https://noveraflow.com/` and
  the public HTML references `landing.js?v=20261017e`.
- The same six-case Android Chrome matrix and four exit/return cycles passed on
  Production. The title remained at Y=172.46875px and desktop offscreen pause
  remained functional.
- The physical SM-S901N was no longer listed by ADB after deployment. No
  post-change real-device pass is claimed. Per the acceptance rule, complete
  visual resolution remains pending one user/device check: on that Android
  Chrome, keep the existing tab/cache, fully scroll past the Hero and return
  four times while the address bar hides/shows, wait two minutes, then check
  both scenes and all three languages.

### Recovery

- If the Production change causes a regression, roll Pages back to deployment
  `a870de3e-dd06-4335-9368-fccf5894bcb5` / revision `5d65104`, or revert only
  `cfb4992` and push `main`; do not reset or force-push.
- That rollback restores the preceding mobile isolation implementation and its
  explicit scene pause/resume behavior. It does not restore a proven fix for
  the Android clipping report.

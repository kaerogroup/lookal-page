# LOOKaL SEO / AIEO / GEO Release Gate — PR #28

## Scope
- Canonical site: https://lookal.tech/
- Advertiser landing page: /iklan/
- Location landing page: /lokasi/
- Premium formats: Basic 8s, Premium Fullscreen 15s, Premium Extended Fullscreen 30s
- Branch: feat/seo-aieo-geo-landing-20261112

## Confirmed by CI / Vercel preview
- [x] Navigation rollout commit f16fc1e6 built successfully; Vercel deployment READY. New breakpoint/test commits require a subsequent build check.
- [x] Static SEO verification and additional navigation checks passed in Vercel build log
- [x] Canonical and sitemap entries for the three primary pages
- [x] One H1 and metadata for each page
- [x] JSON-LD parses; note this is syntax validation, not Google's eligibility guarantee
- [x] Premium 15s / 30s are present in both advertising content and runtime price cards
- [x] Old fixed rotation estimate removed
- [x] Runtime homepage navigation retains /iklan/ and /lokasi/

## Responsive navigation delivery
- `/iklan/` and `/lokasi/` have dedicated hamburger/drawer markup and use shared public navigation CSS/JS.
- Publisher, Partner (including detail pages) and Tools receive the same public header during static build, without replacing their in-page feature content.
- Desktop navigation breakpoint standardized at 1200px; intermediate tablets retain a hamburger menu.
- Static checks cover drawer existence, controls, asset loading, active links and no legacy wrapped subpage navigation. Visual/mobile functional verification remains pending.

## Blocking acceptance checks — not yet verified
- [ ] Preview browser QA at 360px, 390px, 430px, 900px, 1024px and desktop, including drawer close and scroll/keyboard interactions
- [ ] Preview verification of actual rendered homepage title, pricing cards, navigation, images and language toggle (Vercel SSO protection)
- [ ] Verify advertiser signup journey and that 15s / 30s can actually be purchased in the advertiser application; public site copy alone is not application QA
- [ ] Confirm that the commercial price/tier configuration is current (current public code displays Basic RM2, Premium RM4, Premium Extended RM6 per day per location)
- [ ] Confirm all live location claims and offer terms (RM6 promotional credit)
- [ ] Validate target domain served HTML, robots.txt and sitemap.xml via direct HTTP request
- [ ] Validate schema against deployed URL and submit sitemap to Google Search Console after release
- [ ] Check actual Playwright/browser rendering and accessibility (no browser test result is claimed here)

## Domain information verified from Vercel configuration
- lookal.tech is a verified domain on Vercel project lookal-page
- lookal.tech and www.lookal.tech aliases currently point to the last production deployment on main (0e199802)
- A historical crawler snapshot is not sufficient to establish the current HTTP output

## Release decision
Keep PR #28 as Draft and do not merge until browser QA and commercial claims are accepted. Once ready, merge through normal GitHub review and verify the new production commit, then check live indexing status through Google Search Console.

## Claims discipline
- Advertiser-facing screen plays are not audience impressions.
- Never infer a guaranteed number of plays from 30 slots when formats have different durations.
- Do not publish unverified specific location names, precise audience demographics or impression numbers.

# LOOKaL Public Landing — Production Runbook

## Canonical public domain

Intended canonical URL:

`https://lookal.tech/`

## Current release gates

A release is production-accepted only when all of the following are true:

1. `main` contains the accepted commit.
2. Vercel production deployment reports SUCCESS.
3. `https://lookal.tech/` serves this landing page, not the legacy application shell.
4. `https://lookal.tech/robots.txt` and `/sitemap.xml` resolve from the landing deployment.
5. The canonical URL in HTML matches the domain actually serving the landing page.
6. Primary CTA to `https://www.lookal.tech/signup` reaches the advertiser application flow.
7. Mobile acceptance is checked at 360px, 390px and 430px widths.
8. No broken image/video source is visible.
9. Search Console verification and sitemap submission are completed.
10. Structured data is validated after the canonical domain is live.

## Domain boundary

Recommended public boundary for the current architecture:

- `lookal.tech` — public landing / discovery
- `www.lookal.tech` — application/signup surface

Do not index two different products with the same canonical URL.

## Media performance

- Above-the-fold proof video may preload metadata only.
- Below-the-fold walkthrough videos use `preload="none"`.
- Large raw production masters should not be added to the public web repo.
- Web media should be compressed before replacement when practical.

## Claims discipline

Do not describe screen plays as audience impressions.

Keep these separate:

- ad plays / tayangan iklan
- estimated people
- measured audience data

## Current operational blocker

At the 2026-09-20 production review, `https://lookal.tech/` still returned the legacy JavaScript application shell rather than this static landing page. Domain routing must be moved to the `lookal-page` Vercel project before final SEO launch acceptance.

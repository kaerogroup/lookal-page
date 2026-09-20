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

## Current production status

As of 2026-09-20:

- `lookal.tech` is assigned to the `lookal-page` Vercel project for the public landing page.
- `www.lookal.tech` remains the application/signup surface.
- The public landing has been visually verified in an Incognito browser session.
- The latest landing release on `main` has a successful Vercel production deployment.
- SEO/AIEO foundation is present: canonical URL, robots, sitemap, Organization/WebSite/Service structured data, direct-answer FAQ and explicit OAI-SearchBot access.

## Remaining launch gates

The following still require explicit acceptance before SEO launch can be called complete:

1. Verify `robots.txt` and `sitemap.xml` on the live canonical domain.
2. Verify the primary CTA reaches `https://www.lookal.tech/signup`.
3. Run physical/mobile acceptance at 360px, 390px and 430px widths.
4. Confirm all production image and video sources load and play.
5. Verify `lookal.tech` in Google Search Console.
6. Submit `https://lookal.tech/sitemap.xml`.
7. Request indexing for the homepage after verification.
8. Validate structured data against the live canonical page.
9. Monitor branded queries such as LOOKaL, LOOKaL Malaysia and LOOKaL iklan after recrawl.
